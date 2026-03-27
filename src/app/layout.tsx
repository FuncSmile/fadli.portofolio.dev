import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";

import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Fadli — Portfolio",
  description: "Modern, interactive portfolio with 3D experience and GitHub integration.",
  openGraph: {
    title: "Fadli — Portfolio",
    description: "Modern, interactive portfolio with 3D experience and GitHub integration.",
    type: "website"
  },
  metadataBase: new URL("https://example.com")
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
