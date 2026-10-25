/**
 * Mathematical utilities for Intercept Form Line Equations
 * x/a + y/b = 1 and multi-mode conversions with special line handling
 */

export interface Rational {
  numerator: number;
  denominator: number;
}

export type LineKind = 'intercept' | 'vertical' | 'horizontal' | 'origin' | 'invalid';

// Greatest Common Divisor
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// Convert decimal to simplified rational
export function toRational(val: number, tolerance = 1e-6): Rational {
  if (Number.isInteger(val)) {
    return { numerator: val, denominator: 1 };
  }
  const sign = val < 0 ? -1 : 1;
  const absVal = Math.abs(val);

  let bestNum = 1;
  let bestDen = 1;
  let minDiff = Math.abs(absVal - 1);

  for (let den = 1; den <= 64; den++) {
    const num = Math.round(absVal * den);
    const diff = Math.abs(absVal - num / den);
    if (diff < minDiff) {
      minDiff = diff;
      bestNum = num;
      bestDen = den;
      if (diff < tolerance) break;
    }
  }

  const g = gcd(bestNum, bestDen);
  return {
    numerator: sign * (bestNum / g),
    denominator: bestDen / g,
  };
}

// Parse string (like "3", "-4", "2/3", "-5/2", "0.75")
export function parseNumberOrFraction(input: string): { value: number; rational: Rational; isValid: boolean; isEmpty: boolean } {
  const trimmed = input.trim().replace(/\s+/g, '');
  if (!trimmed) {
    return { value: NaN, rational: { numerator: 0, denominator: 1 }, isValid: false, isEmpty: true };
  }

  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length === 2) {
      const num = Number(parts[0]);
      const den = Number(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        const val = num / den;
        return {
          value: val,
          rational: toRational(val),
          isValid: true,
          isEmpty: false,
        };
      }
    }
  }

  const num = Number(trimmed);
  if (!isNaN(num)) {
    return {
      value: num,
      rational: toRational(num),
      isValid: true,
      isEmpty: false,
    };
  }

  return { value: NaN, rational: { numerator: 0, denominator: 1 }, isValid: false, isEmpty: false };
}

// Convert rational to clean LaTeX string
export function rationalToLatex(r: Rational, forceSign = false): string {
  const { numerator, denominator } = r;
  if (denominator === 1) {
    if (numerator >= 0 && forceSign) return `+ ${numerator}`;
    if (numerator < 0 && forceSign) return `- ${Math.abs(numerator)}`;
    return `${numerator}`;
  }

  const isNeg = (numerator < 0 && denominator > 0) || (numerator > 0 && denominator < 0);
  const absNum = Math.abs(numerator);
  const absDen = Math.abs(denominator);

  if (isNeg) {
    if (forceSign) {
      return `- \\frac{${absNum}}{${absDen}}`;
    }
    return `-\\frac{${absNum}}{${absDen}}`;
  } else {
    if (forceSign) {
      return `+ \\frac{${absNum}}{${absDen}}`;
    }
    return `\\frac{${absNum}}{${absDen}}`;
  }
}

// Format float nicely to at most 3 decimal places
export function formatFloat(val: number): string {
  if (Number.isInteger(val)) return val.toString();
  return parseFloat(val.toFixed(3)).toString();
}

// Check if integer right triangle (Pythagorean Triple)
export function isPythagoreanTriple(a: number, b: number): boolean {
  if (!Number.isInteger(a) || !Number.isInteger(b)) return false;
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const cSq = absA * absA + absB * absB;
  const c = Math.round(Math.sqrt(cSq));
  return c * c === cSq;
}

export interface LineCalculations {
  kind: LineKind;
  a: number;
  b: number;
  aRat: Rational;
  bRat: Rational;
  isValidIntercept: boolean;
  errorMessage?: string;

  // Special line parameters
  specialConstant?: number; // c for x=c, or d for y=d
  originSlope?: number; // k for y=kx

  // Forms
  interceptLatex: string;
  generalForm: {
    A: number;
    B: number;
    C: number;
    latex: string;
  };
  slopeIntercept: {
    k: number;
    kLatex: string;
    bLatex: string;
    latex: string;
  };

  // Geometric properties
  slope: number;
  inclinationDeg: number;
  inclinationRad: number;
  inclinationLatex: string;

  // Distances and Area
  segmentLength: number;
  segmentLengthLatex: string;
  triangleArea: number;
  triangleAreaLatex: string;
  originDistance: number;
  originDistanceLatex: string;

  // Foot of perpendicular H
  footOfPerpendicular: {
    x: number;
    y: number;
    xLatex: string;
    yLatex: string;
  };

  // Quadrants
  quadrants: number[]; // e.g. [1, 2, 4]
  missedQuadrant: number; // e.g. 3

  // Special properties
  isPythagorean: boolean;
  isIsoscelesRightTriangle: boolean;
  isOppositeIntercepts: boolean;
}

export function computeLineDetails(a: number, b: number): LineCalculations {
  const aRat = toRational(a);
  const bRat = toRational(b);

  if (Math.abs(a) < 1e-7 || Math.abs(b) < 1e-7) {
    return {
      kind: 'origin',
      a,
      b,
      aRat,
      bRat,
      isValidIntercept: false,
      errorMessage: 'Intercepts a and b cannot be 0. When a line passes through the origin (a=b=0), intercept form is undefined because division by zero occurs.',
      interceptLatex: '',
      generalForm: { A: 1, B: -1, C: 0, latex: 'y - kx = 0' },
      slopeIntercept: { k: 1, kLatex: 'k', bLatex: '0', latex: 'y = kx' },
      slope: 0,
      inclinationDeg: 0,
      inclinationRad: 0,
      inclinationLatex: '0^\\circ',
      segmentLength: 0,
      segmentLengthLatex: '0',
      triangleArea: 0,
      triangleAreaLatex: '0',
      originDistance: 0,
      originDistanceLatex: '0',
      footOfPerpendicular: { x: 0, y: 0, xLatex: '0', yLatex: '0' },
      quadrants: [1, 3],
      missedQuadrant: 2,
      isPythagorean: false,
      isIsoscelesRightTriangle: false,
      isOppositeIntercepts: false,
    };
  }

  // Intercept LaTeX: \frac{x}{a} + \frac{y}{b} = 1
  const xTerm = `\\frac{x}{${rationalToLatex(aRat)}}`;
  let yTerm = `\\frac{y}{${rationalToLatex(bRat)}}`;
  let interceptLatex = '';
  if (b < 0) {
    yTerm = `- \\frac{y}{${rationalToLatex({ numerator: Math.abs(bRat.numerator), denominator: bRat.denominator })}}`;
    interceptLatex = `${xTerm} ${yTerm} = 1`;
  } else {
    interceptLatex = `${xTerm} + ${yTerm} = 1`;
  }

  // General Form: bx + ay - ab = 0
  const an = aRat.numerator;
  const ad = aRat.denominator;
  const bn = bRat.numerator;
  const bd = bRat.denominator;

  let rawA = ad * bn;
  let rawB = bd * an;
  let rawC = -(an * bn);

  if (rawA < 0) {
    rawA = -rawA;
    rawB = -rawB;
    rawC = -rawC;
  }

  const commonGcd = gcd(gcd(rawA, rawB), rawC);
  const A = rawA / (commonGcd || 1);
  const B = rawB / (commonGcd || 1);
  const C = rawC / (commonGcd || 1);

  let generalLatex = '';
  if (A === 1) generalLatex += 'x';
  else if (A === -1) generalLatex += '-x';
  else if (A !== 0) generalLatex += `${A}x`;

  if (B > 0) {
    generalLatex += (A !== 0 ? ' + ' : '') + (B === 1 ? 'y' : `${B}y`);
  } else if (B < 0) {
    generalLatex += ` - ${Math.abs(B) === 1 ? 'y' : `${Math.abs(B)}y`}`;
  }

  if (C > 0) {
    generalLatex += ` + ${C}`;
  } else if (C < 0) {
    generalLatex += ` - ${Math.abs(C)}`;
  }
  generalLatex += ' = 0';

  // Slope-Intercept: y = - (b/a) x + b
  const slope = -b / a;
  const kRat = toRational(slope);
  const kLatex = rationalToLatex(kRat);
  const bLatex = rationalToLatex(bRat);

  let slopeInterceptLatex = 'y = ';
  if (kRat.numerator === 1 && kRat.denominator === 1) {
    slopeInterceptLatex += 'x';
  } else if (kRat.numerator === -1 && kRat.denominator === 1) {
    slopeInterceptLatex += '-x';
  } else {
    slopeInterceptLatex += `${kLatex}x`;
  }

  if (bRat.numerator > 0) {
    slopeInterceptLatex += ` + ${rationalToLatex(bRat)}`;
  } else {
    slopeInterceptLatex += ` - ${rationalToLatex({ numerator: Math.abs(bRat.numerator), denominator: bRat.denominator })}`;
  }

  // Inclination angle alpha in [0, 180)
  let angleRad = Math.atan(slope);
  if (angleRad < 0) {
    angleRad += Math.PI;
  }
  const inclinationDeg = (angleRad * 180) / Math.PI;
  const inclinationLatex = `${formatFloat(inclinationDeg)}^\\circ`;

  // Segment length |AB| = sqrt(a^2 + b^2)
  const segmentLength = Math.sqrt(a * a + b * b);
  const sumSq = Math.round((a * a + b * b) * 10000) / 10000;
  let segmentLengthLatex = '';
  if (Number.isInteger(sumSq)) {
    const sqrtInt = Math.round(Math.sqrt(sumSq));
    if (sqrtInt * sqrtInt === sumSq) {
      segmentLengthLatex = `${sqrtInt}`;
    } else {
      segmentLengthLatex = `\\sqrt{${sumSq}} \\approx ${formatFloat(segmentLength)}`;
    }
  } else {
    segmentLengthLatex = `\\sqrt{${formatFloat(a)}^2 + (${formatFloat(b)})^2} \\approx ${formatFloat(segmentLength)}`;
  }

  // Triangle area S = 1/2 * |a * b|
  const triangleArea = 0.5 * Math.abs(a * b);
  const areaRat = toRational(triangleArea);
  const triangleAreaLatex = rationalToLatex(areaRat);

  // Origin distance d = |ab| / sqrt(a^2 + b^2)
  const originDistance = Math.abs(a * b) / segmentLength;
  const originDistanceLatex = `\\frac{|${formatFloat(a)} \\times (${formatFloat(b)})|}{\\sqrt{${formatFloat(a)}^2 + (${formatFloat(b)})^2}} \\approx ${formatFloat(originDistance)}`;

  // Foot of perpendicular H:
  const denom = a * a + b * b;
  const xH = (a * b * b) / denom;
  const yH = (a * a * b) / denom;
  const xHRat = toRational(xH);
  const yHRat = toRational(yH);

  // Quadrants logic
  let quadrants: number[] = [];
  let missedQuadrant = 0;
  if (a > 0 && b > 0) {
    quadrants = [1, 2, 4];
    missedQuadrant = 3;
  } else if (a < 0 && b > 0) {
    quadrants = [1, 2, 3];
    missedQuadrant = 4;
  } else if (a < 0 && b < 0) {
    quadrants = [2, 3, 4];
    missedQuadrant = 1;
  } else if (a > 0 && b < 0) {
    quadrants = [1, 3, 4];
    missedQuadrant = 2;
  }

  const isPyth = isPythagoreanTriple(a, b);
  const isIsosc = Math.abs(Math.abs(a) - Math.abs(b)) < 1e-6;
  const isOpp = Math.abs(a + b) < 1e-6;

  return {
    kind: 'intercept',
    a,
    b,
    aRat,
    bRat,
    isValidIntercept: true,
    interceptLatex,
    generalForm: {
      A,
      B,
      C,
      latex: generalLatex,
    },
    slopeIntercept: {
      k: slope,
      kLatex,
      bLatex,
      latex: slopeInterceptLatex,
    },
    slope,
    inclinationDeg,
    inclinationRad: angleRad,
    inclinationLatex,
    segmentLength,
    segmentLengthLatex,
    triangleArea,
    triangleAreaLatex,
    originDistance,
    originDistanceLatex,
    footOfPerpendicular: {
      x: xH,
      y: yH,
      xLatex: rationalToLatex(xHRat),
      yLatex: rationalToLatex(yHRat),
    },
    quadrants,
    missedQuadrant,
    isPythagorean: isPyth,
    isIsoscelesRightTriangle: isIsosc,
    isOppositeIntercepts: isOpp,
  };
}

// Compute dedicated calculations for Vertical Line x = c
export function computeVerticalLine(c: number): LineCalculations {
  const cRat = toRational(c);
  return {
    kind: 'vertical',
    a: c,
    b: NaN,
    specialConstant: c,
    aRat: cRat,
    bRat: { numerator: 0, denominator: 0 },
    isValidIntercept: false,
    errorMessage: `Vertical Line: x = ${c}. Slope is undefined (α = 90°). It is parallel to the y-axis and has no y-intercept, so intercept form x/a + y/b = 1 does not exist.`,
    interceptLatex: `x = ${c}`,
    generalForm: {
      A: 1,
      B: 0,
      C: -c,
      latex: c >= 0 ? `x - ${c} = 0` : `x + ${Math.abs(c)} = 0`,
    },
    slopeIntercept: {
      k: NaN,
      kLatex: '\\text{Undefined (不存在)}',
      bLatex: '\\text{None (无)}',
      latex: `x = ${c}`,
    },
    slope: NaN,
    inclinationDeg: 90,
    inclinationRad: Math.PI / 2,
    inclinationLatex: '90^\\circ',
    segmentLength: NaN,
    segmentLengthLatex: '\\infty',
    triangleArea: 0,
    triangleAreaLatex: '0',
    originDistance: Math.abs(c),
    originDistanceLatex: `${Math.abs(c)}`,
    footOfPerpendicular: {
      x: c,
      y: 0,
      xLatex: `${c}`,
      yLatex: '0',
    },
    quadrants: c > 0 ? [1, 4] : [2, 3],
    missedQuadrant: c > 0 ? 2 : 1,
    isPythagorean: false,
    isIsoscelesRightTriangle: false,
    isOppositeIntercepts: false,
  };
}

// Compute dedicated calculations for Horizontal Line y = d
export function computeHorizontalLine(d: number): LineCalculations {
  const dRat = toRational(d);
  return {
    kind: 'horizontal',
    a: NaN,
    b: d,
    specialConstant: d,
    aRat: { numerator: 0, denominator: 0 },
    bRat: dRat,
    isValidIntercept: false,
    errorMessage: `Horizontal Line: y = ${d}. Slope k = 0 (α = 0°). It is parallel to the x-axis and has no x-intercept, so intercept form x/a + y/b = 1 does not exist.`,
    interceptLatex: `y = ${d}`,
    generalForm: {
      A: 0,
      B: 1,
      C: -d,
      latex: d >= 0 ? `y - ${d} = 0` : `y + ${Math.abs(d)} = 0`,
    },
    slopeIntercept: {
      k: 0,
      kLatex: '0',
      bLatex: `${d}`,
      latex: `y = ${d}`,
    },
    slope: 0,
    inclinationDeg: 0,
    inclinationRad: 0,
    inclinationLatex: '0^\\circ',
    segmentLength: NaN,
    segmentLengthLatex: '\\infty',
    triangleArea: 0,
    triangleAreaLatex: '0',
    originDistance: Math.abs(d),
    originDistanceLatex: `${Math.abs(d)}`,
    footOfPerpendicular: {
      x: 0,
      y: d,
      xLatex: '0',
      yLatex: `${d}`,
    },
    quadrants: d > 0 ? [1, 2] : [3, 4],
    missedQuadrant: d > 0 ? 3 : 1,
    isPythagorean: false,
    isIsoscelesRightTriangle: false,
    isOppositeIntercepts: false,
  };
}

// Compute invalid/empty input representation
export function computeInvalidLine(errorMessage: string = 'Please enter valid non-zero values.'): LineCalculations {
  return {
    kind: 'invalid',
    a: NaN,
    b: NaN,
    aRat: { numerator: 0, denominator: 1 },
    bRat: { numerator: 0, denominator: 1 },
    isValidIntercept: false,
    errorMessage,
    interceptLatex: '',
    generalForm: { A: 0, B: 0, C: 0, latex: '' },
    slopeIntercept: { k: NaN, kLatex: '', bLatex: '', latex: '' },
    slope: NaN,
    inclinationDeg: NaN,
    inclinationRad: NaN,
    inclinationLatex: '',
    segmentLength: NaN,
    segmentLengthLatex: '',
    triangleArea: NaN,
    triangleAreaLatex: '',
    originDistance: NaN,
    originDistanceLatex: '',
    footOfPerpendicular: { x: NaN, y: NaN, xLatex: '', yLatex: '' },
    quadrants: [],
    missedQuadrant: 0,
    isPythagorean: false,
    isIsoscelesRightTriangle: false,
    isOppositeIntercepts: false,
  };
}

// Convert Two Points to Intercepts with full special line detection
export function solveFromTwoPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { lineCalc: LineCalculations; isValid: boolean; error?: string } {
  if (Math.abs(x1 - x2) < 1e-6 && Math.abs(y1 - y2) < 1e-6) {
    return {
      lineCalc: computeLineDetails(3, 4),
      isValid: false,
      error: 'The two points are identical. Two distinct points are required to define a line.',
    };
  }

  // Vertical line: x1 == x2
  if (Math.abs(x1 - x2) < 1e-6) {
    return {
      lineCalc: computeVerticalLine(x1),
      isValid: true,
      error: undefined,
    };
  }

  // Horizontal line: y1 == y2
  if (Math.abs(y1 - y2) < 1e-6) {
    return {
      lineCalc: computeHorizontalLine(y1),
      isValid: true,
      error: undefined,
    };
  }

  const slope = (y2 - y1) / (x2 - x1);
  const b = y1 - slope * x1;
  const a = -b / slope;

  // Passes through origin: b == 0
  if (Math.abs(b) < 1e-6 || Math.abs(a) < 1e-6) {
    const calc = computeLineDetails(0, 0);
    calc.originSlope = slope;
    calc.slopeIntercept.k = slope;
    calc.slopeIntercept.kLatex = rationalToLatex(toRational(slope));
    calc.slopeIntercept.latex = `y = ${calc.slopeIntercept.kLatex}x`;
    calc.generalForm.latex = `${rationalToLatex(toRational(slope))}x - y = 0`;
    return {
      lineCalc: calc,
      isValid: true,
      error: undefined,
    };
  }

  return {
    lineCalc: computeLineDetails(a, b),
    isValid: true,
  };
}

// Convert General Form Ax + By + C = 0 with special line detection
export function solveFromGeneralForm(
  A: number,
  B: number,
  C: number
): { lineCalc: LineCalculations; isValid: boolean; error?: string } {
  if (Math.abs(A) < 1e-6 && Math.abs(B) < 1e-6) {
    return {
      lineCalc: computeLineDetails(3, 4),
      isValid: false,
      error: 'Invalid line: Coefficients A and B cannot both be 0.',
    };
  }

  // Horizontal line: A = 0
  if (Math.abs(A) < 1e-6) {
    const d = -C / B;
    return {
      lineCalc: computeHorizontalLine(d),
      isValid: true,
    };
  }

  // Vertical line: B = 0
  if (Math.abs(B) < 1e-6) {
    const c = -C / A;
    return {
      lineCalc: computeVerticalLine(c),
      isValid: true,
    };
  }

  // Passes through origin: C = 0
  if (Math.abs(C) < 1e-6) {
    const slope = -A / B;
    const calc = computeLineDetails(0, 0);
    calc.originSlope = slope;
    calc.slopeIntercept.k = slope;
    calc.slopeIntercept.kLatex = rationalToLatex(toRational(slope));
    calc.slopeIntercept.latex = `y = ${calc.slopeIntercept.kLatex}x`;
    return {
      lineCalc: calc,
      isValid: true,
    };
  }

  const a = -C / A;
  const b = -C / B;
  return {
    lineCalc: computeLineDetails(a, b),
    isValid: true,
  };
}

// Convert Point and Slope with special line detection
export function solveFromPointSlope(
  x0: number,
  y0: number,
  k: number
): { lineCalc: LineCalculations; isValid: boolean; error?: string } {
  if (Math.abs(k) < 1e-6) {
    return {
      lineCalc: computeHorizontalLine(y0),
      isValid: true,
    };
  }

  const b = y0 - k * x0;
  if (Math.abs(b) < 1e-6) {
    const calc = computeLineDetails(0, 0);
    calc.originSlope = k;
    calc.slopeIntercept.k = k;
    calc.slopeIntercept.kLatex = rationalToLatex(toRational(k));
    calc.slopeIntercept.latex = `y = ${calc.slopeIntercept.kLatex}x`;
    return {
      lineCalc: calc,
      isValid: true,
    };
  }

  const a = -b / k;
  return {
    lineCalc: computeLineDetails(a, b),
    isValid: true,
  };
}
