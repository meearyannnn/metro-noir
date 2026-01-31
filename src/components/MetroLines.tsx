import React, { useState } from 'react';
import { metroData, getStationLines } from '@/data/metroData';
import { MapPin, Info, Navigation } from 'lucide-react';

interface LineInfo {
  key: string;
  name: string;
  code: string;
  stations: number;
  color: string;
  bgColor: string;
  route: string;
  actualColor: string;
}

const metroLines: LineInfo[] = [
  { 
    key: "red", 
    name: "Red Line", 
    code: "Line 1", 
    stations: 29, 
    color: "bg-metro-red", 
    bgColor: "bg-red-50",
    route: "Rithala – Shaheed Sthal",
    actualColor: "#E11C2A"
  },
  { 
    key: "yellow", 
    name: "Yellow Line", 
    code: "Line 2", 
    stations: 37, 
    color: "bg-metro-yellow",
    bgColor: "bg-yellow-50", 
    route: "Samaypur Badli – HUDA City Centre",
    actualColor: "#FFD200"
  },
  { 
    key: "blueMain", 
    name: "Blue Line", 
    code: "Line 3", 
    stations: 50, 
    color: "bg-metro-blue",
    bgColor: "bg-blue-50", 
    route: "Dwarka Sector 21 – Noida Electronic City",
    actualColor: "#0057FF"
  },
  { 
    key: "green", 
    name: "Green Line", 
    code: "Line 5", 
    stations: 21, 
    color: "bg-metro-green",
    bgColor: "bg-green-50", 
    route: "Mundka – Brigadier Hoshiar Singh",
    actualColor: "#2E8B57"
  },
  { 
    key: "violet", 
    name: "Violet Line", 
    code: "Line 6", 
    stations: 34, 
    color: "bg-metro-violet",
    bgColor: "bg-purple-50", 
    route: "Kashmere Gate – Raja Nahar Singh",
    actualColor: "#9C27B0"
  },
  { 
    key: "pink", 
    name: "Pink Line", 
    code: "Line 7", 
    stations: 38, 
    color: "bg-metro-pink",
    bgColor: "bg-pink-50", 
    route: "Majlis Park – Shiv Vihar",
    actualColor: "#E91E63"
  },
  { 
    key: "magenta", 
    name: "Magenta Line", 
    code: "Line 8", 
    stations: 25, 
    color: "bg-metro-magenta",
    bgColor: "bg-purple-50", 
    route: "Janakpuri West – Botanical Garden",
    actualColor: "#8E44AD"
  },
  { 
    key: "airportExpress", 
    name: "Orange Line", 
    code: "Airport", 
    stations: 6, 
    color: "bg-metro-orange",
    bgColor: "bg-orange-50", 
    route: "New Delhi – Dwarka Sector 21",
    actualColor: "#FF8C00"
  },
];

const MetroLinesCompact = () => {
  const [selectedLine, setSelectedLine] = useState<LineInfo>(metroLines[0]);
  const [expandedView, setExpandedView] = useState(false);

  const getLineStations = (lineKey: string) => {
    const lineData = metroData[lineKey];
    return lineData ? lineData.stations : [];
  };

  const getInterchangeLines = (stationName: string) => {
    return getStationLines(stationName);
  };

  const handleLineClick = (line: LineInfo) => {
    setSelectedLine(line);
    setExpandedView(true);
  };

  return (
    <section id="lines" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Network Overview
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Metro Lines
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Line Tabs - Horizontal Scroll on Mobile */}
          <div className="mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-4 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
              {metroLines.map((line) => (
                <button
                  key={line.key}
                  onClick={() => handleLineClick(line)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                    selectedLine.key === line.key
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: line.actualColor }}
                  />
                  <span className="text-sm">{line.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Line Content */}
          {!expandedView ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metroLines.map((line, index) => (
                <div 
                  key={line.code} 
                  className="metro-card group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleLineClick(line)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-4 h-4 rounded-full ${line.color}`} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {line.code}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {line.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {line.route}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Stations</span>
                    <span className="font-display text-lg font-semibold">{line.stations}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Expanded Station View */
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Line Header Card */}
              <div 
                className={`${selectedLine.bgColor} rounded-2xl p-6 mb-6 shadow-lg border-2`}
                style={{ borderColor: selectedLine.actualColor }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center"
                      style={{ backgroundColor: selectedLine.actualColor }}
                    >
                      <div className="w-8 h-8 bg-white rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-bold mb-1">
                        {selectedLine.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedLine.route}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="px-5 py-3 bg-white rounded-xl shadow-md">
                      <div className="text-xs text-muted-foreground mb-1">Stations</div>
                      <div className="text-2xl font-bold">{selectedLine.stations}</div>
                    </div>
                    <div className="px-5 py-3 bg-white rounded-xl shadow-md">
                      <div className="text-xs text-muted-foreground mb-1">Interchanges</div>
                      <div className="text-2xl font-bold">
                        {getLineStations(selectedLine.key).filter(s => s.interchange).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Cards */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  All Stations
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getLineStations(selectedLine.key).map((station, index) => {
                    const interchangeLines = station.interchange ? getInterchangeLines(station.name) : [];
                    
                    return (
                      <div
                        key={index}
                        className={`group p-4 rounded-xl transition-all duration-200 ${
                          station.interchange 
                            ? 'bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg hover:scale-105' 
                            : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-white shadow-sm"
                            style={{ 
                              color: selectedLine.actualColor,
                              borderWidth: '2px',
                              borderColor: selectedLine.actualColor 
                            }}
                          >
                            {index + 1}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                              {station.name}
                            </h5>
                            {station.interchange && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {interchangeLines.map((line, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm"
                                    style={{ backgroundColor: line.color }}
                                  >
                                    <div 
                                      className="w-2 h-2 rounded-full bg-white"
                                    />
                                    <span className="text-[10px]">{line.lineName}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info Footer */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 mb-1">
                        Journey Information
                      </p>
                      <p className="text-muted-foreground">
                        Complete journey: ~{Math.ceil(selectedLine.stations * 2)} minutes • 
                        Fare: ₹{selectedLine.stations <= 2 ? '10' : selectedLine.stations <= 5 ? '20' : selectedLine.stations <= 12 ? '30' : '40-60'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MetroLinesCompact;