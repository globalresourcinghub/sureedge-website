import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import VisitTracker from "@/components/VisitTracker";

const SITE_URL = "https://www.sureedgetax.com";
const DEFAULT_TITLE = "SureEdge Tax & Accounting | Tax Services by a Licensed CPA & EA";
const DEFAULT_DESCRIPTION =
  "Virtual tax preparation, bookkeeping, payroll, and IRS representation — prepared by a licensed Certified Public Accountant and Enrolled Agent on our team. Based in Texas, serving individuals and small businesses nationwide.";
const DEFAULT_OG_IMAGE = "/sureedge-logo-whatsapp.png"; // 1200x630 preferred

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | SureEdge Tax & Accounting",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SureEdge Tax & Accounting",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SureEdge Tax & Accounting",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Organization JSON-LD — helps Google build a Knowledge Graph entity,
  // enables sitelinks, and can surface the brand in search results.
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SureEdge Tax & Accounting",
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    description: DEFAULT_DESCRIPTION,
    email: "contact@sureedgetax.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "TX",
      addressCountry: "US",
    },
    sameAs: [] as string[], // Add social URLs here when available
  };

  // LocalBusiness / ProfessionalService — helps with local-pack eligibility
  const professionalServiceLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "SureEdge Tax & Accounting",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    areaServed: "US",
    serviceType: [
      "Tax Preparation",
      "Bookkeeping",
      "Payroll",
      "Tax Planning",
      "IRS Representation",
    ],
    priceRange: "$$",
  };

  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <VisitTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }}
        />
      </body>
    </html>
  );
}
