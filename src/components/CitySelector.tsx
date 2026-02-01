import { ArrowRight, MapPin, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCities } from "@/data/cityConfigs";

const CitySelector = () => {
  const navigate = useNavigate();
  const cities = getAllCities();

  const cityLogos: Record<string, JSX.Element> = {
    Delhi: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#FF6B6B" opacity="0.1"/>
        <path d="M40 50 L60 30 L80 50 L80 80 L40 80 Z" fill="#FF6B6B"/>
        <rect x="50" y="60" width="20" height="20" fill="#DC143C"/>
        <circle cx="60" cy="40" r="8" fill="#FFD700"/>
      </svg>
    ),
    Kolkata: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#4ECDC4" opacity="0.1"/>
        <rect x="30" y="35" width="60" height="50" rx="4" fill="#4ECDC4"/>
        <rect x="35" y="40" width="15" height="20" fill="#2C3E50"/>
        <rect x="55" y="40" width="15" height="20" fill="#2C3E50"/>
        <rect x="75" y="40" width="10" height="20" fill="#2C3E50"/>
        <rect x="40" y="70" width="40" height="3" fill="#FFD700"/>
      </svg>
    ),
    Mumbai: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#5DADE2" opacity="0.1"/>
        <path d="M30 80 Q30 50 40 40 L50 40 L50 80 Z" fill="#5DADE2"/>
        <path d="M50 80 L50 35 L70 35 L70 80 Z" fill="#3498DB"/>
        <path d="M70 80 L70 45 L80 45 Q90 50 90 80 Z" fill="#5DADE2"/>
        <line x1="30" y1="80" x2="90" y2="80" stroke="#2C3E50" strokeWidth="2"/>
        <circle cx="60" cy="30" r="5" fill="#FFD700"/>
      </svg>
    ),
    Bangalore: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#52C41A" opacity="0.1"/>
        <circle cx="45" cy="50" r="15" fill="#52C41A" opacity="0.6"/>
        <circle cx="70" cy="45" r="18" fill="#52C41A" opacity="0.7"/>
        <circle cx="60" cy="65" r="20" fill="#52C41A"/>
        <rect x="58" y="75" width="4" height="15" fill="#8B4513"/>
        <path d="M50 35 Q60 25 70 35" stroke="#52C41A" strokeWidth="3" fill="none"/>
      </svg>
    ),
    Chennai: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <circle cx="60" cy="60" r="55" fill="#FFA726" opacity="0.1"/>
        <ellipse cx="60" cy="75" rx="35" ry="8" fill="#5DADE2" opacity="0.3"/>
        <path d="M40 75 L45 55 L50 75 Z" fill="#FFA726"/>
        <path d="M52 75 L57 50 L62 75 Z" fill="#FF9800"/>
        <path d="M64 75 L69 55 L74 75 Z" fill="#FFA726"/>
        <circle cx="60" cy="35" r="12" fill="#FFD700"/>
        <path d="M25 75 Q60 70 95 75" stroke="#5DADE2" strokeWidth="2" fill="none"/>
      </svg>
    )
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
            <Train className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Choose Your City</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Metro Systems
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through India's major metro networks. Select a city to plan your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cities.map((city) => {
            const lineColors = Object.values(city.lineColors);
            const totalStations = city.metroSystem.lines.reduce(
              (acc, line) => acc + line.stations.length, 0
            );

            return (
              <button
                key={city.slug}
                onClick={() => navigate(`/metro/${city.slug}`)}
                className="group bg-white border border-gray-200 rounded-2xl p-6 text-left hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
              >
                {/* City Logo */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {cityLogos[city.city] || (
                    <svg viewBox="0 0 120 120" className="w-16 h-16">
                      <circle cx="60" cy="60" r="55" fill="#718096" opacity="0.1"/>
                      <circle cx="60" cy="60" r="30" fill="#718096"/>
                    </svg>
                  )}
                </div>

                {/* Metro Lines Indicator */}
                <div className="flex items-center gap-1 mb-4">
                  {lineColors.slice(0, 6).map((color, index) => (
                    <div
                      key={index}
                      className="h-1.5 flex-1 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* City Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {city.city}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {city.tagline}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>{city.metroSystem.lines.length} Lines</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{totalStations} Stations</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-gray-900 font-medium group-hover:gap-3 transition-all">
                  <span>Plan Route</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CitySelector;