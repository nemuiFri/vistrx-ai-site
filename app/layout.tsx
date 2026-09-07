import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vistrx-ai-holographic-gaming.wouldulike0621.chatgpt.site'),
  title: 'VISTRX AI · Holographic Gaming System',
  description: '面向游戏行业的裸眼全息互动系统，与游戏、硬件、AI 和场景伙伴共同打造首个可玩体验。',
  openGraph: {
    title: 'VISTRX AI · Step Into the Game',
    description: '面向游戏行业的裸眼全息互动系统。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'VISTRX AI holographic gaming' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VISTRX AI · Step Into the Game',
    description: '面向游戏行业的裸眼全息互动系统。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
