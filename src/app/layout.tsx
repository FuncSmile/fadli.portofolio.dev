import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";

import { Navbar } from "@/components/layout/Navbar";

import { siteConfig } from "@/config/seo.config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@yourusername",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: siteConfig.verification.google,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-white antialiased">
        <LanguageProvider>
          {/* Global Grid background */}
          <div
            className="fixed inset-0 pointer-events-none z-[-1]"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)/0.3) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)/0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          <Navbar />
          <main className="relative z-10">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
