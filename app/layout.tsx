import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const siteName = "Project Atlas";
const siteDescription =
  "Independent reviews, comparisons, and rankings for AI glasses and emerging consumer technology.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        "@id": organizationId,
      },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} | Independent AI Glasses Reviews`,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  applicationName: siteName,

  keywords: [
    "AI glasses",
    "smart glasses",
    "AI glasses reviews",
    "smart glasses reviews",
    "AI glasses comparison",
    "Ray-Ban Meta",
    "Oakley Meta",
    "consumer technology reviews",
    "Project Atlas",
  ],

  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],

  creator: siteName,
  publisher: siteName,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: `${siteName} | Independent AI Glasses Reviews`,
    description: siteDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Independent AI Glasses Reviews`,
    description: siteDescription,
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

  category: "technology",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredData),
          }}
        />

        <div className="flex min-h-screen flex-col">
          <Header />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}