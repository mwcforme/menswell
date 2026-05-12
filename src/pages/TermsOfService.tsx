import { LegalPageLayout, WarningCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const tosToc = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "medical-disclaimer", label: "Medical Services Disclaimer" },
  { id: "locations", label: "Service Locations" },
  { id: "relationship", label: "Practitioner-Patient Relationship" },
  { id: "eligibility", label: "Patient Eligibility" },
  { id: "accuracy", label: "Medical Information Accuracy" },
  { id: "prescriptions", label: "Prescription Services" },
  { id: "controlled", label: "Controlled Substances Policy" },
  { id: "limitations", label: "Service Limitations" },
  { id: "payment", label: "Payment and Refunds" },
  { id: "privacy", label: "Privacy and Confidentiality" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "disputes", label: "Dispute Resolution" },
  { id: "compliance", label: "Compliance with Laws" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact Information" },
];

const TermsOfService = () => (
  <LegalPageLayout
    title="Terms of Service"
    subtitle="Terms and conditions for using our website and services."
    path="/terms-of-service"
    metaDescription="Terms of service for Men's Wellness Centers. Includes medical services disclaimer, patient eligibility, prescription policies, and payment terms."
    toc={tosToc}
  >
    <section>
      <h2 id="acceptance">Acceptance of Terms</h2>
      <p>By accessing and using Men's Wellness Centers services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.</p>
    </section>

    <section>
      <h2 id="medical-disclaimer">Medical Services Disclaimer</h2>
      <WarningCallout title="Important Medical Disclaimer">
        <p className="!mb-0">Men's Wellness Centers provides in-center medical services at our Virginia locations. Our services are not appropriate for emergency medical conditions. For emergencies, call 911 or go to the nearest emergency room.</p>
      </WarningCallout>
      <ul className="list-disc">
        <li>Initial consultations require in-person evaluation at one of our Virginia centers</li>
        <li>Some conditions may require additional diagnostic testing or referral to specialists</li>
        <li>Telemedicine follow-up services are available only to established patients when clinically appropriate</li>
      </ul>
    </section>

    <section>
      <h2 id="locations">Service Locations</h2>
      <p>Men's Wellness Centers provides services at the following Virginia center locations:</p>
      <div className="rounded-xl my-4" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.08)", padding: "20px 24px" }}>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>Richmond</p>
            <p className="text-[14px]" style={{ color: "#666" }}>4050 Innslake Dr, Suite 360, Glen Allen, VA 23060</p>
            <p className="text-[14px]" style={{ color: "#666" }}>Phone: <a href="tel:+18043464636">(804) 346-4636</a></p>
          </div>
          <div>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>Newport News</p>
            <p className="text-[14px]" style={{ color: "#666" }}>827 Diligence Drive, Suite 206, Newport News, VA 23606</p>
            <p className="text-[14px]" style={{ color: "#666" }}>Phone: <a href="tel:+17578066263">(757) 806-6263</a></p>
          </div>
          <div>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>Virginia Beach</p>
            <p className="text-[14px]" style={{ color: "#666" }}>996 First Colonial Road, Virginia Beach, VA 23454</p>
            <p className="text-[14px]" style={{ color: "#666" }}>Phone: <a href="tel:+17578066263">(757) 806-6263</a></p>
          </div>
        </div>
        <p className="text-[13px] mt-4 pt-4" style={{ color: "#999", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          Note: In-person evaluation is required for initial consultations and certain ongoing treatments.
        </p>
      </div>
    </section>

    <section>
      <h2 id="relationship">Practitioner-Patient Relationship</h2>
      <p>Valid prescriptions require a legitimate practitioner-patient relationship. All prescriptions are issued only after appropriate medical evaluation by a licensed healthcare provider. We comply with all applicable prescription drug laws and medical practice regulations in Virginia.</p>
    </section>

    <section>
      <h2 id="eligibility">Patient Eligibility</h2>
      <p>To use our services, you must:</p>
      <ul className="list-disc">
        <li>Be at least 18 years of age</li>
        <li>Be able to visit one of our Virginia center locations for required in-person evaluations</li>
        <li>Provide accurate and complete medical information</li>
        <li>Have a valid payment method</li>
        <li>Consent to treatment and our policies</li>
      </ul>
    </section>

    <section>
      <h2 id="accuracy">Medical Information Accuracy</h2>
      <p>You are responsible for providing accurate, complete, and truthful medical information. Failure to provide accurate information may result in incorrect diagnosis or treatment and could harm your health. Deliberately providing false information may result in termination of services.</p>
    </section>

    <section>
      <h2 id="prescriptions">Prescription Services</h2>
      <p>Our prescription services are subject to the following:</p>
      <ul className="list-disc">
        <li>Prescriptions are issued at the sole discretion of licensed healthcare providers</li>
        <li>Some medications require in-person physical examination before prescribing</li>
        <li>We participate in the Virginia Prescription Monitoring Program</li>
        <li>Prescriptions for controlled substances require in-person evaluation and ongoing monitoring</li>
        <li>Prescriptions are sent to licensed partner pharmacies</li>
        <li>You are responsible for medication costs not covered by insurance</li>
      </ul>
    </section>

    <section>
      <h2 id="controlled">Controlled Substances Policy</h2>
      <p>For medications classified as controlled substances:</p>
      <ul className="list-disc">
        <li>In-person evaluation is required before any controlled substance prescription</li>
        <li>We comply with DEA regulations and Virginia state law</li>
        <li>Virginia Prescription Monitoring Program (PMP) checks are conducted</li>
        <li>Ongoing monitoring and periodic re-evaluation may be required</li>
        <li>Prescriptions may be denied if not clinically appropriate or safe</li>
      </ul>
    </section>

    <section>
      <h2 id="limitations">Service Limitations</h2>
      <p>The following conditions and situations cannot be treated through our services:</p>
      <ul className="list-disc">
        <li>Emergency medical conditions</li>
        <li>Conditions requiring hospitalization</li>
        <li>Certain psychiatric conditions requiring specialized care</li>
        <li>Patients unable to attend required in-person appointments</li>
        <li>Patients under 18 years of age</li>
      </ul>
    </section>

    <section>
      <h2 id="payment">Payment and Refunds</h2>
      <p>Our payment policies:</p>
      <ul className="list-disc">
        <li>All fees are due at the time of service</li>
        <li>Consultation fees are non-refundable if a medical evaluation is completed, regardless of whether a prescription is issued</li>
        <li>Medication costs are separate and handled by our partner pharmacies</li>
        <li>We accept major credit cards and other payment methods</li>
        <li>Insurance may not cover all services; patient is responsible for any uncovered costs</li>
      </ul>
      <p><strong>Cancellation Policy:</strong> Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee. No-shows may result in a fee and may affect future scheduling privileges.</p>
    </section>

    <section>
      <h2 id="privacy">Privacy and Confidentiality</h2>
      <p>We are committed to protecting your privacy and maintaining the confidentiality of your health information in accordance with HIPAA and Virginia state laws. Please refer to our <a href="/privacy-policy">Privacy Policy</a> for detailed information.</p>
    </section>

    <section>
      <h2 id="liability">Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Men's Wellness Centers and its healthcare providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.</p>
    </section>

    <section>
      <h2 id="disputes">Dispute Resolution</h2>
      <p>In the event of a dispute:</p>
      <ul className="list-disc">
        <li>We encourage you to first contact us directly to resolve any issues</li>
        <li>For medical care concerns, you may contact the Virginia Board of Medicine</li>
        <li>For billing disputes, contact our billing department</li>
        <li>These Terms shall be governed by the laws of the Commonwealth of Virginia</li>
      </ul>
    </section>

    <section>
      <h2 id="compliance">Compliance with Laws</h2>
      <p>We operate in compliance with Virginia medical practice laws, federal and state prescription drug laws, HIPAA privacy regulations, and all applicable healthcare regulations.</p>
    </section>

    <section>
      <h2 id="changes">Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Changes will be posted on our website with the effective date. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.</p>
    </section>

    <section>
      <h2 id="contact">Contact Information</h2>
      <ContactCard />
    </section>
  </LegalPageLayout>
);

export default TermsOfService;
