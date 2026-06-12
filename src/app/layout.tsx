import type { Metadata } from "next";
import { AppShell } from "./_components/AppShell";
import "@/index.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Design Gallery";
const description =
  "A curated archive of hardware and design references. explored through live, interactive embedded viewers.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Design Gallery — Curated Hardware & Design Archive",
    template: "%s — Design Gallery",
  },
  description,
  applicationName: siteName,
  authors: [{ name: "Jose Pavas Garzon" }],
  creator: "Jose Pavas Garzon",
  keywords: [
    "design gallery",
    "hardware design",
    "PCB design",
    "3D design",
    "electronics",
    "interactive viewer",
    "engineering portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Design Gallery — Curated Hardware & Design Archive",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Gallery — Curated Hardware & Design Archive",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
