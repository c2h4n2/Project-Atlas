import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const siteName = "Project C2H4N3";

const siteDescription =
  "Independent reviews, comparisons, and rankings for smart tech products and emerging consumer technology.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://project-c2h4n3.vercel.app";

const adsensePublisherId = "ca-pub-2606491312719237";

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
  manifest: "/manifest.webmanifest",
  applicationName: "Project C2H4N3",

  title: {
    default: `${siteName} | Smart Tech Product Search`,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,


  keywords: [
    "smart tech products",
    "technology reviews",
    "product comparisons",
    "AI glasses",
    "smart glasses",
    "headphones",
    "earbuds",
    "smartwatches",
    "laptops",
    "monitors",
    "tablets",
    "TVs",
    "cameras",
    "SSDs",
    "Wi-Fi routers",
    "printers",
    "keyboards",
    "gaming mice",
    "webcams",
    "consumer technology reviews",
    "Project C2H4N3",
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
    title: `${siteName} | Smart Tech Product Search`,
    description: siteDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Smart Tech Product Search`,
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
    <html lang="en">
      <head>
        <Script
          id="adsense-loader"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredData),
          }}
        />
      </head>

      <body className="bg-slate-950 text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B26QWEY6WM"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-B26QWEY6WM');
          `}
        </Script>

        <div className="flex min-h-screen flex-col">
          <Header />

          <div className="flex-1">
            {children}
          </div>

          <Footer />
        </div>

        <BackToTop />
      </body>
    </html>
  );
}
