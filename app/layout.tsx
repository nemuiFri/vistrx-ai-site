import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vistrx-ai-holographic-gaming.wouldulike0621.chatgpt.site'),
  title: 'VISTRX AI · Holographic Gaming System',
  description: 'VISTRX AI is building open-air holographic games controlled by player position, viewpoint and movement.',
  openGraph: {
    title: 'VISTRX AI · Step Into the Game',
    description: 'Open-air holographic games controlled by player position, viewpoint and movement.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'VISTRX AI holographic gaming' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VISTRX AI · Step Into the Game',
    description: 'Open-air holographic games controlled by player position, viewpoint and movement.',
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
