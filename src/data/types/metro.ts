export type LineStatus = "Operational" | "Partially Operational" | "Under Construction";

export interface MetroLine {
  lineId: string;
  lineName: string;
  route: string;
  status: LineStatus;
  stations: string[];
  color?: string;
}

export interface MetroSystem {
  city: string;
  system?: string;
  lines: MetroLine[];
}

export interface InterchangeStation {
  station: string;
  city: string;
  lines: {
    lineId: string;
    lineName: string;
  }[];
}

export interface CityConfig {
  city: string;
  slug: string;
  tagline: string;
  metroSystem: MetroSystem;
  lineColors: Record<string, string>;
}
