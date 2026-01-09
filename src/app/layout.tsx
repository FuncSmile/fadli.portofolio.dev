import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";

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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
