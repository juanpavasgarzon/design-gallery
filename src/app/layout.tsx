import type { Metadata } from "next";
import { AppShell } from "./_components/AppShell";
import "@/index.css";

export const metadata: Metadata = {
  title: "Design Gallery — Curated UI/UX & Hardware Design Archive",
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
