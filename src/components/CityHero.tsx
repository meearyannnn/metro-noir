import { ArrowRight, ArrowLeftRight, MapPin, Clock, Zap, Shield, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CityConfig } from "@/data/types/metro";
import { createCityRouteFinder, CityRouteResult } from "@/lib/cityRouteFinder";
import StationAutocomplete from "./StationAutocomplete";
import CityRouteDisplay from "./CityRouteDisplay";

interface CityHeroProps {
  config: CityConfig;
}

const CityHero = ({ config }: CityHeroProps) => {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [route, setRoute] = useState<CityRouteResult | null>(null);
  const [error, setError] = useState("");

  const routeFinder = useMemo(
    () => createCityRouteFinder(config.metroSystem, config.lineColors),
    [config]
  );

  const allStations = useMemo(() => routeFinder.getAllStations(), [routeFinder]);
  const interchangeStations = useMemo(() => routeFinder.getInterchangeStations(), [routeFinder]);

  const metroLines = useMemo(() => {
    return config.metroSystem.lines.map(line => ({
      name: line.lineName,
      color: config.lineColors[line.lineName] || "#666666"
    }));
  }, [config]);

  // Indian language text mapping
  const cityLanguageText: Record<string, { 
    metro: string; 
    journey: string;
    font: string;
  }> = {
    Delhi: { 
      metro: "मेट्रो", 
      journey: "अपनी यात्रा की योजना बनाएं",
      font: "font-noto-devanagari"
    },
    Kolkata: { 
      metro: "মেট্রো", 
      journey: "আপনার যাত্রার পরিকল্পনা করুন",
      font: "font-noto-bengali"
    },
    Mumbai: { 
      metro: "मेट्रो", 
      journey: "तुमच्या प्रवासाची योजना करा",
      font: "font-noto-devanagari"
    },
    Bangalore: { 
      metro: "ಮೆಟ್ರೊ", 
      journey: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಯೋಜಿಸಿ",
      font: "font-noto-kannada"
    },
    Chennai: { 
      metro: "மெட்ரோ", 
      journey: "உங்கள் பயணத்தைத் திட்டமிடுங்கள்",
      font: "font-noto-tamil"
    }
  };

  const currentCityText = cityLanguageText[config.city] || { 
    metro: "Metro", 
    journey: "Plan your journey",
    font: ""
  };

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    setRoute(null);
    setError("");
  };

  const handleFindRoute = () => {
    setError("");
    setRoute(null);

    if (!fromStation.trim() || !toStation.trim()) {
      setError("Please select both stations");
      return;
    }

    if (!allStations.includes(fromStation)) {
      setError("Please select a valid source station");
      return;
    }

    if (!allStations.includes(toStation)) {
      setError("Please select a valid destination station");
      return;
    }

    if (fromStation === toStation) {
      setError("Source and destination cannot be the same");
      return;
    }

    const result = routeFinder.findRoute(fromStation, toStation);
    
    if (result) {
      setRoute(result);
    } else {
      setError("No route found between these stations");
    }
  };

  const handleClearRoute = () => {
    setRoute(null);
    setFromStation("");
    setToStation("");
    setError("");
  };

  const totalStations = allStations.length;
  const totalLines = config.metroSystem.lines.length;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Subtle Background Pattern with Indian Motif */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            #000 50px,
            #000 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            #000 50px,
            #000 51px
          )`
        }} />
      </div>

      {/* Decorative Indian Pattern - Top Corners */}
      <div className="absolute top-20 left-4 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FF9933" strokeWidth="2"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#138808" strokeWidth="2"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="#000080" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute top-20 right-4 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FF9933" strokeWidth="2"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#138808" strokeWidth="2"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="#000080" strokeWidth="2"/>
        </svg>
      </div>

      {/* Floating Metro Line Dots - Top Right */}
      <div className="absolute top-24 right-8 hidden lg:flex flex-col gap-3">
        {metroLines.map((line, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full shadow-lg transition-transform hover:scale-150 cursor-pointer"
            style={{ backgroundColor: line.color }}
            title={line.name}
          />
        ))}
      </div>

      {/* Floating Metro Line Dots - Top Left */}
      <div className="absolute top-24 left-8 hidden lg:flex flex-col gap-3">
        {[...metroLines].reverse().map((line, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full shadow-lg transition-transform hover:scale-150 cursor-pointer"
            style={{ backgroundColor: line.color }}
            title={line.name}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cities</span>
          </button>

          {/* Metro Lines Badge - Horizontal */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
            {metroLines.map((line, index) => (
              <div
                key={index}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shadow-md transition-all hover:scale-150 cursor-pointer"
                style={{ backgroundColor: line.color }}
                title={line.name}
              />
            ))}
          </div>

          {/* Title with Indian Language */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 animate-slide-up text-gray-900">
            {config.city}
            <span className={`block mt-2 text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent ${currentCityText.font}`}>
              {currentCityText.metro}
            </span>
          </h1>

          {/* Subtitle with Bilingual Text */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-3 animate-slide-up px-4" style={{ animationDelay: "0.1s" }}>
            {config.tagline}. Plan your journey across {config.city}'s metro network.
          </p>
          <p className={`text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-12 animate-slide-up px-4 ${currentCityText.font}`} style={{ animationDelay: "0.15s" }}>
            {currentCityText.journey}
          </p>

          {/* Quick Features */}
          <div className="flex items-center justify-center gap-6 mb-10 flex-wrap px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <span>Fastest Routes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center shadow-sm">
                <Clock className="w-4 h-4 text-green-700" />
              </div>
              <span>Least Interchanges</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-sm">
                <Shield className="w-4 h-4 text-blue-700" />
              </div>
              <span>{interchangeStations.length} Interchanges</span>
            </div>
          </div>

          {/* Route Planner Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 max-w-3xl mx-auto animate-slide-up relative overflow-hidden" style={{ animationDelay: "0.2s" }}>
            {/* Decorative Border Pattern */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
            
            {/* Metro Lines Indicator Inside Card */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {metroLines.map((line, index) => (
                <div
                  key={index}
                  className="flex-1 h-1.5 rounded-full transition-all hover:h-2 cursor-pointer shadow-sm"
                  style={{ backgroundColor: line.color }}
                  title={line.name}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
              {/* From Station */}
              <div className="relative">
                <StationAutocomplete
                  placeholder="From Station"
                  value={fromStation}
                  onChange={(val) => {
                    setFromStation(val);
                    setRoute(null);
                    setError("");
                  }}
                  stations={allStations}
                  icon={<MapPin className="w-4 h-4 text-gray-400" />}
                />
              </div>

              {/* Swap Button */}
              <button 
                onClick={handleSwap}
                className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 rounded-full hover:from-orange-100 hover:to-green-100 transition-all hover:rotate-180 duration-300 mx-auto shadow-sm"
                title="Swap stations"
              >
                <ArrowLeftRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* To Station */}
              <div className="relative">
                <StationAutocomplete
                  placeholder="To Station"
                  value={toStation}
                  onChange={(val) => {
                    setToStation(val);
                    setRoute(null);
                    setError("");
                  }}
                  stations={allStations}
                  icon={<MapPin className="w-4 h-4 text-gray-400" />}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Find Route Button with Indian Flag Colors */}
            <button 
              onClick={handleFindRoute}
              className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-orange-500 via-gray-900 to-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-2xl transition-all shadow-lg group relative overflow-hidden"
            >
              <span className="relative z-10">Find Route</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>

          {/* Route Display */}
          {route && (
            <div className="max-w-3xl mx-auto text-left mt-8">
              <CityRouteDisplay 
                route={route} 
                onClose={handleClearRoute}
                lineColors={config.lineColors}
              />
            </div>
          )}

          {/* Stats with Indian Aesthetic */}
          {!route && (
            <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto mt-16 px-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-3 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="font-bold text-2xl sm:text-3xl text-white">{totalLines}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Metro Lines</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-gray-300 hover:shadow-xl transition-shadow">
                  <p className="font-bold text-2xl sm:text-3xl text-gray-800">{totalStations}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Stations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mx-auto mb-3 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="font-bold text-2xl sm:text-3xl text-white">{interchangeStations.length}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Interchanges</p>
              </div>
            </div>
          )}

          {/* Bottom Metro Line Wave with Indian Colors */}
          <div className="mt-16 flex items-center justify-center gap-1">
            {metroLines.concat(metroLines).map((line, index) => (
              <div
                key={index}
                className="w-1 rounded-full transition-all hover:h-8 cursor-pointer shadow-sm"
                style={{ 
                  backgroundColor: line.color,
                  height: `${Math.sin(index * 0.5) * 8 + 16}px`
                }}
              />
            ))}
          </div>

          {/* Indian Flag Colors Accent Line */}
          <div className="mt-8 h-1 max-w-md mx-auto rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
        </div>
      </div>
    </section>
  );
};

export default CityHero;