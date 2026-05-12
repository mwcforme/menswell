import { LegalPageLayout, ComplianceCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const PharmacyPartners = () => (
  <LegalPageLayout
    title="Pharmacy Partners"
    subtitle="Our trusted pharmacy network for compounded and specialty medications."
    path="/pharmacy-partners"
    metaDescription="Men's Wellness Centers partners with licensed, accredited pharmacies for safe, quality prescription fulfillment. 503A/503B compliant compounding."
  >
    <section>
      <h2>Prescription Fulfillment Process</h2>
      <p>When your Men's Wellness Centers provider issues a prescription, it is transmitted electronically to a licensed pharmacy for fulfillment. Our prescription fulfillment process ensures:</p>
      <ul className="list-disc">
        <li>Prescriptions are sent only to properly licensed pharmacies</li>
        <li>Electronic transmission for accuracy and security</li>
        <li>Pharmacist review of all prescriptions</li>
        <li>Quality assurance and medication verification</li>
        <li>Secure packaging and shipping for delivered medications</li>
      </ul>
    </section>

    <section>
      <h2>Compounding Pharmacy Partners</h2>
      <p>For specialized hormone therapies and customized formulations, we partner with licensed compounding pharmacies that maintain the highest standards:</p>
      <ul className="list-disc">
        <li>503A and 503B compliant compounding facilities</li>
        <li>State board of pharmacy licensed</li>
        <li>USP 795/797/800 compliant sterile and non-sterile compounding</li>
        <li>Regular third-party quality testing</li>
        <li>PCAB accreditation or equivalent quality standards</li>
      </ul>
    </section>

    <section>
      <h2>Retail Pharmacy Options</h2>
      <p>For commercially available medications, patients may have prescriptions sent to their preferred retail pharmacy, including:</p>
      <ul className="list-disc">
        <li>National chain pharmacies (CVS, Walgreens, Rite Aid, etc.)</li>
        <li>Grocery store pharmacies</li>
        <li>Independent local pharmacies</li>
        <li>Mail-order pharmacies</li>
      </ul>
    </section>

    <section>
      <h2>Pharmacy Licensing & Accreditation</h2>
      <p>All pharmacies that fulfill prescriptions from Men's Wellness Centers providers must meet these requirements:</p>
      <div className="grid md:grid-cols-2 gap-4 my-4">
        <div className="rounded-lg p-4" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="!mt-0">Required Licensing</h3>
          <ul className="list-disc text-[14px]">
            <li>State Board of Pharmacy license</li>
            <li>DEA registration (if dispensing controlled substances)</li>
            <li>Non-resident pharmacy licenses (for out-of-state pharmacies)</li>
            <li>Licensed pharmacist on staff</li>
          </ul>
        </div>
        <div className="rounded-lg p-4" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="!mt-0">Quality Standards</h3>
          <ul className="list-disc text-[14px]">
            <li>HIPAA compliant operations</li>
            <li>Quality assurance programs</li>
            <li>Proper storage and handling</li>
            <li>Patient safety protocols</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2>VIPPS Accreditation</h2>
      <ComplianceCallout title="Verified Internet Pharmacy Practice Sites">
        <p className="!mb-0">For online/mail-order pharmacy services, we recommend pharmacies that are VIPPS accredited by the National Association of Boards of Pharmacy (NABP), ensuring compliance with state and federal laws and verified licensure.</p>
      </ComplianceCallout>
      <p className="text-[14px]"><a href="https://nabp.pharmacy/programs/digital-pharmacy-accreditation/" target="_blank" rel="noopener noreferrer">Verify NABP Accreditation →</a></p>
    </section>

    <section>
      <h2>Patient Responsibilities</h2>
      <ul className="list-disc">
        <li>Provide accurate contact and shipping information</li>
        <li>Review medications upon receipt for accuracy</li>
        <li>Follow all medication instructions and guidelines</li>
        <li>Report any concerns or adverse reactions to your provider</li>
        <li>Store medications properly as directed</li>
        <li>Do not share prescription medications with others</li>
      </ul>
    </section>

    <section>
      <h2>Questions About Your Prescription</h2>
      <ContactCard />
    </section>
  </LegalPageLayout>
);

export default PharmacyPartners;
