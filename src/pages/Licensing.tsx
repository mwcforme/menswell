import { LegalPageLayout, ComplianceCallout, ContactCard } from "@/components/legal/LegalPageLayout";

const Licensing = () => (
  <LegalPageLayout
    title="Licensing & Accreditation"
    subtitle="Our clinical certifications and regulatory compliance."
    path="/licensing"
    metaDescription="Licensing, credentials, and regulatory compliance information for Men's Wellness Centers. CLIA certified, LegitScript verified, HIPAA compliant."
  >
    <section>
      <h2>Business Information</h2>
      <div className="rounded-xl my-4" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.08)", padding: "20px 24px" }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-[13px]" style={{ color: "#999" }}>Legal Entity</p>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>Men's Wellness Centers, LLC</p>
          </div>
          <div>
            <p className="text-[13px]" style={{ color: "#999" }}>State of Incorporation</p>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>Virginia</p>
          </div>
          <div>
            <p className="text-[13px]" style={{ color: "#999" }}>Primary Location</p>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>4050 Innslake Dr, Suite 360, Glen Allen, VA 23060</p>
          </div>
          <div>
            <p className="text-[13px]" style={{ color: "#999" }}>Contact</p>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>
              <a href="tel:+18663444955">866-344-4955</a>
            </p>
          </div>
          <div>
            <p className="text-[13px]" style={{ color: "#999" }}>Email</p>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>info@menswellnesscenters.com</p>
          </div>
          <div>
            <p className="text-[13px]" style={{ color: "#999" }}>Website</p>
            <p className="font-semibold text-[15px]" style={{ color: "#000033" }}>menswellnesscenters.com</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Ownership & Affiliates Disclosure</h2>
      <p>In compliance with healthcare transparency standards, we provide the following ownership and affiliate disclosures:</p>
      <div className="space-y-3 my-4">
        {[
          { title: "Business Ownership", text: "Men's Wellness Centers, LLC is a Virginia-registered limited liability company. Ownership and principal information is on file with the Virginia State Corporation Commission and available upon request for regulatory purposes." },
          { title: "Medical Practice", text: "Medical services are provided by licensed healthcare providers who maintain independent medical judgment in all patient care decisions. All medical staff are W-2 employees or properly credentialed contractors of Men's Wellness Centers." },
          { title: "Affiliate Pharmacies", text: "We partner with licensed, accredited pharmacies for prescription fulfillment. All partner pharmacies are independently licensed, regulated, and compliant with applicable state and federal pharmacy laws." },
          { title: "Disclosure Statement", text: "Men's Wellness Centers, its owners, and affiliates are not involved in any business practices that violate applicable healthcare laws or regulations." },
        ].map((item) => (
          <div key={item.title} className="rounded-lg p-4" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 className="!mt-0 !mb-1">{item.title}</h3>
            <p className="text-[14px] !mb-0" style={{ color: "#666" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Virginia State Licensing</h2>
      <p>All healthcare providers at Men's Wellness Centers maintain active, unrestricted medical licenses in the Commonwealth of Virginia:</p>
      <div className="space-y-3 my-4">
        {[
          { title: "Virginia Board of Medicine", sub: "All physicians licensed and in good standing" },
          { title: "DEA Registration", sub: "Controlled substance prescribing authority" },
          { title: "Virginia PMP Participation", sub: "Prescription Monitoring Program compliance" },
        ].map((item) => (
          <ComplianceCallout key={item.title} title={item.title}>
            <p className="!mb-0 text-[14px]">{item.sub} — Active & Current</p>
          </ComplianceCallout>
        ))}
      </div>
    </section>

    <section>
      <h2>Center Locations</h2>
      <div className="grid md:grid-cols-3 gap-3 my-4">
        {[
          { city: "Richmond", addr: "4050 Innslake Dr, Suite 360\nGlen Allen, VA 23060", phone: "(804) 346-4636" },
          { city: "Newport News", addr: "827 Diligence Drive, Suite 206\nNewport News, VA 23606", phone: "(757) 806-6263" },
          { city: "Virginia Beach", addr: "996 First Colonial Road\nVirginia Beach, VA 23454", phone: "(757) 806-6263" },
        ].map((loc) => (
          <div key={loc.city} className="rounded-lg p-4" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="font-semibold text-[15px] mb-1" style={{ color: "#000033" }}>{loc.city}</p>
            <p className="text-[13px] whitespace-pre-line mb-1" style={{ color: "#666" }}>{loc.addr}</p>
            <p className="text-[13px]" style={{ color: "#666" }}>{loc.phone}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Healthcare Providers</h2>
      <p>Our medical team consists of board-certified physicians and licensed healthcare providers specializing in men's health. All providers:</p>
      <ul className="list-disc">
        <li>Hold active, unrestricted Virginia medical licenses</li>
        <li>Are board-certified in their respective specialties</li>
        <li>Maintain current DEA registrations (where applicable)</li>
        <li>Complete required continuing medical education</li>
        <li>Have no disciplinary actions or restrictions on their licenses</li>
      </ul>
      <p><a href="/providers">View our medical team →</a></p>
    </section>

    <section>
      <h2>Regulatory Compliance</h2>
      <h3>Compliance Standards</h3>
      <p>Men's Wellness Centers operates in compliance with all applicable federal and Virginia state regulations for medical practice, including HIPAA privacy regulations, prescription drug laws, and all applicable healthcare regulations.</p>

      <h3>Regulatory Bodies</h3>
      <ul className="list-disc">
        <li>Virginia Board of Medicine</li>
        <li>Drug Enforcement Administration (DEA)</li>
        <li>Virginia Department of Health</li>
        <li>Virginia Board of Pharmacy (Partner Pharmacies)</li>
      </ul>
    </section>

    <section>
      <h2>Disciplinary History</h2>
      <ComplianceCallout title="Clean Record">
        <p className="!mb-0">Men's Wellness Centers and its healthcare providers have no disciplinary actions, sanctions, or restrictions on their medical licenses.</p>
      </ComplianceCallout>
    </section>

    <section>
      <h2>Verification</h2>
      <p>All provider licenses and credentials can be verified through:</p>
      <ul className="list-disc">
        <li><a href="https://www.dhp.virginia.gov/medicine/" target="_blank" rel="noopener noreferrer">Virginia Board of Medicine - License Lookup →</a></li>
        <li><a href="https://www.deadiversion.usdoj.gov/drugreg/reg_apps/onlineforms_new.htm" target="_blank" rel="noopener noreferrer">DEA Registration Verification →</a></li>
      </ul>
      <ContactCard />
    </section>
  </LegalPageLayout>
);

export default Licensing;
