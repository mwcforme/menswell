import { Link } from "react-router-dom";

const clinics = [
  { city: "Richmond / Glen Allen", address: "4050 Innslake Dr, Suite 360, Glen Allen, VA 23060", phone: "(804) 346-4636", phoneHref: "tel:8043464636" },
  { city: "Newport News", address: "827 Diligence Drive, Suite 206, Newport News, VA 23606", phone: "(757) 806-6263", phoneHref: "tel:7578066263" },
  { city: "Virginia Beach", address: "996 First Colonial Road, Virginia Beach, VA 23454", phone: "(757) 806-6263", phoneHref: "tel:7578066263" },
];

export const TRTv2Footer = () => (
  <footer style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-10">
        <div>
          <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-7 w-auto" />
          <div className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}>
            Men's Wellness Centers, LLC
          </div>
          <a href="tel:8663444955" className="mt-2 block text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
            Main: 866-344-4955
          </a>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
            <span>✓ LegitScript Certified</span>
            <span>✓ HIPAA Compliant</span>
            <span>✓ Google Healthcare Certified</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase mb-3" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
            Virginia Clinics
          </div>
          <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.78)", fontFamily: "Inter, sans-serif" }}>
            {clinics.map((c) => (
              <li key={c.city}>
                <div className="font-semibold" style={{ color: "#FFFFFF" }}>{c.city}</div>
                <div>{c.address}</div>
                <a href={c.phoneHref} className="underline underline-offset-2">{c.phone}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
          The information provided on this website is for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions about a medical condition. Treatment decisions are made by a licensed physician based on individual evaluation. Men's Wellness Centers operates in the state of Virginia.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
          <div>© {new Date().getFullYear()} Men's Wellness Centers, LLC. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link to="/telehealth-consent" className="hover:text-white">Notice of Privacy Practices</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
