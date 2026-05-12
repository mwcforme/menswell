import { AlertTriangle } from "lucide-react";

interface MedicalDisclaimerProps {
  variant?: "full" | "compact";
}

export const MedicalDisclaimer = ({ variant = "full" }: MedicalDisclaimerProps) => {
  if (variant === "compact") {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            <strong className="text-foreground">Medical Disclaimer:</strong> This website provides information for educational purposes only 
            and is not a substitute for professional medical advice. Results vary. Consult a healthcare provider before starting any treatment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted border border-border rounded-2xl p-6 space-y-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
        <h3 className="font-semibold text-lg">Important Medical Information</h3>
      </div>
      
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Not Medical Advice:</strong> The information provided on this website is for 
          educational and informational purposes only. It is not intended to be a substitute for professional medical advice, 
          diagnosis, or treatment.
        </p>
        
        <p>
          <strong className="text-foreground">Consult Your Provider:</strong> Always seek the advice of your physician or 
          other qualified healthcare provider with any questions you may have regarding a medical condition.
        </p>
        
        <p>
          <strong className="text-foreground">Results May Vary:</strong> Individual results are not evidence-based and may vary 
          based on individual circumstances including health conditions, adherence to treatment, and other factors.
        </p>
        
        <p>
          <strong className="text-foreground">FDA-Approved Medications:</strong> We only prescribe FDA-approved medications 
          when clinically appropriate. All prescriptions require evaluation by a licensed healthcare provider.
        </p>
        
        <p>
          <strong className="text-foreground">Emergency Warning:</strong> This website and our services are not intended 
          for medical emergencies. If you are experiencing a medical emergency, call 911 or go to the nearest emergency room immediately.
        </p>
      </div>
    </div>
  );
};
