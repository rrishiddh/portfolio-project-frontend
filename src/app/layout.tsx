import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Professional portfolio showcasing web development projects, blog posts, and technical expertise',
  keywords: ['portfolio', 'web development', 'full stack', 'react', 'nextjs', 'nodejs'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio - Full Stack Developer',
    description: 'Professional portfolio showcasing web development projects, blog posts, and technical expertise',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Full Stack Developer',
    description: 'Professional portfolio showcasing web development projects, blog posts, and technical expertise',
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