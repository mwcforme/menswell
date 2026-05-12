import { LegalPageLayout, InfoCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const PrescribingPolicy = () => (
  <LegalPageLayout
    title="Prescribing Policy"
    subtitle="Our standards for safe, evidence-based prescribing."
    path="/prescribing-policy"
    metaDescription="Prescribing policy for Men's Wellness Centers. Safe, responsible prescribing practices in compliance with Virginia and federal regulations."
  >
    <section>
      <h2>Valid Prescription Requirements</h2>
      <p>Men's Wellness Centers is committed to responsible prescribing practices in accordance with all applicable state and federal laws. All prescriptions are issued only after a thorough medical evaluation and the establishment of a valid practitioner-patient relationship.</p>
      <ul className="list-disc">
        <li>Prescriptions are issued only by licensed, credentialed healthcare providers</li>
        <li>A comprehensive medical history and evaluation is required before any prescription</li>
        <li>In-person examination at one of our Virginia center locations is required for initial consultations</li>
        <li>All prescribing decisions are made at the sole discretion of the treating provider</li>
        <li>Prescriptions are only issued when medically appropriate and clinically indicated</li>
      </ul>
    </section>

    <section>
      <h2>Practitioner-Patient Relationship</h2>
      <p>A valid practitioner-patient relationship is established through:</p>
      <ul className="list-disc">
        <li>In-person consultation and physical examination at our Virginia center locations</li>
        <li>Comprehensive review of medical history and current health status</li>
        <li>Appropriate diagnostic testing and laboratory evaluation</li>
        <li>Discussion of treatment options, benefits, risks, and alternatives</li>
        <li>Informed consent for treatment</li>
        <li>Ongoing follow-up care and monitoring</li>
      </ul>
    </section>

    <section>
      <h2>Physical Examination Requirements</h2>
      <InfoCallout title="In-Person Requirement">
        <p className="!mb-0">Men's Wellness Centers requires an in-person physical examination for all new patient consultations, initial prescription of hormone therapies, any medication requiring physical assessment, and annual follow-up evaluations.</p>
      </InfoCallout>
      <p>Follow-up consultations may be conducted via telemedicine when clinically appropriate, after the initial in-person evaluation has been completed.</p>
    </section>

    <section>
      <h2>Controlled Substances Policy</h2>
      <p>For any medications classified as controlled substances, we adhere to strict protocols:</p>
      <ul className="list-disc">
        <li>In-person evaluation is required before prescribing controlled substances</li>
        <li>Prescriptions are issued in accordance with DEA regulations and Virginia state law</li>
        <li>We participate in the Virginia Prescription Monitoring Program (PMP)</li>
        <li>PMP checks are conducted prior to prescribing controlled medications</li>
        <li>Ongoing monitoring and periodic re-evaluation is required</li>
        <li>We may decline to prescribe controlled substances if not clinically appropriate</li>
      </ul>
    </section>

    <section>
      <h2>Prescription Monitoring Program (PMP)</h2>
      <p>Men's Wellness Centers participates in the Virginia Prescription Monitoring Program as required by Virginia law. This program helps:</p>
      <ul className="list-disc">
        <li>Prevent prescription drug abuse and diversion</li>
        <li>Identify patients who may benefit from substance abuse intervention</li>
        <li>Ensure safe prescribing practices</li>
        <li>Comply with state and federal regulations</li>
      </ul>
    </section>

    <section>
      <h2>DEA Compliance</h2>
      <p>All prescribers at Men's Wellness Centers maintain current DEA registrations and comply with all Drug Enforcement Administration requirements for the prescribing, dispensing, and documentation of controlled substances.</p>
    </section>

    <section>
      <h2>Prescription Fulfillment</h2>
      <ul className="list-disc">
        <li>Prescriptions are transmitted electronically to licensed pharmacies</li>
        <li>Patients may choose their preferred licensed pharmacy</li>
        <li>We partner with reputable compounding pharmacies for specialized formulations</li>
        <li>All partner pharmacies are properly licensed and accredited</li>
      </ul>
    </section>

    <section>
      <h2>Right to Decline</h2>
      <p>Our healthcare providers reserve the right to decline prescribing any medication if, in their professional medical judgment, it is not clinically appropriate, could pose a health risk, or is otherwise not in the best interest of the patient.</p>
    </section>

    <section>
      <h2>Contact Information</h2>
      <ContactCard />
    </section>
  </LegalPageLayout>
);

export default PrescribingPolicy;
