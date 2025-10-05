import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer & Web Engineer - Rahul Dey",
  description:
    "Welcome to Rahul Dey's professional portfolio showcasing modern web development projects, full stack applications, blog articles, and technical expertise in React, Next.js, Node.js, and more.",
  keywords: [
    "portfolio",
    "web development",
    "full stack developer",
    "React",
    "Next.js",
    "Node.js",
    "frontend",
    "backend",
    "JavaScript",
    "TypeScript",
    "MERN",
    "developer portfolio",
    "software engineer",
    "Rahul Dey",
  ],
  authors: [{ name: "Rahul Dey", url: "https://rahul-dey.vercel.app/" }],
  creator: "Rahul Dey",
  publisher: "Rahul Dey",
  metadataBase: new URL("https://rahul-dey.vercel.app/"),

  alternates: {
    canonical: "https://rahul-dey.vercel.app/",
  },

  openGraph: {
    title: "Portfolio | Full Stack Developer & Web Engineer - Rahul Dey",
    description:
      "Explore Rahul Dey's portfolio featuring real-world web applications, technical blogs, and full stack projects built with React, Next.js, and Node.js.",
    url: "https://rahul-dey.vercel.app/",
    siteName: "Rahul Dey Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://rahul-dey.vercel.app/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Rahul Dey - Full Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Full Stack Developer & Web Engineer - Rahul Dey",
    description:
      "Check out Rahul Dey's professional web development projects, blog posts, and full stack applications built with React, Next.js, and Node.js.",
   
    images: ["https://rahul-dey.vercel.app/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
