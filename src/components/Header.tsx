import React from 'react';
import { Printer, Globe } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface HeaderProps {
  onPrint: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGE_LABELS: Record<Language, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
  fr: { label: 'Français', flag: '🇫🇷' },
  pt: { label: 'Português', flag: '🇧🇷' },
  zh: { label: '简体中文', flag: '🇨🇳' },
};

export const Header: React.FC<HeaderProps> = ({
  onPrint,
  activeSection,
  onNavigate,
  language,
  onLanguageChange,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold shadow-2xs">
            x/a
          </span>
          <span className="truncate max-w-[200px] sm:max-w-xs md:max-w-none">{t.appName}</span>
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeSection === 'calculator' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            {t.nav.solver}
          </button>
          <button
            onClick={() => onNavigate('completing-square')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeSection === 'completing-square' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            {t.nav.completingSquare}
          </button>
          <button
            onClick={() => onNavigate('canvas')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeSection === 'canvas' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            {t.nav.canvas}
          </button>
          <button
            onClick={() => onNavigate('pitfalls')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeSection === 'pitfalls' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            {t.nav.pitfalls}
          </button>
        </nav>

        {/* Zone 3: Language Selector & Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <label htmlFor="lang-select" className="sr-only">Select Language</label>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/60">
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                id="lang-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                aria-label="Language selector"
                className="bg-transparent text-xs font-medium text-slate-800 cursor-pointer focus:outline-none pr-1"
              >
                {(Object.keys(LANGUAGE_LABELS) as Language[]).map((langKey) => (
                  <option key={langKey} value={langKey}>
                    {LANGUAGE_LABELS[langKey].flag} {LANGUAGE_LABELS[langKey].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onPrint}
            className="primary-cta px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.exportPdf}</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
