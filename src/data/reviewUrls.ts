export type LocationSlug = "virginia-beach" | "newport-news" | "richmond";

export const REVIEW_URLS: Record<LocationSlug, string> = {
  "virginia-beach":
    "https://search.google.com/local/writereview?placeid=ChIJYzXsRADruokR9wX5sXQ6AEw",
  "newport-news":
    "https://search.google.com/local/writereview?placeid=ChIJs00FguJ5sIkRwYLOLdjOZgg",
  richmond:
    "https://search.google.com/local/writereview?placeid=ChIJP5F8BJ5rsYkR6mdPGbGUmh8",
};

export const LOCATION_LABELS: Record<LocationSlug, string> = {
  "virginia-beach": "Virginia Beach, VA",
  "newport-news": "Newport News, VA",
  richmond: "Richmond, VA",
};

export const isLocationSlug = (v: string | null | undefined): v is LocationSlug =>
  v === "virginia-beach" || v === "newport-news" || v === "richmond";
