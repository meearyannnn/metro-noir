/**
 * DMRC Metro Route Finder
 * Uses modified BFS algorithm optimized for:
 * 1. Minimum number of interchanges (primary)
 * 2. Minimum number of stations (secondary)
 * 
 * This follows the actual DMRC routing logic where minimizing
 * line changes is prioritized over absolute shortest path.
 */

import { metroData, getStationLines } from "@/data/metroData";

export interface RouteSegment {
  line: string;
  lineColor: string;
  lineName: string;
  stations: string[];
  direction: string;
}

export interface RouteResult {
  segments: RouteSegment[];
  totalStations: number;
  interchanges: number;
  estimatedTime: number; // in minutes
  fare: number; // in INR
}

interface GraphNode {
  station: string;
  line: string;
}

interface QueueItem {
  node: GraphNode;
  path: GraphNode[];
  interchangeCount: number;
}

// Build adjacency graph from metro data
const buildGraph = (): Map<string, Map<string, string[]>> => {
  // Map: station -> Map<adjacent station -> lines connecting them>
  const graph = new Map<string, Map<string, string[]>>();

  Object.entries(metroData).forEach(([lineKey, line]) => {
    const stations = line.stations;
    
    for (let i = 0; i < stations.length; i++) {
      const currentStation = stations[i].name;
      
      if (!graph.has(currentStation)) {
        graph.set(currentStation, new Map());
      }
      
      // Connect to previous station
      if (i > 0) {
        const prevStation = stations[i - 1].name;
        const neighbors = graph.get(currentStation)!;
        
        if (!neighbors.has(prevStation)) {
          neighbors.set(prevStation, []);
        }
        neighbors.get(prevStation)!.push(lineKey);
      }
      
      // Connect to next station
      if (i < stations.length - 1) {
        const nextStation = stations[i + 1].name;
        const neighbors = graph.get(currentStation)!;
        
        if (!neighbors.has(nextStation)) {
          neighbors.set(nextStation, []);
        }
        neighbors.get(nextStation)!.push(lineKey);
      }
    }
  });

  return graph;
};

// Get all lines that pass through a station
const getStationLineKeys = (stationName: string): string[] => {
  const lines: string[] = [];
  Object.entries(metroData).forEach(([lineKey, line]) => {
    if (line.stations.some((s) => s.name === stationName)) {
      lines.push(lineKey);
    }
  });
  return lines;
};

// Calculate direction based on station positions
const getDirection = (lineKey: string, fromStation: string, toStation: string): string => {
  const line = metroData[lineKey];
  if (!line) return "";
  
  const fromIndex = line.stations.findIndex((s) => s.name === fromStation);
  const toIndex = line.stations.findIndex((s) => s.name === toStation);
  
  if (fromIndex === -1 || toIndex === -1) return "";
  
  const terminals = line.direction.split(" → ");
  if (fromIndex < toIndex) {
    return `Towards ${terminals[1] || line.stations[line.stations.length - 1].name}`;
  } else {
    return `Towards ${terminals[0] || line.stations[0].name}`;
  }
};

/**
 * Modified BFS that prioritizes minimum interchanges
 * Uses a priority queue approach where paths with fewer interchanges are explored first
 */
export const findRoute = (source: string, destination: string): RouteResult | null => {
  if (source === destination) {
    return {
      segments: [],
      totalStations: 0,
      interchanges: 0,
      estimatedTime: 0,
      fare: 0
    };
  }

  const graph = buildGraph();
  
  if (!graph.has(source) || !graph.has(destination)) {
    return null;
  }

  // Get all lines the source station is on
  const sourceLines = getStationLineKeys(source);
  
  // Priority queue: sorted by [interchangeCount, pathLength]
  // Using array and sorting for simplicity
  const queue: QueueItem[] = [];
  
  // Initialize with all possible starting lines
  sourceLines.forEach((line) => {
    queue.push({
      node: { station: source, line },
      path: [{ station: source, line }],
      interchangeCount: 0
    });
  });

  // Visited: station + line combination to avoid cycles
  const visited = new Set<string>();
  
  // Best result found
  let bestResult: { path: GraphNode[]; interchanges: number } | null = null;

  while (queue.length > 0) {
    // Sort queue by: 1. interchanges (primary), 2. path length (secondary)
    queue.sort((a, b) => {
      if (a.interchangeCount !== b.interchangeCount) {
        return a.interchangeCount - b.interchangeCount;
      }
      return a.path.length - b.path.length;
    });

    const current = queue.shift()!;
    const { node, path, interchangeCount } = current;
    
    const stateKey = `${node.station}:${node.line}`;
    
    // Skip if already visited with same or better interchange count
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    // Early termination if we found a result and current path is worse
    if (bestResult && interchangeCount > bestResult.interchanges) {
      continue;
    }

    // Check if destination reached
    if (node.station === destination) {
      if (!bestResult || interchangeCount < bestResult.interchanges || 
          (interchangeCount === bestResult.interchanges && path.length < bestResult.path.length)) {
        bestResult = { path: [...path], interchanges: interchangeCount };
      }
      continue;
    }

    // Explore neighbors
    const neighbors = graph.get(node.station);
    if (!neighbors) continue;

    neighbors.forEach((connectingLines, neighborStation) => {
      // Option 1: Continue on same line if possible
      if (connectingLines.includes(node.line)) {
        const newPath = [...path, { station: neighborStation, line: node.line }];
        queue.push({
          node: { station: neighborStation, line: node.line },
          path: newPath,
          interchangeCount
        });
      }

      // Option 2: Switch to a different line (adds interchange)
      connectingLines.forEach((line) => {
        if (line !== node.line) {
          const newPath = [...path, { station: neighborStation, line }];
          queue.push({
            node: { station: neighborStation, line },
            path: newPath,
            interchangeCount: interchangeCount + 1
          });
        }
      });
    });

    // Option 3: At current station, switch to different line (platform change)
    const currentStationLines = getStationLineKeys(node.station);
    currentStationLines.forEach((line) => {
      if (line !== node.line) {
        const stateKeyNew = `${node.station}:${line}`;
        if (!visited.has(stateKeyNew)) {
          queue.push({
            node: { station: node.station, line },
            path: [...path.slice(0, -1), { station: node.station, line }],
            interchangeCount: interchangeCount + 1
          });
        }
      }
    });
  }

  if (!bestResult) return null;

  // Convert path to route segments
  return convertPathToSegments(bestResult.path);
};

const convertPathToSegments = (path: GraphNode[]): RouteResult => {
  const segments: RouteSegment[] = [];
  let currentSegment: RouteSegment | null = null;

  path.forEach((node, index) => {
    if (!currentSegment || currentSegment.line !== node.line) {
      // Start new segment
      if (currentSegment) {
        segments.push(currentSegment);
      }
      
      const lineData = metroData[node.line];
      currentSegment = {
        line: node.line,
        lineColor: lineData?.color || "#888888",
        lineName: lineData?.name || node.line,
        stations: [node.station],
        direction: ""
      };
    } else {
      currentSegment.stations.push(node.station);
    }
  });

  if (currentSegment) {
    segments.push(currentSegment);
  }

  // Calculate directions for each segment
  segments.forEach((segment) => {
    if (segment.stations.length >= 2) {
      segment.direction = getDirection(
        segment.line,
        segment.stations[0],
        segment.stations[segment.stations.length - 1]
      );
    }
  });

  const totalStations = path.length;
  const interchanges = segments.length - 1;
  
  // DMRC timing: ~2 mins per station + 5 mins per interchange
  const estimatedTime = (totalStations - 1) * 2 + interchanges * 5;
  
  // DMRC fare calculation (2024 rates)
  const fare = calculateFare(totalStations);

  return {
    segments,
    totalStations,
    interchanges,
    estimatedTime,
    fare
  };
};

// DMRC fare structure (2024)
const calculateFare = (stations: number): number => {
  if (stations <= 2) return 10;
  if (stations <= 5) return 20;
  if (stations <= 12) return 30;
  if (stations <= 21) return 40;
  if (stations <= 32) return 50;
  return 60;
};

// Search stations with fuzzy matching
export const searchStations = (query: string, allStations: string[]): string[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  
  // Exact match first, then starts with, then contains
  const exactMatches: string[] = [];
  const startsWithMatches: string[] = [];
  const containsMatches: string[] = [];
  
  allStations.forEach((station) => {
    const lowerStation = station.toLowerCase();
    if (lowerStation === lowerQuery) {
      exactMatches.push(station);
    } else if (lowerStation.startsWith(lowerQuery)) {
      startsWithMatches.push(station);
    } else if (lowerStation.includes(lowerQuery)) {
      containsMatches.push(station);
    }
  });

  return [...exactMatches, ...startsWithMatches, ...containsMatches].slice(0, 10);
};
