import { Link } from "react-router-dom";

const MissingParamBanner = () => (
  <div
    className="mx-auto mb-4 max-w-[640px] rounded-md text-sm"
    style={{ background: "#FEF3C7", color: "#92400E", border: "1px solid #FCD34D", padding: "10px 16px" }}
  >
    Looks like you started in the middle.{" "}
    <Link to="/" className="font-semibold underline">Start over</Link>.
  </div>
);

export default MissingParamBanner;
