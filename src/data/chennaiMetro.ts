import { MetroSystem } from "./types/metro";

export const chennaiMetro: MetroSystem = {
  city: "Chennai",
  system: "Chennai Metro Rail Limited",
  lines: [
    {
      lineId: "Blue",
      lineName: "Blue Line",
      route: "Wimco Nagar ↔ Airport",
      status: "Operational",
      stations: [
        "Wimco Nagar",
        "Wimco Nagar Depot",
        "Tollgate",
        "New Washermenpet",
        "Tondiarpet",
        "Sir Theagaraya College",
        "Washermanpet",
        "Mannadi",
        "High Court",
        "MGR Central",
        "Government Estate",
        "LIC",
        "Thousand Lights",
        "AG-DMS",
        "Teynampet",
        "Nandanam",
        "Saidapet",
        "Little Mount",
        "Guindy",
        "Alandur",
        "Nanganallur Road",
        "Meenambakkam",
        "Chennai Airport"
      ]
    },
    {
      lineId: "Green",
      lineName: "Green Line",
      route: "MGR Central ↔ St Thomas Mount",
      status: "Operational",
      stations: [
        "MGR Central",
        "Egmore",
        "Nehru Park",
        "Kilpauk",
        "Pachaiyappa College",
        "Shenoy Nagar",
        "Anna Nagar East",
        "Anna Nagar Tower",
        "Thirumangalam",
        "Koyambedu",
        "CMBT",
        "Arumbakkam",
        "Vadapalani",
        "Ashok Nagar",
        "Ekkattuthangal",
        "Alandur",
        "St Thomas Mount"
      ]
    }
  ]
};

export const chennaiLineColors: Record<string, string> = {
  "Blue Line": "#0066CC",
  "Green Line": "#00A36C"
};

export default chennaiMetro;
