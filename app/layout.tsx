import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vistrx-ai-holographic-gaming.wouldulike0621.chatgpt.site'),
  title: 'VISTRX AI · Holographic Gaming System',
  description: 'A glasses-free holographic gaming system that turns physical space into responsive gameplay.',
  openGraph: {
    title: 'VISTRX AI · Step Into the Game',
    description: 'A glasses-free holographic gaming system that turns physical space into responsive gameplay.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'VISTRX AI holographic gaming' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VISTRX AI · Step Into the Game',
    description: 'A glasses-free holographic gaming system that turns physical space into responsive gameplay.',
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
