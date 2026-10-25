import React, { useState, useEffect } from 'react';
import {
  Sliders,
  ArrowLeftRight,
  Search,
  Copy,
  Check,
  Calculator,
  Compass,
  FileCode,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { MathView } from './MathView';
import {
  parseNumberOrFraction,
  LineCalculations,
  twoPointsToIntercepts,
  generalFormToIntercepts,
  pointSlopeToIntercepts,
} from '../utils/mathUtils';
import { Language, translations } from '../utils/i18n';

interface InputPanelProps {
  a: number;
  b: number;
  calc: LineCalculations;
  onChange: (a: number, b: number) => void;
  language: Language;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
}

type InputMode = 'intercepts' | 'twoPoints' | 'generalForm' | 'pointSlope';

interface ExamPreset {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  a: number;
  b: number;
  desc: Record<Language, string>;
  keywords: string[];
}

const PRESETS: ExamPreset[] = [
  {
    id: 'pythagorean-standard',
    title: {
      en: 'Standard 3-4-5 Pythagorean Right Triangle',
      es: 'Triángulo Rectángulo Pitagórico 3-4-5',
      fr: 'Triangle Rectangle Pythagoricien 3-4-5',
      pt: 'Triângulo Retângulo Pitagórico 3-4-5',
      zh: '勾三股四标准勾股直角题',
    },
    category: {
      en: 'Foundations',
      es: 'Básico',
      fr: 'Fondamentaux',
      pt: 'Básico',
      zh: '基础题型',
    },
    a: 3,
    b: 4,
    desc: {
      en: 'x-intercept 3, y-intercept 4, chord length 5, area 6, origin distance 2.4',
      es: 'Abscisa 3, ordenada 4, longitud 5, área 6, distancia al origen 2.4',
      fr: 'Abscisse 3, ordonnée 4, longueur 5, aire 6, distance à l’origine 2.4',
      pt: 'Intercepto x=3, y=4, comprimento 5, área 6, distância à origem 2.4',
      zh: '横截距 3，纵截距 4，弦长 5，面积 6，原点距离 2.4',
    },
    keywords: ['3-4-5', 'pythagorean', 'area', 'pitagoras', '勾股定理', '面积', 'chord', 'distance'],
  },
  {
    id: 'opposite-intercepts',
    title: {
      en: 'Opposite Intercepts (a = -b)',
      es: 'Intersecciones Opuestas (a = -b)',
      fr: 'Intersections Opposées (a = -b)',
      pt: 'Interceptos Opostos (a = -b)',
      zh: '截距互为相反数 (a = -b)',
    },
    category: {
      en: 'High Frequency',
      es: 'Frecuente',
      fr: 'Grand Classique',
      pt: 'Frequente',
      zh: '高频考点',
    },
    a: 4,
    b: -4,
    desc: {
      en: 'a + b = 0, slope k = 1, inclination 45°, passes Q1, Q3, Q4',
      es: 'a + b = 0, pendiente k = 1, inclinación 45°, cuadrantes 1, 3, 4',
      fr: 'a + b = 0, pente k = 1, inclinaison 45°, quadrants 1, 3, 4',
      pt: 'a + b = 0, coef. angular k = 1, inclinação 45°, quadrantes 1, 3, 4',
      zh: 'a + b = 0，斜率 k = 1，倾斜角 45°，经过一三四象限',
    },
    keywords: ['opposite', 'slope 1', '45 deg', 'opuestas', 'opostos', '相反数', '倾斜角45'],
  },
  {
    id: 'equal-intercepts',
    title: {
      en: 'Equal Intercepts (a = b = 5)',
      es: 'Intersecciones Iguales (a = b = 5)',
      fr: 'Intersections Égales (a = b = 5)',
      pt: 'Interceptos Iguais (a = b = 5)',
      zh: '截距相等且非零 (a = b = 5)',
    },
    category: {
      en: 'Isosceles',
      es: 'Isósceles',
      fr: 'Isocèle',
      pt: 'Isósceles',
      zh: '等腰直角',
    },
    a: 5,
    b: 5,
    desc: {
      en: 'a = b, slope k = -1, inclination 135°, isosceles right triangle',
      es: 'a = b, pendiente k = -1, inclinación 135°, triángulo isósceles',
      fr: 'a = b, pente k = -1, inclinaison 135°, triangle rectangle isocèle',
      pt: 'a = b, coef. angular k = -1, inclinação 135°, triângulo isósceles',
      zh: 'a = b，斜率 k = -1，倾斜角 135°，等腰直角三角形',
    },
    keywords: ['equal', 'isosceles', 'slope -1', '135 deg', 'iguales', 'iguais', '截距相等'],
  },
  {
    id: 'obtuse-inclination',
    title: {
      en: 'Obtuse Inclination & Q2 Intercept',
      es: 'Inclinación Obtusa y Cuadrante II',
      fr: 'Inclinaison Obtuse et Quadrant II',
      pt: 'Inclinação Obtusa e Quadrante II',
      zh: '钝角倾斜角与第二象限题',
    },
    category: {
      en: 'Angles',
      es: 'Ángulos',
      fr: 'Angles',
      pt: 'Ângulos',
      zh: '角度判定',
    },
    a: -3,
    b: 2,
    desc: {
      en: 'Negative x-intercept a = -3, positive slope k = 2/3, acute angle',
      es: 'Abscisa negativa a = -3, pendiente positiva k = 2/3, ángulo agudo',
      fr: 'Abscisse négative a = -3, pente positive k = 2/3, angle aigu',
      pt: 'Intercepto x negativo a = -3, coef. positivo k = 2/3, ângulo agudo',
      zh: '横截距为负 a = -3，斜率 k = 2/3 > 0，穿过一二三象限',
    },
    keywords: ['negative', 'obtuse', 'quadrant 2', 'negativo', '钝角', '第二象限'],
  },
  {
    id: 'fractional-intercepts',
    title: {
      en: 'College-Entrance Fractional Intercepts',
      es: 'Intersecciones Fraccionarias (Selectividad)',
      fr: 'Coordonnées Fractionnaires (Baccalauréat)',
      pt: 'Interceptos Fracionários (ENEM)',
      zh: '高考真题分数截距化一般式',
    },
    category: {
      en: 'Fractions',
      es: 'Fracciones',
      fr: 'Fractions',
      pt: 'Frações',
      zh: '分数运算',
    },
    a: 1.5,
    b: -2.5,
    desc: {
      en: 'a = 3/2, b = -5/2, clearing denominators yields 5x - 3y - 7.5 = 0',
      es: 'a = 3/2, b = -5/2, eliminando denominadores da 5x - 3y - 7.5 = 0',
      fr: 'a = 3/2, b = -5/2, réduction au même dénominateur 5x - 3y - 7.5 = 0',
      pt: 'a = 3/2, b = -5/2, eliminando denominadores obtém-se 5x - 3y - 7.5 = 0',
      zh: 'a = 3/2, b = -5/2，去分母化为互质整系数一般式 5x - 3y - 7.5 = 0',
    },
    keywords: ['fractions', 'denominators', 'fracciones', 'frações', '分数', '通分'],
  },
  {
    id: 'symmetric-third-quadrant',
    title: {
      en: 'Dual-Negative Intercepts (Passes Q2, Q3, Q4)',
      es: 'Intersecciones Negativas Duales',
      fr: 'Deux Intersections Négatives',
      pt: 'Dois Interceptos Negativos',
      zh: '双负截距题（不过第一象限）',
    },
    category: {
      en: 'Symmetry',
      es: 'Simetría',
      fr: 'Symétrie',
      pt: 'Simetria',
      zh: '对称变换',
    },
    a: -4,
    b: -3,
    desc: {
      en: 'a = -4, b = -3, does not pass Q1, area = 6, origin distance = 2.4',
      es: 'a = -4, b = -3, no pasa por C1, área = 6, distancia = 2.4',
      fr: 'a = -4, b = -3, ne passe pas par Q1, aire = 6, distance = 2.4',
      pt: 'a = -4, b = -3, não passa por Q1, área = 6, distância = 2.4',
      zh: 'a = -4, b = -3，直线不过第一象限，三角形面积 6，原点距离 2.4',
    },
    keywords: ['dual negative', 'third quadrant', 'quadrant 3', 'negativos', '双负', '第三象限'],
  },
];

export const InputPanel: React.FC<InputPanelProps> = ({
  a,
  b,
  calc,
  onChange,
  language,
  searchKeyword,
  onSearchChange,
}) => {
  const t = translations[language];

  // Mode state
  const [mode, setMode] = useState<InputMode>('intercepts');

  // Direct inputs
  const [inputA, setInputA] = useState(a.toString());
  const [inputB, setInputB] = useState(b.toString());

  // Two points inputs
  const [p1x, setP1x] = useState('3');
  const [p1y, setP1y] = useState('0');
  const [p2x, setP2x] = useState('0');
  const [p2y, setP2y] = useState('4');

  // General form inputs Ax + By + C = 0
  const [genA, setGenA] = useState('4');
  const [genB, setGenB] = useState('3');
  const [genC, setGenC] = useState('-12');

  // Point & Slope
  const [psX, setPsX] = useState('3');
  const [psY, setPsY] = useState('0');
  const [psK, setPsK] = useState('-4/3');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'latex' | 'eq' | null>(null);

  useEffect(() => {
    setInputA(a.toString());
  }, [a]);

  useEffect(() => {
    setInputB(b.toString());
  }, [b]);

  const handleApplyA = (valStr: string) => {
    setInputA(valStr);
    const parsed = parseNumberOrFraction(valStr);
    if (!parsed.isValid) {
      setErrorMsg('Invalid input for a');
      return;
    }
    if (Math.abs(parsed.value) < 1e-6) {
      setErrorMsg(t.input.invalidWarning);
      return;
    }
    setErrorMsg(null);
    onChange(parsed.value, b);
  };

  const handleApplyB = (valStr: string) => {
    setInputB(valStr);
    const parsed = parseNumberOrFraction(valStr);
    if (!parsed.isValid) {
      setErrorMsg('Invalid input for b');
      return;
    }
    if (Math.abs(parsed.value) < 1e-6) {
      setErrorMsg(t.input.invalidWarning);
      return;
    }
    setErrorMsg(null);
    onChange(a, parsed.value);
  };

  const handleSolveTwoPoints = () => {
    const p1xP = parseNumberOrFraction(p1x).value;
    const p1yP = parseNumberOrFraction(p1y).value;
    const p2xP = parseNumberOrFraction(p2x).value;
    const p2yP = parseNumberOrFraction(p2y).value;
    if (isNaN(p1xP) || isNaN(p1yP) || isNaN(p2xP) || isNaN(p2yP)) {
      setErrorMsg('Please enter valid numeric coordinates for both points.');
      return;
    }
    const res = twoPointsToIntercepts(p1xP, p1yP, p2xP, p2yP);
    if (!res.isValid) {
      setErrorMsg(res.error || t.input.invalidWarning);
      return;
    }
    setErrorMsg(null);
    onChange(res.a, res.b);
  };

  const handleSolveGeneralForm = () => {
    const aVal = parseNumberOrFraction(genA).value;
    const bVal = parseNumberOrFraction(genB).value;
    const cVal = parseNumberOrFraction(genC).value;
    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      setErrorMsg('Please enter valid numbers for A, B, and C.');
      return;
    }
    const res = generalFormToIntercepts(aVal, bVal, cVal);
    if (!res.isValid) {
      setErrorMsg(res.error || t.input.invalidWarning);
      return;
    }
    setErrorMsg(null);
    onChange(res.a, res.b);
  };

  const handleSolvePointSlope = () => {
    const x0 = parseNumberOrFraction(psX).value;
    const y0 = parseNumberOrFraction(psY).value;
    const kVal = parseNumberOrFraction(psK).value;
    if (isNaN(x0) || isNaN(y0) || isNaN(kVal)) {
      setErrorMsg('Please enter valid numbers for point and slope.');
      return;
    }
    const res = pointSlopeToIntercepts(x0, y0, kVal);
    if (!res.isValid) {
      setErrorMsg(res.error || t.input.invalidWarning);
      return;
    }
    setErrorMsg(null);
    onChange(res.a, res.b);
  };

  const stepA = (delta: number) => {
    const next = Math.round((a + delta) * 2) / 2;
    if (Math.abs(next) < 1e-6) {
      onChange(delta > 0 ? 0.5 : -0.5, b);
    } else {
      onChange(next, b);
    }
  };

  const stepB = (delta: number) => {
    const next = Math.round((b + delta) * 2) / 2;
    if (Math.abs(next) < 1e-6) {
      onChange(a, delta > 0 ? 0.5 : -0.5);
    } else {
      onChange(a, next);
    }
  };

  const copyToClipboard = (text: string, type: 'latex' | 'eq') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Filter presets based on search keyword
  const filteredPresets = PRESETS.filter((p) => {
    if (!searchKeyword.trim()) return true;
    const q = searchKeyword.toLowerCase();
    const titleMatch = p.title[language].toLowerCase().includes(q);
    const descMatch = p.desc[language].toLowerCase().includes(q);
    const keywordMatch = p.keywords.some((k) => k.toLowerCase().includes(q));
    return titleMatch || descMatch || keywordMatch;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Search & Topic Quick Filter Bar */}
      <div className="relative">
        <label htmlFor="topic-search-input" className="sr-only">{t.search.placeholder}</label>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            id="topic-search-input"
            type="text"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg pl-10 pr-24 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-colors"
          />
          {searchKeyword && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-slate-400 hover:text-slate-700 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
          <button
            onClick={() => setMode('intercepts')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'intercepts' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.intercepts}
          </button>
          <button
            onClick={() => setMode('twoPoints')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'twoPoints' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.twoPoints}
          </button>
          <button
            onClick={() => setMode('generalForm')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'generalForm' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.generalForm}
          </button>
          <button
            onClick={() => setMode('pointSlope')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'pointSlope' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.pointSlope}
          </button>
        </div>

        {mode === 'intercepts' && (
          <button
            onClick={() => onChange(b, a)}
            title={t.input.swap}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{t.input.swap}</span>
          </button>
        )}
      </div>

      {/* Mode 1: Direct Intercepts (a, b) */}
      {mode === 'intercepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Param a */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="param-a-input" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span>{t.input.paramA}</span>
                <span className="text-xs font-normal text-slate-500 font-mono">{t.input.xPointA}</span>
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onChange(-a, b)}
                  className="text-xs px-2 py-0.5 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-mono cursor-pointer"
                  title="Toggle negative sign"
                >
                  {t.input.toggleSign}
                </button>
                <button
                  onClick={() => stepA(-1)}
                  className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer"
                  title="-1"
                >
                  -
                </button>
                <button
                  onClick={() => stepA(1)}
                  className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer"
                  title="+1"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-slate-500">a =</span>
              <input
                id="param-a-input"
                type="text"
                value={inputA}
                onChange={(e) => handleApplyA(e.target.value)}
                placeholder="e.g. 3 or 2/3"
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>

            {/* Slider */}
            <div className="interactive-slider-track space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>-10</span>
                <span className="font-semibold text-slate-700">
                  {t.input.sliderA} {a}
                </span>
                <span>10</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={a}
                aria-label={t.input.paramA}
                onChange={(e) => {
                  let v = parseFloat(e.target.value);
                  if (Math.abs(v) < 0.25) v = v >= 0 ? 0.5 : -0.5;
                  onChange(v, b);
                }}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Param b */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="param-b-input" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span>{t.input.paramB}</span>
                <span className="text-xs font-normal text-slate-500 font-mono">{t.input.yPointB}</span>
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onChange(a, -b)}
                  className="text-xs px-2 py-0.5 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-mono cursor-pointer"
                  title="Toggle negative sign"
                >
                  {t.input.toggleSign}
                </button>
                <button
                  onClick={() => stepB(-1)}
                  className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer"
                  title="-1"
                >
                  -
                </button>
                <button
                  onClick={() => stepB(1)}
                  className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer"
                  title="+1"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-slate-500">b =</span>
              <input
                id="param-b-input"
                type="text"
                value={inputB}
                onChange={(e) => handleApplyB(e.target.value)}
                placeholder="e.g. 4 or -5/2"
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
              />
            </div>

            {/* Slider */}
            <div className="interactive-slider-track space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>-10</span>
                <span className="font-semibold text-slate-700">
                  {t.input.sliderB} {b}
                </span>
                <span>10</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={b}
                aria-label={t.input.paramB}
                onChange={(e) => {
                  let v = parseFloat(e.target.value);
                  if (Math.abs(v) < 0.25) v = v >= 0 ? 0.5 : -0.5;
                  onChange(a, v);
                }}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Two Points Given */}
      {mode === 'twoPoints' && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-xs font-semibold text-slate-700">
            {t.modes.twoPoints}: Enter two points on the line to deduce intercepts a and b
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="p1x-input" className="text-xs font-medium text-slate-500">x₁</label>
              <input
                id="p1x-input"
                type="text"
                value={p1x}
                onChange={(e) => setP1x(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="p1y-input" className="text-xs font-medium text-slate-500">y₁</label>
              <input
                id="p1y-input"
                type="text"
                value={p1y}
                onChange={(e) => setP1y(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="p2x-input" className="text-xs font-medium text-slate-500">x₂</label>
              <input
                id="p2x-input"
                type="text"
                value={p2x}
                onChange={(e) => setP2x(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="p2y-input" className="text-xs font-medium text-slate-500">y₂</label>
              <input
                id="p2y-input"
                type="text"
                value={p2y}
                onChange={(e) => setP2y(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
          </div>
          <button
            onClick={handleSolveTwoPoints}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Compute Intercepts from Two Points
          </button>
        </div>
      )}

      {/* Mode 3: General Form Given */}
      {mode === 'generalForm' && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-xs font-semibold text-slate-700">
            {t.modes.generalForm}: Ax + By + C = 0 ⟹ a = -C/A, b = -C/B
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="gen-a-input" className="text-xs font-medium text-slate-500">{t.input.coeffA}</label>
              <input
                id="gen-a-input"
                type="text"
                value={genA}
                onChange={(e) => setGenA(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="gen-b-input" className="text-xs font-medium text-slate-500">{t.input.coeffB}</label>
              <input
                id="gen-b-input"
                type="text"
                value={genB}
                onChange={(e) => setGenB(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="gen-c-input" className="text-xs font-medium text-slate-500">{t.input.coeffC}</label>
              <input
                id="gen-c-input"
                type="text"
                value={genC}
                onChange={(e) => setGenC(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
          </div>
          <button
            onClick={handleSolveGeneralForm}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Convert General Form to Intercepts
          </button>
        </div>
      )}

      {/* Mode 4: Point & Slope */}
      {mode === 'pointSlope' && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-xs font-semibold text-slate-700">
            {t.modes.pointSlope}: y - y₀ = k(x - x₀) ⟹ b = y₀ - kx₀, a = -b/k
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="ps-x-input" className="text-xs font-medium text-slate-500">Point x₀</label>
              <input
                id="ps-x-input"
                type="text"
                value={psX}
                onChange={(e) => setPsX(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="ps-y-input" className="text-xs font-medium text-slate-500">Point y₀</label>
              <input
                id="ps-y-input"
                type="text"
                value={psY}
                onChange={(e) => setPsY(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="ps-k-input" className="text-xs font-medium text-slate-500">Slope k</label>
              <input
                id="ps-k-input"
                type="text"
                value={psK}
                onChange={(e) => setPsK(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono"
              />
            </div>
          </div>
          <button
            onClick={handleSolvePointSlope}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Compute Intercepts from Point & Slope
          </button>
        </div>
      )}

      {/* Real-Time Current Equation Status Banner */}
      {calc.isValidIntercept ? (
        <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-4 text-sm shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 font-medium">{t.input.currentEq}</span>
            <div className="bg-slate-800/95 px-3 py-1.5 rounded-lg text-white font-mono text-base border border-slate-700/60">
              <MathView math={calc.interceptLatex} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Copy LaTeX button */}
            <button
              onClick={() => copyToClipboard(calc.interceptLatex, 'latex')}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              {copiedType === 'latex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'latex' ? t.input.copied : t.input.copyLatex}</span>
            </button>

            {/* Copy General Form button */}
            <button
              onClick={() => copyToClipboard(calc.generalForm.latex, 'eq')}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              {copiedType === 'eq' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'eq' ? t.input.copied : t.input.copyEq}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg || calc.errorMessage || t.input.invalidWarning}</span>
        </div>
      )}

      {/* Preset Typical Exam Problems */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-slate-600" />
            <span>{t.input.presetsTitle}</span>
          </span>
          <span className="text-xs text-slate-400">{t.input.presetsSubtitle}</span>
        </div>

        {filteredPresets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPresets.map((preset) => {
              const isCurrent = a === preset.a && b === preset.b;
              return (
                <button
                  key={preset.id}
                  onClick={() => onChange(preset.a, preset.b)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {preset.category[language]}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      a={preset.a}, b={preset.b}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                    {preset.title[language]}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {preset.desc[language]}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-slate-500 py-4 text-center">
            {t.search.noResults}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputPanel;
