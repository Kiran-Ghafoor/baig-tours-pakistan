import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.baigtourspakistan.pk"),
  title: {
    default: "Baig Tours Pakistan | Trips That Make Stories",
    template: "%s | Baig Tours Pakistan",
  },
  description:
    "Pakistan's premium travel booking platform for Hunza, Skardu, Fairy Meadows, Swat, Naran, Lahore and K2 Base Camp. Handcrafted tours, trusted local guides, effortless booking.",
  keywords: [
    "Pakistan tours",
    "Hunza Valley tour",
    "Skardu tour package",
    "Northern Pakistan travel",
    "K2 base camp trek",
    "Baig Tours Pakistan",
  ],
  openGraph: {
    title: "Baig Tours Pakistan | Trips That Make Stories",
    description:
      "Handcrafted premium tours across Northern Pakistan — Hunza, Skardu, Fairy Meadows, Swat and beyond.",
    url: "https://www.baigtourspakistan.pk",
    siteName: "Baig Tours Pakistan",
    locale: "en_PK",
    type: "website",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: { icon: "/icon.jpg" },
  alternates: {
    canonical: "https://www.baigtourspakistan.pk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-charcoal-950"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
