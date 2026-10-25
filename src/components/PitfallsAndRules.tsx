import React from 'react';
import { AlertTriangle, CheckSquare, BookOpenCheck, Bookmark } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface PitfallsAndRulesProps {
  language: Language;
}

export const PitfallsAndRules: React.FC<PitfallsAndRulesProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpenCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t.pitfalls.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          {t.pitfalls.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pitfall 1 */}
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.pitfalls.pitfall1Title}</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{t.pitfalls.pitfall1Cause}</p>
          <div className="bg-white/90 p-3 rounded-lg border border-amber-200 text-slate-800 leading-relaxed">
            {t.pitfalls.pitfall1Rule}
          </div>
        </div>

        {/* Pitfall 2 */}
        <div className="p-4 sm:p-5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-rose-950">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{t.pitfalls.pitfall2Title}</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{t.pitfalls.pitfall2Exam}</p>
          <div className="bg-white/90 p-3 rounded-lg border border-rose-200 text-slate-800 leading-relaxed space-y-1">
            <p className="font-semibold text-rose-900">{t.pitfalls.pitfall2Tip}</p>
            <p>{t.pitfalls.pitfall2Case1}</p>
            <p className="text-rose-700 font-medium">{t.pitfalls.pitfall2Case2}</p>
          </div>
        </div>

        {/* Pitfall 3 */}
        <div className="p-4 sm:p-5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-blue-950">
            <Bookmark className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{t.pitfalls.pitfall3Title}</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{t.pitfalls.pitfall3Desc}</p>
          <div className="bg-white/90 p-3 rounded-lg border border-blue-200 text-slate-800 leading-relaxed space-y-1">
            <p>{t.pitfalls.pitfall3Case1}</p>
            <p>{t.pitfalls.pitfall3Case2}</p>
            <p>{t.pitfalls.pitfall3Case3}</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <CheckSquare className="w-4 h-4 text-slate-700 shrink-0" />
            <span>{t.pitfalls.checklistTitle}</span>
          </div>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t.pitfalls.check1}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t.pitfalls.check2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t.pitfalls.check3}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t.pitfalls.check4}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t.pitfalls.check5}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PitfallsAndRules;
