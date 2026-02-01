import { MapPin, Clock, Users, X, Navigation, Wifi, ShoppingBag, Coffee, ParkingCircle, Accessibility } from "lucide-react";
import { useState } from "react";

interface Station {
  name: string;
  lines: string[];
  footfall: string;
  timings: string;
  zone: string;
  facilities: string[];
  nearbyPlaces: string[];
  parkingAvailable: boolean;
}

const stations: Station[] = [
  { 
    name: "Rajiv Chowk", 
    lines: ["Yellow", "Blue"], 
    footfall: "800K", 
    timings: "5:30 AM - 11:30 PM",
    zone: "Central Delhi",
    facilities: ["WiFi", "Parking", "Food Court", "ATM", "Washroom"],
    nearbyPlaces: ["Connaught Place", "Palika Bazaar", "Central Park"],
    parkingAvailable: true
  },
  { 
    name: "Kashmere Gate", 
    lines: ["Red", "Yellow", "Violet"], 
    footfall: "650K", 
    timings: "5:30 AM - 11:30 PM",
    zone: "North Delhi",
    facilities: ["WiFi", "ISBT", "Food Stalls", "ATM"],
    nearbyPlaces: ["Red Fort", "ISBT", "Kashmere Gate"],
    parkingAvailable: true
  },
  { 
    name: "New Delhi", 
    lines: ["Yellow", "Airport"], 
    footfall: "500K", 
    timings: "5:30 AM - 11:30 PM",
    zone: "Central Delhi",
    facilities: ["WiFi", "Railway Station", "Food Court", "Wheelchair Access"],
    nearbyPlaces: ["New Delhi Railway Station", "Paharganj"],
    parkingAvailable: true
  },
  { 
    name: "Hauz Khas", 
    lines: ["Yellow", "Magenta"], 
    footfall: "420K", 
    timings: "5:30 AM - 11:30 PM",
    zone: "South Delhi",
    facilities: ["WiFi", "Cafes", "Shopping", "ATM"],
    nearbyPlaces: ["Hauz Khas Village", "Deer Park", "IIT Delhi"],
    parkingAvailable: false
  },
  { 
    name: "Central Secretariat", 
    lines: ["Yellow", "Violet"], 
    footfall: "380K", 
    timings: "5:30 AM - 11:30 PM",
    zone: "Central Delhi",
    facilities: ["WiFi", "Government Offices", "ATM"],
    nearbyPlaces: ["Udyog Bhawan", "Rail Bhawan", "India Gate"],
    parkingAvailable: true
  },
  { 
    name: "Chandni Chowk", 
    lines: ["Yellow"], 
    footfall: "350K", 
    timings: "5:30 AM - 11:30 PM",
    zone: "Old Delhi",
    facilities: ["WiFi", "Food Street", "Markets", "ATM"],
    nearbyPlaces: ["Chandni Chowk Market", "Jama Masjid", "Red Fort"],
    parkingAvailable: false
  },
];

const getLineColor = (line: string) => {
  const colors: Record<string, string> = {
    Red: "#DC143C",
    Yellow: "#FFD700",
    Blue: "#0066CC",
    Green: "#00A36C",
    Violet: "#8B5CF6",
    Pink: "#FF69B4",
    Magenta: "#E91E63",
    Airport: "#FF8C00",
    Orange: "#FF8C00",
  };
  return colors[line] || "#9CA3AF";
};

const getFacilityIcon = (facility: string) => {
  const iconMap: Record<string, JSX.Element> = {
    "WiFi": <Wifi className="w-4 h-4" />,
    "Parking": <ParkingCircle className="w-4 h-4" />,
    "Food Court": <Coffee className="w-4 h-4" />,
    "Food Stalls": <Coffee className="w-4 h-4" />,
    "Shopping": <ShoppingBag className="w-4 h-4" />,
    "Wheelchair Access": <Accessibility className="w-4 h-4" />,
    "Cafes": <Coffee className="w-4 h-4" />,
  };
  return iconMap[facility] || <MapPin className="w-4 h-4" />;
};

const PopularStations = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  return (
    <section id="stations" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Most Visited
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Popular Stations
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore the busiest metro stations across Delhi's network
          </p>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stations.map((station, index) => (
            <div 
              key={station.name}
              onClick={() => setSelectedStation(station)}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Station Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <MapPin className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-900 transition-colors">
                      {station.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{station.zone}</p>
                  </div>
                </div>
              </div>

              {/* Metro Lines */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {station.lines.map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 border border-gray-200 transition-transform hover:scale-105"
                  >
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getLineColor(line) }}
                    />
                    <span className="text-gray-700">{line} Line</span>
                  </div>
                ))}
              </div>

              {/* Station Info */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    Daily Footfall
                  </span>
                  <span className="font-semibold text-gray-900">{station.footfall}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    Timings
                  </span>
                  <span className="font-semibold text-gray-900 text-xs">{station.timings}</span>
                </div>
              </div>

              {/* Quick Facilities Preview */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Facilities:</span>
                <div className="flex gap-1.5">
                  {station.facilities.slice(0, 3).map((facility) => (
                    <div
                      key={facility}
                      className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600"
                      title={facility}
                    >
                      {getFacilityIcon(facility)}
                    </div>
                  ))}
                  {station.facilities.length > 3 && (
                    <div className="w-6 h-6 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-medium">
                      +{station.facilities.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Click to view more indicator */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900 group-hover:underline">
                  Click for more details →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal/Popup for Station Details */}
      {selectedStation && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setSelectedStation(null)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 animate-in zoom-in-95 duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto border border-gray-200">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStation.name}</h2>
                      <p className="text-gray-600 text-sm mt-1">{selectedStation.zone}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStation(null)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Metro Lines in Modal */}
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedStation.lines.map((line) => (
                    <div
                      key={line}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700"
                    >
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getLineColor(line) }}
                      />
                      <span>{line} Line</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="text-sm text-gray-600">Daily Footfall</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedStation.footfall}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="text-sm text-gray-600">Operating</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{selectedStation.timings}</p>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Available Facilities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedStation.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700">
                          {getFacilityIcon(facility)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Places */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Nearby Places
                  </h3>
                  <div className="space-y-2">
                    {selectedStation.nearbyPlaces.map((place, index) => (
                      <div
                        key={place}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{place}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parking Status */}
                <div className={`p-4 rounded-2xl border-2 ${selectedStation.parkingAvailable ? 'bg-gray-50 border-gray-300' : 'bg-gray-100 border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedStation.parkingAvailable ? 'bg-gray-900' : 'bg-gray-400'}`}>
                      <ParkingCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Parking</h4>
                      <p className="text-sm text-gray-600">
                        {selectedStation.parkingAvailable ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default PopularStations;