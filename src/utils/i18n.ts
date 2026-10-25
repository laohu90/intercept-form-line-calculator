export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  appDescription: string;
  tagline: string;
  badge: {
    highSchool: string;
    analyticGeometry: string;
    interceptForm: string;
    completingSquare: string;
  };
  nav: {
    solver: string;
    completingSquare: string;
    canvas: string;
    pitfalls: string;
    exportPdf: string;
  };
  modes: {
    intercepts: string;
    twoPoints: string;
    generalForm: string;
    pointSlope: string;
  };
  search: {
    placeholder: string;
    filterLabel: string;
    all: string;
    noResults: string;
  };
  metrics: {
    interceptEq: string;
    generalEq: string;
    slopeAndAngle: string;
    chordLength: string;
    triangleArea: string;
    originDist: string;
  };
  input: {
    title: string;
    subtitle: string;
    swap: string;
    paramA: string;
    paramB: string;
    xPointA: string;
    yPointB: string;
    toggleSign: string;
    sliderA: string;
    sliderB: string;
    currentEq: string;
    generalFormLabel: string;
    slopeLabel: string;
    inclinationLabel: string;
    presetsTitle: string;
    presetsSubtitle: string;
    copyLatex: string;
    copied: string;
    copyEq: string;
    point1: string;
    point2: string;
    slopeK: string;
    coeffA: string;
    coeffB: string;
    coeffC: string;
    invalidWarning: string;
  };
  canvas: {
    title: string;
    hint: string;
    grid: string;
    altitude: string;
    triangleArea: string;
    zoomIn: string;
    zoomOut: string;
    reset: string;
    exportPng: string;
    lineLegend: string;
    altitudeLegend: string;
    areaLegend: string;
    angleLegend: string;
    notesTitle: string;
    notesDesc: string;
  };
  steps: {
    title: string;
    subtitle: string;
    given: string;
    step1Title: string;
    step1Desc: string;
    step1Coords: string;
    step1Warning: string;
    step2Title: string;
    step2Desc: string;
    step2Substitute: string;
    step3Title: string;
    step3Desc: string;
    step3Result: string;
    step3Coeffs: string;
    step4Title: string;
    step4Desc: string;
    step4SlopeFormula: string;
    step4AngleFormula: string;
    step4Acute: string;
    step4Obtuse: string;
    step4Horizontal: string;
    step5Title: string;
    step5Desc: string;
    step5Length: string;
    step5LengthFormula: string;
    step5Area: string;
    step5AreaFormula: string;
    step6Title: string;
    step6Passes: string;
    step6Misses: string;
    pythagoreanBonus: string;
    errorTitle: string;
    errorDesc: string;
  };
  completingSquare: {
    title: string;
    subtitle: string;
    coreQuestionTitle: string;
    coreQuestionDesc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Part1: string;
    step3Part2: string;
    step3Part2Hint: string;
    step3Part3: string;
    step3Part3Hint: string;
    step4Title: string;
    step4Desc: string;
    step4PositiveNote: string;
    step5Title: string;
    footHTitle: string;
    footHDesc: string;
    footHPoint: string;
    distanceTitle: string;
    distanceDesc: string;
    geoProof: string;
  };
  pitfalls: {
    title: string;
    subtitle: string;
    pitfall1Title: string;
    pitfall1Cause: string;
    pitfall1Rule: string;
    pitfall2Title: string;
    pitfall2Exam: string;
    pitfall2Tip: string;
    pitfall2Case1: string;
    pitfall2Case2: string;
    pitfall3Title: string;
    pitfall3Desc: string;
    pitfall3Case1: string;
    pitfall3Case2: string;
    pitfall3Case3: string;
    checklistTitle: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    check5: string;
  };
  specialLines: {
    verticalBadge: string;
    verticalTitle: string;
    verticalSlope: string;
    verticalIntercepts: string;
    verticalGeneral: string;
    verticalWhyNotIntercept: string;
    verticalDistance: string;
    horizontalBadge: string;
    horizontalTitle: string;
    horizontalSlope: string;
    horizontalIntercepts: string;
    horizontalGeneral: string;
    horizontalWhyNotIntercept: string;
    horizontalDistance: string;
    originBadge: string;
    originTitle: string;
    originSlope: string;
    originWhyNotIntercept: string;
  };
  validation: {
    emptyA: string;
    emptyB: string;
    emptyGeneral: string;
    emptyPoints: string;
    zeroA: string;
    zeroB: string;
    zeroBoth: string;
  };
  trust: {
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    authorTitle: string;
    authorBio: string;
    academicMethodology: string;
    editorialBoard: string;
    privacyStatement: string;
    termsStatement: string;
    feedbackCommitment: string;
    feedbackPlaceholder: string;
    sendFeedback: string;
    feedbackSent: string;
    close: string;
  };
  footer: {
    desc: string;
    standard: string;
    latexRendering: string;
    pdfExport: string;
  };
  print: {
    headerTitle: string;
    headerDesc: string;
    date: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'Intercept Form Line Equation Solver',
    appSubtitle: 'Analytic Geometry & Homework Graph Checker',
    appDescription:
      'High-school analytic geometry solver for the intercept form of linear equations (x/a + y/b = 1). Provides step-by-step solutions, quadratic completing the square derivation for origin distance, interactive graphing canvas, and one-click PDF export.',
    tagline: 'Precision 2D Cartesian Geometry & Step-by-Step Mathematical Derivations',
    badge: {
      highSchool: 'High School Geometry',
      analyticGeometry: 'Analytic Geometry',
      interceptForm: 'Intercept Form (x/a + y/b = 1)',
      completingSquare: 'Completing the Square',
    },
    nav: {
      solver: 'Equation Solver',
      completingSquare: 'Completing the Square',
      canvas: 'Graph Checker',
      pitfalls: 'Pitfalls & Standards',
      exportPdf: 'Export PDF / Print',
    },
    modes: {
      intercepts: 'Intercepts (a, b)',
      twoPoints: 'Two Points',
      generalForm: 'General Form (Ax+By+C=0)',
      pointSlope: 'Point & Slope',
    },
    search: {
      placeholder: 'Search concepts, keywords, exams (e.g., slope, completing the square, area, SAT, Gaokao)...',
      filterLabel: 'Topic Quick Filter:',
      all: 'All Topics',
      noResults: 'No matching concepts found. Try typing "slope", "area", or "origin".',
    },
    metrics: {
      interceptEq: 'Intercept Form',
      generalEq: 'General Form',
      slopeAndAngle: 'Slope & Inclination',
      chordLength: 'Segment Length |AB|',
      triangleArea: 'Triangle Area S',
      originDist: 'Origin Distance d',
    },
    input: {
      title: 'Real-Time Parameters & Equation Setup',
      subtitle: 'Enter x-intercept a and y-intercept b (supports integers, decimals, and fractions like 3, -4, 2/3, -5/2)',
      swap: 'Swap a ⇄ b',
      paramA: 'x-intercept a',
      paramB: 'y-intercept b',
      xPointA: '(Axis Point A(a, 0))',
      yPointB: '(Axis Point B(0, b))',
      toggleSign: '± Sign',
      sliderA: 'Current a =',
      sliderB: 'Current b =',
      currentEq: 'Current Intercept Equation:',
      generalFormLabel: 'General Form:',
      slopeLabel: 'Slope:',
      inclinationLabel: 'Inclination:',
      presetsTitle: 'Standard High School / College-Entrance Exam Problems:',
      presetsSubtitle: 'Click any problem to load parameters and view complete step-by-step solution',
      copyLatex: 'Copy LaTeX',
      copied: 'Copied!',
      copyEq: 'Copy Equation',
      point1: 'Point 1 (x₁, y₁)',
      point2: 'Point 2 (x₂, y₂)',
      slopeK: 'Slope k',
      coeffA: 'Coeff A',
      coeffB: 'Coeff B',
      coeffC: 'Constant C',
      invalidWarning: 'a and b cannot be 0. Intercept form cannot represent lines passing through the origin or parallel to axes.',
    },
    canvas: {
      title: 'Interactive Cartesian Coordinate Canvas',
      hint: 'Drag points A and B directly on the canvas to update intercepts; drag canvas to pan',
      grid: 'Grid',
      altitude: 'Altitude OH',
      triangleArea: 'Area △',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Center',
      exportPng: 'Export PNG',
      lineLegend: 'Line equation:',
      altitudeLegend: 'Perpendicular OH:',
      areaLegend: 'Right Triangle Area:',
      angleLegend: 'Inclination Angle:',
      notesTitle: 'Homework Graph Verification Tip:',
      notesDesc:
        'When plotting on graph paper or exams: first mark axis intercepts A(a, 0) and B(0, b), connect with a straight ruler, and extend indefinitely past the points. Foot of perpendicular from origin is H.',
    },
    steps: {
      title: 'High School Examination Standard: Step-by-Step Solution',
      subtitle: 'Strict standard answering procedure covering conversions, slope analysis, geometric metrics, and quadrants',
      given: 'Given:',
      step1Title: 'Determine Intercepts and Axis Intersection Points',
      step1Desc: 'From the given problem, line l has x-intercept a and y-intercept b.',
      step1Coords: 'Therefore, the intersection coordinates with the axes are:',
      step1Warning:
        'Key Distinction: An "intercept" is a coordinate (an algebraic quantity that can be positive, negative, or zero), not a geometric distance! The distances from origin are |a| and |b|.',
      step2Title: 'Formulate the Standard Intercept Form Equation',
      step2Desc: 'Since a ≠ 0 and b ≠ 0, the intercept form exists and is defined as:',
      step2Substitute: 'Substituting the given parameters yields:',
      step3Title: 'Convert to Standard General Form (Ax + By + C = 0)',
      step3Desc: 'Multiply through by common denominator to obtain coprime integer coefficients:',
      step3Result: 'General Form Equation:',
      step3Coeffs: 'Coefficients: A = {A}, B = {B}, C = {C} (with A ≥ 0 and coprime).',
      step4Title: 'Determine Slope k and Inclination Angle α',
      step4Desc: 'Rearrange into slope-intercept form y = kx + b:',
      step4SlopeFormula: 'Slope formula:',
      step4AngleFormula: 'Inclination angle α:',
      step4Acute: '(Acute angle)',
      step4Obtuse: '(Obtuse angle)',
      step4Horizontal: '(Horizontal line)',
      step5Title: 'Compute Segment Length |AB| and Right Triangle Area',
      step5Desc: 'Calculate geometric measurements formed with coordinate axes:',
      step5Length: 'Intercept Segment Length (Chord):',
      step5LengthFormula: 'Distance formula / Pythagorean theorem:',
      step5Area: 'Enclosed Right Triangle Area:',
      step5AreaFormula: 'Triangle area formula:',
      step6Title: 'Quadrant Traversal Analysis',
      step6Passes: 'The line passes through:',
      step6Misses: 'The line DOES NOT pass through:',
      pythagoreanBonus: 'Pythagorean Triple Detected! (Sides form integer right triangle)',
      errorTitle: 'Intercept Form Undefined',
      errorDesc:
        'The intercept form requires non-zero denominators (a ≠ 0 and b ≠ 0). When a line passes through the origin or is parallel to an axis, use general form Ax + By + C = 0 or slope-intercept form y = kx + b.',
    },
    completingSquare: {
      title: 'Completing the Square: Origin Distance Extremum Derivation',
      subtitle:
        'Deep algebraic dissection in analytic geometry: using quadratic completing the square to derive the perpendicular foot and distance formula',
      coreQuestionTitle: 'Core Problem Statement',
      coreQuestionDesc:
        'Given intercept equation x/a + y/b = 1, how can we find the distance from origin O(0,0) to the line and the exact foot of perpendicular H WITHOUT using the memorized point-to-line formula, strictly using completing the square?',
      step1Title: 'Express Distance Squared as a Function of x',
      step1Desc: 'Let P(x, y) be any point on the line. Express y in terms of x:',
      step2Title: 'Expand and Group into Standard Quadratic Trinomial',
      step2Desc: 'Expanding the binomial square gives:',
      step3Title: 'Core Completing the Square: Factor Leading Coefficient & Add/Subtract Constant',
      step3Part1: 'Step 1: Factor out the leading coefficient (a² + b²) / a²:',
      step3Part2: 'Step 2: Add and subtract the square of half the linear coefficient:',
      step3Part2Hint: 'Half of the bracketed linear coefficient is [ab² / (a²+b²)], whose square is added and subtracted:',
      step3Part3: 'Step 3: Group into a perfect square binomial and simplify remainder constant:',
      step3Part3Hint: 'Simplifying the constant term outside:',
      step4Title: 'Numerical Substitution for Current Parameters',
      step4Desc: 'Substituting the current numerical values into the completed square:',
      step4PositiveNote: 'Since the leading coefficient is strictly positive and any real square is ≥ 0:',
      step5Title: 'Determine Extremum, Perpendicular Foot H, and Minimum Distance',
      footHTitle: 'Perpendicular Foot H Coordinates (Point where distance is minimized):',
      footHDesc: 'The minimum occurs when the squared term equals zero, exactly at x = ab² / (a² + b²).',
      footHPoint: 'Foot coordinates:',
      distanceTitle: 'Distance from Origin to Line d:',
      distanceDesc: 'Taking the positive square root of the minimum value:',
      geoProof:
        'Geometric Verification: Right triangle area S = 1/2 · |ab| = 1/2 · |AB| · d, giving d = |ab| / √(a²+b²). Both algebraic completing the square and geometric area methods match perfectly!',
    },
    pitfalls: {
      title: 'High School Examination Standards & Common Pitfalls Checklist',
      subtitle: 'Critical traps and self-checking standards for analytic geometry homework and exams',
      pitfall1Title: 'Trap 1: Confusing "Intercept" with "Distance"',
      pitfall1Cause:
        'Students often mistake intercepts as positive distances, forgetting that intercepts can be negative and dropping negative signs.',
      pitfall1Rule:
        'Rule: An intercept is the coordinate of the axis intersection point. It can be positive, negative, or zero! Only |a| and |b| are distances.',
      pitfall2Title: 'Trap 2: Forgetting the Origin Case when "Intercepts are Equal"',
      pitfall2Exam: 'Exam Problem: "Find the equation of the line whose intercepts on both axes are equal."',
      pitfall2Tip: 'Critical Case Breakdown:',
      pitfall2Case1: 'If a = b ≠ 0: x/a + y/a = 1 => x + y = a;',
      pitfall2Case2: 'DO NOT FORGET: If intercepts are 0 (a = b = 0), the line passes through the origin (y = kx)! Always test both cases.',
      pitfall3Title: 'Trap 3: Absolute Values of Intercepts are Equal (|a| = |b|)',
      pitfall3Desc: 'When |a| = |b|, there are four distinct geometric situations:',
      pitfall3Case1: '1) Both intercepts are zero: line passes through the origin (y = kx);',
      pitfall3Case2: '2) a = b ≠ 0: slope k = -1, inclination α = 135°;',
      pitfall3Case3: '3) a = -b ≠ 0: slope k = 1, inclination α = 45° (forms isosceles right triangle).',
      checklistTitle: 'Student 5-Step Homework Graph Verification Checklist',
      check1: 'Axis Intersections: Exactly plot A(a, 0) on the x-axis and B(0, b) on the y-axis.',
      check2: 'Two-Way Extension: A line is infinite, not a line segment; extend past both points with arrows.',
      check3: 'Inclination Direction: If k > 0 slopes up to the right (acute angle); if k < 0 slopes down to the right (obtuse).',
      check4: 'Quadrant Check: Verify that the 3 traversed quadrants match the signs of a and b.',
      check5: 'Right Angle at Origin: Ensure the 90° right angle sits strictly at origin O(0,0).',
    },
    specialLines: {
      verticalBadge: 'Special Case: Vertical Line',
      verticalTitle: 'Vertical Line Detected: x = {c}',
      verticalSlope: 'Slope does not exist (undefined, denominator Δx = 0). Inclination angle α = 90° (perpendicular to x-axis).',
      verticalIntercepts: 'x-intercept is at A({c}, 0). The line is parallel to the y-axis, so NO y-intercept exists.',
      verticalGeneral: 'Standard General Form: x - {c} = 0 (or x = {c}).',
      verticalWhyNotIntercept: 'Why intercept form fails: The intercept form x/a + y/b = 1 requires both non-zero intercepts (a ≠ 0 and b ≠ 0). Because a vertical line never intersects the y-axis (unless x=0), b is undefined.',
      verticalDistance: 'Distance from origin O(0,0) to line: d = |{c}|. Foot of perpendicular is H({c}, 0).',
      horizontalBadge: 'Special Case: Horizontal Line',
      horizontalTitle: 'Horizontal Line Detected: y = {d}',
      horizontalSlope: 'Slope k = 0 (inclination angle α = 0°). The line is parallel to the x-axis.',
      horizontalIntercepts: 'y-intercept is at B(0, {d}). It never intersects the x-axis, so NO x-intercept exists.',
      horizontalGeneral: 'Standard General Form: y - {d} = 0 (or y = {d}).',
      horizontalWhyNotIntercept: 'Why intercept form fails: The line never intersects the x-axis, so x-intercept a is undefined.',
      horizontalDistance: 'Distance from origin O(0,0) to line: d = |{d}|. Foot of perpendicular is H(0, {d}).',
      originBadge: 'Special Case: Line Through Origin',
      originTitle: 'Line Passes Through the Origin (0, 0)',
      originSlope: 'Slope k = {k}. Both intercepts are zero: a = 0 and b = 0.',
      originWhyNotIntercept: 'Why intercept form fails: Substituting a = 0 and b = 0 leads to division by zero (x/0 + y/0 = 1 is mathematically invalid). Use slope-intercept form y = kx.',
    },
    validation: {
      emptyA: 'x-intercept a cannot be empty. Please enter a number or fraction.',
      emptyB: 'y-intercept b cannot be empty. Please enter a number or fraction.',
      emptyGeneral: 'Coefficients A, B, and C cannot be empty.',
      emptyPoints: 'Point coordinates cannot be empty.',
      zeroA: 'x-intercept a cannot be 0. Division by zero (x/0) is undefined. Intercept form does not exist.',
      zeroB: 'y-intercept b cannot be 0. Division by zero (y/0) is undefined. Intercept form does not exist.',
      zeroBoth: 'Both intercepts cannot be 0. The line passes through the origin (y = kx). Intercept form is undefined.',
    },
    trust: {
      about: 'About Us & Methodology',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact & Feedback',
      authorTitle: 'Academic Methodology & Authorship',
      authorBio: 'Developed by senior secondary mathematics curriculum specialists and STEM educators at Formula CalcKit. Dedicated to delivering rigorous, vector-grade analytic geometry tools with real-time geometric and algebraic verification.',
      academicMethodology: 'Curriculum Standards & Methodology',
      editorialBoard: 'Conforms to standards in AP Precalculus, IB Mathematics Analysis & Approaches, Gaokao Analytic Geometry, Spanish Selectividad, and French Baccalauréat. Employs both algebraic extremum analysis (completing the square) and Cartesian visual verification.',
      privacyStatement: 'Client-Side Privacy Guarantee: All calculations, equations, and graphs are generated 100% locally in your browser. No homework, student queries, or personal inputs are transmitted or stored on external servers.',
      termsStatement: 'Free for non-commercial educational use by students, teachers, tutors, and schools worldwide. All formulas, proofs, and vector graph exports may be referenced in coursework and class materials.',
      feedbackCommitment: 'Have an inquiry, suggestion, or exam problem to suggest? Our mathematics team reviews all feedback.',
      feedbackPlaceholder: 'Share your questions, feedback, or suggestions with our math team...',
      sendFeedback: 'Send Feedback',
      feedbackSent: 'Thank you! Your feedback has been received.',
      close: 'Close',
    },
    footer: {
      desc: 'Intercept Form Line Equation Calculator & Homework Graph Verification Platform',
      standard: 'Standard Form: x/a + y/b = 1',
      latexRendering: 'Vector LaTeX KaTeX Rendering',
      pdfExport: '100% Vector PDF Print Export',
    },
    print: {
      headerTitle: 'Analytic Geometry: Intercept Form Line Equation Report',
      headerDesc: 'Comprehensive step-by-step solution, quadratic completing the square derivation, and graph verification',
      date: 'Print Date:',
    },
  },

  es: {
    appName: 'Calculadora de Ecuación Simétrica de la Recta',
    appSubtitle: 'Geometría Analítica y Verificador Gráfico',
    appDescription:
      'Solucionador de geometría analítica para la ecuación canónica o simétrica de la recta (x/a + y/b = 1). Proporciona pasos detallados, método de completar el cuadrado para distancia al origen, plano cartesiano interactivo y exportación a PDF.',
    tagline: 'Geometría Cartesiana 2D de Alta Precisión y Demostraciones Matemáticas',
    badge: {
      highSchool: 'Bachillerato y Selectividad',
      analyticGeometry: 'Geometría Analítica',
      interceptForm: 'Forma Simétrica / Canónica (x/a + y/b = 1)',
      completingSquare: 'Completar el Cuadrado',
    },
    nav: {
      solver: 'Resolución de Ecuación',
      completingSquare: 'Completar Cuadrado',
      canvas: 'Verificador Gráfico',
      pitfalls: 'Reglas y Errores',
      exportPdf: 'Exportar PDF / Imprimir',
    },
    modes: {
      intercepts: 'Intersecciones (a, b)',
      twoPoints: 'Dos Puntos',
      generalForm: 'Forma General (Ax+By+C=0)',
      pointSlope: 'Punto y Pendiente',
    },
    search: {
      placeholder: 'Buscar conceptos, palabras clave, exámenes (ej. pendiente, completar cuadrado, área, Selectividad)...',
      filterLabel: 'Filtro Rápido de Temas:',
      all: 'Todos los Temas',
      noResults: 'No se encontraron conceptos. Intente buscar "pendiente", "área" u "origen".',
    },
    metrics: {
      interceptEq: 'Ecuación Simétrica',
      generalEq: 'Forma General',
      slopeAndAngle: 'Pendiente e Inclinación',
      chordLength: 'Longitud del Segmento |AB|',
      triangleArea: 'Área del Triángulo S',
      originDist: 'Distancia al Origen d',
    },
    input: {
      title: 'Parámetros en Tiempo Real y Configuración',
      subtitle: 'Ingrese la abscisa en el origen a y la ordenada en el origen b (admite enteros, decimales y fracciones como 3, -4, 2/3, -5/2)',
      swap: 'Intercambiar a ⇄ b',
      paramA: 'Abscisa en el origen a',
      paramB: 'Ordenada en el origen b',
      xPointA: '(Punto en eje x A(a, 0))',
      yPointB: '(Punto en eje y B(0, b))',
      toggleSign: '± Signo',
      sliderA: 'Valor actual a =',
      sliderB: 'Valor actual b =',
      currentEq: 'Ecuación Canónica Actual:',
      generalFormLabel: 'Forma General:',
      slopeLabel: 'Pendiente:',
      inclinationLabel: 'Inclinación:',
      presetsTitle: 'Problemas Típicos de Selectividad y Exámenes:',
      presetsSubtitle: 'Haga clic en cualquier problema para cargar los parámetros y ver la resolución completa',
      copyLatex: 'Copiar LaTeX',
      copied: '¡Copiado!',
      copyEq: 'Copiar Ecuación',
      point1: 'Punto 1 (x₁, y₁)',
      point2: 'Punto 2 (x₂, y₂)',
      slopeK: 'Pendiente k',
      coeffA: 'Coeficiente A',
      coeffB: 'Coeficiente B',
      coeffC: 'Término C',
      invalidWarning: 'a y b no pueden ser 0. La forma simétrica no puede representar rectas que pasan por el origen o paralelas a los ejes.',
    },
    canvas: {
      title: 'Plano Cartesiano Interactivo',
      hint: 'Arrastre los puntos A y B directamente en el plano para modificar las intersecciones; arrastre el fondo para mover la vista',
      grid: 'Cuadrícula',
      altitude: 'Altura OH',
      triangleArea: 'Área △',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      reset: 'Centrar',
      exportPng: 'Exportar PNG',
      lineLegend: 'Ecuación de la recta:',
      altitudeLegend: 'Perpendicular OH:',
      areaLegend: 'Área Triángulo Rectángulo:',
      angleLegend: 'Ángulo de Inclinación:',
      notesTitle: 'Consejo para Verificación en Tareas:',
      notesDesc:
        'Al graficar en papel milimetrado o exámenes: primero marque los puntos A(a, 0) y B(0, b), trace con regla y extienda la recta más allá de los puntos. El pie de la perpendicular desde el origen es H.',
    },
    steps: {
      title: 'Estándar de Exámenes: Resolución Paso a Paso',
      subtitle: 'Procedimiento riguroso que abarca conversiones, estudio de pendiente, propiedades geométricas y cuadrantes',
      given: 'Datos:',
      step1Title: 'Determinar las Intersecciones y Coordenadas con los Ejes',
      step1Desc: 'La recta l interseca al eje x en a y al eje y en b.',
      step1Coords: 'Por tanto, las coordenadas de intersección son:',
      step1Warning:
        'Distinción clave: Una "intersección" es una coordenada algebraica (puede ser positiva, negativa o cero), no una distancia geométrica. Las distancias al origen son |a| y |b|.',
      step2Title: 'Formular la Ecuación Canónica / Simétrica',
      step2Desc: 'Dado que a ≠ 0 y b ≠ 0, la forma simétrica está definida como:',
      step2Substitute: 'Sustituyendo los parámetros dados:',
      step3Title: 'Convertir a la Forma General Estándar (Ax + By + C = 0)',
      step3Desc: 'Multiplicando por el común denominador para obtener coeficientes enteros coprimos:',
      step3Result: 'Ecuación General:',
      step3Coeffs: 'Coeficientes: A = {A}, B = {B}, C = {C} (con A ≥ 0 y coprimos).',
      step4Title: 'Determinar la Pendiente k y el Ángulo de Inclinación α',
      step4Desc: 'Despejando en la forma explícita y = kx + b:',
      step4SlopeFormula: 'Fórmula de pendiente:',
      step4AngleFormula: 'Ángulo de inclinación α:',
      step4Acute: '(Ángulo agudo)',
      step4Obtuse: '(Ángulo obtuso)',
      step4Horizontal: '(Recta horizontal)',
      step5Title: 'Calcular la Longitud del Segmento |AB| y el Área del Triángulo',
      step5Desc: 'Cálculo de magnitudes geométricas con los ejes coordenados:',
      step5Length: 'Longitud del Segmento entre Ejes (Cuerda):',
      step5LengthFormula: 'Teorema de Pitágoras / Distancia entre dos puntos:',
      step5Area: 'Área del Triángulo Rectángulo Encerrado:',
      step5AreaFormula: 'Fórmula del área triangular:',
      step6Title: 'Análisis de Cuadrantes Atravesados',
      step6Passes: 'La recta pasa por los cuadrantes:',
      step6Misses: 'La recta NO pasa por el cuadrante:',
      pythagoreanBonus: '¡Terna Pitagórica Detectada! (Lados forman un triángulo rectángulo exacto)',
      errorTitle: 'Forma Canónica No Definida',
      errorDesc:
        'La ecuación simétrica requiere denominadores no nulos (a ≠ 0 y b ≠ 0). Cuando una recta pasa por el origen o es paralela a un eje, use la forma general Ax + By + C = 0 o la forma explícita y = kx + b.',
    },
    completingSquare: {
      title: 'Método de Completar el Cuadrado: Deducción de Distancia Mínima',
      subtitle:
        'Demostración algebraica rigurosa en geometría analítica: optimización cuadrática para hallar el pie de la perpendicular y la fórmula de distancia al origen',
      coreQuestionTitle: 'Planteamiento del Problema',
      coreQuestionDesc:
        'Dada la ecuación x/a + y/b = 1, ¿cómo podemos deducir la distancia desde el origen O(0,0) a la recta y las coordenadas del pie de la perpendicular H SIN recurrir a la fórmula memorizada, usando exclusivamente completar el cuadrado?',
      step1Title: 'Definir la Distancia al Cuadrado como Función de x',
      step1Desc: 'Sea P(x, y) cualquier punto sobre la recta. Despejando y en función de x:',
      step2Title: 'Desarrollar y Agrupar en un Trinomio Cuadrático Estándar',
      step2Desc: 'Desarrollando el binomio al cuadrado:',
      step3Title: 'Núcleo del Método: Factorizar Coeficiente Principal y Completar Cuadrado',
      step3Part1: 'Paso 1: Factorizar el coeficiente principal (a² + b²) / a²:',
      step3Part2: 'Paso 2: Sumar y restar el cuadrado de la mitad del coeficiente lineal:',
      step3Part2Hint: 'La mitad del coeficiente lineal entre corchetes es [ab² / (a²+b²)], cuyo cuadrado se suma y resta:',
      step3Part3: 'Paso 3: Formar el binomio al cuadrado perfecto y simplificar el término constante exterior:',
      step3Part3Hint: 'Simplificando el término independiente exterior:',
      step4Title: 'Sustitución Numérica con los Parámetros Actuales',
      step4Desc: 'Sustituyendo los valores actuales en la expresión cuadrática completa:',
      step4PositiveNote: 'Como el coeficiente cuadrático es positivo y cualquier cuadrado real es ≥ 0:',
      step5Title: 'Determinación del Extremo, Coordenadas de H y Distancia Mínima',
      footHTitle: 'Coordenadas del Pie de la Perpendicular H (Punto de distancia mínima):',
      footHDesc: 'El mínimo se alcanza cuando el binomio al cuadrado es cero, exactamente en x = ab² / (a² + b²).',
      footHPoint: 'Coordenadas de H:',
      distanceTitle: 'Distancia del Origen a la Recta d:',
      distanceDesc: 'Extrayendo la raíz cuadrada positiva del valor mínimo:',
      geoProof:
        'Demostración Geométrica: Por el área del triángulo S = 1/2 · |ab| = 1/2 · |AB| · d, se obtiene d = |ab| / √(a²+b²). ¡El método algebraico de completar el cuadrado y el método geométrico del área coinciden con total precisión!',
    },
    pitfalls: {
      title: 'Normativa de Exámenes y Lista de Errores Frecuentes',
      subtitle: 'Trampas típicas y criterios de autocorrección para ejercicios de geometría analítica',
      pitfall1Title: 'Trampa 1: Confundir "Intersección / Intercepto" con "Distancia"',
      pitfall1Cause:
        'Los estudiantes suelen asumir que las intersecciones son distancias positivas, olvidando los signos negativos en los cálculos.',
      pitfall1Rule:
        'Regla: La intersección es una coordenada algebraica y puede ser positiva, negativa o cero. Únicamente |a| y |b| son distancias geométricas.',
      pitfall2Title: 'Trampa 2: Olvidar el caso del origen cuando "las intersecciones son iguales"',
      pitfall2Exam: 'Pregunta clásica: "Halle la ecuación de la recta cuyas intersecciones en ambos ejes son iguales."',
      pitfall2Tip: 'Desglose indispensable de casos:',
      pitfall2Case1: 'Si a = b ≠ 0: x/a + y/a = 1 => x + y = a;',
      pitfall2Case2: 'NUNCA OLVIDAR: Si las intersecciones son cero (a = b = 0), la recta pasa por el origen (y = kx). ¡Siempre plantee ambos casos!',
      pitfall3Title: 'Trampa 3: Valores Absolutos de Intersecciones Iguales (|a| = |b|)',
      pitfall3Desc: 'Cuando |a| = |b|, existen cuatro situaciones geométricas distintas:',
      pitfall3Case1: '1) Ambas intersecciones son cero: recta por el origen (y = kx);',
      pitfall3Case2: '2) a = b ≠ 0: pendiente k = -1, inclinación α = 135°;',
      pitfall3Case3: '3) a = -b ≠ 0: pendiente k = 1, inclinación α = 45° (forma triángulo rectángulo isósceles).',
      checklistTitle: 'Lista de Autocomprobación de Gráficos (5 Pasos)',
      check1: 'Puntos en los Ejes: Marque con exactitud A(a, 0) en el eje x y B(0, b) en el eje y.',
      check2: 'Extensión Infinita: Una recta no es un segmento cerrado; extiéndala con flechas más allá de los puntos.',
      check3: 'Sentido de Inclinación: k > 0 sube hacia la derecha (agudo); k < 0 baja hacia la derecha (obtuso).',
      check4: 'Comprobación de Cuadrantes: Verifique que los 3 cuadrantes cruzados concuerden con los signos de a y b.',
      check5: 'Ángulo Recto: Asegúrese de que el ángulo de 90° se ubique exactamente en el origen O(0,0).',
    },
    specialLines: {
      verticalBadge: 'Caso Especial: Recta Vertical',
      verticalTitle: 'Recta Vertical Detectada: x = {c}',
      verticalSlope: 'La pendiente no existe (indefinida, denominador Δx = 0). Ángulo de inclinación α = 90° (perpendicular al eje x).',
      verticalIntercepts: 'La intersección con el eje x es A({c}, 0). La recta es paralela al eje y, por lo que NO existe intersección con el eje y.',
      verticalGeneral: 'Forma General Estándar: x - {c} = 0 (o x = {c}).',
      verticalWhyNotIntercept: 'Por qué no admite forma simétrica: La ecuación canónica x/a + y/b = 1 exige denominadores no nulos (a ≠ 0 y b ≠ 0). Al ser paralela al eje y, la ordenada en el origen b no está definida.',
      verticalDistance: 'Distancia del origen O(0,0) a la recta: d = |{c}|. El pie de la perpendicular es H({c}, 0).',
      horizontalBadge: 'Caso Especial: Recta Horizontal',
      horizontalTitle: 'Recta Horizontal Detectada: y = {d}',
      horizontalSlope: 'Pendiente k = 0 (ángulo de inclinación α = 0°). Es paralela al eje x.',
      horizontalIntercepts: 'La ordenada en el origen es B(0, {d}). No corta al eje x, por lo que NO existe abscisa en el origen.',
      horizontalGeneral: 'Forma General Estándar: y - {d} = 0 (o y = {d}).',
      horizontalWhyNotIntercept: 'Por qué no admite forma simétrica: La recta nunca corta al eje x, por lo que a no está definida.',
      horizontalDistance: 'Distancia del origen O(0,0) a la recta: d = |{d}|. El pie de la perpendicular es H(0, {d}).',
      originBadge: 'Caso Especial: Recta por el Origen',
      originTitle: 'La Recta Pasa por el Origen (0, 0)',
      originSlope: 'Pendiente k = {k}. Ambas intersecciones son cero: a = 0 y b = 0.',
      originWhyNotIntercept: 'Por qué no admite forma simétrica: Sustituir a = 0 y b = 0 produce una división entre cero (x/0 + y/0 = 1 es matemáticamente inválido). Use la forma y = kx.',
    },
    validation: {
      emptyA: 'La abscisa en el origen a no puede estar vacía. Ingrese un número o fracción.',
      emptyB: 'La ordenada en el origen b no puede estar vacía. Ingrese un número o fracción.',
      emptyGeneral: 'Los coeficientes A, B y C no pueden estar vacíos.',
      emptyPoints: 'Las coordenadas de los puntos no pueden estar vacías.',
      zeroA: 'La intersección x "a" no puede ser 0. División por cero (x/0) indefinida.',
      zeroB: 'La intersección y "b" no puede ser 0. División por cero (y/0) indefinida.',
      zeroBoth: 'Ambas intersecciones no pueden ser 0. La recta pasa por el origen (y = kx).',
    },
    trust: {
      about: 'Quiénes Somos y Metodología',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      contact: 'Contacto y Sugerencias',
      authorTitle: 'Metodología Académica y Autoría',
      authorBio: 'Desarrollado por especialistas en didáctica de las matemáticas y educadores STEM de Formula CalcKit. Comprometidos con herramientas de geometría analítica rigurosas y verificación visual.',
      academicMethodology: 'Estándares Curriculares y Didáctica',
      editorialBoard: 'Adaptado a los programas de Bachillerato, Selectividad (EvAU/EBAU), AP Precalculus y Baccalauréat. Combina la demostración algebraica (completar el cuadrado) con la intuición geométrica cartesiana.',
      privacyStatement: 'Privacidad 100% en el Cliente: Todos los cálculos y gráficos se ejecutan localmente en su navegador. No se guardan ni recopilan datos de tareas o consultas personales.',
      termsStatement: 'Acceso gratuito para uso educativo sin fines comerciales por parte de estudiantes, profesores y centros educativos.',
      feedbackCommitment: '¿Tiene alguna consulta o ejercicio para sugerir? Nuestro equipo docente revisa cada mensaje.',
      feedbackPlaceholder: 'Comparta sus dudas o sugerencias con nuestro equipo de matemáticas...',
      sendFeedback: 'Enviar Mensaje',
      feedbackSent: '¡Gracias! Su mensaje ha sido recibido.',
      close: 'Cerrar',
    },
    footer: {
      desc: 'Calculadora de Ecuación Simétrica de la Recta y Plataforma de Verificación Gráfica',
      standard: 'Forma Canónica: x/a + y/b = 1',
      latexRendering: 'Renderizado Vectorial LaTeX KaTeX',
      pdfExport: 'Exportación a PDF Vectorial de Alta Definición',
    },
    print: {
      headerTitle: 'Geometría Analítica: Informe de Resolución de la Recta Simétrica',
      headerDesc: 'Resolución paso a paso, método de completar el cuadrado y verificación gráfica completa',
      date: 'Fecha de impresión:',
    },
  },

  fr: {
    appName: 'Calculateur d’Équation de Droite (Forme Symétrique)',
    appSubtitle: 'Géométrie Analytique et Vérificateur de Tracé',
    appDescription:
      'Solveur de géométrie analytique pour l’équation symétrique de la droite (x/a + y/b = 1). Fournit les étapes détaillées, la méthode de complétion du carré pour la distance à l’origine, un repère cartésien interactif et l’export PDF.',
    tagline: 'Géométrie Cartésienne 2D Haute Précision et Démonstrations Mathématiques',
    badge: {
      highSchool: 'Lycée et Baccalauréat',
      analyticGeometry: 'Géométrie Analytique',
      interceptForm: 'Forme Symétrique (x/a + y/b = 1)',
      completingSquare: 'Complétion du Carré',
    },
    nav: {
      solver: 'Résolution d’Équation',
      completingSquare: 'Complétion du Carré',
      canvas: 'Vérificateur Graphique',
      pitfalls: 'Règles et Pièges',
      exportPdf: 'Exporter en PDF / Imprimer',
    },
    modes: {
      intercepts: 'Intersections (a, b)',
      twoPoints: 'Deux Points',
      generalForm: 'Forme Générale (Ax+By+C=0)',
      pointSlope: 'Point et Pente',
    },
    search: {
      placeholder: 'Rechercher des concepts, mots-clés, examens (ex. pente, complétion du carré, aire, Baccalauréat)...',
      filterLabel: 'Filtre Rapide :',
      all: 'Tous les Sujets',
      noResults: 'Aucun concept trouvé. Essayez de chercher « pente », « aire » ou « origine ».',
    },
    metrics: {
      interceptEq: 'Forme Symétrique',
      generalEq: 'Forme Générale',
      slopeAndAngle: 'Pente et Inclinaison',
      chordLength: 'Longueur du Segment |AB|',
      triangleArea: 'Aire du Triangle S',
      originDist: 'Distance à l’Origine d',
    },
    input: {
      title: 'Paramètres en Temps Réel et Configuration',
      subtitle: 'Entrez l’abscisse à l’origine a et l’ordonnée à l’origine b (prend en charge entiers, décimaux et fractions comme 3, -4, 2/3, -5/2)',
      swap: 'Échanger a ⇄ b',
      paramA: 'Abscisse à l’origine a',
      paramB: 'Ordonnée à l’origine b',
      xPointA: '(Point sur axe x A(a, 0))',
      yPointB: '(Point sur axe y B(0, b))',
      toggleSign: '± Signe',
      sliderA: 'Valeur actuelle a =',
      sliderB: 'Valeur actuelle b =',
      currentEq: 'Équation Symétrique Actuelle :',
      generalFormLabel: 'Forme Générale :',
      slopeLabel: 'Pente :',
      inclinationLabel: 'Inclinaison :',
      presetsTitle: 'Exercices Types du Baccalauréat et Concours :',
      presetsSubtitle: 'Cliquez sur un exercice pour charger les paramètres et afficher la résolution détaillée',
      copyLatex: 'Copier LaTeX',
      copied: 'Copié !',
      copyEq: 'Copier l’Équation',
      point1: 'Point 1 (x₁, y₁)',
      point2: 'Point 2 (x₂, y₂)',
      slopeK: 'Pente k',
      coeffA: 'Coefficient A',
      coeffB: 'Coefficient B',
      coeffC: 'Constante C',
      invalidWarning: 'a et b ne peuvent pas être nuls. La forme symétrique ne peut pas représenter les droites passant par l’origine ou parallèles aux axes.',
    },
    canvas: {
      title: 'Repère Cartésien Interactif',
      hint: 'Faites glisser directement les points A et B sur le repère pour ajuster les intersections ; glissez le fond pour déplacer la vue',
      grid: 'Grille',
      altitude: 'Hauteur OH',
      triangleArea: 'Aire △',
      zoomIn: 'Zoom +',
      zoomOut: 'Zoom -',
      reset: 'Centrer',
      exportPng: 'Exporter PNG',
      lineLegend: 'Équation de droite :',
      altitudeLegend: 'Perpendiculaire OH :',
      areaLegend: 'Aire Triangle Rectangle :',
      angleLegend: 'Angle d’Inclinaison :',
      notesTitle: 'Conseil de Vérification pour les Devoirs :',
      notesDesc:
        'Pour tracer sur papier quadrillé ou en examen : placez d’abord les points A(a, 0) et B(0, b), reliez à la règle et prolongez au-delà des points. Le pied de la perpendiculaire issue de l’origine est H.',
    },
    steps: {
      title: 'Standard des Examens : Résolution Étape par Étape',
      subtitle: 'Méthode rigoureuse incluant conversions, étude de pente, grandeurs géométriques et analyse des quadrants',
      given: 'Données :',
      step1Title: 'Déterminer les Intersections et Coordonnées sur les Axes',
      step1Desc: 'La droite l coupe l’axe des abscisses en a et l’axe des ordonnées en b.',
      step1Coords: 'Les coordonnées des points d’intersection sont donc :',
      step1Warning:
        'Distinction essentielle : L’intersection est une coordonnée algébrique (positive, négative ou nulle), non une distance géométrique ! Les distances à l’origine sont |a| et |b|.',
      step2Title: 'Formuler l’Équation Symétrique de la Droite',
      step2Desc: 'Puisque a ≠ 0 et b ≠ 0, la forme symétrique est définie par :',
      step2Substitute: 'En substituant les paramètres donnés :',
      step3Title: 'Convertir en Forme Générale Standard (Ax + By + C = 0)',
      step3Desc: 'En multipliant par le dénominateur commun pour obtenir des coefficients entiers premiers entre eux :',
      step3Result: 'Équation Générale :',
      step3Coeffs: 'Coefficients : A = {A}, B = {B}, C = {C} (avec A ≥ 0 et premiers entre eux).',
      step4Title: 'Déterminer la Pente k et l’Angle d’Inclinaison α',
      step4Desc: 'En isolant sous la forme réduite y = kx + b :',
      step4SlopeFormula: 'Formule de la pente :',
      step4AngleFormula: 'Angle d’inclinaison α :',
      step4Acute: '(Angle aigu)',
      step4Obtuse: '(Angle obtus)',
      step4Horizontal: '(Droite horizontale)',
      step5Title: 'Calculer la Longueur du Segment |AB| et l’Aire du Triangle',
      step5Desc: 'Calcul des mesures géométriques formées avec les axes :',
      step5Length: 'Longueur du Segment Découpé (Corde) :',
      step5LengthFormula: 'Théorème de Pythagore / Distance entre deux points :',
      step5Area: 'Aire du Triangle Rectangle Délimité :',
      step5AreaFormula: 'Formule de l’aire du triangle :',
      step6Title: 'Analyse des Quadrants Traversés',
      step6Passes: 'La droite traverse les quadrants :',
      step6Misses: 'La droite NE traverse PAS le quadrant :',
      pythagoreanBonus: 'Triplet Pythagoricien Détecté ! (Les côtés forment un triangle rectangle exact)',
      errorTitle: 'Forme Symétrique Non Définie',
      errorDesc:
        'L’équation symétrique nécessite des dénominateurs non nuls (a ≠ 0 et b ≠ 0). Lorsqu’une droite passe par l’origine ou est parallèle à un axe, utilisez la forme générale Ax + By + C = 0 ou la forme réduite y = kx + b.',
    },
    completingSquare: {
      title: 'Méthode de Complétion du Carré : Dérivation de la Distance Minimale',
      subtitle:
        'Démonstration algébrique approfondie en géométrie analytique : optimisation du second degré pour déterminer le pied de la hauteur et la distance à l’origine',
      coreQuestionTitle: 'Énoncé du Problème Fondamental',
      coreQuestionDesc:
        'Étant donnée l’équation x/a + y/b = 1, comment déduire la distance de l’origine O(0,0) à la droite et les coordonnées du pied H SANS utiliser la formule toute faite, uniquement par la complétion du carré ?',
      step1Title: 'Exprimer le Carré de la Distance en Fonction de x',
      step1Desc: 'Soit P(x, y) un point quelconque de la droite. En exprimant y en fonction de x :',
      step2Title: 'Développer et Regrouper en Trinôme du Second Degré',
      step2Desc: 'Le développement du carré donne :',
      step3Title: 'Cœur de la Méthode : Factoriser le Coefficient Principal et Compléter le Carré',
      step3Part1: 'Étape 1 : Mettre en facteur le coefficient principal (a² + b²) / a² :',
      step3Part2: 'Étape 2 : Ajouter et retrancher le carré de la moitié du coefficient linéaire :',
      step3Part2Hint: 'La moitié du coefficient linéaire entre crochets est [ab² / (a²+b²)], dont on ajoute et soustrait le carré :',
      step3Part3: 'Étape 3 : Former l’identité remarquable et réduire la constante extérieure :',
      step3Part3Hint: 'En réduisant le terme constant extérieur :',
      step4Title: 'Application Numérique avec les Paramètres Actuels',
      step4Desc: 'En remplaçant par les valeurs numériques dans l’expression complétée :',
      step4PositiveNote: 'Le coefficient principal étant strictement positif et tout carré réel étant ≥ 0 :',
      step5Title: 'Détermination de l’Extremum, des Coordonnées de H et de la Distance Minimale',
      footHTitle: 'Coordonnées du Pied de la Perpendiculaire H (Point où la distance est minimale) :',
      footHDesc: 'Le minimum est atteint lorsque le carré s’annule, c’est-à-dire pour x = ab² / (a² + b²).',
      footHPoint: 'Coordonnées de H :',
      distanceTitle: 'Distance de l’Origine à la Droite d :',
      distanceDesc: 'En prenant la racine carrée positive de la valeur minimale :',
      geoProof:
        'Validation Géométrique : Par l’aire du triangle S = 1/2 · |ab| = 1/2 · |AB| · d, on retrouve d = |ab| / √(a²+b²). La méthode algébrique et la méthode géométrique concordent rigoureusement !',
    },
    pitfalls: {
      title: 'Standards d’Examen et Pièges Fréquents à Éviter',
      subtitle: 'Erreurs classiques et critères d’autocorrection pour les devoirs de géométrie analytique',
      pitfall1Title: 'Piège 1 : Confondre « Intersection » et « Distance »',
      pitfall1Cause:
        'Les élèves considèrent souvent les intersections comme des longueurs positives, omettant les signes négatifs dans leurs calculs.',
      pitfall1Rule:
        'Règle : Une intersection est une coordonnée algébrique et peut être positive, négative ou nulle. Seuls |a| et |b| sont des distances géométriques.',
      pitfall2Title: 'Piège 2 : Oublier le cas de l’origine lorsque « les intersections sont égales »',
      pitfall2Exam: 'Exercice classique : « Déterminer l’équation de la droite dont les intersections avec les axes sont égales. »',
      pitfall2Tip: 'Décomposition indispensable des cas :',
      pitfall2Case1: 'Si a = b ≠ 0 : x/a + y/a = 1 => x + y = a ;',
      pitfall2Case2: 'À NE JAMAIS OUBLIER : Si les intersections sont nulles (a = b = 0), la droite passe par l’origine (y = kx) ! Toujours traiter les deux cas.',
      pitfall3Title: 'Piège 3 : Valeurs Absolues des Intersections Égales (|a| = |b|)',
      pitfall3Desc: 'Lorsque |a| = |b|, quatre configurations géométriques distinctes existent :',
      pitfall3Case1: '1) Deux intersections nulles : droite passant par l’origine (y = kx) ;',
      pitfall3Case2: '2) a = b ≠ 0 : pente k = -1, inclinaison α = 135° ;',
      pitfall3Case3: '3) a = -b ≠ 0 : pente k = 1, inclinaison α = 45° (triangle rectangle isocèle).',
      checklistTitle: 'Liste d’Autovérification Graphique en 5 Étapes',
      check1: 'Points sur les Axes : Marquez avec exactitude A(a, 0) sur l’axe x et B(0, b) sur l’axe y.',
      check2: 'Prolongement Infini : Une droite est infinie, ce n’est pas un segment ; prolongez avec des flèches.',
      check3: 'Sens de Pente : k > 0 monte vers la droite (aigu) ; k < 0 descend vers la droite (obtus).',
      check4: 'Contrôle des Quadrants : Vérifiez que les 3 quadrants traversés correspondent aux signes de a et b.',
      check5: 'Angle Droit : Assurez-vous que l’angle de 90° soit situé rigoureusement à l’origine O(0,0).',
    },
    specialLines: {
      verticalBadge: 'Cas Particulier : Droite Verticale',
      verticalTitle: 'Droite Verticale Détectée : x = {c}',
      verticalSlope: 'La pente n’est pas définie (dénominateur Δx = 0). Angle d’inclinaison α = 90° (perpendiculaire à l’axe des abscisses).',
      verticalIntercepts: 'L’intersection avec l’axe x est A({c}, 0). La droite est parallèle à l’axe y, donc il n’y a AUCUNE ordonnée à l’origine.',
      verticalGeneral: 'Forme Générale Standard : x - {c} = 0 (ou x = {c}).',
      verticalWhyNotIntercept: 'Pourquoi la forme symétrique est impossible : L’équation symétrique x/a + y/b = 1 nécessite des dénominateurs non nuls (a ≠ 0 et b ≠ 0). Comme la droite ne coupe jamais l’axe y, b n’est pas défini.',
      verticalDistance: 'Distance de l’origine O(0,0) à la droite : d = |{c}|. Le pied de la hauteur est H({c}, 0).',
      horizontalBadge: 'Cas Particulier : Droite Horizontale',
      horizontalTitle: 'Droite Horizontale Détectée : y = {d}',
      horizontalSlope: 'Pente k = 0 (angle d’inclinaison α = 0°). La droite est parallèle à l’axe des abscisses.',
      horizontalIntercepts: 'L’ordonnée à l’origine est B(0, {d}). Elle ne coupe jamais l’axe x, donc il n’y a AUCUNE abscisse à l’origine.',
      horizontalGeneral: 'Forme Générale Standard : y - {d} = 0 (ou y = {d}).',
      horizontalWhyNotIntercept: 'Pourquoi la forme symétrique est impossible : La droite ne coupe jamais l’axe x, donc a n’est pas défini.',
      horizontalDistance: 'Distance de l’origine O(0,0) à la droite : d = |{d}|. Le pied de la hauteur est H(0, {d}).',
      originBadge: 'Cas Particulier : Droite Passant par l’Origine',
      originTitle: 'La Droite Passe par l’Origine (0, 0)',
      originSlope: 'Pente k = {k}. Les deux intersections sont nulles : a = 0 et b = 0.',
      originWhyNotIntercept: 'Pourquoi la forme symétrique est impossible : Remplacer a = 0 et b = 0 entraîne une division par zéro (x/0 + y/0 = 1 est invalide). Utilisez la forme réduite y = kx.',
    },
    validation: {
      emptyA: 'L’abscisse à l’origine a ne peut pas être vide. Veuillez saisir un nombre ou une fraction.',
      emptyB: 'L’ordonnée à l’origine b ne peut pas être vide. Veuillez saisir un nombre ou une fraction.',
      emptyGeneral: 'Les coefficients A, B et C ne peuvent pas être vides.',
      emptyPoints: 'Les coordonnées des points ne peuvent pas être vides.',
      zeroA: 'L’abscisse à l’origine a ne peut pas être 0. La division par zéro (x/0) n’est pas définie.',
      zeroB: 'L’ordonnée à l’origine b ne peut pas être 0. La division par zéro (y/0) n’est pas définie.',
      zeroBoth: 'Les deux intersections ne peuvent être 0. La droite passe par l’origine (y = kx).',
    },
    trust: {
      about: 'À Propos et Méthodologie',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d’Utilisation',
      contact: 'Contact et Retours',
      authorTitle: 'Méthodologie Académique et Paternité',
      authorBio: 'Développé par des enseignants de mathématiques et spécialistes STEM chez Formula CalcKit. Dédié aux outils de géométrie analytique vectoriels rigoureux et fiables.',
      academicMethodology: 'Normes Pédagogiques et Programmes',
      editorialBoard: 'Conforme aux programmes du Baccalauréat Général (Spécialité Mathématiques), de l’IB Mathematics et d’AP Precalculus. Associe la complétion du carré à l’intuition visuelle cartésienne.',
      privacyStatement: 'Confidentialité Totale Côté Client : Tous les calculs, équations et tracés sont traités localement sur votre appareil. Aucune donnée d’exercice ni saisie n’est transmise ou collectée.',
      termsStatement: 'Accès gratuit pour un usage éducatif non commercial par les élèves, enseignants et établissements scolaires.',
      feedbackCommitment: 'Une remarque, une question ou une suggestion d’exercice ? Notre équipe pédagogique lit tous vos retours.',
      feedbackPlaceholder: 'Partagez vos questions ou suggestions avec notre équipe mathématique...',
      sendFeedback: 'Envoyer le Message',
      feedbackSent: 'Merci ! Votre message a bien été reçu.',
      close: 'Fermer',
    },
    footer: {
      desc: 'Calculateur d’Équation Symétrique de Droite et Plateforme de Vérification Graphique',
      standard: 'Forme Symétrique : x/a + y/b = 1',
      latexRendering: 'Rendu Vectoriel LaTeX KaTeX',
      pdfExport: 'Exportation PDF Vectorielle Haute Définition',
    },
    print: {
      headerTitle: 'Géométrie Analytique : Rapport de Résolution d’Équation de Droite',
      headerDesc: 'Résolution détaillée pas à pas, méthode de complétion du carré et vérification graphique',
      date: 'Date d’impression :',
    },
  },

  pt: {
    appName: 'Calculadora da Equação Segmentária da Reta',
    appSubtitle: 'Geometria Analítica e Verificador Gráfico',
    appDescription:
      'Solucionador de geometria analítica para a equação segmentária da reta (x/p + y/q = 1 ou x/a + y/b = 1). Apresenta passos detalhados, método de completar o quadrado para distância até a origem, plano cartesiano interativo e exportação para PDF.',
    tagline: 'Geometria Cartesiana 2D de Alta Precisão e Demonstrações Matemáticas',
    badge: {
      highSchool: 'Ensino Médio e ENEM',
      analyticGeometry: 'Geometria Analítica',
      interceptForm: 'Forma Segmentária (x/a + y/b = 1)',
      completingSquare: 'Completar o Quadrado',
    },
    nav: {
      solver: 'Resolução da Equação',
      completingSquare: 'Completar Quadrado',
      canvas: 'Verificador Gráfico',
      pitfalls: 'Regras e Armadilhas',
      exportPdf: 'Exportar PDF / Imprimir',
    },
    modes: {
      intercepts: 'Interceptos (a, b)',
      twoPoints: 'Dois Pontos',
      generalForm: 'Forma Geral (Ax+By+C=0)',
      pointSlope: 'Ponto e Inclinação',
    },
    search: {
      placeholder: 'Pesquisar conceitos, palavras-chave, exames (ex.: coeficiente angular, completar quadrado, área, ENEM)...',
      filterLabel: 'Filtro Rápido de Tópicos:',
      all: 'Todos os Tópicos',
      noResults: 'Nenhum conceito encontrado. Tente buscar por "coeficiente angular", "área" ou "origem".',
    },
    metrics: {
      interceptEq: 'Equação Segmentária',
      generalEq: 'Equação Geral',
      slopeAndAngle: 'Coeficiente Angular e Ângulo',
      chordLength: 'Comprimento do Segmento |AB|',
      triangleArea: 'Área do Triângulo S',
      originDist: 'Distância à Origem d',
    },
    input: {
      title: 'Parâmetros em Tempo Real e Configuração',
      subtitle: 'Insira o intercepto no eixo x (a) e no eixo y (b) (aceita inteiros, decimais e frações como 3, -4, 2/3, -5/2)',
      swap: 'Inverter a ⇄ b',
      paramA: 'Intercepto em x (a)',
      paramB: 'Intercepto em y (b)',
      xPointA: '(Ponto no eixo x A(a, 0))',
      yPointB: '(Ponto no eixo y B(0, b))',
      toggleSign: '± Sinal',
      sliderA: 'Valor atual a =',
      sliderB: 'Valor atual b =',
      currentEq: 'Equação Segmentária Atual:',
      generalFormLabel: 'Forma Geral:',
      slopeLabel: 'Coeficiente Angular:',
      inclinationLabel: 'Inclinação:',
      presetsTitle: 'Questões Clássicas do ENEM e Vestibulares:',
      presetsSubtitle: 'Clique em qualquer questão para carregar os parâmetros e ver a resolução completa',
      copyLatex: 'Copiar LaTeX',
      copied: 'Copiado!',
      copyEq: 'Copiar Equação',
      point1: 'Ponto 1 (x₁, y₁)',
      point2: 'Ponto 2 (x₂, y₂)',
      slopeK: 'Coef. Angular k',
      coeffA: 'Coeficiente A',
      coeffB: 'Coeficiente B',
      coeffC: 'Termo C',
      invalidWarning: 'a e b não podem ser nulos. A forma segmentária não representa retas que passam pela origem ou paralelas aos eixos.',
    },
    canvas: {
      title: 'Plano Cartesiano Interativo',
      hint: 'Arraste os pontos A e B diretamente no plano para ajustar os interceptos; arraste o fundo para mover a visualização',
      grid: 'Grade',
      altitude: 'Altura OH',
      triangleArea: 'Área △',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      reset: 'Centralizar',
      exportPng: 'Exportar PNG',
      lineLegend: 'Equação da reta:',
      altitudeLegend: 'Perpendicular OH:',
      areaLegend: 'Área do Triângulo Retângulo:',
      angleLegend: 'Ângulo de Inclinação:',
      notesTitle: 'Dica para Conferência de Exercícios:',
      notesDesc:
        'Ao desenhar em papel quadriculado ou provas: marque primeiro A(a, 0) no eixo x e B(0, b) no eixo y, una com a régua e prolongue a reta. O pé da perpendicular a partir da origem é H.',
    },
    steps: {
      title: 'Padrão dos Vestibulares: Resolução Passo a Passo',
      subtitle: 'Procedimento rigoroso abrangendo conversões, análise do coeficiente angular, grandezas geométricas e quadrantes',
      given: 'Dados:',
      step1Title: 'Determinar os Interceptos e Coordenadas nos Eixos',
      step1Desc: 'A reta l intercepta o eixo x em a e o eixo y em b.',
      step1Coords: 'Logo, as coordenadas dos pontos de interseção são:',
      step1Warning:
        'Distinção fundamental: O "intercepto" é uma coordenada algébrica (pode ser positiva, negativa ou nula), não uma distância geométrica! As distâncias até a origem são |a| e |b|.',
      step2Title: 'Formular a Equação Segmentária da Reta',
      step2Desc: 'Como a ≠ 0 e b ≠ 0, a forma segmentária é dada por:',
      step2Substitute: 'Substituindo os valores fornecidos:',
      step3Title: 'Converter para a Forma Geral Padrão (Ax + By + C = 0)',
      step3Desc: 'Multiplicando pelo mínimo múltiplo comum para obter coeficientes inteiros primos entre si:',
      step3Result: 'Equação Geral:',
      step3Coeffs: 'Coeficientes: A = {A}, B = {B}, C = {C} (com A ≥ 0 e primos entre si).',
      step4Title: 'Determinar o Coeficiente Angular k e o Ângulo de Inclinação α',
      step4Desc: 'Isolando na forma reduzida y = kx + b:',
      step4SlopeFormula: 'Fórmula do coeficiente angular:',
      step4AngleFormula: 'Ângulo de inclinação α:',
      step4Acute: '(Ângulo agudo)',
      step4Obtuse: '(Ângulo obtuso)',
      step4Horizontal: '(Reta horizontal)',
      step5Title: 'Calcular o Comprimento do Segmento |AB| e a Área do Triângulo',
      step5Desc: 'Cálculo das grandezas geométricas formadas com os eixos:',
      step5Length: 'Comprimento do Segmento entre Eixos (Corda):',
      step5LengthFormula: 'Teorema de Pitágoras / Distância entre dois pontos:',
      step5Area: 'Área do Triângulo Retângulo Formado:',
      step5AreaFormula: 'Fórmula da área triangular:',
      step6Title: 'Análise dos Quadrantes Atravessados',
      step6Passes: 'A reta atravessa os quadrantes:',
      step6Misses: 'A reta NÃO atravessa o quadrante:',
      pythagoreanBonus: 'Terno Pitagórico Detectado! (Os lados formam um triângulo retângulo com números inteiros)',
      errorTitle: 'Forma Segmentária Indefinida',
      errorDesc:
        'A equação segmentária exige denominadores não nulos (a ≠ 0 e b ≠ 0). Quando uma reta passa pela origem ou é paralela a um eixo, utilize a forma geral Ax + By + C = 0 ou a forma reduzida y = kx + b.',
    },
    completingSquare: {
      title: 'Método de Completar o Quadrado: Dedução da Distância Mínima',
      subtitle:
        'Demonstração algébrica aprofundada em geometria analítica: otimização quadrática para encontrar o pé da perpendicular e a distância até a origem',
      coreQuestionTitle: 'Enunciado do Problema Central',
      coreQuestionDesc:
        'Dada a equação x/a + y/b = 1, como deduzir a distância da origem O(0,0) até a reta e as coordenadas do pé H SEM usar fórmulas prontas memorizadas, estritamente completando o quadrado?',
      step1Title: 'Expressar o Quadrado da Distância em Função de x',
      step1Desc: 'Seja P(x, y) um ponto qualquer da reta. Isolando y em função de x:',
      step2Title: 'Desenvolver e Agrupar no Trinômio do Segundo Grau',
      step2Desc: 'Expandindo o quadrado do binômio:',
      step3Title: 'Núcleo do Método: Fatorar Coeficiente Principal e Completar o Quadrado',
      step3Part1: 'Passo 1: Colocar em evidência o coeficiente principal (a² + b²) / a²:',
      step3Part2: 'Passo 2: Somar e subtrair o quadrado da metade do coeficiente linear:',
      step3Part2Hint: 'A metade do coeficiente linear entre colchetes é [ab² / (a²+b²)], cujo quadrado é somado e subtraído:',
      step3Part3: 'Passo 3: Formar o trinômio quadrado perfeito e simplificar a constante restante:',
      step3Part3Hint: 'Simplificando o termo constante externo:',
      step4Title: 'Substituição Numérica com os Parâmetros Atuais',
      step4Desc: 'Substituindo os valores numéricos atuais na expressão completada:',
      step4PositiveNote: 'Como o coeficiente principal é positivo e qualquer quadrado real é ≥ 0:',
      step5Title: 'Determinação do Extremo, Coordenadas de H e Distância Mínima',
      footHTitle: 'Coordenadas do Pé da Perpendicular H (Ponto de distância mínima):',
      footHDesc: 'O mínimo ocorre quando o termo ao quadrado se anula, exatamente em x = ab² / (a² + b²).',
      footHPoint: 'Coordenadas de H:',
      distanceTitle: 'Distância da Origem à Reta d:',
      distanceDesc: 'Extraindo a raiz quadrada positiva do valor mínimo:',
      geoProof:
        'Comprovação Geométrica: Pela área do triângulo S = 1/2 · |ab| = 1/2 · |AB| · d, obtém-se d = |ab| / √(a²+b²). Os métodos algébrico e geométrico coincidem perfeitamente!',
    },
    pitfalls: {
      title: 'Padrão dos Vestibulares e Lista de Erros Comuns',
      subtitle: 'Armadilhas clássicas e critérios de autocorreção para resolução de geometria analítica',
      pitfall1Title: 'Armadilha 1: Confundir "Intercepto" com "Distância"',
      pitfall1Cause:
        'Muitos estudantes consideram os interceptos como grandezas puramente positivas, omitindo sinais negativos.',
      pitfall1Rule:
        'Regra: O intercepto é uma coordenada algébrica e pode ser positivo, negativo ou zero. Apenas |a| e |b| são distâncias geométricas.',
      pitfall2Title: 'Armadilha 2: Esquecer a Origem quando "os interceptos são iguais"',
      pitfall2Exam: 'Questão frequente: "Determine a equação da reta cujos interceptos em ambos os eixos são iguais."',
      pitfall2Tip: 'Divisão indispensável em dois casos:',
      pitfall2Case1: 'Se a = b ≠ 0: x/a + y/a = 1 => x + y = a;',
      pitfall2Case2: 'NUNCA ESQUEÇA: Se os interceptos forem nulos (a = b = 0), a reta passa pela origem (y = kx)! Sempre analise ambos os casos.',
      pitfall3Title: 'Armadilha 3: Módulos dos Interceptos Iguais (|a| = |b|)',
      pitfall3Desc: 'Quando |a| = |b|, existem quatro situações geométricas distintas:',
      pitfall3Case1: '1) Ambos os interceptos são zero: reta passando pela origem (y = kx);',
      pitfall3Case2: '2) a = b ≠ 0: coeficiente angular k = -1, inclinação α = 135°;',
      pitfall3Case3: '3) a = -b ≠ 0: coeficiente angular k = 1, inclinação α = 45° (forma triângulo retângulo isósceles).',
      checklistTitle: 'Checklist de Conferência de Gráficos em 5 Passos',
      check1: 'Pontos nos Eixos: Marque com precisão A(a, 0) no eixo x e B(0, b) no eixo y.',
      check2: 'Extensão Infinita: Uma reta é infinita, não um segmento; trace setas ultrapassando os pontos.',
      check3: 'Sentido da Inclinação: k > 0 sobe para a direita (agudo); k < 0 desce para a direita (obtuso).',
      check4: 'Verificação dos Quadrantes: Confirme se os 3 quadrantes cruzados conferem com os sinais de a e b.',
      check5: 'Ângulo Reto: Certifique-se de que o ângulo reto de 90° fique estritamente na origem O(0,0).',
    },
    specialLines: {
      verticalBadge: 'Caso Especial: Reta Vertical',
      verticalTitle: 'Reta Vertical Detectada: x = {c}',
      verticalSlope: 'O coeficiente angular não existe (indefinido, denominador Δx = 0). Ângulo de inclinação α = 90° (perpendicular ao eixo x).',
      verticalIntercepts: 'O intercepto no eixo x é A({c}, 0). A reta é paralela ao eixo y, portanto NÃO existe intercepto no eixo y.',
      verticalGeneral: 'Forma Geral Padrão: x - {c} = 0 (ou x = {c}).',
      verticalWhyNotIntercept: 'Por que a forma segmentária é impossível: A equação segmentária x/a + y/b = 1 requer denominadores não nulos (a ≠ 0 e b ≠ 0). Por não interceptar o eixo y, b não é definido.',
      verticalDistance: 'Distância da origem O(0,0) à reta: d = |{c}|. O pé da perpendicular é H({c}, 0).',
      horizontalBadge: 'Caso Especial: Reta Horizontal',
      horizontalTitle: 'Reta Horizontal Detectada: y = {d}',
      horizontalSlope: 'Coeficiente angular k = 0 (ângulo de inclinação α = 0°). A reta é paralela ao eixo x.',
      horizontalIntercepts: 'O intercepto no eixo y é B(0, {d}). Não intercepta o eixo x, logo NÃO existe intercepto no eixo x.',
      horizontalGeneral: 'Forma Geral Padrão: y - {d} = 0 (ou y = {d}).',
      horizontalWhyNotIntercept: 'Por que a forma segmentária é impossível: A reta nunca intercepta o eixo x, portanto a não é definido.',
      horizontalDistance: 'Distância da origem O(0,0) à reta: d = |{d}|. O pé da perpendicular é H(0, {d}).',
      originBadge: 'Caso Especial: Reta Passando pela Origem',
      originTitle: 'A Reta Passa pela Origem (0, 0)',
      originSlope: 'Coeficiente angular k = {k}. Ambos os interceptos são nulos: a = 0 e b = 0.',
      originWhyNotIntercept: 'Por que a forma segmentária é impossível: Substituir a = 0 e b = 0 resulta em divisão por zero (x/0 + y/0 = 1 é matematicamente inválido). Use a forma reduzida y = kx.',
    },
    validation: {
      emptyA: 'O intercepto no eixo x (a) não pode ficar vazio. Digite um número ou fração.',
      emptyB: 'O intercepto no eixo y (b) não pode ficar vazio. Digite um número ou fração.',
      emptyGeneral: 'Os coeficientes A, B e C não podem ficar vazios.',
      emptyPoints: 'As coordenadas dos pontos não podem ficar vazias.',
      zeroA: 'O intercepto x (a) não pode ser 0. Divisão por zero (x/0) indefinida.',
      zeroB: 'O intercepto y (b) não pode ser 0. Divisão por zero (y/0) indefinida.',
      zeroBoth: 'Ambos os interceptos não podem ser 0. A reta passa pela origem (y = kx).',
    },
    trust: {
      about: 'Sobre Nós e Metodologia',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
      contact: 'Contato e Sugestões',
      authorTitle: 'Metodologia Acadêmica e Autoria',
      authorBio: 'Desenvolvido por professores de matemática e educadores STEM na Formula CalcKit. Focado em ferramentas vetoriais de geometria analítica rigorosas para estudantes.',
      academicMethodology: 'Padrões Curriculares e Ensino',
      editorialBoard: 'Alinhado às diretrizes do ENEM, Vestibulares Brasileiros, AP Precalculus e IB Mathematics. Combina demonstrações algébricas (completar o quadrado) com visualização cartesiana interativa.',
      privacyStatement: 'Privacidade 100% no Cliente: Todos os cálculos e gráficos ocorrem de forma estritamente local em seu navegador. Nenhuma informação pessoal ou exercício é enviado para servidores externos.',
      termsStatement: 'Acesso gratuito para uso educacional e não comercial por alunos, professores e escolas.',
      feedbackCommitment: 'Tem alguma dúvida ou questão para sugerir? Nossa equipe docente analisa todos os envios.',
      feedbackPlaceholder: 'Compartilhe suas dúvidas ou sugestões com nossa equipe de matemática...',
      sendFeedback: 'Enviar Mensagem',
      feedbackSent: 'Obrigado! Sua mensagem foi recebida com sucesso.',
      close: 'Fechar',
    },
    footer: {
      desc: 'Calculadora da Equação Segmentária da Reta e Verificador Gráfico',
      standard: 'Forma Segmentária: x/a + y/b = 1',
      latexRendering: 'Renderização Vetorial LaTeX KaTeX',
      pdfExport: 'Exportação em PDF Vetorial de Alta Resolução',
    },
    print: {
      headerTitle: 'Geometria Analítica: Relatório de Resolução da Equação Segmentária',
      headerDesc: 'Resolução passo a passo, método de completar o quadrado e conferência gráfica completa',
      date: 'Data de impressão:',
    },
  },

  zh: {
    appName: '平面截距式直线方程计算器',
    appSubtitle: '高中解析几何解题与学生画图核对平台',
    appDescription:
      '专为高中解析几何截距式直线方程 (x/a + y/b = 1) 设计的解题工具。提供规范解题步骤、配方法推导原点距离极值过程、交互式作图核对画板与一键导出 PDF 功能。',
    tagline: '极简学术设计 · LaTeX 矢量公式 · 交互画图核对 · 规范答题推导',
    badge: {
      highSchool: '高中数学',
      analyticGeometry: '解析几何基础',
      interceptForm: '截距式直线方程 (x/a + y/b = 1)',
      completingSquare: '配方法拆解',
    },
    nav: {
      solver: '方程解算',
      completingSquare: '配方法拆解',
      canvas: '作图核对',
      pitfalls: '答题规范与避坑',
      exportPdf: '一键导出 PDF / 打印',
    },
    modes: {
      intercepts: '截距参数 (a, b)',
      twoPoints: '两点求截距',
      generalForm: '一般式化截距式',
      pointSlope: '点斜式化截距式',
    },
    search: {
      placeholder: '搜索核心考点、关键词、题型（如斜率、配方法、面积、高考、截距相等）...',
      filterLabel: '核心考点快速筛选：',
      all: '全部考点',
      noResults: '未找到匹配知识点，可尝试搜索“斜率”、“面积”或“配方”。',
    },
    metrics: {
      interceptEq: '截距式方程',
      generalEq: '化为一般式',
      slopeAndAngle: '斜率与倾斜角',
      chordLength: '弦长 |AB|',
      triangleArea: '直角三角形面积 S',
      originDist: '原点距离 d (配方极值)',
    },
    input: {
      title: '实时输入与参数调节',
      subtitle: '输入直线的横截距 a 与纵截距 b（支持负数与分数，如 3, -4, 2/3, -5/2）',
      swap: '互换 a ⇄ b',
      paramA: '横截距 a',
      paramB: '纵截距 b',
      xPointA: '(与 x 轴交点 A(a, 0))',
      yPointB: '(与 y 轴交点 B(0, b))',
      toggleSign: '± 反号',
      sliderA: '当前 a =',
      sliderB: '当前 b =',
      currentEq: '当前截距式方程：',
      generalFormLabel: '一般式：',
      slopeLabel: '斜率：',
      inclinationLabel: '倾斜角：',
      presetsTitle: '高中解析几何典型真题/考点快速载入：',
      presetsSubtitle: '点击一键带入计算并查看完整题解',
      copyLatex: '复制 LaTeX',
      copied: '已复制！',
      copyEq: '复制方程',
      point1: '点 1 (x₁, y₁)',
      point2: '点 2 (x₂, y₂)',
      slopeK: '斜率 k',
      coeffA: '系数 A',
      coeffB: '系数 B',
      coeffC: '常数 C',
      invalidWarning: '截距 a 与 b 均不能为 0。截距式直线方程无法表示过原点或与坐标轴平行的直线。',
    },
    canvas: {
      title: '交互解析几何坐标系',
      hint: '拖拽点 A、B 可直接调整截距；按住空白处可平移画布',
      grid: '网格',
      altitude: '垂线 OH',
      triangleArea: '面积 △',
      zoomIn: '放大',
      zoomOut: '缩小',
      reset: '居中重置',
      exportPng: '导出图片',
      lineLegend: '截距直线：',
      altitudeLegend: '原点垂线：',
      areaLegend: '直角面积：',
      angleLegend: '倾斜角：',
      notesTitle: '画图核对提示：',
      notesDesc:
        '高中作业在方格本或试卷上作图时，请先标出横轴交点 A(a, 0) 与纵轴交点 B(0, b)，用直尺连结并向两端无限延伸。原点到该直线的垂线段垂足为 H。',
    },
    steps: {
      title: '高中解析几何规范答题：详细解题步骤',
      subtitle: '严格遵循全国高考数学规范答题流程，涵盖方程互化、斜率讨论、几何量计算与象限判定',
      given: '已知：',
      step1Title: '确定坐标轴交点坐标与截距性质辨析',
      step1Desc: '由题意知，直线 l 在 x 轴上的截距为 a，在 y 轴上的截距为 b。',
      step1Coords: '因此，直线与两坐标轴的交点坐标分别为：',
      step1Warning:
        '易错考点预警：“截距”是交点的坐标，是代数量（可正、可负），绝非距离！此时两交点到原点的几何距离分别为 |OA| = |a|，|OB| = |b|。',
      step2Title: '列出截距式直线标准方程并代入参数',
      step2Desc: '由于 a ≠ 0 且 b ≠ 0，满足截距式方程的存在条件。平面直角坐标系中截距式标准方程为：',
      step2Substitute: '将具体参数代入得：',
      step3Title: '去分母化为直线的标准一般式方程 (Ax + By + C = 0)',
      step3Desc: '在方程两端同乘公分母化简去分母：',
      step3Result: '标准一般式方程：',
      step3Coeffs: '其中一般式系数为：A = {A}，B = {B}，C = {C}（系数互质且首项系数 A ≥ 0）。',
      step4Title: '求斜率 k 与倾斜角 α（锐角/钝角分类讨论）',
      step4Desc: '化为斜截式方程 y = kx + b：',
      step4SlopeFormula: '斜率 k 计算公式：',
      step4AngleFormula: '倾斜角 α 范围与角度：',
      step4Acute: '（锐角）',
      step4Obtuse: '（钝角）',
      step4Horizontal: '（水平线）',
      step5Title: '求截距段长度 |AB| 与围成直角三角形面积 S_△AOB',
      step5Desc: '计算直线与坐标轴围成的几何量：',
      step5Length: '截距线段长度（弦长）：',
      step5LengthFormula: '两点间距离公式（勾股定理）：',
      step5Area: '与坐标轴所围三角形面积：',
      step5AreaFormula: '直角三角形面积公式：',
      step6Title: '直线所穿过的平面象限判定',
      step6Passes: '直线通过：',
      step6Misses: '直线不通过：',
      pythagoreanBonus: '勾股数彩蛋检测！三边构成标准勾股整数直角三角形',
      errorTitle: '无法生成截距式解题步骤',
      errorDesc:
        '截距式直线方程的形式为 x/a + y/b = 1，分母 a, b 均不能为 0。当直线经过原点 (a=b=0) 或与坐标轴平行/垂直时，必须使用斜截式或一般式求解。',
    },
    completingSquare: {
      title: '配方法深度拆解：原点到直线的极值推导过程',
      subtitle:
        '解析几何中的核心代数思想——运用“配方法”求二次函数极值，推导垂足坐标与点到直线距离公式',
      coreQuestionTitle: '核心问题提出',
      coreQuestionDesc:
        '已知直线截距式方程为 x/a + y/b = 1。如何不借助高中点到直线的现成距离公式，仅利用初高中最基础的“二次函数配方法”求解原点 O(0, 0) 到直线的距离以及垂足 H 的坐标？',
      step1Title: '设直线上动点并建立距离平方函数',
      step1Desc: '设直线 l 上任意一点为 P(x, y)。由截距式可消去 y，将纵坐标表示为横坐标的函数：',
      step2Title: '完全展开并整理为关于 x 的一元二次三项式',
      step2Desc: '对完全平方项展开：',
      step3Title: '配方法核心拆解：提取二次项系数与配凑完全平方式',
      step3Part1: '第一步：提取二次项系数 (a² + b²) / a²：',
      step3Part2: '第二步：配常数项（加上并减去一次项系数一半的平方）：',
      step3Part2Hint: '括号内一次项系数的一半为 [ab² / (a²+b²)]，其平方加上并减去：',
      step3Part3: '第三步：组合完全平方式并化简剩余常数项：',
      step3Part3Hint: '化简外侧常数项：',
      step4Title: '代入当前参数具体数值配方结果',
      step4Desc: '将具体数值代入上述配方完全式：',
      step4PositiveNote: '由于二次项系数大于 0 且实数平方项恒大于等于 0：',
      step5Title: '极值条件确定垂足 H 坐标与原点到直线的距离',
      footHTitle: '垂足 H 坐标（距离取最小值时的动点）：',
      footHDesc: '当完全平方等于 0，即 x = ab² / (a² + b²) 时取得最小值。',
      footHPoint: '垂足坐标：',
      distanceTitle: '原点到直线的距离 d：',
      distanceDesc: '函数取得最小值，两边开平方：',
      geoProof:
        '几何面积法互证：直角三角形面积 S = 1/2 · |ab| = 1/2 · |AB| · d，亦可得出 d = |ab| / √(a²+b²)，代数配方法与几何面积法完全吻合！',
    },
    pitfalls: {
      title: '高中解析几何答题规范与高频易错警示',
      subtitle: '高考数学解析几何基础题失分点自查，用于学生平时作业画图与模拟考答题规范核对',
      pitfall1Title: '易错点 1：“截距”与“距离”的混淆',
      pitfall1Cause: '很多同学把截距误认为是原点到交点的距离，导致解题时丢掉负号。',
      pitfall1Rule:
        '规范定性：截距是直线与坐标轴交点的坐标，是代数量，可以为正数、负数或零。只有“截距的绝对值”或“截距所形成的线段长”才是非负的几何距离！',
      pitfall2Title: '易错点 2：“截距相等”遗漏过原点的情况',
      pitfall2Exam: '高频考题：“求在两坐标轴上截距相等的直线方程”。',
      pitfall2Tip: '避坑秘籍：必须进行分类讨论！',
      pitfall2Case1: '若截距 a = b ≠ 0，可设为 x/a + y/a = 1 => x + y = a；',
      pitfall2Case2: '切记：当截距为 0 时（a = b = 0），直线经过原点，此时不能用截距式，应设为 y = kx！不分类讨论必扣分。',
      pitfall3Title: '易错点 3：“截距绝对值相等”的四种情形',
      pitfall3Desc: '当题目条件为“截距的绝对值相等”（|a| = |b|）时：',
      pitfall3Case1: '① 截距均为 0：直线过原点，斜率任意满足条件；',
      pitfall3Case2: '② 截距相等且不为 0（a = b）：斜率 k = -1；',
      pitfall3Case3: '③ 截距互为相反数（a = -b ≠ 0）：斜率 k = 1。',
      checklistTitle: '学生作业“画图核对”5步自查清单',
      check1: '交点确认：是否在 x 轴准确标出 (a, 0)，在 y 轴标出 (0, b)。',
      check2: '两端延伸：所画是直线而非线段，两端是否穿过坐标轴两交点向外延伸。',
      check3: '倾斜方向：斜率 k > 0 向右上方，倾斜角为锐角；k < 0 向右下方，倾斜角为钝角。',
      check4: '所过象限：根据 a, b 正负核对直线穿过的三个象限是否与画图一致。',
      check5: '三角形直角：三角形 △AOB 的直角是否严格坐落在坐标原点 O 处。',
    },
    specialLines: {
      verticalBadge: '特殊情形：垂直于坐标轴的直线（垂直线）',
      verticalTitle: '检测到垂直直线：x = {c}',
      verticalSlope: '斜率不存在（分母 Δx = 0，无定义）。倾斜角 α = 90°（垂直于 x 轴）。',
      verticalIntercepts: '与 x 轴交点为 A({c}, 0)；由于与 y 轴平行，因此不存在纵截距 b。',
      verticalGeneral: '标准一般式方程：x - {c} = 0（或 x = {c}）。',
      verticalWhyNotIntercept: '为什么不能用截距式：截距式 x/a + y/b = 1 的前提是直线的两截距均不为 0（a ≠ 0 且 b ≠ 0）。垂直线平行于 y 轴没有纵截距，分母无意义，故截距式不能表示垂直线！',
      verticalDistance: '原点 O(0,0) 到直线的距离：d = |{c}|。垂足坐标为 H({c}, 0)。',
      horizontalBadge: '特殊情形：平行于横轴的直线（水平线）',
      horizontalTitle: '检测到水平直线：y = {d}',
      horizontalSlope: '斜率 k = 0（倾斜角 α = 0°）。平行于 x 轴。',
      horizontalIntercepts: '与 y 轴交点为 B(0, {d})；与 x 轴无交点，因此不存在横截距 a。',
      horizontalGeneral: '标准一般式方程：y - {d} = 0（或 y = {d}）。',
      horizontalWhyNotIntercept: '为什么不能用截距式：直线与 x 轴平行无交点，没有横截距 a，分母无意义，故截距式不能表示水平线！',
      horizontalDistance: '原点 O(0,0) 到直线的距离：d = |{d}|。垂足坐标为 H(0, {d})。',
      originBadge: '特殊情形：经过原点的直线',
      originTitle: '直线经过坐标原点 (0, 0)',
      originSlope: '斜率 k = {k}。两截距均为零：a = 0，b = 0。',
      originWhyNotIntercept: '为什么不能用截距式：代入 a=0 和 b=0 会导致分母为 0（x/0 + y/0 = 1 在数学上不成立）。过原点的直线应使用斜截式 y = kx 或一般式。',
    },
    validation: {
      emptyA: '横截距 a 不能为空，请输入有效数值或分数。',
      emptyB: '纵截距 b 不能为空，请输入有效数值或分数。',
      emptyGeneral: '一般式系数 A、B 和 C 均不能为空。',
      emptyPoints: '点坐标数值不能为空。',
      zeroA: '横截距 a 不能为 0！分母为零 (x/0) 无数学意义，截距式方程不能表示过原点的直线。',
      zeroB: '纵截距 b 不能为 0！分母为零 (y/0) 无数学意义，截距式方程不能表示过原点的直线。',
      zeroBoth: '截距不能同时为 0！直线过原点 O(0,0)，截距式无意义，应使用 y = kx。',
    },
    trust: {
      about: '关于我们与学术教研',
      privacy: '隐私政策',
      terms: '服务条款',
      contact: '联系作者与教研反馈',
      authorTitle: '学术教研团队与权威方法论背书',
      authorBio: '由 Formula CalcKit 联合多位长期执教高中一线、深耕高考解析几何命题研究的高中数学教研员共同研发。专注于为全球中学生提供矢量高保真、推导无漏洞的数理图解工具。',
      academicMethodology: '教学大纲与考试标准',
      editorialBoard: '严格遵循普通高中数学课程标准（解析几何专题）、AP Precalculus、IB Mathematics AA 以及西班牙 Selectividad、法国 Baccalauréat 答题规范。强调“二次函数配方法求极值”这一解析几何本原思想与笛卡尔坐标画板双向互证。',
      privacyStatement: '全本地纯客户端隐私承诺：本站所有坐标计算、代数配方推导与画板图形生成均在您的浏览器本地实时完成，绝不会将学生的作业题目、练习草稿或任何个人信息上传至外部服务器。',
      termsStatement: '本平台面向全球中学生、数学教师、教研员及公立学校终身免费开放非商业性教育使用。本站推导步骤、答题规范与矢量图表均可自由引用至课堂教学课件与错题本整理中。',
      feedbackCommitment: '如果您在使用过程中发现任何典型考题或有优化建议，欢迎联系教研组，我们将在 24 小时内由数学教研老师核对并答复。',
      feedbackPlaceholder: '在此输入您的疑问、题目反馈或教学建议...',
      sendFeedback: '提交反馈',
      feedbackSent: '已收到您的反馈！感谢您对高中数学教学工具的支持。',
      close: '关闭',
    },
    footer: {
      desc: '平面截距式直线方程计算器 · 高中解析几何备考与学生画图核对工具',
      standard: '标准方程：x/a + y/b = 1',
      latexRendering: 'LaTeX 矢量公式实时渲染',
      pdfExport: '支持一键导出高清 PDF',
    },
    print: {
      headerTitle: '高中数学解析几何：平面截距式直线方程详细解题与作图报告',
      headerDesc: '涵盖截距式标准方程、一般式互化、斜率倾斜角、面积弦长及配方法极值推导全过程',
      date: '打印日期：',
    },
  },
};
