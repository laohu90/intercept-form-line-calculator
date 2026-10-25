import React from 'react';
import { Layers, Lightbulb } from 'lucide-react';
import { MathView } from './MathView';
import { LineCalculations, formatFloat, toRational, rationalToLatex } from '../utils/mathUtils';
import { Language, translations } from '../utils/i18n';

interface CompletingSquareProps {
  calc: LineCalculations;
  language: Language;
}

export const CompletingSquareMethod: React.FC<CompletingSquareProps> = ({ calc, language }) => {
  const t = translations[language];

  if (!calc.isValidIntercept) {
    return null;
  }

  const { a, b } = calc;
  const a2 = a * a;
  const b2 = b * b;
  const sumSq = a2 + b2;

  const leadCoeff = sumSq / a2;
  const leadCoeffRat = toRational(leadCoeff);

  const linearCoeff = (-2 * b2) / a;
  const linearCoeffRat = toRational(linearCoeff);

  const xH = (a * b2) / sumSq;
  const xHRat = toRational(xH);

  const minVal = (a2 * b2) / sumSq;
  const minValRat = toRational(minVal);

  const dist = Math.abs(a * b) / Math.sqrt(sumSq);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {t.completingSquare.title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          {t.completingSquare.subtitle}
        </p>
      </div>

      {/* Core Question Card */}
      <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
        <div className="font-bold text-indigo-950 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{t.completingSquare.coreQuestionTitle}</span>
        </div>
        <p className="leading-relaxed">
          {t.completingSquare.coreQuestionDesc}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Step 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              1
            </span>
            <span>{t.completingSquare.step1Title}</span>
          </div>
          <div className="pl-8 space-y-2">
            <p>{t.completingSquare.step1Desc}</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-mono text-sm">
              <MathView math={`y = -\\frac{b}{a}x + b = ${calc.slopeIntercept.latex.replace('y = ', '')}`} />
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-mono text-sm">
              <MathView math="f(x) = OP^2 = x^2 + y^2 = x^2 + \left(-\frac{b}{a}x + b\right)^2" />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              2
            </span>
            <span>{t.completingSquare.step2Title}</span>
          </div>
          <div className="pl-8 space-y-2">
            <p>{t.completingSquare.step2Desc}</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-mono text-sm">
              <MathView math="f(x) = x^2 + \frac{b^2}{a^2}x^2 - \frac{2b^2}{a}x + b^2 = \left(1 + \frac{b^2}{a^2}\right)x^2 - \frac{2b^2}{a}x + b^2" />
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-mono text-sm">
              <MathView math={`f(x) = \\frac{a^2+b^2}{a^2}x^2 - \\frac{2b^2}{a}x + b^2 = ${rationalToLatex(leadCoeffRat)}x^2 ${linearCoeff >= 0 ? '+' : ''}${rationalToLatex(linearCoeffRat)}x + ${formatFloat(b2)}`} />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              3
            </span>
            <span>{t.completingSquare.step3Title}</span>
          </div>
          <div className="pl-8 space-y-3">
            <p className="font-semibold text-slate-800">{t.completingSquare.step3Part1}</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-mono text-sm">
              <MathView math={`f(x) = \\frac{a^2+b^2}{a^2} \\left[ x^2 - \\frac{2ab^2}{a^2+b^2}x \\right] + b^2`} />
            </div>

            <p className="font-semibold text-slate-800">{t.completingSquare.step3Part2}</p>
            <p className="text-xs text-slate-500">{t.completingSquare.step3Part2Hint}</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-mono text-sm overflow-x-auto">
              <MathView math={`f(x) = \\frac{a^2+b^2}{a^2} \\left[ x^2 - 2\\left(\\frac{ab^2}{a^2+b^2}\\right)x + \\left(\\frac{ab^2}{a^2+b^2}\\right)^2 - \\left(\\frac{ab^2}{a^2+b^2}\\right)^2 \\right] + b^2`} />
            </div>

            <p className="font-semibold text-slate-800">{t.completingSquare.step3Part3}</p>
            <p className="text-xs text-slate-500">{t.completingSquare.step3Part3Hint}</p>
            <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg text-center font-mono font-bold text-indigo-900 text-base">
              <MathView math={`f(x) = \\frac{a^2+b^2}{a^2} \\left( x - \\frac{ab^2}{a^2+b^2} \\right)^2 + \\frac{a^2b^2}{a^2+b^2}`} display />
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              4
            </span>
            <span>{t.completingSquare.step4Title}</span>
          </div>
          <div className="pl-8 space-y-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <p className="text-slate-700">{t.completingSquare.step4Desc}</p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-mono text-base font-bold text-slate-900">
                <MathView math={`OP^2 = ${rationalToLatex(leadCoeffRat)} \\left( x - ${rationalToLatex(xHRat)} \\right)^2 + ${rationalToLatex(minValRat)}`} />
              </div>
              <p className="text-xs text-slate-500">{t.completingSquare.step4PositiveNote}</p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
              5
            </span>
            <span>{t.completingSquare.step5Title}</span>
          </div>
          <div className="pl-8 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">{t.completingSquare.footHTitle}</span>
                <p className="text-xs text-slate-500">{t.completingSquare.footHDesc}</p>
                <div className="font-mono text-sm font-bold text-indigo-700 pt-1">
                  {t.completingSquare.footHPoint}{' '}
                  <MathView math={`H\\left(${calc.footOfPerpendicular.xLatex}, ${calc.footOfPerpendicular.yLatex}\\right)`} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">{t.completingSquare.distanceTitle}</span>
                <p className="text-xs text-slate-500">{t.completingSquare.distanceDesc}</p>
                <div className="font-mono text-sm font-bold text-indigo-700 pt-1">
                  <MathView math={`d = \\sqrt{OP_{\\min}^2} = \\frac{|ab|}{\\sqrt{a^2+b^2}} \\approx ${formatFloat(dist)}`} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-950 text-xs sm:text-sm">
              {t.completingSquare.geoProof}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletingSquareMethod;
