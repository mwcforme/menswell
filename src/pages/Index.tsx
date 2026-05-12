/*
PRODUCTION SCHEMA MARKUP — Add to <head> via WordPress:

FAQPage schema (from Section 13 — all 8 Q&As)
LocalBusiness schema (3 locations: Richmond, Newport News, Virginia Beach)
MedicalOrganization schema (services: TRT, ED Treatment, Weight Loss, Peptide Therapy)
AggregateRating schema (4.9 stars, 200+ reviews)
*/

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

import { Services } from "@/components/Services";
import { PressBar } from "@/components/PressBar";
import { StatCounters } from "@/components/StatCounters";
import { MWCDifference } from "@/components/MWCDifference";
import { StepsSection } from "@/components/StepsSection";
import { LocationBanner } from "@/components/LocationBanner";
import { Comparison } from "@/components/Comparison";
import { Testimonials } from "@/components/Testimonials";

import { TeamSection } from "@/components/TeamSection";
import { FAQSection } from "@/components/FAQSection";
import { BookingCTA } from "@/components/BookingCTA";
import { USPBlock } from "@/components/USPBlock";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#hero-heading" className="skip-link">Skip to content</a>
      <Header />
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Services />
        <PressBar />
        <StatCounters />
        <MWCDifference />
        <StepsSection />
        <LocationBanner />
        <Comparison />
        <Testimonials />
        <USPBlock />
        <TeamSection />
        <FAQSection />
        <BookingCTA />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
