import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#DC2626' },
    { media: '(prefers-color-scheme: dark)', color: '#DC2626' },
  ],
  width: 'device-width',
  initialScale: 1,
};

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
  metadataBase: new URL('https://ces-links.com'),
  icons: {
    icon: [
      { url: '/links-logo.png', type: 'image/png' },
      { url: '/links-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/links-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/links-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/links-logo.png',
  },
  manifest: '/manifest.json',
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
        url: '/links-logo.png',
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
    images: ['/links-logo.png'],
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
        <link rel="icon" href="/links-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/links-logo.png" />
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
