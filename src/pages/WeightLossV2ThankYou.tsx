import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin } from "lucide-react";

const WeightLossV2ThankYou = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    document.title = "Thank You | Men's Wellness Centers";
    
    // Fire conversion tracking events
    window.dispatchEvent(
      new CustomEvent("lp_weightloss_conversion", {
        detail: { name, location, source: "lp-weightloss-v2" },
      })
    );

    // Optional analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'Weight Loss',
        event_label: 'Thank You Page',
        value: 1
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CompleteRegistration', { 
        content_category: 'Weight Loss',
        value: 1,
        currency: 'USD'
      });
    }
  }, [name, location]);

  const getLocationDetails = () => {
    switch (location) {
      case "richmond":
        return {
          name: "Richmond — Glen Allen",
          address: "4050 Innslake Dr, Suite 360, Glen Allen, VA 23060",
          phone: "804-346-4636",
        };
      case "newport_news":
        return {
          name: "Newport News",
          address: "827 Diligence Drive, Suite 206, Newport News, VA 23606",
          phone: "757-806-6263",
        };
      case "virginia_beach":
        return {
          name: "Virginia Beach",
          address: "996 First Colonial Road, Virginia Beach, VA 23454",
          phone: "757-806-6263",
        };
      default:
        return {
          name: "our clinic",
          address: "Visit menswellnesscenters.com for locations",
          phone: "866-344-4955",
        };
    }
  };

  const locationDetails = getLocationDetails();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000033 0%, #004883 60%, #005a9e 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: "32px 24px" }}>
        {/* Success Icon */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <CheckCircle
            size={64}
            style={{
              color: "#28a745",
              marginBottom: 24,
            }}
          />
          
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" style={{ height: 32 }} />
          </div>
        </div>

        {/* Thank You Message */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 700,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Thank You{name ? `, ${name}` : ""}!
          </h1>
          
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.9)",
              marginBottom: 24,
            }}
          >
            We'll contact you within 1 hour to schedule your consultation at {locationDetails.name}.
          </p>
          
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 12,
              padding: 24,
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: 32,
            }}
          >
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 16,
                color: "#E8670A",
              }}
            >
              What Happens Next?
            </h3>
            
            <ul
              style={{
                textAlign: "left",
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              <li style={{ marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#28a745" }}>✓</span>
                Our team will call you within 60 minutes
              </li>
              <li style={{ marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#28a745" }}>✓</span>
                Schedule your no-cost consultation appointment
              </li>
              <li style={{ marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#28a745" }}>✓</span>
                Discuss your weight loss goals and medical history
              </li>
              <li style={{ paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#28a745" }}>✓</span>
                Get personalized GLP-1 treatment recommendations
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            padding: 24,
            border: "1px solid rgba(255,255,255,0.1)",
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MapPin size={18} />
            Your Selected Location
          </h3>
          
          <p style={{ fontSize: 15, marginBottom: 8, fontWeight: 500 }}>
            {locationDetails.name}
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 16 }}>
            {locationDetails.address}
          </p>
          
          <a
            href={`tel:${locationDetails.phone.replace(/\D/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              background: "#E8670A",
              color: "white",
              textDecoration: "none",
              borderRadius: 8,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              transition: "background 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d35a00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8670A";
            }}
          >
            <Phone size={16} />
            Call {locationDetails.phone}
          </a>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
          <p style={{ marginBottom: 8 }}>
            Questions? Call us anytime at{" "}
            <a
              href="tel:8663444955"
              style={{ color: "#E8670A", textDecoration: "underline" }}
            >
              866-344-4955
            </a>
          </p>
          <p>
            <Link
              to="/"
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "underline",
              }}
            >
              Return to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeightLossV2ThankYou;