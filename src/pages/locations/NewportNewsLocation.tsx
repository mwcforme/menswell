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
import { LocationMobileCTA } from "@/components/locations/LocationMobileCTA";
import { LocationBreadcrumb } from "@/components/locations/LocationBreadcrumb";
import { LocationOtherCenters } from "@/components/locations/LocationOtherCenters";
import { LocationUniqueCallout } from "@/components/locations/LocationUniqueCallout";
import { newportNewsLocation } from "@/data/locations";

const NewportNewsLocation = () => {
  const location = newportNewsLocation;

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
      <LocationNAP location={location} />
      <LocationWhyMWC location={location} />
      <LocationSymptoms location={location} />
      <LocationServices location={location} />
      <LocationPricing location={location} />
      <LocationProcess location={location} />
      <LocationProviders location={location} />
      <LocationTestimonials location={location} />
      <LocationCitations />
      <LocationComparison />
      <LocationAreasServed location={location} />
      <LocationFAQ location={location} />
      
      <LocationUniqueCallout location={location} />
      <LocationOtherCenters currentSlug={location.slug} />
      <LocationCTA location={location} />
      </main>
      <Footer />
      <LocationMobileCTA location={location} />
    </div>
  );
};

export default NewportNewsLocation;
