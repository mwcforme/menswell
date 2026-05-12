import { Link } from "react-router-dom";

const landingPages = [
  { path: "/lp/testosterone", label: "Testosterone (v1)" },
  { path: "/lp/trt", label: "TRT (v1 alias)" },
  { path: "/lp/trt2", label: "TRT v2" },
  { path: "/lp/trt-v2", label: "TRT v2 (new)" },
  { path: "/lp/ed", label: "ED" },
  { path: "/lp/weight-loss", label: "Weight Loss (v1)" },
  { path: "/lp/weight-loss-v2", label: "Weight Loss v2" },
  { path: "/lp/OG-ed", label: "OG: ED" },
  { path: "/lp/OG-trt2", label: "OG: TRT v2" },
  { path: "/lp/OG-weight-loss-v2", label: "OG: Weight Loss v2" },
  { path: "/lp/OG-trt", label: "OG: TRT" },
  { path: "/lp/OG-weight-loss", label: "OG: Weight Loss" },
  { path: "/lp/ghl-trt", label: "GHL: TRT" },
  { path: "/lp/ghl-ed", label: "GHL: ED" },
  { path: "/lp/ghl-wl", label: "GHL: Weight Loss" },
  { path: "/lp/ghl-general", label: "GHL: General" },
];

const LPIndex = () => (
  <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "48px 24px", fontFamily: "'Inter', sans-serif" }}>
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#000033", marginBottom: 8 }}>Landing Pages</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>All active landing pages in <code>/lp/</code></p>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {landingPages.map((lp) => (
          <li key={lp.path}>
            <a
              href={lp.path}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "16px 20px",
                background: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                color: "#004883",
                fontWeight: 500,
                border: "1px solid #e5e7eb",
                transition: "box-shadow 0.2s",
              }}
            >
              {lp.label}
              <span style={{ float: "right", color: "#999", fontWeight: 400, fontSize: 14 }}>{lp.path}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default LPIndex;
