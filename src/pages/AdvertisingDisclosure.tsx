import { LegalPageLayout, WarningCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const AdvertisingDisclosure = () => (
  <LegalPageLayout
    title="Advertising Disclosure"
    subtitle="How we present our services and manage sponsored content."
    path="/advertising-disclosure"
    metaDescription="Advertising and marketing disclosure for Men's Wellness Centers. FTC and FDA compliant advertising practices, testimonial policies, and pricing transparency."
  >
    <section>
      <h2>FTC Compliance Statement</h2>
      <p>Men's Wellness Centers is committed to transparency in all advertising and marketing communications. We comply with the Federal Trade Commission (FTC) Act, which prohibits unfair or deceptive practices in commerce. All claims made in our marketing materials are truthful, substantiated, and not misleading.</p>
    </section>

    <section>
      <h2>FDA Compliance</h2>
      <p>Our advertising and marketing practices comply with U.S. Food and Drug Administration (FDA) regulations regarding the promotion of prescription medications and medical services:</p>
      <ul className="list-disc">
        <li>We do not make false or misleading claims about medications or treatments</li>
        <li>All prescription medications require evaluation by a licensed healthcare provider</li>
        <li>We clearly identify that a valid prescription is required for prescription medications</li>
        <li>We do not guarantee specific treatment outcomes</li>
        <li>We include appropriate disclaimers and risk information</li>
      </ul>
    </section>

    <section>
      <h2>Medical Claims Disclaimer</h2>
      <WarningCallout title="Important">
        <p className="!mb-2">The information provided on this website and in our marketing materials is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
        <ul className="list-disc pl-5 space-y-1 text-[14px]">
          <li>Individual results may vary based on medical history, health conditions, and response to treatment</li>
          <li>Treatment outcomes are not evidence-based</li>
          <li>All treatment decisions are made by licensed healthcare providers based on individual evaluation</li>
          <li>Prescription medications may have side effects and contraindications</li>
        </ul>
      </WarningCallout>
    </section>

    <section>
      <h2>Testimonials & Reviews</h2>
      <p>When we feature patient testimonials or reviews in our marketing:</p>
      <ul className="list-disc">
        <li>Testimonials reflect the real experiences of actual patients</li>
        <li>Results described in testimonials are not evidence-based and may not be typical</li>
        <li>We do not compensate patients for testimonials unless clearly disclosed</li>
        <li>We do not fabricate or materially alter patient testimonials</li>
        <li>Patient privacy is protected; any identifying information is shared only with consent</li>
      </ul>
      <p className="text-[14px]" style={{ color: "#999" }}><strong>Disclaimer:</strong> Testimonials represent individual experiences. Your results may vary. Consult with a healthcare provider to determine if a treatment is appropriate for you.</p>
    </section>

    <section>
      <h2>Before & After Photos</h2>
      <ul className="list-disc">
        <li>Photos are of actual patients who have provided written consent</li>
        <li>Photos are not digitally altered to exaggerate or misrepresent results</li>
        <li>Photos represent individual results that may not be typical</li>
        <li>We include appropriate disclaimers that individual results may vary</li>
      </ul>
    </section>

    <section>
      <h2>"Results May Vary" Disclaimer</h2>
      <WarningCallout title="Individual Results May Vary">
        <p className="!mb-0">The effectiveness of any treatment depends on many factors including individual health conditions, adherence to treatment plans, genetic factors, lifestyle factors, and overall health status. Results featured in our marketing represent individual experiences and should not be construed as evidence-based outcomes.</p>
      </WarningCallout>
    </section>

    <section>
      <h2>Pricing & Promotions</h2>
      <ul className="list-disc">
        <li>Prices displayed are accurate at the time of publication</li>
        <li>Any promotional pricing includes clear terms and conditions</li>
        <li>We clearly disclose any limitations or exclusions on promotions</li>
        <li>Prices may change without notice; final pricing confirmed at time of service</li>
        <li>Insurance coverage, if applicable, is subject to individual plan terms</li>
      </ul>
    </section>

    <section>
      <h2>Third-Party Endorsements</h2>
      <p>When we feature endorsements from healthcare professionals, experts, or third parties, we disclose any material connections between Men's Wellness Centers and the endorser. Paid endorsements are clearly identified as such.</p>
    </section>

    <section>
      <h2>Social Media & Online Advertising</h2>
      <ul className="list-disc">
        <li>We comply with platform advertising policies (Google, Facebook, Instagram, etc.)</li>
        <li>We include required disclaimers in online advertisements</li>
        <li>We do not target advertisements to minors</li>
        <li>We respect user privacy in accordance with applicable laws</li>
      </ul>
    </section>

    <section>
      <h2>Affiliate Relationships</h2>
      <p>If we participate in affiliate programs or receive compensation for referrals, we will clearly disclose these relationships. Any affiliate links or sponsored content will be identified as such.</p>
    </section>

    <section>
      <h2>Contact for Advertising Concerns</h2>
      <ContactCard />
    </section>
  </LegalPageLayout>
);

export default AdvertisingDisclosure;
