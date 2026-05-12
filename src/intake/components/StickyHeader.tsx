// Unified header — re-export V2Header so /intake, /bookv2, and /survey share
// the exact same sticky header (logo + 866-344-4955 phone link).
import V2Header from "@/components/booking-v2/V2Header";

const StickyHeader = () => <V2Header />;

export default StickyHeader;
