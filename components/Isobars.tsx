/**
 * Weather-map contour lines. Pressure falls toward the centre, so the middle of the field is
 * the "eye": the calm place where the product window sits. Generated deterministically so the
 * server and client always agree.
 */
const CX = 1060;
const CY = 400;
const RINGS = 12;
// A few rings carry a pressure label, like a real synoptic chart.
const LABELS: Record<number, string> = { 2: '956', 5: '980', 8: '1004', 11: '1028' };

function ringPath(i: number) {
  const base = 90 + i * 56;
  const N = 110;
  let d = '';
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    const r =
      base * (1 + 0.05 * Math.sin(3 * t + i * 0.7) + 0.03 * Math.sin(5 * t + i * 1.3) + 0.02 * Math.sin(2 * t - i));
    const x = CX + r * Math.cos(t) * 1.3;
    const y = CY + r * Math.sin(t) * 0.88;
    d += `${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + 'Z';
}

function labelPos(i: number) {
  const base = 90 + i * 56;
  const t = -0.55;
  const r = base * (1 + 0.05 * Math.sin(3 * t + i * 0.7) + 0.03 * Math.sin(5 * t + i * 1.3) + 0.02 * Math.sin(2 * t - i));
  return { x: CX + r * Math.cos(t) * 1.3, y: CY + r * Math.sin(t) * 0.88 };
}

export function Isobars({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: RINGS }, (_, i) => (
        <path
          key={i}
          d={ringPath(i)}
          pathLength={1}
          className="isobar"
          style={{ ['--i' as string]: i }}
          fill="none"
          stroke="#9FB8C2"
          strokeWidth={i % 3 === 2 ? 1.6 : 1}
          strokeOpacity={i % 3 === 2 ? 0.9 : 0.55}
        />
      ))}
      {Object.entries(LABELS).map(([idx, text]) => {
        const { x, y } = labelPos(Number(idx));
        return (
          <text
            key={idx}
            x={x}
            y={y}
            className="isobar-label"
            fontSize="13"
            fontFamily="'Instrument Sans Variable', sans-serif"
            fontWeight="600"
            fill="#4B6674"
            textAnchor="middle"
            stroke="#EDF2F3"
            strokeWidth="7"
            paintOrder="stroke"
          >
            {text}
          </text>
        );
      })}
    </svg>
  );
}
