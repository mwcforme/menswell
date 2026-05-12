import { Helmet } from "react-helmet-async";
import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";
import type { LocationData } from "@/data/locations";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  location: LocationData;
  service: CityServiceConfig;
}

export const CityServiceFAQ = ({ location, service }: Props) => {
  const faqs = service.faqs(location.city, location.phone);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <UnifiedFAQ
        title={`${service.serviceShortName} FREQUENTLY ASKED QUESTIONS`}
        subtitle={`Common ${service.serviceShortName.toLowerCase()} questions from men in ${location.city}`}
        faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
    </>
  );
};
