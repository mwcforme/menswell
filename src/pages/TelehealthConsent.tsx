import { LegalPageLayout, WarningCallout, InfoCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const TelehealthConsent = () => (
  <LegalPageLayout
    title="Telehealth Consent"
    subtitle="Informed consent for telehealth services."
    path="/telehealth-consent"
    metaDescription="Informed consent for telemedicine services at Men's Wellness Centers. Understand the benefits, risks, and limitations of telehealth consultations."
  >
    <WarningCallout title="Important">
      <p className="!mb-0">Please read this document carefully. It contains important information about telemedicine services offered by Men's Wellness Centers. By using our telemedicine services, you acknowledge that you have read, understood, and agree to the terms described below.</p>
    </WarningCallout>

    <section>
      <h2>What is Telemedicine?</h2>
      <p>Telemedicine involves the use of electronic communications, information technology, and secure video conferencing to provide or support healthcare services when the patient and healthcare provider are not in the same physical location. For Men's Wellness Centers patients who have completed an initial in-person evaluation, telemedicine may be used for certain follow-up consultations when clinically appropriate.</p>
    </section>

    <section>
      <h2>In-Person Evaluation Requirement</h2>
      <InfoCallout title="In-Person Requirement">
        <p className="!mb-2">Men's Wellness Centers requires an in-person evaluation at one of our Virginia center locations for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>All new patient consultations</li>
          <li>Initial prescription of hormone therapies</li>
          <li>Any condition requiring physical examination</li>
          <li>Annual comprehensive evaluations</li>
          <li>Any time deemed necessary by your healthcare provider</li>
        </ul>
      </InfoCallout>
      <p>Telemedicine is available only for established patients as a follow-up option when clinically appropriate.</p>
    </section>

    <section>
      <h2>Benefits of Telemedicine</h2>
      <ul className="list-disc">
        <li>Convenient access to follow-up care from your home or office</li>
        <li>Reduced travel time and associated costs</li>
        <li>Timely access to healthcare providers for appropriate consultations</li>
        <li>Flexibility in scheduling follow-up appointments</li>
        <li>Ability to discuss lab results and treatment adjustments remotely</li>
      </ul>
    </section>

    <section>
      <h2>Risks & Limitations of Telemedicine</h2>
      <ul className="list-disc">
        <li><strong>Physical Examination Limitations:</strong> The provider cannot perform a physical examination via telemedicine.</li>
        <li><strong>Technology Failures:</strong> Technical difficulties may interrupt or prevent a session.</li>
        <li><strong>Diagnostic Limitations:</strong> Without direct physical examination, the provider may not be able to diagnose some conditions.</li>
        <li><strong>Security Risks:</strong> Despite using secure, HIPAA-compliant technology, there is a small risk that electronic communications could be intercepted.</li>
        <li><strong>Not for Emergencies:</strong> Telemedicine is not appropriate for medical emergencies. Call 911 for emergencies.</li>
      </ul>
    </section>

    <section>
      <h2>Technology Requirements</h2>
      <ul className="list-disc">
        <li>A device with video and audio capabilities (computer, tablet, or smartphone)</li>
        <li>A stable internet connection</li>
        <li>A private location where you can speak freely about your health</li>
        <li>Adequate lighting for the provider to see you clearly</li>
        <li>Access to your patient portal or provided video platform</li>
      </ul>
    </section>

    <section>
      <h2>Privacy & Security</h2>
      <ul className="list-disc">
        <li>We use HIPAA-compliant video conferencing platforms</li>
        <li>Your telemedicine sessions are encrypted and secure</li>
        <li>We do not record telemedicine sessions without your explicit consent</li>
        <li>All telemedicine interactions are documented in your medical record</li>
        <li>Our privacy practices apply to telemedicine just as they do to in-person visits</li>
      </ul>
      <p>Please refer to our <a href="/privacy-policy">Privacy Policy</a> for complete information.</p>
    </section>

    <section>
      <h2>Alternative Options</h2>
      <p>Telemedicine is an option, not a requirement. You always have the right to request an in-person visit instead. Our center locations in Richmond, Newport News, and Virginia Beach are available for in-person appointments.</p>
    </section>

    <section>
      <h2>Your Rights</h2>
      <ul className="list-disc">
        <li>Withdraw consent and discontinue telemedicine services at any time</li>
        <li>Request an in-person appointment instead of telemedicine</li>
        <li>Request copies of your medical records from telemedicine visits</li>
        <li>Expect the same standard of care as in-person visits</li>
        <li>Have all telemedicine services conducted in a HIPAA-compliant manner</li>
      </ul>
    </section>

    <section>
      <h2>Geographic Limitations</h2>
      <WarningCallout title="Virginia Only">
        <p className="!mb-0">You must be physically located in the Commonwealth of Virginia during any telemedicine consultation with Men's Wellness Centers providers. Our providers are licensed in Virginia and can only provide telemedicine services to patients physically present in Virginia at the time of the appointment.</p>
      </WarningCallout>
    </section>

    <section>
      <h2>Emergency Situations</h2>
      <WarningCallout title="Not for Emergencies">
        <p className="!mb-0"><strong>Telemedicine is NOT appropriate for medical emergencies.</strong> If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.</p>
      </WarningCallout>
    </section>

    <section>
      <h2>Consent Acknowledgment</h2>
      <p>By using Men's Wellness Centers telemedicine services, you confirm that:</p>
      <ul className="list-disc">
        <li>You have read and understood this Telemedicine Informed Consent</li>
        <li>You understand the benefits, risks, and limitations of telemedicine</li>
        <li>You consent to receive telemedicine services when clinically appropriate</li>
        <li>You understand you may withdraw consent at any time</li>
        <li>You understand telemedicine is not for emergencies</li>
      </ul>
    </section>

    <section>
      <h2>Contact Information</h2>
      <ContactCard />
    </section>
  </LegalPageLayout>
);

export default TelehealthConsent;
