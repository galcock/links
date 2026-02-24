import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'LINKS - Comprehensive Education System',
    template: '%s | LINKS CES',
  },
  description:
    'LINKS is the world\'s first Comprehensive Education System - a unified, cloud-based platform replacing fragmented education software with a single, student-centered portal.',
  keywords: [
    'education',
    'learning management',
    'student information system',
    'school software',
    'CES',
    'education platform',
  ],
  authors: [{ name: 'CES Links', url: 'https://ces-links.com' }],
  creator: 'Dr. Marie Alcock',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ces-links.com',
    siteName: 'LINKS CES',
    title: 'LINKS - Comprehensive Education System',
    description:
      'The world\'s first unified education platform serving students, instructors, parents, and administrators.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LINKS CES',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINKS - Comprehensive Education System',
    description:
      'The world\'s first unified education platform serving students, instructors, parents, and administrators.',
    images: ['/og-image.png'],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body
        className={cn(
          inter.variable,
          'min-h-screen bg-background font-sans antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
