import { MetroSystem } from "./types/metro";

export const kolkataMetro: MetroSystem = {
  city: "Kolkata",
  system: "Kolkata Metro Rail Corporation",
  lines: [
    {
      lineId: "Line-1",
      lineName: "Blue Line",
      route: "Dakshineswar ↔ Kavi Subhash",
      status: "Operational",
      stations: [
        "Dakshineswar",
        "Baranagar",
        "Noapara",
        "Dum Dum",
        "Belgachia",
        "Shyambazar",
        "Shobhabazar Sutanuti",
        "Girish Park",
        "Mahatma Gandhi Road",
        "Central",
        "Chandni Chowk",
        "Esplanade",
        "Park Street",
        "Maidan",
        "Rabindra Sadan",
        "Netaji Bhavan",
        "Jatin Das Park",
        "Kalighat",
        "Rabindra Sarobar",
        "Mahanayak Uttam Kumar",
        "Netaji",
        "Masterda Surya Sen",
        "Gitanjali",
        "Kavi Nazrul",
        "Shahid Khudiram",
        "Kavi Subhash"
      ]
    },
    {
      lineId: "Line-2",
      lineName: "Green Line",
      route: "Howrah Maidan ↔ Sealdah",
      status: "Operational",
      stations: [
        "Howrah Maidan",
        "Howrah",
        "Mahakaran",
        "Esplanade",
        "Sealdah"
      ]
    },
    {
      lineId: "Line-3",
      lineName: "Purple Line",
      route: "Joka ↔ Esplanade",
      status: "Partially Operational",
      stations: [
        "Joka",
        "Thakurpukur",
        "Sakherbazar",
        "Behala Chowrasta",
        "Behala Bazar",
        "Taratala",
        "Majerhat",
        "Khidirpur",
        "Victoria",
        "Park Street",
        "Esplanade"
      ]
    },
    {
      lineId: "Line-4",
      lineName: "Orange Line",
      route: "New Garia ↔ Airport",
      status: "Under Construction",
      stations: [
        "New Garia",
        "Garia",
        "Narendrapur",
        "Subhashgram",
        "Chowhati",
        "Ruby",
        "Science City",
        "Beliaghata",
        "Phoolbagan",
        "Salt Lake Stadium",
        "Karunamoyee",
        "Salt Lake Sector V",
        "New Town",
        "Airport"
      ]
    },
    {
      lineId: "Line-5",
      lineName: "Yellow Line",
      route: "Noapara ↔ Barasat",
      status: "Under Construction",
      stations: [
        "Noapara",
        "Khardaha",
        "Sodepur",
        "Madhyamgram",
        "New Barrackpore",
        "Barasat"
      ]
    },
    {
      lineId: "Line-6",
      lineName: "Pink Line",
      route: "New Garia ↔ Airport",
      status: "Under Construction",
      stations: [
        "New Garia",
        "EM Bypass",
        "Sector V",
        "Eco Park",
        "New Town",
        "Airport"
      ]
    }
  ]
};

export const kolkataLineColors: Record<string, string> = {
  "Blue Line": "#0066CC",
  "Green Line": "#00A36C",
  "Purple Line": "#8B5CF6",
  "Orange Line": "#FF8C00",
  "Yellow Line": "#FFD700",
  "Pink Line": "#FF69B4"
};

export default kolkataMetro;
