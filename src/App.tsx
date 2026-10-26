import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import CoordinateBoard from './components/CoordinateBoard';
import SolutionSteps from './components/SolutionSteps';
import CompletingSquareMethod from './components/CompletingSquareMethod';
import PitfallsAndRules from './components/PitfallsAndRules';
import { TrustModals, ModalType } from './components/TrustModals';
import { MathView } from './components/MathView';
import { computeLineDetails, formatFloat, LineCalculations } from './utils/mathUtils';
import { Language, translations } from './utils/i18n';
import { Compass, BookOpenCheck, Layers, Calculator, Sparkles, ShieldCheck, Mail, Info, FileText, FileCode } from 'lucide-react';

export default function App() {
  // Default language is English as required by the user prompt ("默认英语"), with URL query param support for SEO
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && ['en', 'es', 'fr', 'pt', 'zh'].includes(urlLang)) {
        return urlLang as Language;
      }
    }
    return 'en';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newLang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', newLang);
      }
      window.history.replaceState({}, '', url.toString());
      document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang;
    }
  };

  // Central authoritative calculation state (default a=3, b=4)
  const [calc, setCalc] = useState<LineCalculations>(() => computeLineDetails(3, 4));
  const [a, setA] = useState<number>(3);
  const [b, setB] = useState<number>(4);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeSection, setActiveSection] = useState<string>('calculator');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const t = translations[language];

  const handleUpdateIntercepts = (newA: number, newB: number) => {
    setA(newA);
    setB(newB);
    setCalc(computeLineDetails(newA, newB));
  };

  const handleLineCalcChange = (newCalc: LineCalculations) => {
    setCalc(newCalc);
    if (newCalc.kind === 'intercept') {
      setA(newCalc.a);
      setB(newCalc.b);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Direct window.print trigger suppressed or unavailable:', err);
      const printSheet = document.createElement('iframe');
      printSheet.style.position = 'fixed';
      printSheet.style.right = '0';
      printSheet.style.bottom = '0';
      printSheet.style.width = '0';
      printSheet.style.height = '0';
      printSheet.style.border = '0';
      document.body.appendChild(printSheet);
      if (printSheet.contentWindow) {
        printSheet.contentWindow.document.write(document.documentElement.outerHTML);
        printSheet.contentWindow.document.close();
        printSheet.contentWindow.focus();
        printSheet.contentWindow.print();
        setTimeout(() => document.body.removeChild(printSheet), 1000);
      }
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Top Bar Header with Language Selector & Print CTA */}
      <Header
        onPrint={handlePrint}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Print-only Exam Sheet Header (Localized) */}
      <div className="print-header hidden p-6 border-b-2 border-slate-900 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-black tracking-tight">
              {t.print.headerTitle}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {t.print.headerDesc}
            </p>
          </div>
          <div className="text-right text-xs font-mono text-slate-700">
            <div>a = {a}, b = {b}</div>
            <div>{t.print.date} {new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : language)}</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="no-print space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <span>{t.badge.highSchool}</span>
            <span aria-hidden="true">·</span>
            <span>{t.badge.analyticGeometry}</span>
            <span aria-hidden="true">·</span>
            <span>{t.badge.interceptForm}</span>
            <span aria-hidden="true">·</span>
            <span>{t.badge.completingSquare}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            {t.appName}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
            {t.appDescription}
          </p>
        </div>

        {/* Quick KPI Strip / Mathematical Metric Cards (Enlarged Fonts) */}
        {calc.kind !== 'invalid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">
                {calc.kind === 'intercept' ? t.metrics.interceptEq : 'Equation'}
              </span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                <MathView math={calc.interceptLatex || calc.generalForm.latex} />
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.generalEq}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                <MathView math={calc.generalForm.latex} />
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.slopeAndAngle}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                {calc.kind === 'vertical' ? 'k=Undefined · 90°' : `k=${calc.slopeIntercept.kLatex} · ${calc.inclinationLatex}`}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.chordLength}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                {isNaN(calc.segmentLength) ? '—' : formatFloat(calc.segmentLength)}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.triangleArea}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                S = {formatFloat(calc.triangleArea)}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.originDist}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                d = {formatFloat(calc.originDistance)}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{calc.errorMessage || t.validation.emptyA}</span>
          </div>
        )}

        {/* Input Panel with Multi-Mode Solvers and Search Filter */}
        <section id="input-controls" className="no-print">
          <InputPanel
            a={a}
            b={b}
            calc={calc}
            onChange={handleUpdateIntercepts}
            onLineCalcChange={handleLineCalcChange}
            language={language}
            searchKeyword={searchKeyword}
            onSearchChange={setSearchKeyword}
          />
        </section>

        {/* Two-Column Workspace: Left Canvas (Stage), Right Solution Overview (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Geometry Canvas Stage */}
          <section id="canvas" className="lg:col-span-6 space-y-4 print-avoid-break">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-700" />
                <span>{t.canvas.title}</span>
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-mono">
                {calc.kind === 'vertical'
                  ? `x = ${calc.specialConstant ?? calc.a}`
                  : calc.kind === 'horizontal'
                  ? `y = ${calc.specialConstant ?? calc.b}`
                  : calc.kind === 'intercept'
                  ? `A(${calc.a}, 0) · B(0, ${calc.b})`
                  : '—'}
              </span>
            </div>
            <CoordinateBoard
              calc={calc}
              onUpdateIntercepts={handleUpdateIntercepts}
              language={language}
            />
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>{t.canvas.notesTitle}</strong> {t.canvas.notesDesc}
            </div>
          </section>

          {/* Standard Solution Steps */}
          <section id="calculator" className="lg:col-span-6 space-y-4 print-avoid-break">
            <SolutionSteps calc={calc} language={language} />
          </section>
        </div>

        {/* Completing the Square Method (Deep Dive for Intercept Form Lines) */}
        {calc.kind === 'intercept' && (
          <section id="completing-square" className="print-avoid-break">
            <CompletingSquareMethod calc={calc} language={language} />
          </section>
        )}

        {/* Student Pitfalls & Rules */}
        <section id="pitfalls" className="print-avoid-break">
          <PitfallsAndRules language={language} />
        </section>
      </main>

      {/* Comprehensive E-E-A-T Footer with About, Privacy, Terms, Contact & Methodology Modals */}
      <footer className="no-print border-t border-slate-200 mt-14 bg-white text-xs sm:text-sm text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Academic Mission */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold shadow-2xs">
                  x/a
                </span>
                <span>{t.appName}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
                {t.appDescription}
              </p>
              <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50/70 border border-indigo-100 rounded-lg p-2.5 max-w-md">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{t.trust.authorBio}</span>
              </div>
            </div>

            {/* Col 2: Legal & Academic Trust Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {t.trust.about}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => { e.preventDefault(); setActiveModal('about'); }}
                    role="button"
                    className="hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.trust.about}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    onClick={(e) => { e.preventDefault(); setActiveModal('privacy'); }}
                    role="button"
                    className="hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.trust.privacy}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    onClick={(e) => { e.preventDefault(); setActiveModal('terms'); }}
                    role="button"
                    className="hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.trust.terms}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); setActiveModal('contact'); }}
                    role="button"
                    className="hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.trust.contact}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/laohu90/intercept-form-line-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1.5 text-slate-500"
                  >
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    <span>GitHub Repository</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Academic Standards & Features */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Standards
              </h3>
              <ul className="space-y-2 text-xs text-slate-500">
                <li>• {t.footer.standard}</li>
                <li>• {t.footer.latexRendering}</li>
                <li>• {t.footer.pdfExport}</li>
                <li>• Zero-Server Data Storage</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} Formula CalcKit. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>https://intercept-form-line-calculator.formulacalckit.com</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Trust & Academic Policy Modals */}
      <TrustModals
        type={activeModal}
        onClose={() => setActiveModal(null)}
        language={language}
      />
    </div>
  );
}
