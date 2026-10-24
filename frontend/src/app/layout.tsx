import type { Metadata } from "next";
import TopNavbar from "@/components/commons/TopNavbar";
import Footer from "@/components/commons/Footer";
import CustomCursor from "@/components/commons/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://enticeinnovations.com"),
  title: {
    default: "Entice Innovations | Digital Marketing & IT Consulting",
    template: "%s | Entice Innovations",
  },
  description:
    "Entice Innovations: End-to-end digital solutions — AI consulting, IT strategy, digital marketing, brand building, and tech infrastructure across 12+ industries.",
  keywords: [
    "Entice Innovations",
    "digital marketing India",
    "IT consulting India",
    "AI consulting India",
    "brand building",
    "tech infrastructure",
    "domain hosting",
    "SEO services India",
    "performance marketing",
    "branding services",
    "digital agency Nagercoil",
    "digital agency Tiruvananthapuram",
    "digital marketing Tamil Nadu",
    "digital marketing Kerala",
    "IT consulting Tamil Nadu",
    "digital solutions India",
    "consulting services India",
  ],
  authors: [{ name: "Entice Innovations", url: "https://enticeinnovations.com" }],
  creator: "Entice Innovations",
  publisher: "Entice Innovations",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://enticeinnovations.com",
    siteName: "Entice Innovations",
    title: "Entice Innovations | Digital Marketing & IT Consulting",
    description:
      "End-to-end digital solutions — AI consulting, IT strategy, digital marketing, brand building, and tech infrastructure across 12+ industries.",
    images: [
      {
        url: "/assets/logo/entice-logo.svg",
        width: 1200,
        height: 630,
        alt: "Entice Innovations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entice Innovations | Digital Marketing & IT Consulting",
    description:
      "End-to-end digital solutions — AI consulting, IT strategy, digital marketing, brand building, and tech infrastructure across 12+ industries.",
    images: ["/assets/logo/entice-logo.svg"],
    creator: "@EnticeInnov",
    site: "@EnticeInnov",
  },
  icons: {
    icon: [
      { url: "/assets/logo/entice-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/assets/logo/entice-logo.svg",
    apple: "/assets/logo/entice-logo.svg",
  },
  alternates: {
    canonical: "https://enticeinnovations.com",
  },
  category: "technology",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://enticeinnovations.com/#organization",
      "name": "Entice Innovations",
      "url": "https://enticeinnovations.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://enticeinnovations.com/assets/logo/entice-logo.svg",
        "width": 200,
        "height": 200,
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nagercoil",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 8.1833,
        "longitude": 77.4119,
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9994860392",
        "contactType": "customer service",
        "email": "info@enticeinnovations.com",
        "availableLanguage": ["English", "Tamil"],
        "areaServed": "IN",
      },
      "sameAs": [
        "https://www.instagram.com/enticeinnovations/",
        "https://www.linkedin.com/company/entice-innovations/",
        "https://x.com/EnticeInnov",
      ],
      "description": "End-to-end digital solutions — AI consulting, IT strategy, digital marketing, brand building, and tech infrastructure across India.",
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "City", "name": "Nagercoil" },
        { "@type": "City", "name": "Tiruvananthapuram" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Bangalore" },
        { "@type": "City", "name": "Kochi" },
        { "@type": "City", "name": "Coimbatore" },
        { "@type": "City", "name": "Madurai" },
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "City", "name": "Mumbai" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "Kanyakumari" },
        { "@type": "City", "name": "Trivandrum" },
      ],
      "knowsAbout": [
        "Digital Marketing",
        "IT Consulting",
        "AI Consulting",
        "Brand Building",
        "Tech Infrastructure",
        "Domain & Hosting",
        "Performance Marketing",
        "SEO",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Consulting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Consulting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Building" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tech Infrastructure" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Domain & Hosting" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://enticeinnovations.com/#website",
      "url": "https://enticeinnovations.com",
      "name": "Entice Innovations",
      "description": "Digital Marketing & IT Consulting Partner — Serving all of India",
      "publisher": { "@id": "https://enticeinnovations.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://enticeinnovations.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5KFVMHMF');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,700..900;1,6..96,700..900&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Organization + WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KFVMHMF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <CustomCursor />
        <TopNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
