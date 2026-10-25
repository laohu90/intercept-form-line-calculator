import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import CoordinateBoard from './components/CoordinateBoard';
import SolutionSteps from './components/SolutionSteps';
import CompletingSquareMethod from './components/CompletingSquareMethod';
import PitfallsAndRules from './components/PitfallsAndRules';
import { MathView } from './components/MathView';
import { computeLineDetails, formatFloat } from './utils/mathUtils';
import { Language, translations } from './utils/i18n';
import { Compass, BookOpenCheck, Layers, Calculator, Sparkles } from 'lucide-react';

export default function App() {
  // Default language is English as required by the user prompt ("默认英语")
  const [language, setLanguage] = useState<Language>('en');

  // Default parameters: 3, 4
  const [a, setA] = useState<number>(3);
  const [b, setB] = useState<number>(4);
  const [activeSection, setActiveSection] = useState<string>('calculator');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const t = translations[language];

  // Compute all line details
  const calc = useMemo(() => computeLineDetails(a, b), [a, b]);

  const handleUpdateIntercepts = (newA: number, newB: number) => {
    setA(newA);
    setB(newB);
  };

  const handlePrint = () => {
    window.print();
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
        onLanguageChange={setLanguage}
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
        {calc.isValidIntercept && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.interceptEq}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                <MathView math={calc.interceptLatex} />
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
                k={calc.slopeIntercept.kLatex} · {calc.inclinationLatex}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">{t.metrics.chordLength}</span>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 truncate mt-1.5">
                {formatFloat(calc.segmentLength)}
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
        )}

        {/* Input Panel with Multi-Mode Solvers and Search Filter */}
        <section id="input-controls" className="no-print">
          <InputPanel
            a={a}
            b={b}
            calc={calc}
            onChange={handleUpdateIntercepts}
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
                A({a}, 0) · B(0, {b})
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

        {/* Completing the Square Method (Deep Dive) */}
        <section id="completing-square" className="print-avoid-break">
          <CompletingSquareMethod calc={calc} language={language} />
        </section>

        {/* Student Pitfalls & Rules */}
        <section id="pitfalls" className="print-avoid-break">
          <PitfallsAndRules language={language} />
        </section>
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="no-print border-t border-slate-200 mt-14 py-8 bg-white text-xs sm:text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-800">{t.appName}</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.desc}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>{t.footer.standard}</span>
            <span>{t.footer.latexRendering}</span>
            <span>{t.footer.pdfExport}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
