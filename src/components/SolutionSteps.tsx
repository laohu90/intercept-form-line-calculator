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

  if (!calc.isValidIntercept) {
    return (
      <div className="bg-white rounded-xl border border-rose-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>{t.steps.errorTitle}</span>
        </h3>
        <p className="text-sm text-rose-700 mt-2 leading-relaxed">
          {calc.errorMessage || t.steps.errorDesc}
        </p>
      </div>
    );
  }

  const { a, b, aRat, bRat, slope } = calc;

  // Localized quadrant names
  const quadrantNamesByLang: Record<Language, string[]> = {
    en: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
    es: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    fr: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
    pt: ['Quadrante I', 'Quadrante II', 'Quadrante III', 'Quadrante IV'],
    zh: ['第一象限', '第二象限', '第三象限', '第四象限'],
  };

  const quadrantNames = quadrantNamesByLang[language];
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
