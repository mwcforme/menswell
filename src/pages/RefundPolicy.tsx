import { LegalPageLayout, WarningCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const RefundPolicy = () => (
  <LegalPageLayout
    title="Refund Policy"
    subtitle="Our cancellation and refund policies."
    path="/refund-policy"
    metaDescription="Refund and cancellation policy for Men's Wellness Centers. Consultation fees, medication refunds, appointment cancellations, and billing dispute resolution."
  >
    <section>
      <h2>Consultation Fees</h2>
      <p>Men's Wellness Centers strives to provide fair and transparent pricing for all services:</p>
      <ul className="list-disc">
        <li><strong>Completed Consultations:</strong> Consultation fees are non-refundable once a medical evaluation has been completed, regardless of whether a prescription is issued.</li>
        <li><strong>Cancelled Consultations:</strong> If you cancel your appointment before the consultation begins, you may be eligible for a full refund, subject to our cancellation policy.</li>
      </ul>
    </section>

    <section>
      <h2>Appointment Cancellation Policy</h2>
      <WarningCallout title="24-Hour Notice Required">
        <p className="!mb-0">We request at least 24 hours' notice for appointment cancellations or rescheduling to avoid a cancellation fee.</p>
      </WarningCallout>

      {/* Fee schedule table */}
      <div className="overflow-hidden rounded-lg my-4" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-2 px-4 py-3" style={{ background: "#0D1B2A" }}>
          <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: "#FFFFFF" }}>Notice Given</span>
          <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: "#FFFFFF" }}>Policy</span>
        </div>
        {[
          { notice: "More than 24 hours", policy: "Full refund or reschedule at no charge" },
          { notice: "Less than 24 hours", policy: "Cancellation fee may apply (typically $50 or full consultation fee)" },
          { notice: "No-show", policy: "Full consultation fee charged; future scheduling may be affected" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-2 px-4 py-3" style={{ borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none", background: i % 2 === 0 ? "#F8F7F4" : "#FFFFFF" }}>
            <span className="text-[14px] font-medium" style={{ color: "#000033" }}>{row.notice}</span>
            <span className="text-[14px]" style={{ color: "#555" }}>{row.policy}</span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Medication Refunds</h2>
      <p>Prescription medications are dispensed through our partner pharmacies and are subject to the following policies:</p>
      <ul className="list-disc">
        <li><strong>Before Shipment:</strong> If you contact us before your medication has shipped, we may be able to cancel the order for a full refund.</li>
        <li><strong>After Shipment:</strong> Once medications have shipped, they generally cannot be returned due to pharmaceutical regulations and patient safety requirements.</li>
        <li><strong>Damaged or Incorrect Medications:</strong> Contact us immediately. We will work with our partner pharmacy to resolve the issue.</li>
        <li><strong>Adverse Reactions:</strong> If your provider discontinues your medication, refunds for unused medications are evaluated on a case-by-case basis.</li>
      </ul>
    </section>

    <section>
      <h2>Subscription & Membership Cancellation</h2>
      <ul className="list-disc">
        <li>You may cancel your subscription at any time by contacting our office</li>
        <li>Cancellation will take effect at the end of your current billing period</li>
        <li>No refunds are provided for partial billing periods</li>
        <li>Pending shipments will be processed unless cancelled before shipping</li>
      </ul>
    </section>

    <section>
      <h2>How to Request a Refund</h2>
      <ol className="list-decimal">
        <li>Contact our patient services team by phone or email</li>
        <li>Provide your name, date of service, and reason for refund request</li>
        <li>Our team will review your request and respond within 3-5 business days</li>
        <li>Approved refunds will be processed to the original payment method within 7-10 business days</li>
      </ol>
    </section>

    <section>
      <h2>Insurance & Payment</h2>
      <ul className="list-disc">
        <li>We accept major credit cards, HSA/FSA cards, and other payment methods</li>
        <li>Insurance coverage varies by plan; patients are responsible for understanding their benefits</li>
        <li>If your insurance denies a claim, you are responsible for the full service cost</li>
        <li>Payment plans may be available for qualifying patients</li>
      </ul>
    </section>

    <section>
      <h2>Disputes & Resolution</h2>
      <ul className="list-disc">
        <li>First, contact our billing department to discuss the issue</li>
        <li>We will review your account and work to resolve the matter</li>
        <li>If unresolved, you may submit a formal written complaint</li>
        <li>We aim to resolve all disputes fairly and promptly</li>
      </ul>
    </section>

    <section>
      <h2>Contact Information</h2>
      <ContactCard />
    </section>

    <section>
      <h2>Policy Changes</h2>
      <p>Men's Wellness Centers reserves the right to modify this refund and cancellation policy at any time. Changes will be posted on our website with the updated effective date.</p>
    </section>
  </LegalPageLayout>
);

export default RefundPolicy;
