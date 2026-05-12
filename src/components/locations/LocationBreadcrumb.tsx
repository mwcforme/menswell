import { BreadcrumbBar } from "@/components/shared/BreadcrumbBar";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationBreadcrumb = ({ location }: Props) => (
  <BreadcrumbBar
    items={[
      { label: "Home", to: "/" },
      { label: "Locations", to: "/locations" },
      { label: `${location.city}, ${location.state}` },
    ]}
  />
);
