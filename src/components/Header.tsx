import { Train, Menu, X, MapPin } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const metroLines = [
    { color: "#DC143C" }, // Red Line
    { color: "#FFFF00" }, // Yellow Line
    { color: "#0000FF" }, // Blue Line
    { color: "#00FF00" }, // Green Line
    { color: "#FFA500" }, // Orange Line
    { color: "#FF1493" }, // Magenta Line
    { color: "#800080" }, // Violet Line
    { color: "#FFB6C1" }, // Pink Line
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6">
        {/* Main Header */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center shadow-sm">
              <Train className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-gray-900">DMRC</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 leading-none">Delhi Metro</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#routes" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Routes
            </a>
            <a href="#stations" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Stations
            </a>
            <a href="#lines" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Metro Lines
            </a>
            <a href="#fare" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Fare Calculator
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>

        {/* Metro Line Dots - Visible on all screens */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 border-t border-gray-100">
          {metroLines.map((line, index) => (
            <div 
              key={index}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm transition-transform hover:scale-125"
              style={{ backgroundColor: line.color }}
              title={`Line ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="px-4 py-3 flex flex-col">
            <a 
              href="#routes" 
              className="flex items-center gap-3 text-sm font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              Routes
            </a>
            <a 
              href="#stations" 
              className="flex items-center gap-3 text-sm font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
              Stations
            </a>
            <a 
              href="#lines" 
              className="flex items-center gap-3 text-sm font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-red-500 rounded-full" />
                <div className="w-1 h-4 bg-blue-500 rounded-full" />
                <div className="w-1 h-4 bg-green-500 rounded-full" />
              </div>
              Metro Lines
            </a>
            <a 
              href="#fare" 
              className="flex items-center gap-3 text-sm font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm">₹</span>
              Fare Calculator
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;