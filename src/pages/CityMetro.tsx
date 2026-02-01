import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import CityHero from "@/components/CityHero";
import Footer from "@/components/Footer";
import { getCityConfig } from "@/data/cityConfigs";

const CityMetro = () => {
  const { city } = useParams<{ city: string }>();
  
  const config = city ? getCityConfig(city) : undefined;

  if (!config) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CityHero config={config} />
      </main>
      <Footer />
    </div>
  );
};

export default CityMetro;
