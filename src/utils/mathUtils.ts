/**
 * Mathematical utilities for Intercept Form Line Equations
 * x/a + y/b = 1 and multi-mode conversions
 */

export interface Rational {
  numerator: number;
  denominator: number;
}

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
export function parseNumberOrFraction(input: string): { value: number; rational: Rational; isValid: boolean } {
  const trimmed = input.trim().replace(/\s+/g, '');
  if (!trimmed) {
    return { value: NaN, rational: { numerator: 0, denominator: 1 }, isValid: false };
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
    };
  }

  return { value: NaN, rational: { numerator: 0, denominator: 1 }, isValid: false };
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
  a: number;
  b: number;
  aRat: Rational;
  bRat: Rational;
  isValidIntercept: boolean;
  errorMessage?: string;

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
      a,
      b,
      aRat,
      bRat,
      isValidIntercept: false,
      errorMessage: 'Intercepts a and b cannot be 0. Intercept form does not support lines passing through the origin or parallel to axes.',
      interceptLatex: '',
      generalForm: { A: 0, B: 0, C: 0, latex: '' },
      slopeIntercept: { k: 0, kLatex: '', bLatex: '', latex: '' },
      slope: 0,
      inclinationDeg: 0,
      inclinationRad: 0,
      inclinationLatex: '',
      segmentLength: 0,
      segmentLengthLatex: '',
      triangleArea: 0,
      triangleAreaLatex: '',
      originDistance: 0,
      originDistanceLatex: '',
      footOfPerpendicular: { x: 0, y: 0, xLatex: '', yLatex: '' },
      quadrants: [],
      missedQuadrant: 0,
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

// Convert Two Points to Intercepts
export function twoPointsToIntercepts(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { a: number; b: number; isValid: boolean; error?: string } {
  if (Math.abs(x1 - x2) < 1e-6 && Math.abs(y1 - y2) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'The two points are identical.' };
  }
  if (Math.abs(x1 - x2) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'Vertical line x = ' + x1 + ' has no y-intercept unless x1=0.' };
  }
  const slope = (y2 - y1) / (x2 - x1);
  const b = y1 - slope * x1;
  if (Math.abs(slope) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'Horizontal line y = ' + y1 + ' has no x-intercept.' };
  }
  const a = -b / slope;
  if (Math.abs(a) < 1e-6 || Math.abs(b) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'Line passes through origin (0,0); intercept form is undefined.' };
  }
  return { a, b, isValid: true };
}

// Convert General Form Ax + By + C = 0 to Intercepts
export function generalFormToIntercepts(
  A: number,
  B: number,
  C: number
): { a: number; b: number; isValid: boolean; error?: string } {
  if (Math.abs(A) < 1e-6 && Math.abs(B) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'Invalid line: A and B cannot both be 0.' };
  }
  if (Math.abs(C) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'C = 0: Line passes through the origin; intercept form is undefined.' };
  }
  if (Math.abs(A) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'A = 0: Horizontal line; no x-intercept exists.' };
  }
  if (Math.abs(B) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'B = 0: Vertical line; no y-intercept exists.' };
  }
  const a = -C / A;
  const b = -C / B;
  return { a, b, isValid: true };
}

// Convert Point and Slope to Intercepts
export function pointSlopeToIntercepts(
  x0: number,
  y0: number,
  k: number
): { a: number; b: number; isValid: boolean; error?: string } {
  if (Math.abs(k) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'Slope k = 0: Horizontal line; intercept form is undefined.' };
  }
  const b = y0 - k * x0;
  if (Math.abs(b) < 1e-6) {
    return { a: 0, b: 0, isValid: false, error: 'Line passes through origin (0,0); intercept form is undefined.' };
  }
  const a = -b / k;
  return { a, b, isValid: true };
}
