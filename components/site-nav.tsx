'use client';

import type { Language } from './use-language';

export function Brand() {
  return (
    <span className="brand-lockup">
      <b>VISTRX AI</b>
    </span>
  );
}

export function SiteNav({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const zh = language === 'zh';
  return (
    <nav className="site-nav" aria-label={zh ? '主导航' : 'Main navigation'}>
      <a href="/#top" aria-label="VISTRX AI home"><Brand /></a>
      <div className="nav-links">
        <a href="/#about">{zh ? '关于' : 'ABOUT'}</a>
        <a href="/business/display">{zh ? '业务' : 'BUSINESS'}</a>
        <a href="/#experience">{zh ? '体验' : 'EXPERIENCE'}</a>
        <a href="/#mission">{zh ? '使命' : 'MISSION'}</a>
      </div>
      <div className="nav-tools">
        <button className="language-toggle" type="button" onClick={() => onLanguageChange(zh ? 'en' : 'zh')} aria-label={zh ? 'Switch to English' : '切换到中文'}>
          <span className={!zh ? 'active' : ''}>EN</span><i>/</i><span className={zh ? 'active' : ''}>中文</span>
        </button>
      </div>
    </nav>
  );
}
