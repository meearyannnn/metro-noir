import { useState, useRef, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StationAutocompleteProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  stations: string[];
  icon?: React.ReactNode;
}

const StationAutocomplete = ({
  placeholder,
  value,
  onChange,
  stations,
  icon
}: StationAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStations, setFilteredStations] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim()) {
      const lowerQuery = value.toLowerCase();
      const filtered = stations.filter((station) => 
        station.toLowerCase().includes(lowerQuery)
      ).slice(0, 8);
      setFilteredStations(filtered);
    } else {
      setFilteredStations([]);
    }
  }, [value, stations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (station: string) => {
    onChange(station);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon || <MapPin className="w-4 h-4" />}
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="metro-input pl-11 pr-10"
          autoComplete="off"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isOpen && filteredStations.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {filteredStations.map((station, index) => (
              <button
                key={station}
                onClick={() => handleSelect(station)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-3",
                  index !== filteredStations.length - 1 && "border-b border-border/50"
                )}
              >
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium truncate">{station}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && value && filteredStations.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-xl p-4">
          <p className="text-sm text-muted-foreground text-center">
            No stations found
          </p>
        </div>
      )}
    </div>
  );
};

export default StationAutocomplete;
