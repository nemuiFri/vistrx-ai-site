'use client';

import { useEffect, useState } from 'react';

export type Language = 'en' | 'zh';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('vistrx-language');
    if (saved === 'zh' || saved === 'en') setLanguageState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem('vistrx-language', next);
  };

  return { language, setLanguage };
}
