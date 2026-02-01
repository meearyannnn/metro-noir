import React, { useState, useEffect } from "react";
import { Calculator, CreditCard, Smartphone, MapPin, Clock, ArrowRight } from "lucide-react";
import { findRoute, searchStations, RouteResult } from "@/lib/routeFinder";
import { getAllStations } from "@/data/metroData";

const FareCalculator = () => {
  const [allStations] = useState<string[]>(getAllStations());
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  // Handle source input change
  const handleSourceChange = (value: string) => {
    setSource(value);
    if (value.trim()) {
      const suggestions = searchStations(value, allStations);
      setSourceSuggestions(suggestions);
      setShowSourceDropdown(true);
    } else {
      setSourceSuggestions([]);
      setShowSourceDropdown(false);
    }
  };

  // Handle destination input change
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    if (value.trim()) {
      const suggestions = searchStations(value, allStations);
      setDestinationSuggestions(suggestions);
      setShowDestinationDropdown(true);
    } else {
      setDestinationSuggestions([]);
      setShowDestinationDropdown(false);
    }
  };

  // Calculate fare
  const handleCalculate = () => {
    if (!source || !destination) {
      alert("Please select both source and destination stations");
      return;
    }

    if (source === destination) {
      alert("Source and destination cannot be the same");
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const result = findRoute(source, destination);
      setRouteResult(result);
      setIsCalculating(false);
    }, 500);
  };

  // Calculate distance (approximate)
  const calculateDistance = (stations: number): string => {
    const avgDistancePerStation = 1.2; // km
    return (stations * avgDistancePerStation).toFixed(1);
  };

  // Calculate smart card discount
  const calculateSmartCardFare = (fare: number): number => {
    return Math.round(fare * 0.9); // 10% discount
  };

  return (
    <section id="fare" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <p className="text-sm font-medium opacity-70 uppercase tracking-wider mb-3">
                Plan Your Budget
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Fare Calculator
              </h2>
              <p className="text-lg opacity-80 mb-8">
                Calculate your journey fare instantly. Know the exact cost before you travel 
                with our smart fare estimation system.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Instant Calculation</p>
                    <p className="text-sm opacity-70">Get fare estimates in seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Multiple Payment Options</p>
                    <p className="text-sm opacity-70">Smart cards, UPI, and tokens</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">QR Ticketing</p>
                    <p className="text-sm opacity-70">Scan and travel contactless</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Fare Calculator Card */}
            <div className="bg-primary-foreground text-primary rounded-2xl p-8 shadow-2xl">
              {/* Input Section */}
              <div className="space-y-4 mb-6">
                {/* Source Station */}
                <div className="relative">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={source}
                      onChange={(e) => handleSourceChange(e.target.value)}
                      onFocus={() => source && setShowSourceDropdown(true)}
                      onBlur={() => setTimeout(() => setShowSourceDropdown(false), 200)}
                      placeholder="Enter source station"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-gray-900"
                    />
                  </div>
                  
                  {/* Source Suggestions Dropdown */}
                  {showSourceDropdown && sourceSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {sourceSuggestions.map((station, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSource(station);
                            setShowSourceDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm border-b border-gray-100 last:border-b-0"
                        >
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Swap Icon */}
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      const temp = source;
                      setSource(destination);
                      setDestination(temp);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </button>
                </div>

                {/* Destination Station */}
                <div className="relative">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => handleDestinationChange(e.target.value)}
                      onFocus={() => destination && setShowDestinationDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDestinationDropdown(false), 200)}
                      placeholder="Enter destination station"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-gray-900"
                    />
                  </div>
                  
                  {/* Destination Suggestions Dropdown */}
                  {showDestinationDropdown && destinationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {destinationSuggestions.map((station, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDestination(station);
                            setShowDestinationDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-900 text-sm border-b border-gray-100 last:border-b-0"
                        >
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={isCalculating}
                className="metro-btn w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? "Calculating..." : "Calculate Fare"}
              </button>

              {/* Results Section */}
              {routeResult ? (
                <>
                  <div className="text-center mb-8">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Your Fare</p>
                    <p className="font-display text-5xl font-bold">₹{routeResult.fare}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {source} → {destination}
                    </p>
                  </div>

                  <div className="elegant-divider mb-8" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Distance</span>
                      <span className="font-medium">
                        ~{calculateDistance(routeResult.totalStations)} km
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Stations</span>
                      <span className="font-medium">{routeResult.totalStations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Estimated Time</span>
                      <span className="font-medium">{routeResult.estimatedTime} mins</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Interchanges</span>
                      <span className="font-medium">{routeResult.interchanges}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-muted-foreground">Smart Card Fare</span>
                      <span className="font-medium text-green-600">
                        ₹{calculateSmartCardFare(routeResult.fare)} (10% off)
                      </span>
                    </div>
                  </div>

                  {/* Route Details */}
                  {routeResult.segments.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Route Details
                      </h4>
                      <div className="space-y-3">
                        {routeResult.segments.map((segment, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div 
                              className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                              style={{ backgroundColor: segment.lineColor }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{segment.lineName}</p>
                              <p className="text-xs text-muted-foreground">
                                {segment.direction}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {segment.stations.length} stations
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Default Sample Fare */
                <>
                  <div className="text-center mb-8">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Sample Fare</p>
                    <p className="font-display text-5xl font-bold">₹30</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Rajiv Chowk → Hauz Khas
                    </p>
                  </div>

                  <div className="elegant-divider mb-8" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Distance</span>
                      <span className="font-medium">~7.2 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Estimated Time</span>
                      <span className="font-medium">18 mins</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Interchanges</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Smart Card Fare</span>
                      <span className="font-medium text-green-600">₹27 (10% off)</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FareCalculator;