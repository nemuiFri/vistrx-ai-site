import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vistrx.ai'),
  title: 'VISTRX AI · Holographic Display & Spatial Gaming',
  description: 'VISTRX AI delivers medium-based holographic display solutions today and develops medium-free open-air holographic gaming for tomorrow.',
  openGraph: {
    title: 'VISTRX AI · Make Space Visible',
    description: 'Commercial holographic display today. Medium-free spatial gaming tomorrow.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'VISTRX AI holographic display and spatial gaming' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VISTRX AI · Make Space Visible',
    description: 'Commercial holographic display today. Medium-free spatial gaming tomorrow.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
