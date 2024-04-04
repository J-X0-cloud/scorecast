import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/data/site";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Scorecast | Live KPI dashboards & TV leaderboards for sales and support",
    template: "%s | Scorecast",
  },
  description:
    "Scorecast turns CRM, phone and helpdesk data into live TV leaderboards, targets and gamified contests for sales and support teams.",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: { type: "website", siteName: "Scorecast" },
};

export const viewport: Viewport = {
  themeColor: "#15111f",
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
