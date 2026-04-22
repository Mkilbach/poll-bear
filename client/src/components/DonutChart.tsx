import { NAVY, MUTED, WHITE } from '../tokens';

interface Props {
  options: string[];
  votes: number[];
  colors: string[];
}

function toXY(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function slicePath(cx: number, cy: number, r: number, s: number, e: number): string {
  if (e - s >= 359.99) {
    return `M${cx},${cy - r} A${r},${r},0,1,1,${cx - 0.001},${cy - r} Z`;
  }
  const [x1, y1] = toXY(cx, cy, r, s);
  const [x2, y2] = toXY(cx, cy, r, e);
  return `M${cx},${cy} L${x1},${y1} A${r},${r},0,${e - s > 180 ? 1 : 0},1,${x2},${y2} Z`;
}

export default function DonutChart({ options, votes, colors }: Props) {
  const total = votes.reduce((a, b) => a + b, 0) || 1;
  let cur = 0;
  const slices = votes.map((v, i) => {
    const deg = (v / total) * 360;
    const path = slicePath(90, 90, 78, cur, cur + deg);
    cur += deg;
    return { path, color: colors[i] };
  });

  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} />
      ))}
      <circle cx={90} cy={90} r={42} fill={WHITE} />
      <text x={90} y={85} textAnchor="middle" fontSize="24" fontWeight="800"
        fill={NAVY} fontFamily="'Plus Jakarta Sans',sans-serif">{total}</text>
      <text x={90} y={103} textAnchor="middle" fontSize="11" fill={MUTED}
        fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="500">votes</text>
    </svg>
  );
}

export { DonutChart };
