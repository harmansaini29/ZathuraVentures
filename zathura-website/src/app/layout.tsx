import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Zathura Ventures — Crafting Tomorrow's Brands",
  description:
    "Zathura Ventures builds brands and provides secure end-to-end websites, applications, software solutions, and advanced technology services. Transforming ideas into scalable digital solutions.",
  keywords: [
    "Zathura Ventures",
    "web development",
    "app development",
    "software solutions",
    "brand building",
    "AI solutions",
    "cloud systems",
    "startup",
    "technology company",
  ],
  authors: [{ name: "Zathura Ventures" }],
  creator: "Zathura Ventures",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zathuraventures.com",
    siteName: "Zathura Ventures",
    title: "Zathura Ventures — Crafting Tomorrow's Brands",
    description:
      "Crafting Tomorrow's Brands with Calm, Clarity and a Heartbeat of Legacy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zathura Ventures",
    description: "Crafting Tomorrow's Brands with Calm, Clarity and a Heartbeat of Legacy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
