export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{color:"#1a2e4a"}}>Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 1, 2026</p>

      <div className="flex flex-col gap-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-bold mb-2" style={{color:"#1a2e4a"}}>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including your name, email address, phone number, and details about your tax situation when you submit a quote request, book a consultation, or contact us.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2" style={{color:"#1a2e4a"}}>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, including preparing tax quotes, responding to inquiries, scheduling consultations, and communicating with you about your account.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2" style={{color:"#1a2e4a"}}>3. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and serving you, subject to confidentiality agreements.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2" style={{color:"#1a2e4a"}}>4. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2" style={{color:"#1a2e4a"}}>5. IRS Circular 230 Disclosure</h2>
          <p>Any tax advice contained on this website is not intended or written to be used, and cannot be used, by any taxpayer for the purpose of avoiding tax penalties that may be imposed on the taxpayer.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2" style={{color:"#1a2e4a"}}>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@sureedgetax.com" className="underline" style={{color:"#b8962e"}}>contact@sureedgetax.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
