import { RouteResult } from "@/lib/routeFinder";
import { Clock, ArrowRight, MapPin, Repeat, IndianRupee, Navigation, Ticket, Map as MapIcon } from "lucide-react";
import { getStationLines } from "@/data/metroData";
import { getNearbyPlaces, getCategoryEmoji } from "@/data/stationInfo";

interface RouteDisplayProps {
  route: RouteResult;
  onClose: () => void;
}

const RouteDisplay = ({ route, onClose }: RouteDisplayProps) => {
  const sourceStation = route.segments[0]?.stations[0];
  const destinationStation = route.segments[route.segments.length - 1]?.stations[
    route.segments[route.segments.length - 1].stations.length - 1
  ];

  const sourceNearbyPlaces = sourceStation ? getNearbyPlaces(sourceStation) : [];
  const destinationNearbyPlaces = destinationStation ? getNearbyPlaces(destinationStation) : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mt-6 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Your Journey</h3>
          </div>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1.5 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
          >
            Clear
          </button>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-600">Time</span>
            </div>
            <p className="font-bold text-lg text-gray-900">{route.estimatedTime} <span className="text-xs font-normal text-gray-600">min</span></p>
          </div>
          
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-600">Stations</span>
            </div>
            <p className="font-bold text-lg text-gray-900">{route.totalStations}</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Repeat className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-600">Changes</span>
            </div>
            <p className="font-bold text-lg text-gray-900">{route.interchanges}</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs text-gray-600">Fare</span>
            </div>
            <p className="font-bold text-lg text-gray-900">₹{route.fare}</p>
          </div>
        </div>
      </div>

      {/* Route Timeline */}
      <div className="p-4 md:p-6 space-y-6 border-b border-gray-200">
        {route.segments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="relative">
            {/* Interchange Notification */}
            {segmentIndex > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Repeat className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Change Line</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">Transfer to</span>
                      <span 
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-white shadow-sm"
                        style={{ backgroundColor: segment.lineColor }}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        {segment.lineName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Line Header Card */}
            <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: segment.lineColor }}
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{segment.lineName}</h4>
                {segment.direction && (
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                    <ArrowRight className="w-3 h-3" />
                    {segment.direction}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Duration</p>
                <p className="text-sm font-semibold text-gray-900">
                  {(segment.stations.length - 1) * 2} min
                </p>
              </div>
            </div>

            {/* Stations Timeline */}
            <div className="relative ml-5 pl-6">
              {/* Vertical Line */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: `${segment.lineColor}40` }}
              />
              
              {segment.stations.map((station, stationIndex) => {
                const isFirst = stationIndex === 0;
                const isLast = stationIndex === segment.stations.length - 1;
                const stationLines = getStationLines(station);
                const isInterchangeStation = stationLines.length > 1;

                return (
                  <div
                    key={`${segmentIndex}-${stationIndex}`}
                    className={`relative pb-4 ${isLast ? 'pb-0' : ''}`}
                  >
                    {/* Station Dot */}
                    <div 
                      className={`absolute -left-[13px] top-2 rounded-full border-4 border-white shadow-md ${
                        isFirst || isLast ? 'w-5 h-5' : 'w-3 h-3'
                      }`}
                      style={{ 
                        backgroundColor: segment.lineColor,
                        zIndex: 10
                      }}
                    />
                    
                    {/* Station Info Card */}
                    <div className={`
                      pl-2 pt-1 pb-3
                      ${(isFirst || isLast) ? 'transform hover:translate-x-1 transition-transform' : ''}
                    `}>
                      <div className={`
                        flex items-center gap-2 flex-wrap
                        ${(isFirst || isLast) ? 'font-semibold text-gray-900' : 'text-gray-600 text-sm'}
                      `}>
                        <span>{station}</span>
                        
                        {/* Interchange Badges - Mobile Friendly */}
                        {isInterchangeStation && (isFirst || isLast) && (
                          <div className="flex gap-1 flex-wrap">
                            {stationLines
                              .filter(l => l.lineKey !== segment.line)
                              .map(line => (
                                <div
                                  key={line.lineKey}
                                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white shadow-sm"
                                  style={{ backgroundColor: line.color }}
                                  title={line.lineName}
                                >
                                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                  <span className="text-[9px] font-medium hidden sm:inline">
                                    {line.lineName.split(' ')[0]}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      
                      {/* First/Last Station Labels */}
                      {isFirst && segmentIndex === 0 && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">
                          Board here
                        </span>
                      )}
                      {isLast && segmentIndex === route.segments.length - 1 && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded-full">
                          Destination
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Nearby Places - Source & Destination */}
      <div className="p-4 md:p-6 space-y-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <MapIcon className="w-4 h-4 text-gray-700" />
          <h4 className="font-semibold text-gray-900">Nearby Places</h4>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Source Station Nearby Places */}
          {sourceStation && sourceNearbyPlaces.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xs">🚀</span>
                </div>
                <h5 className="font-semibold text-sm text-gray-900">Near {sourceStation}</h5>
              </div>
              <div className="space-y-2">
                {sourceNearbyPlaces.slice(0, 3).map((place, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="text-sm">{getCategoryEmoji(place.category)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{place.name}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destination Station Nearby Places */}
          {destinationStation && destinationNearbyPlaces.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-xs">🎯</span>
                </div>
                <h5 className="font-semibold text-sm text-gray-900">Near {destinationStation}</h5>
              </div>
              <div className="space-y-2">
                {destinationNearbyPlaces.slice(0, 3).map((place, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="text-sm">{getCategoryEmoji(place.category)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{place.name}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Smart Card Info */}
      <div className="p-4 md:p-6 border-t border-gray-200 space-y-3 bg-gray-50">
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-900">Smart Card Fare</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">₹{Math.round(route.fare * 0.9)}</p>
            <p className="text-xs text-gray-600">Save 10%</p>
          </div>
        </div>
        
        <p className="text-xs text-center text-gray-600 px-2">
          💡 Journey time is approximate and may vary based on train frequency and platform transfer time
        </p>
      </div>
    </div>
  );
};

export default RouteDisplay;