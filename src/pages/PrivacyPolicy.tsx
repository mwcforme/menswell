import { LegalPageLayout, ComplianceCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const privacyToc = [
  { id: "hipaa", label: "HIPAA Compliance" },
  { id: "info-collect", label: "Information We Collect" },
  { id: "info-use", label: "How We Use Your Information" },
  { id: "info-sharing", label: "Information Sharing" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "your-rights", label: "Your Rights" },
  { id: "data-security", label: "Data Security" },
  { id: "data-retention", label: "Data Retention" },
  { id: "cookies", label: "Cookie Policy" },
  { id: "ccpa", label: "California Consumer Privacy Act (CCPA)" },
  { id: "breach", label: "Data Breach Notification" },
  { id: "contact", label: "Contact for Privacy Concerns" },
  { id: "complaint", label: "File a Complaint" },
  { id: "changes", label: "Changes to This Policy" },
];

const PrivacyPolicy = () => (
  <LegalPageLayout
    title="Privacy Policy"
    subtitle="How we protect your personal and health information."
    path="/privacy-policy"
    metaDescription="How Men's Wellness Centers collects, uses, and protects your personal and health information. HIPAA compliant."
    toc={privacyToc}
    schemaExtra={{
      about: {
        "@type": "Thing",
        name: "HIPAA Privacy Practices",
        description: "Health Insurance Portability and Accountability Act compliance and patient privacy protections.",
      },
    }}
  >
    <section>
      <h2 id="hipaa">HIPAA Compliance</h2>
      <ComplianceCallout title="HIPAA Compliant">
        <p className="!mb-0">Men's Wellness Centers is committed to protecting your health information. We comply with the Health Insurance Portability and Accountability Act (HIPAA) and all applicable privacy laws in the Commonwealth of Virginia.</p>
      </ComplianceCallout>
    </section>

    <section>
      <h2 id="info-collect">Information We Collect</h2>
      <p>We collect information necessary to provide you with quality healthcare services, including:</p>
      <ul className="list-disc">
        <li>Personal identification information (name, date of birth, contact information)</li>
        <li>Medical history and health information</li>
        <li>Insurance and payment information</li>
        <li>Treatment records and prescription information</li>
        <li>Communication records with our healthcare providers</li>
        <li>Laboratory and diagnostic test results</li>
      </ul>
    </section>

    <section>
      <h2 id="info-use">How We Use Your Information</h2>
      <p>Your protected health information (PHI) is used for:</p>
      <ul className="list-disc">
        <li><strong>Treatment:</strong> Providing, coordinating, and managing your healthcare</li>
        <li><strong>Payment:</strong> Processing payments and insurance claims</li>
        <li><strong>Healthcare Operations:</strong> Quality improvement and administrative functions</li>
        <li><strong>Legal Requirements:</strong> Compliance with applicable laws and regulations</li>
      </ul>
    </section>

    <section>
      <h2 id="info-sharing">Information Sharing</h2>
      <p>We only share your information as permitted by applicable laws, including:</p>
      <ul className="list-disc">
        <li>With your explicit written authorization</li>
        <li>To other healthcare providers involved in your care</li>
        <li>To partner pharmacies for prescription fulfillment</li>
        <li>As required by law or legal process</li>
        <li>To prevent serious harm to you or others</li>
      </ul>
      <p>We will never sell your personal health information to third parties.</p>
    </section>

    <section>
      <h2 id="third-party">Third-Party Services</h2>
      <p>We may use third-party services to support our operations, including:</p>
      <ul className="list-disc">
        <li>Payment processors for secure transaction handling</li>
        <li>Laboratory services for diagnostic testing</li>
        <li>Electronic health record systems</li>
        <li>Secure communication platforms</li>
        <li>Website analytics services (anonymized data only)</li>
      </ul>
      <p>All third-party service providers are required to maintain appropriate security measures and comply with applicable privacy laws.</p>
    </section>

    <section>
      <h2 id="your-rights">Your Rights</h2>
      <p>Under HIPAA and applicable privacy laws, you have the right to:</p>
      <ul className="list-disc">
        <li>Access and review your medical records</li>
        <li>Request corrections to your health information</li>
        <li>Request restrictions on certain uses and disclosures</li>
        <li>Receive confidential communications</li>
        <li>Receive a copy of this privacy policy</li>
        <li>Request an accounting of disclosures</li>
        <li>File a complaint if you believe your privacy rights have been violated</li>
      </ul>
    </section>

    <section>
      <h2 id="data-security">Data Security</h2>
      <p>We implement industry-standard security measures to protect your information:</p>
      <ul className="list-disc">
        <li>Encrypted data transmission using SSL/TLS (256-bit encryption)</li>
        <li>Secure data storage with encryption at rest</li>
        <li>Regular security audits and vulnerability assessments</li>
        <li>Strict access controls and multi-factor authentication</li>
        <li>Employee training on privacy and security protocols</li>
        <li>Physical security measures at all center locations</li>
      </ul>
    </section>

    <section>
      <h2 id="data-retention">Data Retention</h2>
      <p>We retain your medical records and health information in accordance with Virginia state law and applicable federal regulations. Generally, medical records are retained for a minimum of six years from the date of last treatment, or longer as required by law.</p>
    </section>

    <section>
      <h2 id="cookies">Cookie Policy</h2>
      <p>Our website uses cookies and similar technologies to enhance your experience:</p>
      <ul className="list-disc">
        <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (anonymized)</li>
        <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
      </ul>
      <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>
    </section>

    <section>
      <h2 id="ccpa">California Consumer Privacy Act (CCPA)</h2>
      <p>If you are a California resident, you may have additional rights under the CCPA, including:</p>
      <ul className="list-disc">
        <li>The right to know what personal information is collected</li>
        <li>The right to delete personal information (subject to exceptions)</li>
        <li>The right to opt-out of the sale of personal information</li>
        <li>The right to non-discrimination for exercising CCPA rights</li>
      </ul>
      <p>Note: Medical information governed by HIPAA may be exempt from certain CCPA provisions.</p>
    </section>

    <section>
      <h2 id="breach">Data Breach Notification</h2>
      <p>In the unlikely event of a data breach affecting your protected health information, we will notify you as required by HIPAA and Virginia state law. Notification will occur without unreasonable delay and within the timeframes required by law.</p>
    </section>

    <section>
      <h2 id="contact">Contact for Privacy Concerns</h2>
      <p>For questions about this privacy policy or to exercise your privacy rights, contact our Privacy Officer:</p>
      <ContactCard />
    </section>

    <section>
      <h2 id="complaint">File a Complaint</h2>
      <p>If you believe your privacy rights have been violated, you may file a complaint with:</p>
      <ul className="list-disc">
        <li>Men's Wellness Centers Privacy Officer (contact above)</li>
        <li>U.S. Department of Health and Human Services, Office for Civil Rights</li>
        <li>Virginia Department of Health</li>
      </ul>
      <p>You will not be retaliated against for filing a complaint.</p>
    </section>

    <section>
      <h2 id="changes">Changes to This Policy</h2>
      <p>We may update this privacy policy to reflect changes in our practices or legal requirements. We will post the updated policy on our website with the effective date. Material changes will be communicated to patients as required by law.</p>
    </section>
  </LegalPageLayout>
);

export default PrivacyPolicy;
