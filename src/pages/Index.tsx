import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CitySelector from "@/components/CitySelector";
import MetroLines from "@/components/MetroLines";
import PopularStations from "@/components/PopularStations";
import FareCalculator from "@/components/FareCalculator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CitySelector />
        <MetroLines />
        <PopularStations />
        <FareCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
