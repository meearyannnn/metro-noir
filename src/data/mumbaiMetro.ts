import { MetroSystem } from "./types/metro";

export const mumbaiMetro: MetroSystem = {
  city: "Mumbai",
  system: "Mumbai Metro Rail Corporation",
  lines: [
    {
      lineId: "Line-1",
      lineName: "Blue Line",
      route: "Versova ↔ Ghatkopar",
      status: "Operational",
      stations: [
        "Versova",
        "DN Nagar",
        "Lower Juhu",
        "Andheri West",
        "Andheri East",
        "Saki Naka",
        "Asalpha",
        "Ghatkopar"
      ]
    },
    {
      lineId: "Line-2A",
      lineName: "Yellow Line",
      route: "DN Nagar ↔ Dahisar West",
      status: "Operational",
      stations: [
        "DN Nagar",
        "Lower Juhu",
        "Andheri West",
        "Goregaon West",
        "Malad West",
        "Oshiwara-Jogeshwari",
        "Andheri West Extension",
        "Dahanukarwadi",
        "Lower Dahisar",
        "Andheri West North",
        "Andheri West South"
      ]
    },
    {
      lineId: "Line-7",
      lineName: "Red Line",
      route: "Andheri East ↔ Dahisar East",
      status: "Operational",
      stations: [
        "Andheri East",
        "Jogeshwari East",
        "Goregaon East",
        "Malad East",
        "Oshiwara East",
        "Lower Dahisar East",
        "Upper Dahisar East",
        "Dahisar East"
      ]
    },
    {
      lineId: "Line-3",
      lineName: "Aqua Line",
      route: "Colaba ↔ SEEPZ",
      status: "Partially Operational",
      stations: [
        "Colaba",
        "Churchgate",
        "Cuffe Parade",
        "Vidhan Bhavan",
        "Marine Lines",
        "Grant Road",
        "Mumbai Central",
        "Mahalaxmi",
        "Worli",
        "Prabhadevi",
        "Dadar West",
        "Bandra West",
        "Santacruz West",
        "Andheri West",
        "MIDC",
        "SEEPZ"
      ]
    }
  ]
};

export const mumbaiLineColors: Record<string, string> = {
  "Blue Line": "#0066CC",
  "Yellow Line": "#FFD700",
  "Red Line": "#DC143C",
  "Aqua Line": "#00CED1"
};

export default mumbaiMetro;
