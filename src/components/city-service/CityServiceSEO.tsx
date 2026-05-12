import { Helmet } from "react-helmet-async";
import type { LocationData } from "@/data/locations";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  location: LocationData;
  service: CityServiceConfig;
}

const BASE_URL = "https://menswellnesscenters.com";

export const CityServiceSEO = ({ location, service }: Props) => {
  const canonicalPath = service.canonicalPath(location.slug);
  const title = service.metaTitle(location.city);
  const description = service.metaDescription(location.city);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${BASE_URL}/locations/` },
      { "@type": "ListItem", position: 3, name: `${location.city}, ${location.state}`, item: `${BASE_URL}/locations/${location.slug}` },
      { "@type": "ListItem", position: 4, name: service.serviceName, item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  const medicalPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: `${BASE_URL}${canonicalPath}`,
    lastReviewed: "2026-03-31",
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    specialty: { "@type": "MedicalSpecialty", name: "Endocrinology" },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${BASE_URL}${canonicalPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${BASE_URL}${canonicalPath}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(medicalPageSchema)}</script>
    </Helmet>
  );
};
