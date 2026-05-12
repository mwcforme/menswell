import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationHero } from "@/components/locations/LocationHero";
import { LocationNAP } from "@/components/locations/LocationNAP";
import { LocationWhyMWC } from "@/components/locations/LocationWhyMWC";
import { LocationSymptoms } from "@/components/locations/LocationSymptoms";
import { LocationServices } from "@/components/locations/LocationServices";
import { LocationPricing } from "@/components/locations/LocationPricing";
import { LocationProcess } from "@/components/locations/LocationProcess";
import { LocationProviders } from "@/components/locations/LocationProviders";
import { LocationTestimonials } from "@/components/locations/LocationTestimonials";
import { LocationCitations } from "@/components/locations/LocationCitations";
import { LocationAreasServed } from "@/components/locations/LocationAreasServed";
import { LocationFAQ } from "@/components/locations/LocationFAQ";
import { LocationComparison } from "@/components/locations/LocationComparison";
import { LocationCTA } from "@/components/locations/LocationCTA";
import { LocationSchema } from "@/components/locations/LocationSchema";
import { LocationSEO } from "@/components/locations/LocationSEO";
import { LocationStickyMobileCTA } from "@/components/locations/LocationStickyMobileCTA";
import { LocationBreadcrumb } from "@/components/locations/LocationBreadcrumb";
import { LocationOtherCenters } from "@/components/locations/LocationOtherCenters";
import { LocationUniqueCallout } from "@/components/locations/LocationUniqueCallout";
import { LocationResults } from "@/components/locations/LocationResults";
import { LocationMidCTA } from "@/components/locations/LocationMidCTA";
import { richmondLocation } from "@/data/locations";

const RichmondLocation = () => {
  const location = richmondLocation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header />
      <LocationSchema location={location} />
      <LocationSEO location={location} />
      <main>
        <LocationHero location={location} />
        <LocationBreadcrumb location={location} />
        <LocationProcess location={location} />
        <LocationProviders location={location} />
        <LocationTestimonials location={location} />
        <LocationMidCTA />
        <LocationSymptoms location={location} />
        <LocationServices location={location} />
        <LocationPricing location={location} />
        <LocationComparison />
        <LocationCitations />
        <LocationResults />
        <LocationWhyMWC location={location} />
        <LocationNAP location={location} />
        <LocationAreasServed location={location} />
        <LocationFAQ location={location} />
        <LocationMidCTA />
        <LocationUniqueCallout location={location} />
        <LocationOtherCenters currentSlug={location.slug} />
        <LocationCTA location={location} />
      </main>
      <Footer />
      <LocationStickyMobileCTA location={location} />
    </div>
  );
};

export default RichmondLocation;
