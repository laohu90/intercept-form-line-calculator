import React from 'react';
import { CheckCircle2, ChevronRight, Award, AlertTriangle, Sparkles } from 'lucide-react';
import { MathView } from './MathView';
import { LineCalculations, rationalToLatex, formatFloat } from '../utils/mathUtils';
import { Language, translations } from '../utils/i18n';

interface SolutionStepsProps {
  calc: LineCalculations;
  language: Language;
}

export const SolutionSteps: React.FC<SolutionStepsProps> = ({ calc, language }) => {
  const t = translations[language];

  // Localized quadrant names
  const quadrantNamesByLang: Record<Language, string[]> = {
    en: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
    es: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    fr: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
    pt: ['Quadrante I', 'Quadrante II', 'Quadrante III', 'Quadrante IV'],
    zh: ['第一象限', '第二象限', '第三象限', '第四象限'],
  };

  const quadrantNames = quadrantNamesByLang[language];

  // Case 1: Invalid / Empty input state
  if (calc.kind === 'invalid') {
    return (
      <div className="bg-white rounded-xl border border-rose-200 p-6 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{t.steps.errorTitle}</span>
        </h3>
        <p className="text-sm text-rose-700 leading-relaxed font-medium">
          {calc.errorMessage || t.steps.errorDesc}
        </p>
        <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-100 text-xs text-rose-800 leading-relaxed">
          {t.input.invalidWarning}
        </div>
      </div>
    );
  }

  // Case 2: Vertical Line (x = c, slope undefined, alpha = 90 deg)
  if (calc.kind === 'vertical') {
    const c = calc.specialConstant ?? calc.a;
    const passedQuadrantsStr = calc.quadrants.map((q) => quadrantNames[q - 1]).join(', ');
    return (
      <div className="bg-white rounded-xl border border-blue-200 p-5 sm:p-6 shadow-xs space-y-6">
        {/* Header */}
        <div className="border-b border-blue-100 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.specialLines.verticalBadge}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.specialLines.verticalTitle.replace('{c}', c.toString())}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.steps.subtitle}
            </p>
          </div>
          <div className="text-base font-mono font-bold text-blue-900 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
            <MathView math={`x = ${c}`} />
          </div>
        </div>

        {/* Step 1: Slope & Angle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono">
              1
            </span>
            <span>{t.steps.step4Title}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <p>{t.specialLines.verticalSlope}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-slate-500 text-xs block">{t.steps.step4SlopeFormula}</span>
                <div className="font-mono text-sm font-semibold text-rose-700 mt-1">
                  <MathView math="k = \frac{\Delta y}{0} \implies \text{Undefined}" />
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-slate-500 text-xs block">{t.steps.step4AngleFormula}</span>
                <div className="font-mono text-sm font-semibold text-slate-900 mt-1">
                  <MathView math="\alpha = 90^\circ \; (\frac{\pi}{2}\text{ rad})" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Intercepts & Why Intercept Form Fails */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono">
              2
            </span>
            <span>{t.steps.step1Title} &amp; {t.steps.step2Title}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <p>{t.specialLines.verticalIntercepts.replace('{c}', c.toString())}</p>
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.specialLines.verticalWhyNotIntercept}</span>
              </div>
              <div className="text-xs text-amber-800 font-mono py-1">
                <MathView math={`\\frac{x}{${c}} + \\frac{y}{\\text{undefined}} \\neq 1`} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: General Form */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono">
              3
            </span>
            <span>{t.steps.step3Title}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <p>{t.specialLines.verticalGeneral.replace('{c}', c.toString())}</p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-base font-bold text-slate-900 inline-block shadow-2xs">
                <MathView math={calc.generalForm.latex} />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                A = 1, B = 0, C = -{c}
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Distance from Origin & Quadrants */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono">
              4
            </span>
            <span>{t.steps.step5Title} &amp; {t.steps.step6Title}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="text-xs font-bold text-slate-800">{t.metrics.originDist}</span>
                <p className="text-xs text-slate-600">{t.specialLines.verticalDistance.replace('{c}', c.toString())}</p>
                <div className="font-mono text-sm font-semibold text-slate-900 mt-1">
                  <MathView math={`d = |${c}| = ${Math.abs(c)}`} />
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="text-xs font-bold text-slate-800">{t.steps.step6Title}</span>
                <div className="flex items-center gap-1.5 text-slate-700 text-xs mt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.steps.step6Passes} <strong>{passedQuadrantsStr}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Horizontal Line (y = d, slope k = 0, alpha = 0 deg)
  if (calc.kind === 'horizontal') {
    const d = calc.specialConstant ?? calc.b;
    const passedQuadrantsStr = calc.quadrants.map((q) => quadrantNames[q - 1]).join(', ');
    return (
      <div className="bg-white rounded-xl border border-indigo-200 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="border-b border-indigo-100 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.specialLines.horizontalBadge}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.specialLines.horizontalTitle.replace('{d}', d.toString())}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.steps.subtitle}
            </p>
          </div>
          <div className="text-base font-mono font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-lg">
            <MathView math={`y = ${d}`} />
          </div>
        </div>

        {/* Step 1: Slope & Angle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              1
            </span>
            <span>{t.steps.step4Title}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <p>{t.specialLines.horizontalSlope}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-slate-500 text-xs block">{t.steps.step4SlopeFormula}</span>
                <div className="font-mono text-sm font-semibold text-slate-900 mt-1">
                  <MathView math="k = 0" />
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-slate-500 text-xs block">{t.steps.step4AngleFormula}</span>
                <div className="font-mono text-sm font-semibold text-slate-900 mt-1">
                  <MathView math="\alpha = 0^\circ" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Intercepts & Why Intercept Form Fails */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              2
            </span>
            <span>{t.steps.step1Title} &amp; {t.steps.step2Title}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <p>{t.specialLines.horizontalIntercepts.replace('{d}', d.toString())}</p>
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.specialLines.horizontalWhyNotIntercept}</span>
              </div>
              <div className="text-xs text-amber-800 font-mono py-1">
                <MathView math={`\\frac{x}{\\text{undefined}} + \\frac{y}{${d}} \\neq 1`} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: General Form & Origin Distance */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              3
            </span>
            <span>{t.steps.step3Title} &amp; {t.metrics.originDist}</span>
          </div>
          <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center space-y-2">
              <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-base font-bold text-slate-900 inline-block shadow-2xs">
                <MathView math={calc.generalForm.latex} />
              </div>
              <p className="text-xs text-slate-500">
                A = 0, B = 1, C = -{d} · {t.specialLines.horizontalDistance.replace('{d}', d.toString())}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 4: Line Passes Through Origin (a=0, b=0, y=kx)
  if (calc.kind === 'origin') {
    const kStr = calc.slopeIntercept.kLatex || 'k';
    return (
      <div className="bg-white rounded-xl border border-purple-200 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="border-b border-purple-100 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{t.specialLines.originBadge}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.specialLines.originTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.steps.subtitle}
            </p>
          </div>
          <div className="text-base font-mono font-bold text-purple-900 bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg">
            <MathView math={calc.slopeIntercept.latex || `y = ${kStr}x`} />
          </div>
        </div>

        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 space-y-2 leading-relaxed">
          <div className="font-semibold flex items-center gap-1.5 text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.specialLines.originWhyNotIntercept}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700">
            {t.specialLines.originSlope.replace('{k}', kStr)}
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <span className="text-xs font-bold text-slate-800">{t.steps.step3Title}</span>
          <div className="font-mono text-sm sm:text-base font-semibold text-slate-900">
            <MathView math={calc.generalForm.latex} />
          </div>
        </div>
      </div>
    );
  }

  const { a, b, aRat, bRat, slope } = calc;
  const passedQuadrantsStr = calc.quadrants.map((q) => quadrantNames[q - 1]).join(', ');
  const missedQuadrantStr = quadrantNames[calc.missedQuadrant - 1];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-800 shrink-0" />
            <span>{t.steps.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            {t.steps.subtitle}
          </p>
        </div>
        <div className="text-xs sm:text-sm font-mono text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          {t.steps.given} <span className="font-semibold text-slate-900">a = {a}</span>,{' '}
          <span className="font-semibold text-slate-900">b = {b}</span>
        </div>
      </div>

      {/* Pythagorean Triple Bonus Badge */}
      {calc.isPythagorean && (
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center gap-2 text-xs sm:text-sm text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-medium">{t.steps.pythagoreanBonus} ({Math.abs(a)} - {Math.abs(b)} - {formatFloat(calc.segmentLength)})</span>
        </div>
      )}

      {/* Step 1: Intersection points */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">
            1
          </span>
          <span>{t.steps.step1Title}</span>
        </div>
        <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2.5 leading-relaxed">
          <p>{t.steps.step1Desc}</p>
          <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3.5 space-y-2">
            <p className="text-slate-800 font-semibold">{t.steps.step1Coords}</p>
            <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-slate-900">
              <div className="bg-white px-3 py-1.5 rounded border border-slate-200">
                <MathView math={`A(${a}, 0)`} />
              </div>
              <div className="bg-white px-3 py-1.5 rounded border border-slate-200">
                <MathView math={`B(0, ${b})`} />
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1 leading-relaxed">
              {t.steps.step1Warning} (OA = |{a}| = {Math.abs(a)}, OB = |{b}| = {Math.abs(b)})
            </p>
          </div>
        </div>
      </div>

      {/* Step 2: Formulate Intercept Form */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">
            2
          </span>
          <span>{t.steps.step2Title}</span>
        </div>
        <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
          <p>{t.steps.step2Desc}</p>
          <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-lg text-center space-y-2">
            <div className="text-base">
              <MathView math="\frac{x}{a} + \frac{y}{b} = 1" display />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">{t.steps.step2Substitute}</p>
            <div className="text-base font-semibold text-slate-900 font-mono">
              <MathView math={calc.interceptLatex} display />
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: General Form Conversion */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">
            3
          </span>
          <span>{t.steps.step3Title}</span>
        </div>
        <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
          <p>{t.steps.step3Desc}</p>
          <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-lg space-y-2">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-mono text-base font-bold text-slate-900 shadow-2xs">
              <MathView math={calc.generalForm.latex} />
            </div>
            <p className="text-xs text-slate-500">
              {t.steps.step3Coeffs.replace('{A}', calc.generalForm.A.toString()).replace('{B}', calc.generalForm.B.toString()).replace('{C}', calc.generalForm.C.toString())}
            </p>
          </div>
        </div>
      </div>

      {/* Step 4: Slope and Angle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">
            4
          </span>
          <span>{t.steps.step4Title}</span>
        </div>
        <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
          <p>{t.steps.step4Desc}</p>
          <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-lg space-y-3">
            <div className="text-center font-mono text-sm sm:text-base font-medium">
              <MathView math={calc.slopeIntercept.latex} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 text-xs">{t.steps.step4SlopeFormula}</span>
                <div className="font-mono text-sm sm:text-base font-semibold text-slate-900">
                  <MathView math={`k = -\\frac{b}{a} = -\\frac{${formatFloat(b)}}{${formatFloat(a)}} = ${calc.slopeIntercept.kLatex}`} />
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 text-xs">{t.steps.step4AngleFormula}</span>
                <div className="font-mono text-sm sm:text-base font-semibold text-slate-900">
                  <MathView math={`\\alpha \\approx ${calc.inclinationLatex}`} />
                  <span className="text-xs font-normal text-slate-500 ml-2">
                    {slope > 0 ? t.steps.step4Acute : slope < 0 ? t.steps.step4Obtuse : t.steps.step4Horizontal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: Segment Length & Area */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">
            5
          </span>
          <span>{t.steps.step5Title}</span>
        </div>
        <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-lg space-y-1">
              <span className="text-xs font-bold text-slate-800">{t.steps.step5Length}</span>
              <p className="text-xs text-slate-500">{t.steps.step5LengthFormula}</p>
              <div className="font-mono text-sm font-semibold text-slate-900 mt-1">
                <MathView math={`|AB| = \\sqrt{a^2 + b^2} = ${calc.segmentLengthLatex}`} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-lg space-y-1">
              <span className="text-xs font-bold text-slate-800">{t.steps.step5Area}</span>
              <p className="text-xs text-slate-500">{t.steps.step5AreaFormula}</p>
              <div className="font-mono text-sm font-semibold text-slate-900 mt-1">
                <MathView math={`S_{\\triangle AOB} = \\frac{1}{2}|a \\cdot b| = ${calc.triangleAreaLatex}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6: Quadrants */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">
            6
          </span>
          <span>{t.steps.step6Title}</span>
        </div>
        <div className="pl-8 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
          <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {t.steps.step6Passes} <strong className="text-slate-900">{passedQuadrantsStr}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                {t.steps.step6Misses} <strong className="text-rose-700">{missedQuadrantStr}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSteps;
