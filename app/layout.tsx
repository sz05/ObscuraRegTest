// app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import DynamicTitle from "@/components/DynamicTitle";
import AuthProvider from "./_components/AuthContext";
import { Toaster } from "sonner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://checkmate.ccstiet.com"),
  title: "Checkmate - Hack The Maze | Creative Computing Society",
  description:
    "Where logic collides with sorcery, the rogue mastermind Checkmate has seized control of the overworld’s robotic legions. Enter the ultimate hacking gauntlet, navigate the digital labyrinth, and claim your triumph. Register now — the battle begins.",
  keywords: [
    "hackathon",
    "coding competition",
    "hacking challenge",
    "cybersecurity",
    "programming contest",
    "tech event",
    "Creative Computing Society",
    "CCS",
    "Checkmate",
    "digital maze",
  ],
  authors: [{ name: "Creative Computing Society" }],
  creator: "Creative Computing Society",
  publisher: "Creative Computing Society",
  openGraph: {
    title: "Checkmate - Hack The Maze | Ultimate Hacking Competition",
    description:
      "Trapped in a shifting digital labyrinth, you and your team must outwit firewalls, dodge arcane traps, and decode corrupted transmissions. Are you smart enough to escape?",
    url: "https://checkmate.ccstiet.com",
    siteName: "Checkmate",
    images: [
      {
        url: "/bg_image.png",
        width: 1200,
        height: 630,
        alt: "Checkmate - Hack The Maze Competition",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkmate - Hack The Maze | Ultimate Hacking Competition",
    description:
      "Join the ultimate hacking competition. Escape the digital labyrinth before Checkmate's power consumes you!",
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
    google: "your-google-verification-code",
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
          href="/fonts/GothamXNarrowBold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {/* <script src="/level/syrinx_lvl1.js"></script> */}
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "checkmate - Hack The Maze",
              description:
                "Creative Computing Society's ultimate hacking competition where teams must escape a digital labyrinth",
              organizer: {
                "@type": "Organization",
                name: "Creative Computing Society",
                url: "https://ccstiet.com",
              },
              location: {
                "@type": "VirtualLocation",
                url: "https://checkmate.ccstiet.com",
              },
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OnlineEventAttendanceMode",
            }),
          }}
        />
      </head>

      <body>
        {/* <Script src="/level/syrinx_lvl1.js" strategy="beforeInteractive" /> */}
        <DynamicTitle />
        <AuthProvider>
          {children}
          <Toaster
            richColors
            position="top-right"
            // position="top-right"
            // autoClose={3000}
            // hideProgressBar={false}
            // newestOnTop={true}
            // closeOnClick
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
            theme="dark"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
