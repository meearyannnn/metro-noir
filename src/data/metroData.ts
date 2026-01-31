/**
 * Delhi Metro Network Data
 * Complete station and line information for the Delhi Metro system
 * @version 1.0.0
 */

export interface Station {
  name: string;
  interchange: boolean;
}

export interface MetroLine {
  name: string;
  color: string;
  direction: string;
  platform: number;
  stations: Station[];
}

export interface MetroData {
  [key: string]: MetroLine;
}

export const metroData: MetroData = {
  yellow: {
    name: "Yellow Line",
    color: "#FFD200",
    direction: "Samaypur Badli → Millennium City Centre Gurugram",
    platform: 2,
    stations: [
      { name: "Samaypur Badli", interchange: false },
      { name: "Rohini Sector 18, 19", interchange: false },
      { name: "Haiderpur Badli Mor", interchange: true },
      { name: "Jahangirpuri", interchange: false },
      { name: "Adarsh Nagar", interchange: false },
      { name: "Azadpur", interchange: true },
      { name: "Model Town", interchange: false },
      { name: "Guru Tegh Bahadur Nagar", interchange: false },
      { name: "Vishwavidyalaya", interchange: false },
      { name: "Vidhan Sabha", interchange: false },
      { name: "Civil Lines", interchange: false },
      { name: "Kashmere Gate", interchange: true },
      { name: "Chandni Chowk", interchange: false },
      { name: "Chawri Bazar", interchange: false },
      { name: "New Delhi", interchange: true },
      { name: "Rajiv Chowk", interchange: true },
      { name: "Patel Chowk", interchange: false },
      { name: "Central Secretariat", interchange: true },
      { name: "Udyog Bhawan", interchange: false },
      { name: "Lok Kalyan Marg", interchange: false },
      { name: "Jor Bagh", interchange: false },
      { name: "Dilli Haat – INA", interchange: true },
      { name: "AIIMS", interchange: false },
      { name: "Green Park", interchange: false },
      { name: "Hauz Khas", interchange: true },
      { name: "Malviya Nagar", interchange: false },
      { name: "Saket", interchange: false },
      { name: "Qutab Minar", interchange: false },
      { name: "Chhatarpur", interchange: false },
      { name: "Sultanpur", interchange: false },
      { name: "Ghitorni", interchange: false },
      { name: "Arjan Garh", interchange: false },
      { name: "Guru Dronacharya", interchange: false },
      { name: "Sikanderpur", interchange: true },
      { name: "MG Road", interchange: false },
      { name: "IFFCO Chowk", interchange: false },
      { name: "Millennium City Centre Gurugram", interchange: false }
    ]
  },

  red: {
    name: "Red Line",
    color: "#E11C2A",
    direction: "Shaheed Sthal → Rithala",
    platform: 1,
    stations: [
      { name: "Shaheed Sthal", interchange: false },
      { name: "Hindon River", interchange: false },
      { name: "Arthala", interchange: false },
      { name: "Mohan Nagar", interchange: false },
      { name: "Shyam Park", interchange: false },
      { name: "Major Mohit Sharma Rajendra Nagar", interchange: false },
      { name: "Raj Bagh", interchange: false },
      { name: "Shaheed Nagar", interchange: false },
      { name: "Dilshad Garden", interchange: false },
      { name: "Jhilmil", interchange: false },
      { name: "Mansarovar Park", interchange: false },
      { name: "Shahdara", interchange: false },
      { name: "Welcome", interchange: true },
      { name: "Seelampur", interchange: false },
      { name: "Shastri Park", interchange: false },
      { name: "Kashmere Gate", interchange: true },
      { name: "Tis Hazari", interchange: false },
      { name: "Pul Bangash", interchange: false },
      { name: "Pratap Nagar", interchange: false },
      { name: "Shastri Nagar", interchange: false },
      { name: "Inderlok", interchange: true },
      { name: "Kanhaiya Nagar", interchange: false },
      { name: "Keshav Puram", interchange: false },
      { name: "Netaji Subhash Place", interchange: true },
      { name: "Kohat Enclave", interchange: false },
      { name: "Madhuban Chowk", interchange: false },
      { name: "Rohini East", interchange: false },
      { name: "Rohini West", interchange: false },
      { name: "Rithala", interchange: false }
    ]
  },

  blueMain: {
    name: "Blue Line (Main)",
    color: "#0057FF",
    direction: "Noida Electronic City → Dwarka Sector 21",
    platform: 1,
    stations: [
      { name: "Noida Electronic City", interchange: false },
      { name: "Noida Sector 62", interchange: false },
      { name: "Noida Sector 59", interchange: false },
      { name: "Noida Sector 61", interchange: false },
      { name: "Noida Sector 52", interchange: true },
      { name: "Noida Sector 34", interchange: false },
      { name: "Noida City Centre", interchange: false },
      { name: "Golf Course", interchange: false },
      { name: "Botanical Garden", interchange: true },
      { name: "Noida Sector 18", interchange: false },
      { name: "Noida Sector 16", interchange: false },
      { name: "Noida Sector 15", interchange: false },
      { name: "New Ashok Nagar", interchange: false },
      { name: "Mayur Vihar Extension", interchange: false },
      { name: "Mayur Vihar-I", interchange: true },
      { name: "Akshardham", interchange: false },
      { name: "Yamuna Bank", interchange: true },
      { name: "Indraprastha", interchange: false },
      { name: "Supreme Court", interchange: false },
      { name: "Mandi House", interchange: true },
      { name: "Barakhamba Road", interchange: false },
      { name: "Rajiv Chowk", interchange: true },
      { name: "Ramakrishna Ashram Marg", interchange: false },
      { name: "Jhandewalan", interchange: false },
      { name: "Karol Bagh", interchange: false },
      { name: "Rajendra Place", interchange: false },
      { name: "Patel Nagar", interchange: false },
      { name: "Shadipur", interchange: false },
      { name: "Kirti Nagar", interchange: true },
      { name: "Moti Nagar", interchange: false },
      { name: "Ramesh Nagar", interchange: false },
      { name: "Rajouri Garden", interchange: true },
      { name: "Tagore Garden", interchange: false },
      { name: "Subhash Nagar", interchange: false },
      { name: "Tilak Nagar", interchange: false },
      { name: "Janakpuri East", interchange: false },
      { name: "Janakpuri West", interchange: true },
      { name: "Uttam Nagar East", interchange: false },
      { name: "Uttam Nagar West", interchange: false },
      { name: "Nawada", interchange: false },
      { name: "Dwarka Mor", interchange: false },
      { name: "Dwarka", interchange: true },
      { name: "Dwarka Sector 14", interchange: false },
      { name: "Dwarka Sector 13", interchange: false },
      { name: "Dwarka Sector 12", interchange: false },
      { name: "Dwarka Sector 11", interchange: false },
      { name: "Dwarka Sector 10", interchange: false },
      { name: "Dwarka Sector 9", interchange: false },
      { name: "Dwarka Sector 8", interchange: false },
      { name: "Dwarka Sector 21", interchange: true }
    ]
  },

  blueBranch: {
    name: "Blue Line (Branch)",
    color: "#0057FF",
    direction: "Yamuna Bank → Vaishali",
    platform: 1,
    stations: [
      { name: "Yamuna Bank", interchange: true },
      { name: "Laxmi Nagar", interchange: false },
      { name: "Nirman Vihar", interchange: false },
      { name: "Preet Vihar", interchange: false },
      { name: "Karkarduma", interchange: true },
      { name: "Anand Vihar", interchange: true },
      { name: "Kaushambi", interchange: false },
      { name: "Vaishali", interchange: false }
    ]
  },

  green: {
    name: "Green Line",
    color: "#2E8B57",
    direction: "Inderlok → Brigadier Hoshiyar Singh",
    platform: 1,
    stations: [
      { name: "Inderlok", interchange: true },
      { name: "Ashok Park Main", interchange: true },
      { name: "Punjabi Bagh East", interchange: false },
      { name: "Satguru Ram Singh Marg", interchange: false },
      { name: "Kirti Nagar", interchange: true },
      { name: "Punjabi Bagh West", interchange: true },
      { name: "Shivaji Park", interchange: false },
      { name: "Madipur", interchange: false },
      { name: "Paschim Vihar East", interchange: false },
      { name: "Paschim Vihar West", interchange: false },
      { name: "Peeragarhi", interchange: true },
      { name: "Udyog Nagar", interchange: false },
      { name: "Maharaja Surajmal Stadium", interchange: false },
      { name: "Nangloi", interchange: false },
      { name: "Nangloi Railway Station", interchange: false },
      { name: "Rajdhani Park", interchange: false },
      { name: "Mundka", interchange: false },
      { name: "Mundka Industrial Area", interchange: false },
      { name: "Ghevra Metro Station", interchange: false },
      { name: "Tikri Kalan", interchange: false },
      { name: "Tikri Border", interchange: false },
      { name: "Pandit Shree Ram Sharma", interchange: false },
      { name: "Bahadurgarh City", interchange: false },
      { name: "Brigadier Hoshiyar Singh", interchange: false }
    ]
  },

  violet: {
    name: "Violet Line",
    color: "#9400D3",
    direction: "Kashmere Gate → Raja Nahar Singh",
    platform: 1,
    stations: [
      { name: "Kashmere Gate", interchange: true },
      { name: "Lal Quila", interchange: false },
      { name: "Jama Masjid", interchange: false },
      { name: "Delhi Gate", interchange: false },
      { name: "ITO", interchange: false },
      { name: "Mandi House", interchange: true },
      { name: "Janpath", interchange: false },
      { name: "Central Secretariat", interchange: true },
      { name: "Khan Market", interchange: false },
      { name: "Jawaharlal Nehru Stadium", interchange: false },
      { name: "Jangpura", interchange: false },
      { name: "Lajpat Nagar", interchange: true },
      { name: "Moolchand", interchange: false },
      { name: "Kailash Colony", interchange: false },
      { name: "Nehru Place", interchange: false },
      { name: "Kalkaji Mandir", interchange: true },
      { name: "Govind Puri", interchange: false },
      { name: "Okhla", interchange: false },
      { name: "Jasola Apollo", interchange: false },
      { name: "Sarita Vihar", interchange: false },
      { name: "Mohan Estate", interchange: false },
      { name: "Tughlakabad", interchange: false },
      { name: "Badarpur Border", interchange: false },
      { name: "Sarai", interchange: false },
      { name: "NHPC Chowk", interchange: false },
      { name: "Mewla Maharajpur", interchange: false },
      { name: "Sector 28", interchange: false },
      { name: "Badkal Mor", interchange: false },
      { name: "Old Faridabad", interchange: false },
      { name: "Neelam Chowk Ajronda", interchange: false },
      { name: "Bata Chowk", interchange: false },
      { name: "Escorts Mujesar", interchange: true },
      { name: "Sant Surdas - Sihi", interchange: false },
      { name: "Raja Nahar Singh", interchange: false }
    ]
  },

  airportExpress: {
    name: "Airport Express",
    color: "#FF8C00",
    direction: "New Delhi → Yashobhoomi Dwarka Sector 25",
    platform: 1,
    stations: [
      { name: "New Delhi", interchange: true },
      { name: "Shivaji Stadium", interchange: true },
      { name: "Dhaula Kuan", interchange: true },
      { name: "Delhi Aerocity", interchange: false },
      { name: "IGI Airport", interchange: true },
      { name: "Dwarka Sector 21", interchange: true },
      { name: "Yashobhoomi Dwarka Sector 25", interchange: false }
    ]
  },

  pink: {
    name: "Pink Line",
    color: "#E91E63",
    direction: "Majlis Park → Maujpur (Circular)",
    platform: 1,
    stations: [
      { name: "Maujpur - Babarpur", interchange: true },
      { name: "Yamuna Vihar", interchange: false },
      { name: "Bhajanpura", interchange: false },
      { name: "Khajuri Khas", interchange: false },
      { name: "Sonia Vihar", interchange: false },
      { name: "Soorghat", interchange: false },
      { name: "Jagatpur Village", interchange: false },
      { name: "Jharoda Majra", interchange: false },
      { name: "Burari", interchange: false },
      { name: "Majlis Park", interchange: true },
      { name: "Azadpur", interchange: true },
      { name: "Shalimar Bagh", interchange: false },
      { name: "Netaji Subhash Place", interchange: true },
      { name: "Shakurpur", interchange: false },
      { name: "Punjabi Bagh West", interchange: true },
      { name: "ESI - Basaidarapur", interchange: false },
      { name: "Rajouri Garden", interchange: true },
      { name: "Mayapuri", interchange: false },
      { name: "Naraina Vihar", interchange: false },
      { name: "Delhi Cantonment", interchange: false },
      { name: "Durgabai Deshmukh South Campus", interchange: true },
      { name: "Sir M. Vishweshwaraiah Moti Bagh", interchange: false },
      { name: "Bhikaji Cama Place", interchange: false },
      { name: "Sarojini Nagar", interchange: false },
      { name: "Dilli Haat - INA", interchange: true },
      { name: "South Extension", interchange: false },
      { name: "Lajpat Nagar", interchange: true },
      { name: "Vinobapuri", interchange: false },
      { name: "Ashram", interchange: false },
      { name: "Sarai Kale Khan Nizamuddin", interchange: true },
      { name: "Mayur Vihar-I", interchange: true },
      { name: "Mayur Vihar Pocket I", interchange: false },
      { name: "Trilokpuri Sanjay Lake", interchange: false },
      { name: "East Vinod Nagar - Mayur Vihar-II", interchange: false },
      { name: "Mandawali - West Vinod Nagar", interchange: false },
      { name: "IP Extension", interchange: false },
      { name: "Anand Vihar", interchange: true },
      { name: "Karkarduma", interchange: true },
      { name: "Karkarduma Court", interchange: false },
      { name: "Krishna Nagar", interchange: false },
      { name: "East Azad Nagar", interchange: false },
      { name: "Welcome", interchange: true },
      { name: "Jaffrabad", interchange: false }
    ]
  },

  magenta: {
    name: "Magenta Line",
    color: "#8E44AD",
    direction: "Janakpuri West → Botanical Garden",
    platform: 1,
    stations: [
      { name: "Janakpuri West", interchange: true },
      { name: "Dabri Mor - Janakpuri South", interchange: false },
      { name: "Dashrath Puri", interchange: false },
      { name: "Palam", interchange: false },
      { name: "Sadar Bazaar Cantonment", interchange: false },
      { name: "Terminal 1-IGI Airport", interchange: false },
      { name: "Shankar Vihar", interchange: false },
      { name: "Vasant Vihar", interchange: false },
      { name: "Munirka", interchange: false },
      { name: "R. K. Puram", interchange: false },
      { name: "IIT", interchange: false },
      { name: "Hauz Khas", interchange: true },
      { name: "Panchsheel Park", interchange: false },
      { name: "Chirag Delhi", interchange: false },
      { name: "Greater Kailash", interchange: false },
      { name: "Nehru Enclave", interchange: false },
      { name: "Kalkaji Mandir", interchange: true },
      { name: "Okhla NSIC", interchange: false },
      { name: "Sukhdev Vihar", interchange: false },
      { name: "Jamia Millia Islamia", interchange: false },
      { name: "Okhla Vihar", interchange: false },
      { name: "Jasola Vihar Shaheen Bagh", interchange: false },
      { name: "Kalindi Kunj", interchange: false },
      { name: "Okhla Bird Sanctuary", interchange: false },
      { name: "Botanical Garden", interchange: true }
    ]
  },

  grey: {
    name: "Grey Line",
    color: "#9E9E9E",
    direction: "Dwarka → Dhansa Bus Stand",
    platform: 1,
    stations: [
      { name: "Dwarka", interchange: true },
      { name: "Nangli", interchange: false },
      { name: "Najafgarh", interchange: false },
      { name: "Dhansa Bus Stand", interchange: false }
    ]
  },

  aqua: {
    name: "Aqua Line",
    color: "#00CED1",
    direction: "Noida Sector 52 → Noida Depot",
    platform: 1,
    stations: [
      { name: "Noida Sector 52", interchange: true },
      { name: "Noida Sector 51", interchange: false },
      { name: "Noida Sector 50", interchange: false },
      { name: "Noida Sector 76", interchange: false },
      { name: "Noida Sector 101", interchange: false },
      { name: "Noida Sector 81", interchange: false },
      { name: "NSEZ", interchange: false },
      { name: "Noida Sector 83", interchange: false },
      { name: "Noida Sector 137", interchange: false },
      { name: "Noida Sector 142", interchange: false },
      { name: "Noida Sector 143", interchange: false },
      { name: "Noida Sector 144", interchange: false },
      { name: "Noida Sector 145", interchange: false },
      { name: "Noida Sector 146", interchange: false },
      { name: "Noida Sector 147", interchange: false },
      { name: "Noida Sector 148", interchange: false },
      { name: "Knowledge Park II", interchange: false },
      { name: "Pari Chowk", interchange: false },
      { name: "Alpha 1", interchange: false },
      { name: "Alpha 2", interchange: false },
      { name: "Delta 1", interchange: false },
      { name: "Noida Depot", interchange: false }
    ]
  }
};

// Get all unique station names for autocomplete
export const getAllStations = (): string[] => {
  const stationSet = new Set<string>();
  Object.values(metroData).forEach((line) => {
    line.stations.forEach((station) => {
      stationSet.add(station.name);
    });
  });
  return Array.from(stationSet).sort();
};

// Get line info for a station
export const getStationLines = (stationName: string): { lineKey: string; lineName: string; color: string }[] => {
  const lines: { lineKey: string; lineName: string; color: string }[] = [];
  Object.entries(metroData).forEach(([lineKey, line]) => {
    const found = line.stations.find((s) => s.name === stationName);
    if (found) {
      lines.push({ lineKey, lineName: line.name, color: line.color });
    }
  });
  return lines;
};
