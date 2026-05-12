import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbBar } from "@/components/shared/BreadcrumbBar";
import { CityServiceHero } from "@/components/city-service/CityServiceHero";
import { CityServiceWhyChoose } from "@/components/city-service/CityServiceWhyChoose";
import { CityServiceComparison } from "@/components/city-service/CityServiceComparison";
import { CityServiceTreatments } from "@/components/city-service/CityServiceTreatments";
import { CityServiceProcess } from "@/components/city-service/CityServiceProcess";
import { CityServiceResults } from "@/components/city-service/CityServiceResults";
import { CityServiceTestimonials } from "@/components/city-service/CityServiceTestimonials";
import { CityServiceFAQ } from "@/components/city-service/CityServiceFAQ";
import { CityServiceSEO } from "@/components/city-service/CityServiceSEO";
import { LocationNAP } from "@/components/locations/LocationNAP";
import { LocationCTA } from "@/components/locations/LocationCTA";
import { LocationOtherCenters } from "@/components/locations/LocationOtherCenters";
import { LocationStickyMobileCTA } from "@/components/locations/LocationStickyMobileCTA";
import { LocationMidCTA } from "@/components/locations/LocationMidCTA";
import { newportNewsLocation } from "@/data/locations";
import { trtServiceConfig } from "@/data/city-services";

const NewportNewsTRT = () => {
  const location = newportNewsLocation;
  const service = trtServiceConfig;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header />
      <CityServiceSEO location={location} service={service} />
      <main>
        <CityServiceHero location={location} service={service} />
        <BreadcrumbBar
          items={[
            { label: "Home", to: "/" },
            { label: "Locations", to: "/locations" },
            { label: `${location.city}, ${location.state}`, to: `/locations/${location.slug}` },
            { label: service.serviceName },
          ]}
        />
        <CityServiceProcess location={location} service={service} />
        <CityServiceWhyChoose city={location.city} service={service} />
        <CityServiceTestimonials location={location} service={service} />
        <LocationMidCTA />
        <CityServiceTreatments service={service} />
        <CityServiceComparison service={service} />
        <CityServiceResults service={service} />
        <CityServiceFAQ location={location} service={service} />
        <LocationMidCTA />
        <LocationNAP location={location} />
        <LocationOtherCenters currentSlug={location.slug} />
        <LocationCTA location={location} />
      </main>
      <Footer />
      <LocationStickyMobileCTA location={location} />
    </div>
  );
};

export default NewportNewsTRT;
