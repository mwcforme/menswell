import { Star } from "lucide-react";
import SurveyCard from "./SurveyCard";

const font = "'Montserrat', sans-serif";

interface SurveyRedirectInterstitialProps {
  locationLabel: string;
}

const SurveyRedirectInterstitial = ({ locationLabel }: SurveyRedirectInterstitialProps) => (
  <SurveyCard
    title="Thank You!"
    subtitle={`Opening Google to leave a review for ${locationLabel}…`}
  >
    <div className="flex flex-col items-center py-6">
      <div className="flex gap-1 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={28} fill="#E8670A" stroke="#E8670A" />
        ))}
      </div>
      <p
        className="text-center"
        style={{ fontFamily: font, fontSize: 14, color: "#6B7280" }}
      >
        If Google doesn't open automatically, tap the button below.
      </p>
    </div>
  </SurveyCard>
);

export default SurveyRedirectInterstitial;
