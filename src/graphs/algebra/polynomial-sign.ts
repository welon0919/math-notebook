import { keepInside, shadeUnder } from '../helpers';
import type { GraphDef } from '../types';

// Roots move in steps of 0.1; within `magnet` of another root they jump onto it, so a double root is easy to make.
const step = 0.1;
const magnet = 0.2;
const scale = 0.1;
const eps = 1e-9;
/** Roots are multiples of 0.1: print 1, -2.5 rather than 1.00, -2.50. */
const num = (v: number) => String(+v.toFixed(3));

export default {
  title: '多項式的正負與根',
  description:
    '三個可以沿 x 軸拖動的根 r₁、r₂、r₃ 決定 y = 0.1(x − r₁)(x − r₂)(x − r₃)。乘以正數 0.1 只是讓圖形放得進畫面，不改變正負。圖形在 x 軸上方的部分塗成一種顏色、下方塗成另一種顏色，下方列出 (x − r₁)(x − r₂)(x − r₃) > 0 與 < 0 的解。把兩個根拖到同一點（靠近時會自動吸附），就成了重根：圖形在那裡碰到 x 軸但不穿過，正負不變。',
  boundingBox: [-6, 4.5, 6, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    const fmt = num;
    const root = (x: number, name: string) => {
      const p = board.create('point', [x, 0], {
        name: ctx.tex(name),
        strokeColor: color.ink,
        fillColor: color.ink,
        // Above the axis, clear of the tick numbers below it.
        label: { offset: [4, 14], strokeColor: color.ink },
      });
      keepInside(p, [-5, 0, 5, 0]);
      return p;
    };
    const roots = [root(-2, 'r_1'), root(1, 'r_2'), root(3, 'r_3')];
    // Roots stay on the x-axis, at a multiple of 0.1 or on top of a nearby root.
    for (const p of roots) {
      p.on('drag', () => {
        const near = roots.find((q) => q !== p && Math.abs(q.X() - p.X()) < magnet);
        p.moveTo([near ? near.X() : Math.round(p.X() / step) * step, 0]);
      });
    }
    const f = (x: number) => roots.reduce((y, r) => y * (x - r.X()), scale);

    shadeUnder(board, (x) => Math.max(f(x), 0), () => -6, () => 6, { fillColor: color.accent, fillOpacity: 0.25 });
    shadeUnder(board, (x) => Math.min(f(x), 0), () => -6, () => 6, { fillColor: color.accent2, fillOpacity: 0.25 });
    board.create('functiongraph', [f], { strokeColor: color.accent, strokeWidth: 3 });
    ctx.legend([
      { label: '$y>0$', color: color.accent, width: 10, opacity: 0.4 },
      { label: '$y<0$', color: color.accent2, width: 10, opacity: 0.4 },
    ]);

    /** The open intervals where sign(f) === want, merged across double roots, as text. */
    const solve = (want: 1 | -1): string => {
      const xs = [...new Set(roots.map((r) => r.X()))].sort((p, q) => p - q);
      const cuts = [-Infinity, ...xs, Infinity];
      const pieces: [number, number][] = [];
      for (let i = 0; i < cuts.length - 1; i++) {
        const [lo, hi] = [cuts[i], cuts[i + 1]];
        const mid = lo === -Infinity ? hi - 1 : hi === Infinity ? lo + 1 : (lo + hi) / 2;
        if (Math.sign(f(mid)) !== want) continue;
        const last = pieces.at(-1);
        if (last && Math.abs(last[1] - lo) < eps) last[1] = hi;
        else pieces.push([lo, hi]);
      }
      if (pieces.length === 0) return '無解';
      // A merged piece skips the roots inside it, where f = 0.
      return pieces
        .map(([lo, hi]) => {
          const range = lo === -Infinity ? `x<${fmt(hi)}` : hi === Infinity ? `x>${fmt(lo)}` : `${fmt(lo)}<x<${fmt(hi)}`;
          const holes = xs.filter((x) => x > lo + eps && x < hi - eps).map((x) => `x\\neq ${fmt(x)}`);
          return `$${[range, ...holes].join(',\\ ')}$`;
        })
        .join(' 或 ');
    };
    const factor = (r: number) => (Math.abs(r) < eps ? 'x' : `(x${r < 0 ? '+' : '-'}${fmt(Math.abs(r))})`);
    // Equal roots are written as a power: (x-1)^2 rather than (x-1)(x-1).
    const product = () => {
      const counts = new Map<number, number>();
      for (const r of roots) counts.set(r.X(), (counts.get(r.X()) ?? 0) + 1);
      return [...counts]
        .sort(([p], [q]) => p - q)
        .map(([r, n]) => factor(r) + (n > 1 ? `^${n}` : ''))
        .join('');
    };
    ctx.readout(() => `$${product()}>0$：${solve(1)}`);
    ctx.readout(() => `$${product()}<0$：${solve(-1)}`);
  },
} satisfies GraphDef;
