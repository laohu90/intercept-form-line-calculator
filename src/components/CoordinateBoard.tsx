import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Download, Eye, EyeOff, Move, AlertCircle } from 'lucide-react';
import { LineCalculations, formatFloat } from '../utils/mathUtils';
import { Language, translations } from '../utils/i18n';

interface CoordinateBoardProps {
  calc: LineCalculations;
  onUpdateIntercepts: (a: number, b: number) => void;
  language: Language;
}

export const CoordinateBoard: React.FC<CoordinateBoardProps> = ({
  calc,
  onUpdateIntercepts,
  language,
}) => {
  const t = translations[language];
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Viewport parameters
  const [zoom, setZoom] = useState(42);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingPoint, setDraggingPoint] = useState<'A' | 'B' | null>(null);

  // Visual toggles
  const [showGrid, setShowGrid] = useState(true);
  const [showAltitude, setShowAltitude] = useState(true);
  const [showTriangleArea, setShowTriangleArea] = useState(true);
  const [showAngle, setShowAngle] = useState(true);

  // Dimensions
  const [dimensions, setDimensions] = useState({ width: 640, height: 480 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        setDimensions({
          width: clientWidth,
          height: Math.min(540, Math.max(380, clientWidth * 0.65)),
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const centerX = dimensions.width / 2 + pan.x;
  const centerY = dimensions.height / 2 + pan.y;

  const toScreen = useCallback(
    (x: number, y: number) => {
      return {
        x: centerX + x * zoom,
        y: centerY - y * zoom,
      };
    },
    [centerX, centerY, zoom]
  );

  const toMath = useCallback(
    (sx: number, sy: number) => {
      return {
        x: (sx - centerX) / zoom,
        y: (centerY - sy) / zoom,
      };
    },
    [centerX, centerY, zoom]
  );

  const resetView = () => {
    setPan({ x: 0, y: 0 });
    const refA = !isNaN(calc.a) ? calc.a : 3;
    const refB = !isNaN(calc.b) ? calc.b : 4;
    const maxVal = Math.max(Math.abs(refA), Math.abs(refB), 5);
    const targetZoom = Math.min(60, Math.max(26, (dimensions.width * 0.35) / maxVal));
    setZoom(targetZoom);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target && target.dataset && target.dataset.point) {
      setDraggingPoint(target.dataset.point as 'A' | 'B');
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      return;
    }
    setIsPanning(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    try {
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingPoint) {
      if (!svgRef.current || calc.kind !== 'intercept') return;
      const rect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const mathPos = toMath(mouseX, mouseY);

      if (draggingPoint === 'A') {
        let newA = Math.round(mathPos.x * 2) / 2;
        if (Math.abs(newA) < 0.25) newA = mathPos.x >= 0 ? 0.5 : -0.5;
        onUpdateIntercepts(newA, calc.b);
      } else if (draggingPoint === 'B') {
        let newB = Math.round(mathPos.y * 2) / 2;
        if (Math.abs(newB) < 0.25) newB = mathPos.y >= 0 ? 0.5 : -0.5;
        onUpdateIntercepts(calc.a, newB);
      }
      return;
    }

    if (isPanning) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsPanning(false);
    setDraggingPoint(null);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const exportAsPng = () => {
    if (!svgRef.current) return;
    const svgElement = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width * 2;
    canvas.height = dimensions.height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(2, 2);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URLObj = window.URL || window.webkitURL || window;
    const blobURL = URLObj.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      URLObj.revokeObjectURL(blobURL);

      const aLink = document.createElement('a');
      aLink.download = `geometry_line_${calc.kind}.png`;
      aLink.href = canvas.toDataURL('image/png');
      aLink.click();
    };
    img.src = blobURL;
  };

  // Grid tick computation
  const minX = Math.floor(-centerX / zoom);
  const maxX = Math.ceil((dimensions.width - centerX) / zoom);
  const minY = Math.floor((centerY - dimensions.height) / zoom);
  const maxY = Math.ceil(centerY / zoom);

  const xTicks: number[] = [];
  for (let i = minX; i <= maxX; i++) {
    if (i !== 0) xTicks.push(i);
  }
  const yTicks: number[] = [];
  for (let i = minY; i <= maxY; i++) {
    if (i !== 0) yTicks.push(i);
  }

  const pO = toScreen(0, 0);

  // Standard line points
  const pA = toScreen(calc.a || 0, 0);
  const pB = toScreen(0, calc.b || 0);
  const pH = toScreen(calc.footOfPerpendicular.x, calc.footOfPerpendicular.y);

  // Normal line extension
  const lineP1 = toScreen(minX - 3, calc.slope * (minX - 3 - calc.a));
  const lineP2 = toScreen(maxX + 3, calc.slope * (maxX + 3 - calc.a));

  const rightAngleSize = 13;
  const oSignX = calc.a >= 0 ? 1 : -1;
  const oSignY = calc.b >= 0 ? -1 : 1;

  // Vertical line screen x
  const vertX = calc.kind === 'vertical' ? toScreen(calc.specialConstant ?? calc.a, 0).x : 0;
  // Horizontal line screen y
  const horizY = calc.kind === 'horizontal' ? toScreen(0, calc.specialConstant ?? calc.b).y : 0;

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
      {/* Visual Canvas Toolbar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <Move className="w-4 h-4 text-slate-600" />
            {t.canvas.title}
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-xs text-slate-500 hidden md:inline">{t.canvas.hint}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1 rounded-md border text-xs transition-colors flex items-center gap-1 cursor-pointer ${
              showGrid ? 'bg-white border-slate-300 text-slate-900 shadow-2xs font-medium' : 'bg-slate-100 border-transparent text-slate-400'
            }`}
          >
            {showGrid ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{t.canvas.grid}</span>
          </button>

          <button
            onClick={() => setShowAltitude(!showAltitude)}
            className={`px-2.5 py-1 rounded-md border text-xs transition-colors flex items-center gap-1 cursor-pointer ${
              showAltitude ? 'bg-white border-slate-300 text-slate-900 shadow-2xs font-medium' : 'bg-slate-100 border-transparent text-slate-400'
            }`}
          >
            <span>{t.canvas.altitude}</span>
          </button>

          {calc.kind === 'intercept' && (
            <button
              onClick={() => setShowTriangleArea(!showTriangleArea)}
              className={`px-2.5 py-1 rounded-md border text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                showTriangleArea ? 'bg-white border-slate-300 text-slate-900 shadow-2xs font-medium' : 'bg-slate-100 border-transparent text-slate-400'
              }`}
            >
              <span>{t.canvas.triangleArea}</span>
            </button>
          )}

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <button
            onClick={() => setZoom((z) => Math.min(100, z * 1.2))}
            title={t.canvas.zoomIn}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(16, z / 1.2))}
            title={t.canvas.zoomOut}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            title={t.canvas.reset}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={exportAsPng}
            title={t.canvas.exportPng}
            className="px-2.5 py-1 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 ml-1 text-xs font-semibold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.canvas.exportPng}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div
        ref={containerRef}
        className="w-full relative cursor-crosshair select-none bg-white overflow-hidden touch-none"
        style={{ height: `${dimensions.height}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="block"
        >
          <defs>
            <marker
              id="axis-arrow-i18n"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
            </marker>
          </defs>

          {/* Grid lines */}
          {showGrid && (
            <g className="grid-layer">
              {xTicks.map((tick) => {
                const sx = centerX + tick * zoom;
                return (
                  <line
                    key={`gx-${tick}`}
                    x1={sx}
                    y1={0}
                    x2={sx}
                    y2={dimensions.height}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                );
              })}
              {yTicks.map((tick) => {
                const sy = centerY - tick * zoom;
                return (
                  <line
                    key={`gy-${tick}`}
                    x1={0}
                    y1={sy}
                    x2={dimensions.width}
                    y2={sy}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          )}

          {/* Triangle Area Shading (only if valid intercept line) */}
          {showTriangleArea && calc.kind === 'intercept' && (
            <polygon
              points={`${pO.x},${pO.y} ${pA.x},${pA.y} ${pB.x},${pB.y}`}
              fill="#3b82f6"
              fillOpacity="0.14"
              stroke="#2563eb"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
          )}

          {/* Right Angle at Origin */}
          {calc.kind === 'intercept' && (
            <path
              d={`M ${pO.x + oSignX * rightAngleSize} ${pO.y} L ${pO.x + oSignX * rightAngleSize} ${pO.y + oSignY * rightAngleSize} L ${pO.x} ${pO.y + oSignY * rightAngleSize}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
          )}

          {/* Coordinate Axes */}
          <g className="axes-layer">
            <line
              x1={0}
              y1={centerY}
              x2={dimensions.width - 6}
              y2={centerY}
              stroke="#334155"
              strokeWidth="1.8"
              markerEnd="url(#axis-arrow-i18n)"
            />
            <line
              x1={centerX}
              y1={dimensions.height}
              x2={centerX}
              y2={6}
              stroke="#334155"
              strokeWidth="1.8"
              markerEnd="url(#axis-arrow-i18n)"
            />

            {/* Labels x, y, O */}
            <text
              x={dimensions.width - 18}
              y={centerY - 10}
              className="text-sm font-bold fill-slate-800 select-none"
            >
              x
            </text>
            <text
              x={centerX + 12}
              y={20}
              className="text-sm font-bold fill-slate-800 select-none"
            >
              y
            </text>
            <text
              x={centerX - 16}
              y={centerY + 18}
              className="text-xs font-mono font-medium fill-slate-500 select-none"
            >
              O
            </text>

            {/* Ticks */}
            {xTicks.map((tick) => {
              if (Math.abs(tick) > 25) return null;
              const sx = centerX + tick * zoom;
              if (sx < 20 || sx > dimensions.width - 25) return null;
              return (
                <g key={`tx-${tick}`}>
                  <line x1={sx} y1={centerY - 3} x2={sx} y2={centerY + 3} stroke="#64748b" strokeWidth="1" />
                  <text
                    x={sx}
                    y={centerY + 16}
                    textAnchor="middle"
                    className="text-[11px] font-mono fill-slate-500 select-none font-medium"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {yTicks.map((tick) => {
              if (Math.abs(tick) > 25) return null;
              const sy = centerY - tick * zoom;
              if (sy < 25 || sy > dimensions.height - 20) return null;
              return (
                <g key={`ty-${tick}`}>
                  <line x1={centerX - 3} y1={sy} x2={centerX + 3} y2={sy} stroke="#64748b" strokeWidth="1" />
                  <text
                    x={centerX - 10}
                    y={sy + 4}
                    textAnchor="end"
                    className="text-[11px] font-mono fill-slate-500 select-none font-medium"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}
          </g>

          {/* 1. Normal Intercept Line Plot */}
          {calc.kind === 'intercept' && (
            <g className="line-layer">
              <line
                x1={lineP1.x}
                y1={lineP1.y}
                x2={lineP2.x}
                y2={lineP2.y}
                stroke="#2563eb"
                strokeWidth="2.5"
              />

              {/* Segment AB */}
              <line
                x1={pA.x}
                y1={pA.y}
                x2={pB.x}
                y2={pB.y}
                stroke="#1d4ed8"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Segment AB Badge */}
              <g
                transform={`translate(${(pA.x + pB.x) / 2 + 18}, ${(pA.y + pB.y) / 2 - 14})`}
              >
                <rect
                  x="-42"
                  y="-13"
                  width="84"
                  height="24"
                  rx="5"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  className="text-xs font-mono fill-slate-800 font-semibold select-none"
                >
                  |AB|={formatFloat(calc.segmentLength)}
                </text>
              </g>

              {/* Altitude OH */}
              {showAltitude && (
                <g className="altitude-layer">
                  <line
                    x1={pO.x}
                    y1={pO.y}
                    x2={pH.x}
                    y2={pH.y}
                    stroke="#ea580c"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                  />
                  <circle cx={pH.x} cy={pH.y} r="4.5" fill="#ea580c" />
                  <text
                    x={pH.x + 8}
                    y={pH.y - 8}
                    className="text-xs font-semibold fill-orange-800 font-mono select-none"
                  >
                    H({formatFloat(calc.footOfPerpendicular.x)}, {formatFloat(calc.footOfPerpendicular.y)})
                  </text>
                  <text
                    x={(pO.x + pH.x) / 2 - 18}
                    y={(pO.y + pH.y) / 2 + 4}
                    className="text-xs font-bold fill-orange-700 font-mono select-none"
                  >
                    d={formatFloat(calc.originDistance)}
                  </text>
                </g>
              )}

              {/* Area label */}
              {showTriangleArea && (
                <g
                  transform={`translate(${(pO.x + pA.x + pB.x) / 3}, ${(pO.y + pA.y + pB.y) / 3})`}
                >
                  <rect
                    x="-42"
                    y="-13"
                    width="84"
                    height="24"
                    rx="5"
                    fill="#ffffff"
                    fillOpacity="0.95"
                    stroke="#93c5fd"
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    className="text-xs font-semibold fill-blue-800 font-mono select-none"
                  >
                    S={formatFloat(calc.triangleArea)}
                  </text>
                </g>
              )}

              {/* Interactive Drag Points A and B */}
              <g className="points-layer">
                {/* Point A */}
                <g className="cursor-ew-resize">
                  <circle cx={pA.x} cy={pA.y} r="16" fill="transparent" data-point="A" />
                  <circle
                    cx={pA.x}
                    cy={pA.y}
                    r="7"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                    data-point="A"
                  />
                  <circle cx={pA.x} cy={pA.y} r="3" fill="#2563eb" data-point="A" />
                  <text
                    x={pA.x}
                    y={calc.b > 0 ? pA.y + 20 : pA.y - 12}
                    textAnchor="middle"
                    className="text-sm font-bold fill-blue-800 font-mono select-none pointer-events-none"
                  >
                    A({formatFloat(calc.a)}, 0)
                  </text>
                </g>

                {/* Point B */}
                <g className="cursor-ns-resize">
                  <circle cx={pB.x} cy={pB.y} r="16" fill="transparent" data-point="B" />
                  <circle
                    cx={pB.x}
                    cy={pB.y}
                    r="7"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                    data-point="B"
                  />
                  <circle cx={pB.x} cy={pB.y} r="3" fill="#2563eb" data-point="B" />
                  <text
                    x={calc.a > 0 ? pB.x - 14 : pB.x + 14}
                    y={pB.y + 5}
                    textAnchor={calc.a > 0 ? 'end' : 'start'}
                    className="text-sm font-bold fill-blue-800 font-mono select-none pointer-events-none"
                  >
                    B(0, {formatFloat(calc.b)})
                  </text>
                </g>
              </g>
            </g>
          )}

          {/* 2. Vertical Line Plot (x = c) */}
          {calc.kind === 'vertical' && (
            <g className="vertical-line-layer">
              <line
                x1={vertX}
                y1={0}
                x2={vertX}
                y2={dimensions.height}
                stroke="#2563eb"
                strokeWidth="3"
              />
              {/* Point on x-axis */}
              <circle cx={vertX} cy={centerY} r="6" fill="#2563eb" />
              <text
                x={vertX + 12}
                y={centerY - 10}
                className="text-sm font-bold fill-blue-800 font-mono select-none"
              >
                x = {calc.specialConstant} (A({calc.specialConstant}, 0))
              </text>
              {/* Perpendicular along x axis */}
              {showAltitude && (
                <>
                  <line
                    x1={pO.x}
                    y1={pO.y}
                    x2={vertX}
                    y2={centerY}
                    stroke="#ea580c"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={(pO.x + vertX) / 2}
                    y={centerY + 18}
                    textAnchor="middle"
                    className="text-xs font-bold fill-orange-700 font-mono"
                  >
                    d = {calc.originDistance}
                  </text>
                </>
              )}
            </g>
          )}

          {/* 3. Horizontal Line Plot (y = d) */}
          {calc.kind === 'horizontal' && (
            <g className="horizontal-line-layer">
              <line
                x1={0}
                y1={horizY}
                x2={dimensions.width}
                y2={horizY}
                stroke="#2563eb"
                strokeWidth="3"
              />
              <circle cx={centerX} cy={horizY} r="6" fill="#2563eb" />
              <text
                x={centerX + 12}
                y={horizY - 10}
                className="text-sm font-bold fill-blue-800 font-mono select-none"
              >
                y = {calc.specialConstant} (B(0, {calc.specialConstant}))
              </text>
              {showAltitude && (
                <>
                  <line
                    x1={pO.x}
                    y1={pO.y}
                    x2={centerX}
                    y2={horizY}
                    stroke="#ea580c"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={centerX + 16}
                    y={(pO.y + horizY) / 2}
                    className="text-xs font-bold fill-orange-700 font-mono"
                  >
                    d = {calc.originDistance}
                  </text>
                </>
              )}
            </g>
          )}

          {/* 4. Origin Line Plot (y = kx) */}
          {calc.kind === 'origin' && (
            <g className="origin-line-layer">
              {(() => {
                const k = calc.originSlope ?? 1;
                const p1 = toScreen(minX - 3, k * (minX - 3));
                const p2 = toScreen(maxX + 3, k * (maxX + 3));
                return (
                  <>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#2563eb" strokeWidth="2.5" />
                    <circle cx={pO.x} cy={pO.y} r="6" fill="#2563eb" />
                    <text x={pO.x + 12} y={pO.y - 10} className="text-sm font-bold fill-blue-800 font-mono">
                      y = {formatFloat(k)}x (Passes Origin)
                    </text>
                  </>
                );
              })()}
            </g>
          )}

        </svg>

        {/* Invalid / Warning State Overlay */}
        {calc.kind === 'invalid' && (
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-amber-50/80 backdrop-blur-2xs pointer-events-none">
            <div className="max-w-md w-full bg-white border border-amber-300 rounded-xl p-4 shadow-md text-center space-y-2 pointer-events-auto">
              <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{t.steps.errorTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {calc.errorMessage || t.input.invalidWarning}
              </p>
            </div>
          </div>
        )}

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 px-3.5 py-2.5 rounded-lg text-xs text-slate-700 shadow-2xs space-y-1.5 select-none pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-blue-600 inline-block" />
            <span>
              {t.canvas.lineLegend}{' '}
              <span className="font-mono font-semibold text-slate-900">
                {calc.kind === 'intercept'
                  ? `x/${calc.a} + y/${calc.b} = 1`
                  : calc.kind === 'vertical'
                  ? `x = ${calc.specialConstant ?? calc.a}`
                  : calc.kind === 'horizontal'
                  ? `y = ${calc.specialConstant ?? calc.b}`
                  : calc.generalForm.latex || '—'}
              </span>
            </span>
          </div>
          {calc.kind !== 'invalid' && (
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-500 border-dashed border-b inline-block" />
              <span>
                {t.canvas.altitudeLegend}{' '}
                <span className="font-mono font-semibold text-slate-900">
                  d = {formatFloat(calc.originDistance)}
                </span>
              </span>
            </div>
          )}
          {calc.kind === 'intercept' && (
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-blue-100 border border-blue-400 inline-block rounded-xs" />
              <span>
                {t.canvas.areaLegend}{' '}
                <span className="font-mono font-semibold text-slate-900">
                  S = {formatFloat(calc.triangleArea)}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinateBoard;
