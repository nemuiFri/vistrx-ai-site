'use client';

import Link from 'next/link';
import type { Language } from './use-language';

export function Brand() {
  return (
    <span className="brand-lockup">
      <i aria-hidden="true" />
      <b>VISTRX AI</b>
    </span>
  );
}

export function SiteNav({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const zh = language === 'zh';
  return (
    <nav className="site-nav" aria-label={zh ? '主导航' : 'Main navigation'}>
      <Link href="/#top" aria-label="VISTRX AI home"><Brand /></Link>
      <div className="nav-links">
        <Link href="/#about">{zh ? '关于我们' : 'ABOUT US'}</Link>
        <Link href="/#experience">{zh ? '两项业务' : 'BUSINESSES'}</Link>
        <Link href="/#mission">{zh ? '使命' : 'MISSION'}</Link>
      </div>
      <div className="nav-tools">
        <button className="language-toggle" type="button" onClick={() => onLanguageChange(zh ? 'en' : 'zh')} aria-label={zh ? 'Switch to English' : '切换到中文'}>
          <span className={!zh ? 'active' : ''}>EN</span><i>/</i><span className={zh ? 'active' : ''}>中文</span>
        </button>
        <Link className="nav-action" href="/#collaborate">{zh ? '成为合作伙伴' : 'PARTNER WITH US'} <span>↗</span></Link>
      </div>
    </nav>
  );
}
