/**
 * Extended Station Information
 * Contains detailed information about each station including nearby places
 */

export interface StationInfo {
  name: string;
  nearbyPlaces: {
    name: string;
    category: 'landmark' | 'shopping' | 'hospital' | 'office' | 'restaurant' | 'hotel' | 'park' | 'temple' | 'market';
    distance: string; // e.g., "500m", "1km"
  }[];
}

export const stationNearbyPlaces: { [key: string]: StationInfo } = {
  "Rajiv Chowk": {
    name: "Rajiv Chowk",
    nearbyPlaces: [
      { name: "Connaught Place", category: 'landmark', distance: "200m" },
      { name: "Palika Bazaar", category: 'shopping', distance: "100m" },
      { name: "Central Park", category: 'park', distance: "300m" },
      { name: "Janpath Market", category: 'market', distance: "500m" },
      { name: "Regal Cinema", category: 'landmark', distance: "400m" }
    ]
  },
  "Kashmere Gate": {
    name: "Kashmere Gate",
    nearbyPlaces: [
      { name: "Red Fort", category: 'landmark', distance: "1.5km" },
      { name: "ISBT Kashmere Gate", category: 'landmark', distance: "100m" },
      { name: "St. James Church", category: 'temple', distance: "500m" },
      { name: "Kashmere Gate Metro Museum", category: 'landmark', distance: "50m" }
    ]
  },
  "New Delhi": {
    name: "New Delhi",
    nearbyPlaces: [
      { name: "New Delhi Railway Station", category: 'landmark', distance: "100m" },
      { name: "Paharganj", category: 'market', distance: "800m" },
      { name: "Gurdwara Bangla Sahib", category: 'temple', distance: "1.2km" },
      { name: "Connaught Place", category: 'landmark', distance: "1km" }
    ]
  },
  "Hauz Khas": {
    name: "Hauz Khas",
    nearbyPlaces: [
      { name: "Hauz Khas Village", category: 'shopping', distance: "500m" },
      { name: "Deer Park", category: 'park', distance: "600m" },
      { name: "IIT Delhi", category: 'office', distance: "1km" },
      { name: "Hauz Khas Complex", category: 'landmark', distance: "400m" },
      { name: "Social Hauz Khas", category: 'restaurant', distance: "500m" }
    ]
  },
  "Central Secretariat": {
    name: "Central Secretariat",
    nearbyPlaces: [
      { name: "Udyog Bhawan", category: 'office', distance: "200m" },
      { name: "Rail Bhawan", category: 'office', distance: "300m" },
      { name: "India Gate", category: 'landmark', distance: "1.5km" },
      { name: "National Museum", category: 'landmark', distance: "800m" }
    ]
  },
  "Chandni Chowk": {
    name: "Chandni Chowk",
    nearbyPlaces: [
      { name: "Chandni Chowk Market", category: 'market', distance: "200m" },
      { name: "Jama Masjid", category: 'temple', distance: "800m" },
      { name: "Red Fort", category: 'landmark', distance: "1km" },
      { name: "Paranthe Wali Gali", category: 'restaurant', distance: "300m" },
      { name: "Gurudwara Sis Ganj Sahib", category: 'temple', distance: "100m" }
    ]
  },
  "Dwarka Sector 21": {
    name: "Dwarka Sector 21",
    nearbyPlaces: [
      { name: "DLF Mall of India", category: 'shopping', distance: "2km" },
      { name: "Yashobhoomi Convention Center", category: 'office', distance: "1km" },
      { name: "IGI Airport Terminal 3", category: 'landmark', distance: "5km" }
    ]
  },
  "Noida City Centre": {
    name: "Noida City Centre",
    nearbyPlaces: [
      { name: "DLF Mall of India", category: 'shopping', distance: "500m" },
      { name: "Worlds of Wonder", category: 'landmark', distance: "2km" },
      { name: "Great India Place", category: 'shopping', distance: "1.5km" }
    ]
  },
  "Botanical Garden": {
    name: "Botanical Garden",
    nearbyPlaces: [
      { name: "Noida Botanical Garden", category: 'park', distance: "400m" },
      { name: "The Great India Place", category: 'shopping', distance: "800m" },
      { name: "Okhla Bird Sanctuary", category: 'park', distance: "2km" }
    ]
  },
  "Huda City Centre": {
    name: "Huda City Centre",
    nearbyPlaces: [
      { name: "Cyber Hub", category: 'restaurant', distance: "500m" },
      { name: "Kingdom of Dreams", category: 'landmark', distance: "1km" },
      { name: "Ambience Mall", category: 'shopping', distance: "800m" }
    ]
  },
  "Saket": {
    name: "Saket",
    nearbyPlaces: [
      { name: "Select Citywalk Mall", category: 'shopping', distance: "300m" },
      { name: "DLF Place", category: 'shopping', distance: "400m" },
      { name: "Max Hospital", category: 'hospital', distance: "1km" }
    ]
  },
  "Nehru Place": {
    name: "Nehru Place",
    nearbyPlaces: [
      { name: "Nehru Place IT Market", category: 'shopping', distance: "100m" },
      { name: "Lotus Temple", category: 'temple', distance: "2km" },
      { name: "Kalkaji Temple", category: 'temple', distance: "1.5km" }
    ]
  },
  "IGI Airport": {
    name: "IGI Airport",
    nearbyPlaces: [
      { name: "Terminal 3", category: 'landmark', distance: "200m" },
      { name: "Aerocity", category: 'hotel', distance: "1km" },
      { name: "Delhi Aerocity Mall", category: 'shopping', distance: "1.2km" }
    ]
  },
  "Karol Bagh": {
    name: "Karol Bagh",
    nearbyPlaces: [
      { name: "Karol Bagh Market", category: 'shopping', distance: "300m" },
      { name: "Ajmal Khan Road", category: 'market', distance: "400m" },
      { name: "Jessa Ram Hospital", category: 'hospital', distance: "500m" }
    ]
  },
  "Lajpat Nagar": {
    name: "Lajpat Nagar",
    nearbyPlaces: [
      { name: "Lajpat Nagar Central Market", category: 'shopping', distance: "200m" },
      { name: "Khan Market", category: 'shopping', distance: "2km" },
      { name: "Defence Colony", category: 'market', distance: "1.5km" }
    ]
  },
  "Qutab Minar": {
    name: "Qutab Minar",
    nearbyPlaces: [
      { name: "Qutub Minar", category: 'landmark', distance: "800m" },
      { name: "Qutub Minar Complex", category: 'landmark', distance: "1km" },
      { name: "Garden of Five Senses", category: 'park', distance: "2km" }
    ]
  },
  "Anand Vihar": {
    name: "Anand Vihar",
    nearbyPlaces: [
      { name: "Anand Vihar ISBT", category: 'landmark', distance: "200m" },
      { name: "Anand Vihar Railway Station", category: 'landmark', distance: "300m" },
      { name: "Karkardooma Court", category: 'office', distance: "1km" }
    ]
  },
  "Vaishali": {
    name: "Vaishali",
    nearbyPlaces: [
      { name: "Shipra Mall", category: 'shopping', distance: "500m" },
      { name: "Vaishali Market", category: 'shopping', distance: "300m" },
      { name: "Pacific Mall", category: 'shopping', distance: "2km" }
    ]
  }
};

// Fallback nearby places for stations not in the database
const defaultNearbyPlaces = [
  { name: "Local Market", category: 'market' as const, distance: "500m" },
  { name: "Bus Stop", category: 'landmark' as const, distance: "100m" },
  { name: "Residential Area", category: 'landmark' as const, distance: "200m" }
];

/**
 * Get nearby places for a station
 * Returns predefined places if available, otherwise returns default places
 */
export const getNearbyPlaces = (stationName: string): StationInfo['nearbyPlaces'] => {
  const stationInfo = stationNearbyPlaces[stationName];
  
  if (stationInfo) {
    return stationInfo.nearbyPlaces;
  }
  
  return defaultNearbyPlaces;
};

/**
 * Get category icon emoji
 */
export const getCategoryEmoji = (category: StationInfo['nearbyPlaces'][0]['category']): string => {
  const emojiMap = {
    landmark: '🏛️',
    shopping: '🛍️',
    hospital: '🏥',
    office: '🏢',
    restaurant: '🍽️',
    hotel: '🏨',
    park: '🌳',
    temple: '🕌',
    market: '🏪'
  };
  
  return emojiMap[category] || '📍';
};