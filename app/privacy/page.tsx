import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for SureEdge Tax & Accounting. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy policy for SureEdge Tax & Accounting.",
    url: "/privacy",
  },
};

export default function Privacy() {
  return (
    <div style={{maxWidth:"780px",margin:"0 auto",padding:"64px 24px"}}>
      <h1 style={{fontSize:"28px",fontWeight:700,color:"#1a2e4a",marginBottom:"6px"}}>Privacy Policy</h1>
      <p style={{fontSize:"12px",color:"#888",marginBottom:"40px"}}>Last updated: April 4, 2026</p>

      <div style={{display:"flex",flexDirection:"column",gap:"32px",fontSize:"13px",color:"#444",lineHeight:1.8}}>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>1. Information We Collect</h2>
          <p style={{marginBottom:"10px"}}>We collect information in two ways: information you provide to us directly, and information collected automatically when you visit our website.</p>
          <p style={{fontWeight:600,color:"#1a2e4a",marginBottom:"4px"}}>Information you provide directly:</p>
          <ul style={{paddingLeft:"20px",marginBottom:"10px"}}>
            <li>Name, email address, and phone number submitted through our contact or quote forms</li>
            <li>Details about your tax situation submitted through intake forms</li>
            <li>Questions or messages submitted through our AI tax assistant chatbot</li>
          </ul>
          <p style={{fontWeight:600,color:"#1a2e4a",marginBottom:"4px"}}>Information collected automatically:</p>
          <ul style={{paddingLeft:"20px"}}>
            <li>IP address of your device when you visit any page on our website</li>
            <li>Approximate geographic location derived from your IP address (city, region, country)</li>
            <li>Pages you visit, referrer URL, and browser/device information</li>
            <li>Questions asked through our AI chatbot and the responses provided</li>
            <li>Usage data collected through Google Analytics (aggregated, anonymized)</li>
          </ul>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>2. How We Use Your Information</h2>
          <p style={{marginBottom:"8px"}}>We use the information we collect to:</p>
          <ul style={{paddingLeft:"20px"}}>
            <li>Respond to your inquiries, prepare tax quotes, and provide our services</li>
            <li>Understand how visitors find and use our website to improve it</li>
            <li>Monitor website traffic patterns and geographic reach</li>
            <li>Detect and prevent abuse or misuse of our AI chatbot</li>
            <li>Apply rate limits to our AI chatbot to ensure fair access</li>
            <li>Analyze which tax topics are most commonly asked about</li>
            <li>Communicate with you about your account or services</li>
          </ul>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>3. AI Chatbot and Automated Data Collection</h2>
          <p style={{marginBottom:"8px"}}>Our website includes an AI-powered tax assistant chatbot. When you use this feature:</p>
          <ul style={{paddingLeft:"20px",marginBottom:"10px"}}>
            <li>Your questions and the AI responses are logged to a secure database</li>
            <li>Your IP address is recorded and used to enforce usage limits (30 questions per day per IP address)</li>
            <li>Your approximate city, region, and country are derived from your IP address using a third-party geolocation service (ip-api.com)</li>
            <li>A Google Analytics event is recorded when you send a message</li>
          </ul>
          <p>The chatbot is powered by Anthropic Claude AI. Questions you submit may be processed by Anthropic in accordance with their privacy policy. The chatbot provides general information only and does not constitute personalized tax advice.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>4. Page Visit Logging</h2>
          <p>When you visit any page on our website, we automatically record your IP address, approximate location (city, region, country), the page you visited, referrer URL, and browser/device information. This data is stored in a secure database and used solely for website analytics and security purposes. We do not use this data to personally identify visitors or share it with third parties for marketing.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>5. Third-Party Services</h2>
          <p style={{marginBottom:"8px"}}>We use the following third-party services that may process data on our behalf:</p>
          <ul style={{paddingLeft:"20px"}}>
            <li><strong>Google Analytics</strong> — aggregated website usage statistics. Data is anonymized and subject to Google&apos;s Privacy Policy.</li>
            <li><strong>Anthropic</strong> — powers our AI tax assistant chatbot. Questions submitted are processed by Anthropic subject to their Privacy Policy.</li>
            <li><strong>ip-api.com</strong> — converts IP addresses to approximate geographic locations (city, region, country). No personal data beyond the IP is shared.</li>
            <li><strong>Supabase</strong> — secure database used to store website analytics and chatbot interaction logs. Data is stored in the United States.</li>
            <li><strong>Web3Forms</strong> — processes contact and quote form submissions and delivers them to our email.</li>
            <li><strong>Vercel</strong> — hosts our website and may log standard web server information including IP addresses.</li>
          </ul>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>6. Data Retention</h2>
          <p>Contact and intake form submissions are retained for as long as necessary to provide our services and comply with legal obligations. Website visit logs and chatbot interaction logs are retained for up to 12 months and then deleted. You may request deletion of your data at any time by contacting us.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>7. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We share information only with the service providers listed in Section 5 above, who are contractually required to protect it, and when required by law or legal process.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>8. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your information, including encrypted connections (HTTPS), access controls, and secure database storage. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>9. Your Rights</h2>
          <p style={{marginBottom:"8px"}}>You have the right to:</p>
          <ul style={{paddingLeft:"20px"}}>
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of non-essential data collection</li>
          </ul>
          <p style={{marginTop:"8px"}}>To exercise any of these rights, contact us at contact@sureedgetax.com.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>10. IRS Circular 230 Disclosure</h2>
          <p>Any tax information on this website, including responses from our AI chatbot, is not intended or written to be used, and cannot be used, by any taxpayer for the purpose of avoiding tax penalties. All content is for general informational purposes only and does not constitute personalized tax advice. Consult a licensed CPA or EA for advice specific to your situation.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. When we do, we will update the date at the top of this page. Continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 style={{fontSize:"15px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>12. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us at <a href="mailto:contact@sureedgetax.com" style={{color:"#b8962e"}}>contact@sureedgetax.com</a>.</p>
        </section>

      </div>
    </div>
  );
}