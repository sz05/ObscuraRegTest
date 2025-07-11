// app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import DynamicTitle from "@/components/DynamicTitle";

export const metadata: Metadata = {
  metadataBase: new URL('https://obscura.ccstiet.com'),
  title: "Obscura - Hack The Maze | Creative Computing Society",
  description: "In a fractured realm between logic and sorcery, a rogue demonic entity named Obscura has hijacked the overworld's robotic army. Join the ultimate hacking competition and escape the digital labyrinth. Register now!",
  keywords: [
    "hackathon", "coding competition", "hacking challenge", "cybersecurity", "programming contest",
    "tech event", "Creative Computing Society", "CCS", "Obscura", "digital maze"
  ],
  authors: [{ name: "Creative Computing Society" }],
  creator: "Creative Computing Society",
  publisher: "Creative Computing Society",
  openGraph: {
    title: "Obscura - Hack The Maze | Ultimate Hacking Competition",
    description: "Trapped in a shifting digital labyrinth, you and your team must outwit firewalls, dodge arcane traps, and decode corrupted transmissions. Are you smart enough to escape?",
    url: "https://obscura.ccstiet.com",
    siteName: "Obscura",
    images: [
      {
        url: "/bg_image.png",
        width: 1200,
        height: 630,
        alt: "Obscura - Hack The Maze Competition",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obscura - Hack The Maze | Ultimate Hacking Competition",
    description: "Join the ultimate hacking competition. Escape the digital labyrinth before Obscura's power consumes you!",
    images: ["/bg_image.png"],
    creator: "@ccs_tiet",
  },
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
  verification: {
    google: "your-google-verification-code", // replace this
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        <link
            rel="preload"
            href="/fonts/Megarok.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/GothamXNarrowBold.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                name: "Obscura - Hack The Maze",
                description:
                    "Creative Computing Society's ultimate hacking competition where teams must escape a digital labyrinth",
                organizer: {
                  "@type": "Organization",
                  name: "Creative Computing Society",
                  url: "https://ccstiet.com",
                },
                location: {
                  "@type": "VirtualLocation",
                  url: "https://obscura.ccstiet.com",
                },
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
              }),
            }}
        />
      </head>
      <body>
      <DynamicTitle />
      {children}
      </body>
      </html>
  );
}
