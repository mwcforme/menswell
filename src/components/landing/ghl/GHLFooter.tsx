import { Link } from "react-router-dom";
import type { GHLVerticalConfig } from "@/data/ghl-config";
import { FooterCompliance } from "@/components/ui/FooterCompliance";

interface Props { config: GHLVerticalConfig }

const GHLFooter = ({ config }: Props) => (
  <footer style={{ backgroundColor: "#000022" }} className="pb-16 md:pb-0 border-t border-white/10">
    <div className="max-w-[1170px] mx-auto px-4 pt-16 pb-10">
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        <div>
          <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-8 mb-4" />
          <p className="text-white/60 text-sm leading-relaxed">
            Virginia's trusted men's health centers since 2015. {config.footerServiceLine}{" "}
            <a href="https://maps.google.com/?q=Men's+Wellness+Centers+Richmond+VA" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8670A] underline underline-offset-2 transition-colors">Richmond</a>,{" "}
            <a href="https://maps.google.com/?q=Men's+Wellness+Centers+Newport+News+VA" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8670A] underline underline-offset-2 transition-colors">Newport News</a>, and{" "}
            <a href="https://maps.google.com/?q=Men's+Wellness+Centers+Virginia+Beach+VA" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8670A] underline underline-offset-2 transition-colors">Virginia Beach</a>{" "}
            locations.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-4">Contact</p>
          <div className="space-y-1.5 text-white/70 text-sm">
            <p><a href="tel:8043464636" className="hover:text-white transition-colors">Richmond: 804-346-4636</a></p>
            <p><a href="tel:7578066263" className="hover:text-white transition-colors">Newport News: 757-806-6263</a></p>
            <p><a href="tel:7578066263" className="hover:text-white transition-colors">Virginia Beach: 757-806-6263</a></p>
            <p className="mt-3"><a href="mailto:info@menswellnesscenters.com" className="hover:text-white transition-colors">info@menswellnesscenters.com</a></p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <a href="https://www.legitscript.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/ghl/legitscript-badge.png" alt="LegitScript Certified" className="h-16 opacity-80 hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>

    <FooterCompliance />
  </footer>
);

export default GHLFooter;
