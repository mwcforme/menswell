import "./lib/sentry";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { initAttribution } from "./lib/attribution";

// Capture URL-borne attribution (utm_*, gclid, fbclid, msclkid, first_name,
// last_name, page_id) into a 90-day first-party cookie before React mounts so
// that even an immediate form submit carries the values.
initAttribution();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
