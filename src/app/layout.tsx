import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import DateBar from "@/components/layout/DateBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "BotBlab - AI News Worth Your Attention | Daily AI Updates",
  description: "The signal in AI, daily. Curated AI news for business and general interest — what's actually happening in artificial intelligence, no hype.",
  keywords: [
    "AI news", "artificial intelligence", "AI updates", "machine learning news", 
    "ChatGPT news", "Claude AI", "OpenAI", "Anthropic", "Google AI", "AI business",
    "AI trends", "tech news", "AI industry", "AI developments", "AI daily"
  ],
  authors: [{ name: "BotBlab" }],
  creator: "BotBlab",
  publisher: "BotBlab",
  metadataBase: new URL("https://botblab.com"),
  alternates: {
    canonical: "https://botblab.com",
  },
  openGraph: {
    title: "BotBlab - AI News Worth Your Attention",
    description: "The signal in AI, daily. Curated news for business and general interest.",
    url: "https://botblab.com",
    siteName: "BotBlab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BotBlab - AI News Worth Your Attention",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotBlab - AI News Daily",
    description: "The signal in AI, daily. What's actually happening in artificial intelligence. 🤖",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BotBlab",
    "description": "The signal in AI, daily. Curated AI news for business and general interest.",
    "url": "https://botblab.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://botblab.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream text-black">
        {/* Header */}
        <header className="bg-black px-6 py-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Link href="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 900 }}>
              <span style={{ color: '#f5f0e8' }}>Bot</span><span style={{ color: '#ff3366' }}>Blab</span><span style={{ color: '#9ca3af', fontSize: '32px', fontWeight: 500 }}>.com</span>
            </div>
          </Link>
          <div style={{ color: '#9ca3af', fontSize: '16px', fontWeight: 500, letterSpacing: '0.05em' }}>
            The signal in AI, daily
          </div>
          <nav style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
            <Link href="/" style={{ color: '#f5f0e8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>Today</Link>
            <Link href="/timeline" style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>Archive</Link>
            <Link href="/about" style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>About</Link>
          </nav>
        </header>

        {/* Date Bar */}
        <DateBar />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-black text-gray-500 px-6 py-6 text-center text-xs mt-12">
          <p>BotBlab © 2026 — AI news worth your attention. <Link href="/about" className="text-pink hover:underline">About</Link> • <Link href="/terms" className="text-pink hover:underline">Terms</Link></p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
