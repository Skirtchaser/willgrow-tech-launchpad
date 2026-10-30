// Engraved banknote-style patterns, computed from spirograph curves.

function hypotrochoid(R: number, r: number, d: number, cx: number, cy: number, scale: number, steps = 3600) {
  const turns = r / gcd(Math.round(R), Math.round(r));
  const total = Math.PI * 2 * turns;
  let path = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * total;
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    path += (i ? "L" : "M") + (cx + x * scale).toFixed(2) + " " + (cy + y * scale).toFixed(2);
  }
  return path + "Z";
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** Circular rosette used as the certificate seal. */
export function Rosette({ size = 220, className }: { size?: number; className?: string }) {
  const c = size / 2;
  const rings = [
    { R: 96, r: 35, d: 50, s: 0.95 },
    { R: 96, r: 35, d: 36, s: 0.8 },
    { R: 90, r: 29, d: 26, s: 0.62 },
  ];
  return (
    <svg viewBox={"0 0 " + size + " " + size} width={size} height={size} className={className} aria-hidden="true">
      <circle cx={c} cy={c} r={c - 2} fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx={c} cy={c} r={c - 7} fill="none" stroke="currentColor" strokeWidth="0.4" />
      <g className="wg-rosette-spin" style={{ transformOrigin: c + "px " + c + "px" }}>
        {rings.map((g, i) => (
          <path
            key={i}
            d={hypotrochoid(g.R, g.r, g.d, c, c, ((c - 12) / (g.R - g.r + g.d)) * g.s)}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.22}
            opacity={i === 0 ? 0.9 : 0.7}
          />
        ))}
      </g>
      <circle cx={c} cy={c} r={size * 0.17} fill="var(--wg-paper)" stroke="currentColor" strokeWidth="0.6" />
      <text
        x={c}
        y={c + 7}
        textAnchor="middle"
        fontFamily="var(--wg-serif)"
        fontSize={size * 0.11}
        fontStyle="italic"
        fill="currentColor"
      >
        wg
      </text>
    </svg>
  );
}

/** Horizontal wave band used along the certificate border. */
export function WaveBand({ className }: { className?: string }) {
  const w = 1200;
  const h = 28;
  const lines = Array.from({ length: 7 }, (_, k) => {
    const phase = (k / 7) * Math.PI * 2;
    let d = "";
    for (let x = 0; x <= w; x += 4) {
      const y = h / 2 + Math.sin(x / 14 + phase) * 9 * Math.cos(x / 180);
      d += (x ? "L" : "M") + x + " " + y.toFixed(2);
    }
    return d;
  });
  return (
    <svg viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none" className={className} aria-hidden="true">
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
