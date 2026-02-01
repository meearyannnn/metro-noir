import { ArrowRight, MapPin, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCities } from "@/data/cityConfigs";

const CitySelector = () => {
  const navigate = useNavigate();
  const cities = getAllCities();

  const cityImages: Record<string, string> = {
    Delhi: "🏛️",
    Kolkata: "🌉",
    Mumbai: "🌊",
    Bangalore: "🌳",
    Chennai: "🏖️"
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
                {/* City Icon */}
                <div className="text-5xl mb-4">
                  {cityImages[city.city] || "🚇"}
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
