import { snap } from '../helpers';
import type { GraphDef } from '../types';

const f = (x: number) => x ** 3 - 3 * x + 1;
const [a, b] = [-2, 2];
const step = 0.1;

/**
 * All real x with f(x) = k, i.e. roots of x³ − 3x + (1 − k) = 0, solved exactly
 * (trigonometric form with three real roots, Cardano's formula with one) so that
 * touching points like k = 3 at x = −1 aren't missed.
 */
function solve(k: number): number[] {
  const q = 1 - k;
  if (Math.abs(q) <= 2) {
    const t = Math.acos(-q / 2) / 3;
    return [0, 1, 2].map((j) => 2 * Math.cos(t - (2 * Math.PI * j) / 3));
  }
  const r = Math.sqrt((q * q) / 4 - 1);
  return [Math.cbrt(-q / 2 + r) + Math.cbrt(-q / 2 - r)];
}

/** Roots in [a, b], in order, with repeated roots counted once. */
function crossings(k: number): number[] {
  const xs = solve(k)
    .filter((x) => x >= a - 1e-9 && x <= b + 1e-9)
    .sort((p, q) => p - q);
  return xs.filter((x, i) => i === 0 || x - xs[i - 1] > 1e-6);
}
for (const k of [-1, 0, 1.5, 3]) {
  for (const x of crossings(k)) if (Math.abs(f(x) - k) > 1e-9) throw new Error('intermediate-value: wrong root.');
}

export default {
  title: '中間值定理：水平線一定碰到曲線',
  description:
    'y = x³ − 3x + 1 在 [−2, 2] 上連續，f(−2) = −1、f(2) = 3。拖動左邊的點上下移動水平線 y = k，圖中標出它和曲線的所有交點。k 在 −1 和 3 之間時，定理保證至少有一個交點。',
  boundingBox: [-3.2, 3.6, 3.2, -1.2],
  build(board, ctx) {
    const { color } = ctx;
    board.create('functiongraph', [f, a, b], { strokeColor: color.accent });
    const dot = { fixed: true, size: 3, strokeColor: color.ink, fillColor: color.ink };
    board.create('point', [a, f(a)], { ...dot, name: ctx.tex('(a,f(a))'), label: { offset: [-60, -14], fontSize: 12 } });
    board.create('point', [b, f(b)], { ...dot, name: ctx.tex('(b,f(b))'), label: { offset: [-20, 16], fontSize: 12 } });

    const track = board.create('segment', [[-2.8, -1.1], [-2.8, 3.4]], { strokeColor: color.muted, strokeWidth: 1, fixed: true });
    const K = board.create('glider', [-2.8, 1.5, track], { name: 'k', snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset: [-16, 0] } });
    const k = () => snap(K.Y(), step);
    board.create('segment', [[-2.8, k], [3, k]], { strokeColor: color.accent2, strokeWidth: 2 });

    for (const i of [0, 1, 2]) {
      const c = () => crossings(k())[i] ?? NaN;
      const P = board.create('point', [c, k], { fixed: true, withLabel: false, size: 4, strokeColor: color.highlight, fillColor: color.highlight });
      board.create('segment', [P, [c, () => 0]], { strokeColor: color.muted, strokeWidth: 1, dash: 1 });
    }

    const fm = ctx.fmt;
    ctx.readout(() => `$k=${fm(k())}$，$f(a)=f(-2)=${fm(f(a))}$，$f(b)=f(2)=${fm(f(b))}$`);
    ctx.readout(() => {
      const cs = crossings(k());
      const list = cs.length === 0 ? '這裡沒有交點' : `交點 ${cs.map((c) => `$c=${fm(c)}$`).join('、')}`;
      const between = Math.min(f(a), f(b)) <= k() && k() <= Math.max(f(a), f(b));
      return between
        ? `$k$ 介於 $f(a)$ 與 $f(b)$ 之間，定理保證至少有一個交點：${list}。`
        : `$k$ 不在 $f(a)$ 與 $f(b)$ 之間，定理不保證有交點：${list}。`;
    });
  },
} satisfies GraphDef;
