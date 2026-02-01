import { X, Clock, MapPin, ArrowRight, IndianRupee } from "lucide-react";
import { CityRouteResult } from "@/lib/cityRouteFinder";

interface CityRouteDisplayProps {
  route: CityRouteResult;
  onClose: () => void;
  lineColors: Record<string, string>;
}

const CityRouteDisplay = ({ route, onClose, lineColors }: CityRouteDisplayProps) => {
  const getLineColor = (lineName: string): string => {
    return lineColors[lineName] || "#666666";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Route</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{route.estimatedTime} mins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{route.totalStations} stations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4" />
                <span>₹{route.fare}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Interchange Badge */}
        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
            {route.interchanges === 0 
              ? "Direct Route" 
              : `${route.interchanges} Interchange${route.interchanges > 1 ? 's' : ''}`
            }
          </span>
        </div>
      </div>

      {/* Route Timeline */}
      <div className="p-6">
        {route.segments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="relative">
            {/* Line Header */}
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: getLineColor(segment.line) }}
              />
              <div>
                <span className="font-semibold text-gray-900">{segment.line}</span>
                <span className="text-sm text-gray-500 ml-2">{segment.direction}</span>
              </div>
            </div>

            {/* Stations */}
            <div className="ml-2 pl-6 border-l-4 space-y-3 pb-4" style={{ borderColor: getLineColor(segment.line) }}>
              {segment.stations.map((station, stationIndex) => {
                const isFirst = stationIndex === 0;
                const isLast = stationIndex === segment.stations.length - 1;
                const isTerminal = isFirst || isLast;

                return (
                  <div key={stationIndex} className="relative flex items-center gap-3">
                    {/* Station Dot */}
                    <div 
                      className={`absolute -left-[1.65rem] w-3 h-3 rounded-full border-2 ${
                        isTerminal ? 'bg-white' : 'bg-gray-100'
                      }`}
                      style={{ 
                        borderColor: getLineColor(segment.line),
                        backgroundColor: isTerminal ? 'white' : undefined
                      }}
                    />
                    
                    {/* Station Name */}
                    <span className={`${isTerminal ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      {station}
                    </span>
                    
                    {/* First/Last Labels */}
                    {isFirst && segmentIndex === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Start
                      </span>
                    )}
                    {isLast && segmentIndex === route.segments.length - 1 && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        End
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interchange Indicator */}
            {segmentIndex < route.segments.length - 1 && (
              <div className="ml-2 pl-6 pb-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700 font-medium">
                    Change to {route.segments[segmentIndex + 1].line}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityRouteDisplay;
