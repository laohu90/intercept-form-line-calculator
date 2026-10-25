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
  solveFromTwoPoints,
  solveFromGeneralForm,
  solveFromPointSlope,
  computeInvalidLine,
  computeZeroIntercept,
  computeEmptyInput,
  formatFloat,
} from '../utils/mathUtils';
import { Language, translations } from '../utils/i18n';

interface InputPanelProps {
  a: number;
  b: number;
  calc: LineCalculations;
  onChange: (a: number, b: number) => void;
  onLineCalcChange?: (calc: LineCalculations) => void;
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
  onLineCalcChange,
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
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);

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
    if (!isNaN(a)) {
      setInputA(a.toString());
      setErrorA(null);
    }
  }, [a]);

  useEffect(() => {
    if (!isNaN(b)) {
      setInputB(b.toString());
      setErrorB(null);
    }
  }, [b]);

  const handleApplyA = (valStr: string) => {
    setInputA(valStr);
    if (!valStr.trim()) {
      setErrorA(t.validation.emptyA);
      if (onLineCalcChange) {
        onLineCalcChange(computeEmptyInput('a', t.validation.emptyA));
      }
      return;
    }
    const parsed = parseNumberOrFraction(valStr);
    if (!parsed.isValid) {
      setErrorA(t.input.invalidWarning);
      if (onLineCalcChange) {
        onLineCalcChange(computeInvalidLine(t.input.invalidWarning));
      }
      return;
    }
    if (Math.abs(parsed.value) < 1e-6) {
      setErrorA(t.validation.zeroA);
      const parsedB = parseNumberOrFraction(inputB);
      const bVal = parsedB.isValid ? parsedB.value : 0;
      if (onLineCalcChange) {
        onLineCalcChange(computeZeroIntercept(0, bVal, 'a', t.validation.zeroA));
      }
      return;
    }
    setErrorA(null);
    setErrorMsg(null);

    // Validate partner inputB before applying
    const parsedB = parseNumberOrFraction(inputB);
    if (!inputB.trim()) {
      setErrorB(t.validation.emptyB);
      if (onLineCalcChange) onLineCalcChange(computeEmptyInput('b', t.validation.emptyB));
      return;
    }
    if (!parsedB.isValid) {
      setErrorB(t.input.invalidWarning);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(t.input.invalidWarning));
      return;
    }
    if (Math.abs(parsedB.value) < 1e-6) {
      setErrorB(t.validation.zeroB);
      if (onLineCalcChange) onLineCalcChange(computeZeroIntercept(parsed.value, 0, 'b', t.validation.zeroB));
      return;
    }
    setErrorB(null);
    onChange(parsed.value, parsedB.value);
  };

  const handleApplyB = (valStr: string) => {
    setInputB(valStr);
    if (!valStr.trim()) {
      setErrorB(t.validation.emptyB);
      if (onLineCalcChange) {
        onLineCalcChange(computeEmptyInput('b', t.validation.emptyB));
      }
      return;
    }
    const parsed = parseNumberOrFraction(valStr);
    if (!parsed.isValid) {
      setErrorB(t.input.invalidWarning);
      if (onLineCalcChange) {
        onLineCalcChange(computeInvalidLine(t.input.invalidWarning));
      }
      return;
    }
    if (Math.abs(parsed.value) < 1e-6) {
      setErrorB(t.validation.zeroB);
      const parsedA = parseNumberOrFraction(inputA);
      const aVal = parsedA.isValid ? parsedA.value : 0;
      if (onLineCalcChange) {
        onLineCalcChange(computeZeroIntercept(aVal, 0, 'b', t.validation.zeroB));
      }
      return;
    }
    setErrorB(null);
    setErrorMsg(null);

    // Validate partner inputA before applying
    const parsedA = parseNumberOrFraction(inputA);
    if (!inputA.trim()) {
      setErrorA(t.validation.emptyA);
      if (onLineCalcChange) onLineCalcChange(computeEmptyInput('a', t.validation.emptyA));
      return;
    }
    if (!parsedA.isValid) {
      setErrorA(t.input.invalidWarning);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(t.input.invalidWarning));
      return;
    }
    if (Math.abs(parsedA.value) < 1e-6) {
      setErrorA(t.validation.zeroA);
      if (onLineCalcChange) onLineCalcChange(computeZeroIntercept(0, parsed.value, 'a', t.validation.zeroA));
      return;
    }
    setErrorA(null);
    onChange(parsedA.value, parsed.value);
  };

  const executeTwoPointsSolve = (px1: string, py1: string, px2: string, py2: string) => {
    if (!px1.trim() || !py1.trim() || !px2.trim() || !py2.trim()) {
      setErrorMsg(t.validation.emptyPoints);
      if (onLineCalcChange) onLineCalcChange(computeEmptyInput('both', t.validation.emptyPoints));
      return;
    }
    const p1xP = parseNumberOrFraction(px1).value;
    const p1yP = parseNumberOrFraction(py1).value;
    const p2xP = parseNumberOrFraction(px2).value;
    const p2yP = parseNumberOrFraction(py2).value;
    if (isNaN(p1xP) || isNaN(p1yP) || isNaN(p2xP) || isNaN(p2yP)) {
      setErrorMsg(t.validation.emptyPoints);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(t.validation.emptyPoints));
      return;
    }
    const res = solveFromTwoPoints(p1xP, p1yP, p2xP, p2yP);
    if (!res.isValid) {
      setErrorMsg(res.error || t.input.invalidWarning);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(res.error || t.input.invalidWarning));
      return;
    }
    setErrorMsg(null);
    if (onLineCalcChange) {
      onLineCalcChange(res.lineCalc);
    }
  };

  const handleSolveTwoPoints = () => {
    executeTwoPointsSolve(p1x, p1y, p2x, p2y);
  };

  const executeGeneralFormSolve = (ga: string, gb: string, gc: string) => {
    if (!ga.trim() || !gb.trim() || !gc.trim()) {
      setErrorMsg(t.validation.emptyGeneral);
      if (onLineCalcChange) onLineCalcChange(computeEmptyInput('both', t.validation.emptyGeneral));
      return;
    }
    const aVal = parseNumberOrFraction(ga).value;
    const bVal = parseNumberOrFraction(gb).value;
    const cVal = parseNumberOrFraction(gc).value;
    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      setErrorMsg(t.validation.emptyGeneral);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(t.validation.emptyGeneral));
      return;
    }
    const res = solveFromGeneralForm(aVal, bVal, cVal);
    if (!res.isValid) {
      setErrorMsg(res.error || t.input.invalidWarning);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(res.error || t.input.invalidWarning));
      return;
    }
    setErrorMsg(null);
    if (onLineCalcChange) {
      onLineCalcChange(res.lineCalc);
    }
  };

  const handleSolveGeneralForm = () => {
    executeGeneralFormSolve(genA, genB, genC);
  };

  const executePointSlopeSolve = (xVal: string, yVal: string, kValStr: string) => {
    if (!xVal.trim() || !yVal.trim() || !kValStr.trim()) {
      setErrorMsg(t.validation.emptyPoints);
      if (onLineCalcChange) onLineCalcChange(computeEmptyInput('both', t.validation.emptyPoints));
      return;
    }
    const x0 = parseNumberOrFraction(xVal).value;
    const y0 = parseNumberOrFraction(yVal).value;
    const kVal = parseNumberOrFraction(kValStr).value;
    if (isNaN(x0) || isNaN(y0) || isNaN(kVal)) {
      setErrorMsg(t.validation.emptyPoints);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(t.validation.emptyPoints));
      return;
    }
    const res = solveFromPointSlope(x0, y0, kVal);
    if (!res.isValid) {
      setErrorMsg(res.error || t.input.invalidWarning);
      if (onLineCalcChange) onLineCalcChange(computeInvalidLine(res.error || t.input.invalidWarning));
      return;
    }
    setErrorMsg(null);
    if (onLineCalcChange) {
      onLineCalcChange(res.lineCalc);
    }
  };

  const handleSolvePointSlope = () => {
    executePointSlopeSolve(psX, psY, psK);
  };

  const handleModeChange = (newMode: InputMode) => {
    setMode(newMode);
    setErrorMsg(null);
    if (newMode === 'intercepts') {
      handleApplyA(inputA);
    } else if (newMode === 'twoPoints') {
      executeTwoPointsSolve(p1x, p1y, p2x, p2y);
    } else if (newMode === 'generalForm') {
      executeGeneralFormSolve(genA, genB, genC);
    } else if (newMode === 'pointSlope') {
      executePointSlopeSolve(psX, psY, psK);
    }
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
            onFocus={(e) => e.currentTarget.select()}
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
            onClick={() => handleModeChange('intercepts')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'intercepts' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.intercepts}
          </button>
          <button
            onClick={() => handleModeChange('twoPoints')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'twoPoints' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.twoPoints}
          </button>
          <button
            onClick={() => handleModeChange('generalForm')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mode === 'generalForm' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {t.modes.generalForm}
          </button>
          <button
            onClick={() => handleModeChange('pointSlope')}
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

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-slate-500">a =</span>
                <input
                  id="param-a-input"
                  type="text"
                  value={inputA}
                  onFocus={(e) => e.currentTarget.select()}
                  onChange={(e) => handleApplyA(e.target.value)}
                  placeholder="e.g. 3 or 2/3"
                  className={`flex-1 rounded-lg px-3.5 py-2 text-base font-mono transition-colors focus:outline-none focus:ring-2 ${
                    errorA
                      ? 'bg-rose-50/40 border border-rose-300 text-rose-900 focus:ring-rose-200 focus:border-rose-500'
                      : 'bg-white border border-slate-300 text-slate-900 focus:ring-slate-900/10 focus:border-slate-800'
                  }`}
                />
              </div>
              {errorA && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pl-7">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorA}</span>
                </div>
              )}
            </div>

            {/* Slider */}
            <div className="interactive-slider-track space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>-10</span>
                <span className="font-semibold text-slate-700">
                  {t.input.sliderA} {isNaN(a) ? '--' : a}
                </span>
                <span>10</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={isNaN(a) ? 0 : a}
                aria-label={t.input.paramA}
                onChange={(e) => {
                  let v = parseFloat(e.target.value);
                  if (Math.abs(v) < 0.25) v = v >= 0 ? 0.5 : -0.5;
                  setErrorA(null);
                  onChange(v, isNaN(b) ? 1 : b);
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

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-slate-500">b =</span>
                <input
                  id="param-b-input"
                  type="text"
                  value={inputB}
                  onFocus={(e) => e.currentTarget.select()}
                  onChange={(e) => handleApplyB(e.target.value)}
                  placeholder="e.g. 4 or -5/2"
                  className={`flex-1 rounded-lg px-3.5 py-2 text-base font-mono transition-colors focus:outline-none focus:ring-2 ${
                    errorB
                      ? 'bg-rose-50/40 border border-rose-300 text-rose-900 focus:ring-rose-200 focus:border-rose-500'
                      : 'bg-white border border-slate-300 text-slate-900 focus:ring-slate-900/10 focus:border-slate-800'
                  }`}
                />
              </div>
              {errorB && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pl-7">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorB}</span>
                </div>
              )}
            </div>

            {/* Slider */}
            <div className="interactive-slider-track space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>-10</span>
                <span className="font-semibold text-slate-700">
                  {t.input.sliderB} {isNaN(b) ? '--' : b}
                </span>
                <span>10</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={isNaN(b) ? 0 : b}
                aria-label={t.input.paramB}
                onChange={(e) => {
                  let v = parseFloat(e.target.value);
                  if (Math.abs(v) < 0.25) v = v >= 0 ? 0.5 : -0.5;
                  setErrorB(null);
                  onChange(isNaN(a) ? 1 : a, v);
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
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setP1x(e.target.value);
                  executeTwoPointsSolve(e.target.value, p1y, p2x, p2y);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="p1y-input" className="text-xs font-medium text-slate-500">y₁</label>
              <input
                id="p1y-input"
                type="text"
                value={p1y}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setP1y(e.target.value);
                  executeTwoPointsSolve(p1x, e.target.value, p2x, p2y);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="p2x-input" className="text-xs font-medium text-slate-500">x₂</label>
              <input
                id="p2x-input"
                type="text"
                value={p2x}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setP2x(e.target.value);
                  executeTwoPointsSolve(p1x, p1y, e.target.value, p2y);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="p2y-input" className="text-xs font-medium text-slate-500">y₂</label>
              <input
                id="p2y-input"
                type="text"
                value={p2y}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setP2y(e.target.value);
                  executeTwoPointsSolve(p1x, p1y, p2x, e.target.value);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Real-time deduction feedback inside tab */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              onClick={handleSolveTwoPoints}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Compute Intercepts from Two Points
            </button>
            <div className="text-xs text-slate-500 font-mono">
              P₁({p1x || '?'}, {p1y || '?'}) · P₂({p2x || '?'}, {p2y || '?'})
            </div>
          </div>
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
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setGenA(e.target.value);
                  executeGeneralFormSolve(e.target.value, genB, genC);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gen-b-input" className="text-xs font-medium text-slate-500">{t.input.coeffB}</label>
              <input
                id="gen-b-input"
                type="text"
                value={genB}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setGenB(e.target.value);
                  executeGeneralFormSolve(genA, e.target.value, genC);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gen-c-input" className="text-xs font-medium text-slate-500">{t.input.coeffC}</label>
              <input
                id="gen-c-input"
                type="text"
                value={genC}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setGenC(e.target.value);
                  executeGeneralFormSolve(genA, genB, e.target.value);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
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
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setPsX(e.target.value);
                  executePointSlopeSolve(e.target.value, psY, psK);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="ps-y-input" className="text-xs font-medium text-slate-500">Point y₀</label>
              <input
                id="ps-y-input"
                type="text"
                value={psY}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setPsY(e.target.value);
                  executePointSlopeSolve(psX, e.target.value, psK);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="ps-k-input" className="text-xs font-medium text-slate-500">Slope k</label>
              <input
                id="ps-k-input"
                type="text"
                value={psK}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  setPsK(e.target.value);
                  executePointSlopeSolve(psX, psY, e.target.value);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:border-slate-800 focus:outline-none"
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

      {/* Real-Time Current Equation Status Banner (Supports Intercept, Vertical, Horizontal, Origin, and Invalid) */}
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
      ) : calc.kind === 'vertical' ? (
        <div className="p-4 bg-blue-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-4 text-sm shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-blue-700 text-xs font-semibold text-white uppercase tracking-wider">
              {t.specialLines.verticalBadge}
            </span>
            <span className="text-blue-200 font-medium">{t.input.currentEq}</span>
            <div className="bg-blue-800/95 px-3.5 py-1.5 rounded-lg text-white font-mono text-base font-bold border border-blue-700">
              <MathView math={`x = ${calc.specialConstant ?? calc.a}`} />
            </div>
            <span className="text-xs text-blue-200 font-mono">
              k = Undefined (不存在), α = 90°
            </span>
          </div>
          <div className="text-xs font-mono text-blue-100 bg-blue-950/60 px-3 py-1.5 rounded-md border border-blue-800">
            {calc.generalForm.latex}
          </div>
        </div>
      ) : calc.kind === 'horizontal' ? (
        <div className="p-4 bg-indigo-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-4 text-sm shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-indigo-700 text-xs font-semibold text-white uppercase tracking-wider">
              {t.specialLines.horizontalBadge}
            </span>
            <span className="text-indigo-200 font-medium">{t.input.currentEq}</span>
            <div className="bg-indigo-800/95 px-3.5 py-1.5 rounded-lg text-white font-mono text-base font-bold border border-indigo-700">
              <MathView math={`y = ${calc.specialConstant ?? calc.b}`} />
            </div>
            <span className="text-xs text-indigo-200 font-mono">
              k = 0, α = 0°
            </span>
          </div>
          <div className="text-xs font-mono text-indigo-100 bg-indigo-950/60 px-3 py-1.5 rounded-md border border-indigo-800">
            {calc.generalForm.latex}
          </div>
        </div>
      ) : calc.kind === 'origin' ? (
        <div className="p-4 bg-purple-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-4 text-sm shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-purple-700 text-xs font-semibold text-white uppercase tracking-wider">
              {t.specialLines.originBadge}
            </span>
            <span className="text-purple-200 font-medium">{t.input.currentEq}</span>
            <div className="bg-purple-800/95 px-3.5 py-1.5 rounded-lg text-white font-mono text-base font-bold border border-purple-700">
              <MathView math={calc.slopeIntercept.latex || `y = ${calc.slopeIntercept.kLatex}x`} />
            </div>
          </div>
          <div className="text-xs font-mono text-purple-100 bg-purple-950/60 px-3 py-1.5 rounded-md border border-purple-800">
            {calc.generalForm.latex}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="font-medium">{errorMsg || calc.errorMessage || t.input.invalidWarning}</span>
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
