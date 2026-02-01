import { kolkataMetro, kolkataLineColors } from "@/data/kolkataMetro";
import { mumbaiMetro, mumbaiLineColors } from "@/data/mumbaiMetro";
import { bangaloreMetro, bangaloreLineColors } from "@/data/bangaloreMetro";
import { chennaiMetro, chennaiLineColors } from "@/data/chennaiMetro";
import { CityConfig } from "@/data/types/metro";

export const cityConfigs: Record<string, CityConfig> = {
  kolkata: {
    city: "Kolkata",
    slug: "kolkata",
    tagline: "City of Joy's Metro Network",
    metroSystem: kolkataMetro,
    lineColors: kolkataLineColors
  },
  mumbai: {
    city: "Mumbai",
    slug: "mumbai",
    tagline: "Mumbai's Rapid Transit System",
    metroSystem: mumbaiMetro,
    lineColors: mumbaiLineColors
  },
  bangalore: {
    city: "Bangalore",
    slug: "bangalore",
    tagline: "Namma Metro - Our Metro",
    metroSystem: bangaloreMetro,
    lineColors: bangaloreLineColors
  },
  chennai: {
    city: "Chennai",
    slug: "chennai",
    tagline: "Chennai Metro Rail",
    metroSystem: chennaiMetro,
    lineColors: chennaiLineColors
  }
};

export const getCityConfig = (slug: string): CityConfig | undefined => {
  return cityConfigs[slug.toLowerCase()];
};

export const getAllCities = (): CityConfig[] => {
  return Object.values(cityConfigs);
};
