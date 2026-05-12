import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const BASE_URL = "https://mwcv2.lovable.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Men's Wellness Centers",
  alternateName: "MWC",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  description:
    "Virginia's premier physician-led men's health clinics specializing in testosterone therapy, medical weight loss, ED treatment, and wellness optimization for men 40+.",
  areaServed: { "@type": "State", name: "Virginia" },
  slogan: "Find Your Edge Over Age",
};

interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

const PAGE_META: Record<string, PageMeta> = {
  "/new": {
    title: "TRT in Virginia | Testing | Men's Wellness Centers",
    description:
      "Provider-supervised testosterone replacement therapy at 3 Virginia locations. Testing and results reviewed in-visit. Walk in today.",
  },
  "/book": {
    title: "Book Your Consultation | Men's Wellness Centers",
    description:
      "Schedule your men's health consultation at any of our 3 Virginia locations. Same-day lab results available.",
    noindex: true,
  },
};

const isBookingFlow = (pathname: string) => pathname.startsWith("/book");

export const GlobalSchema = () => {
  const { pathname } = useLocation();
  const meta =
    PAGE_META[pathname] ||
    (isBookingFlow(pathname) ? PAGE_META["/book"] : undefined);

  if (!meta) return null;

  return (
    <SEOHead
      title={meta.title}
      description={meta.description}
      canonical={`${BASE_URL}${pathname}`}
      noindex={meta.noindex}
      jsonLd={pathname === "/new" ? organizationSchema : undefined}
    />
  );
};
