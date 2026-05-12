import { Link } from "react-router-dom";

interface Props {
  heading?: string;
  subheading?: string;
}

const DontWaitBanner = ({
  heading = "DON'T WAIT TO FEEL BETTER",
  subheading = "Appointments available. Most members see a physician within days of scheduling.",
}: Props) => (
  <section style={{ background: "#1A1A2E" }} className="py-16 px-6 md:px-8 text-center">
    <div className="max-w-[800px] mx-auto">
      <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#FFFFFF" }}>
        {heading}
      </h2>
      <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.70)" }}>
        {subheading}
      </p>
      <Link
        to="/book"
        className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider transition-opacity duration-200"
        style={{ background: "#FFFFFF", color: "#000033", textDecoration: "none" }}
      >
        BOOK MY CONSULTATION
      </Link>
    </div>
  </section>
);

export default DontWaitBanner;
