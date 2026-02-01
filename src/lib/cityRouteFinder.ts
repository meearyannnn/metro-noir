import { MetroSystem } from "@/data/types/metro";

export interface CityRouteResult {
  path: string[];
  segments: {
    line: string;
    lineId: string;
    stations: string[];
    direction: string;
  }[];
  totalStations: number;
  interchanges: number;
  estimatedTime: number;
  fare: number;
}

interface StationInfo {
  lines: { lineId: string; lineName: string; index: number }[];
}

interface GraphNode {
  station: string;
  line: string;
  lineId: string;
}

export function createCityRouteFinder(metroSystem: MetroSystem, lineColors: Record<string, string>) {
  // Build station info map
  const stationInfo = new Map<string, StationInfo>();
  
  metroSystem.lines.forEach(line => {
    line.stations.forEach((station, index) => {
      if (!stationInfo.has(station)) {
        stationInfo.set(station, { lines: [] });
      }
      stationInfo.get(station)!.lines.push({
        lineId: line.lineId,
        lineName: line.lineName,
        index
      });
    });
  });

  // Build adjacency graph
  const graph = new Map<string, { neighbor: string; line: string; lineId: string }[]>();
  
  metroSystem.lines.forEach(line => {
    for (let i = 0; i < line.stations.length; i++) {
      const station = line.stations[i];
      const key = `${station}|${line.lineId}`;
      
      if (!graph.has(key)) {
        graph.set(key, []);
      }
      
      // Add neighbors on same line
      if (i > 0) {
        graph.get(key)!.push({
          neighbor: `${line.stations[i - 1]}|${line.lineId}`,
          line: line.lineName,
          lineId: line.lineId
        });
      }
      if (i < line.stations.length - 1) {
        graph.get(key)!.push({
          neighbor: `${line.stations[i + 1]}|${line.lineId}`,
          line: line.lineName,
          lineId: line.lineId
        });
      }
      
      // Add interchange connections (free transfer between lines at same station)
      const info = stationInfo.get(station);
      if (info && info.lines.length > 1) {
        info.lines.forEach(otherLine => {
          if (otherLine.lineId !== line.lineId) {
            graph.get(key)!.push({
              neighbor: `${station}|${otherLine.lineId}`,
              line: otherLine.lineName,
              lineId: otherLine.lineId
            });
          }
        });
      }
    }
  });

  function getDirection(lineId: string, fromIndex: number, toIndex: number): string {
    const line = metroSystem.lines.find(l => l.lineId === lineId);
    if (!line) return "";
    
    if (toIndex > fromIndex) {
      return `Towards ${line.stations[line.stations.length - 1]}`;
    } else {
      return `Towards ${line.stations[0]}`;
    }
  }

  function getStationIndex(station: string, lineId: string): number {
    const line = metroSystem.lines.find(l => l.lineId === lineId);
    return line ? line.stations.indexOf(station) : -1;
  }

  function findRoute(from: string, to: string): CityRouteResult | null {
    if (from === to) return null;
    
    const fromInfo = stationInfo.get(from);
    const toInfo = stationInfo.get(to);
    
    if (!fromInfo || !toInfo) return null;

    // BFS with priority for fewer interchanges
    const queue: { node: string; path: GraphNode[]; interchanges: number }[] = [];
    const visited = new Map<string, number>(); // Track minimum interchanges to reach each node
    
    // Start from all lines at the source station
    fromInfo.lines.forEach(line => {
      const startKey = `${from}|${line.lineId}`;
      queue.push({
        node: startKey,
        path: [{ station: from, line: line.lineName, lineId: line.lineId }],
        interchanges: 0
      });
      visited.set(startKey, 0);
    });

    let bestResult: { path: GraphNode[]; interchanges: number } | null = null;

    while (queue.length > 0) {
      // Sort by interchanges first, then by path length
      queue.sort((a, b) => {
        if (a.interchanges !== b.interchanges) return a.interchanges - b.interchanges;
        return a.path.length - b.path.length;
      });

      const current = queue.shift()!;
      const [currentStation, currentLineId] = current.node.split("|");

      // Check if we reached destination
      if (currentStation === to) {
        if (!bestResult || current.interchanges < bestResult.interchanges ||
            (current.interchanges === bestResult.interchanges && current.path.length < bestResult.path.length)) {
          bestResult = { path: current.path, interchanges: current.interchanges };
        }
        continue;
      }

      // Early termination if we have a result and current path is worse
      if (bestResult && current.interchanges > bestResult.interchanges) {
        continue;
      }

      const neighbors = graph.get(current.node) || [];
      
      for (const edge of neighbors) {
        const [neighborStation, neighborLineId] = edge.neighbor.split("|");
        const isInterchange = neighborLineId !== currentLineId && neighborStation === currentStation;
        const newInterchanges = current.interchanges + (isInterchange ? 1 : 0);

        const visitedInterchanges = visited.get(edge.neighbor);
        if (visitedInterchanges !== undefined && visitedInterchanges < newInterchanges) {
          continue;
        }

        visited.set(edge.neighbor, newInterchanges);

        const newPath = [...current.path];
        if (neighborStation !== currentStation || isInterchange) {
          newPath.push({
            station: neighborStation,
            line: edge.line,
            lineId: neighborLineId
          });
        }

        queue.push({
          node: edge.neighbor,
          path: newPath,
          interchanges: newInterchanges
        });
      }
    }

    if (!bestResult) return null;

    // Build segments from path
    const segments: CityRouteResult["segments"] = [];
    let currentSegment: CityRouteResult["segments"][0] | null = null;

    for (const node of bestResult.path) {
      if (!currentSegment || currentSegment.lineId !== node.lineId) {
        if (currentSegment) {
          segments.push(currentSegment);
        }
        currentSegment = {
          line: node.line,
          lineId: node.lineId,
          stations: [node.station],
          direction: ""
        };
      } else {
        currentSegment.stations.push(node.station);
      }
    }
    
    if (currentSegment) {
      segments.push(currentSegment);
    }

    // Calculate directions
    segments.forEach(segment => {
      if (segment.stations.length >= 2) {
        const firstIdx = getStationIndex(segment.stations[0], segment.lineId);
        const lastIdx = getStationIndex(segment.stations[segment.stations.length - 1], segment.lineId);
        segment.direction = getDirection(segment.lineId, firstIdx, lastIdx);
      }
    });

    const totalStations = bestResult.path.length;
    const interchanges = segments.length - 1;
    const estimatedTime = totalStations * 2 + interchanges * 5;
    const fare = calculateFare(totalStations);

    return {
      path: bestResult.path.map(n => n.station),
      segments,
      totalStations,
      interchanges,
      estimatedTime,
      fare
    };
  }

  function calculateFare(stations: number): number {
    if (stations <= 2) return 10;
    if (stations <= 5) return 20;
    if (stations <= 12) return 30;
    if (stations <= 21) return 40;
    if (stations <= 32) return 50;
    return 60;
  }

  function getAllStations(): string[] {
    const stations = new Set<string>();
    metroSystem.lines.forEach(line => {
      line.stations.forEach(station => stations.add(station));
    });
    return Array.from(stations).sort();
  }

  function getInterchangeStations(): string[] {
    const interchanges: string[] = [];
    stationInfo.forEach((info, station) => {
      if (info.lines.length > 1) {
        interchanges.push(station);
      }
    });
    return interchanges;
  }

  function getLineColor(lineName: string): string {
    return lineColors[lineName] || "#666666";
  }

  return {
    findRoute,
    getAllStations,
    getInterchangeStations,
    getLineColor,
    metroSystem,
    lineColors
  };
}
