import { Helmet } from "react-helmet-async";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationSEO = ({ location }: Props) => {
  const baseUrl = "https://mwcv2.lovable.app";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://menswellnesscenters.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://menswellnesscenters.com/locations/" },
      { "@type": "ListItem", position: 3, name: `${location.city}, ${location.state}`, item: `https://menswellnesscenters.com/locations/${location.slug}` },
    ],
  };

  return (
    <Helmet>
      <meta name="description" content={location.metaDescription} />
      <link rel="canonical" href={location.canonicalUrl || `${baseUrl}/locations/${location.slug}`} />
      <meta property="og:title" content={location.ogTitle || location.metaTitle} />
      <meta property="og:description" content={location.ogDescription || location.metaDescription} />
      <meta property="og:url" content={`${baseUrl}/locations/${location.slug}`} />
      <meta property="og:image" content={`https://menswellnesscenters.com${location.heroImage}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
