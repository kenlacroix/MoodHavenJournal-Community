// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MoodHaven Journal",
  description: "A privacy-first journaling app for clarity and calm.",
  openGraph: {
    title: "MoodHaven Journal",
    description: "A warm, secure space for your thoughts.",
    url: "https://moodhaven.app",
    siteName: "MoodHaven",
    images: [
      {
        url: "/icons/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "MoodHaven Journal Screenshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodHaven Journal",
    description: "Reflect. Relax. Recenter.",
    images: ["/icons/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en">
      <head>
        {/* JSON-LD for Organization & WebSite */}
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "MoodHaven Journal",
                url: "https://moodhaven.app",
                logo: "https://moodhaven.app/icons/opengraph-image.png",
              },
              {
                "@type": "WebSite",
                url: "https://moodhaven.app",
                name: "MoodHaven Journal",
                publisher: { "@id": "https://moodhaven.app/#org" },
              },
            ],
          })}
        </Script>
      </head>
      <body
        className={`min-h-screen bg-[#F3F0EA] text-[var(--foreground)] antialiased ${inter.variable}`}
      >
        {/* Skip link for keyboard & screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded shadow"
        >
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-visible">
            <NavBar />
            {/* main gets the skip-link target */}
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
