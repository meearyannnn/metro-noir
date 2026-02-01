import { MetroSystem } from "./types/metro";

export const bangaloreMetro: MetroSystem = {
  city: "Bangalore",
  system: "Bangalore Metro Rail Corporation Limited",
  lines: [
    {
      lineId: "Purple",
      lineName: "Purple Line",
      route: "Challaghatta ↔ Whitefield",
      status: "Operational",
      stations: [
        "Challaghatta",
        "Kengeri Bus Terminal",
        "Kengeri",
        "Pattanagere",
        "Jnana Bharathi",
        "Rajarajeshwari Nagar",
        "Nayandahalli",
        "Mysuru Road",
        "Deepanjali Nagar",
        "Attiguppe",
        "Vijayanagar",
        "Hosahalli",
        "Magadi Road",
        "Majestic",
        "Cubbon Park",
        "Vidhana Soudha",
        "MG Road",
        "Trinity",
        "Halasuru",
        "Indiranagar",
        "Swami Vivekananda Road",
        "Baiyappanahalli",
        "KR Puram",
        "Singayyanapalya",
        "Garudacharapalya",
        "Hoodi",
        "Whitefield"
      ]
    },
    {
      lineId: "Green",
      lineName: "Green Line",
      route: "Nagasandra ↔ Silk Institute",
      status: "Operational",
      stations: [
        "Nagasandra",
        "Dasarahalli",
        "Jalahalli",
        "Peenya Industry",
        "Peenya",
        "Goraguntepalya",
        "Yeshwanthpur",
        "Sandal Soap Factory",
        "Mahalakshmi",
        "Rajajinagar",
        "Kuvempu Road",
        "Srirampura",
        "Mantri Square Sampige Road",
        "Majestic",
        "Chickpet",
        "Krishna Rajendra Market",
        "National College",
        "Lalbagh",
        "South End Circle",
        "Jayanagar",
        "RV Road",
        "Banashankari",
        "JP Nagar",
        "Yelachenahalli",
        "Konanakunte Cross",
        "Doddakallasandra",
        "Vajarahalli",
        "Talaghattapura",
        "Silk Institute"
      ]
    }
  ]
};

export const bangaloreLineColors: Record<string, string> = {
  "Purple Line": "#8B5CF6",
  "Green Line": "#00A36C"
};

export default bangaloreMetro;
