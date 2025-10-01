import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindstaq AI-Native work management platform",
  description: "Unify your projects, tasks, and team collaboration in one intelligent workspace. MindStaq eliminates technology bloat with AI-powered insights and seamless integration.",
  keywords: ["MindStaq", "work management", "project management", "AI", "team collaboration", "Agile", "Waterfall", "OKR", "hybrid work"],
  authors: [{ name: "Mindstaq team" }],
  openGraph: {
    title: "Mindstaq",
    description: "AI-Native work management platform",
    url: "www.mindstaq.com",
    siteName: "mindstaq.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindstaq AI-Native work management platform",
    description: "Unify your projects, tasks, and team collaboration in one intelligent workspace. MindStaq eliminates technology bloat with AI-powered insights and seamless integration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
