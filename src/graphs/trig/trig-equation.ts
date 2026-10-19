import { piTicks } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
const { PI } = Math;
const top = 2.2;
// A dragged a this close to a special value lands exactly on it.
const magnet = 0.03;
const specials: [number, string][] = [
  [0, '0'],
  [0.5, '\\frac12'],
  [Math.SQRT2 / 2, '\\frac{\\sqrt2}{2}'],
  [Math.sqrt(3) / 2, '\\frac{\\sqrt3}{2}'],
  [1, '1'],
  [Math.sqrt(3) / 3, '\\frac{\\sqrt3}{3}'],
  [Math.sqrt(3), '\\sqrt3'],
].flatMap(([v, t]) => (v === 0 ? [[0, '0']] : [[v, t], [-v, `-${t}`]])) as [number, string][];

/** x in [0, 2π) as a multiple of π when it is one of twelfths, e.g. \frac{5\pi}{6}; otherwise a decimal. */
function piText(x: number): string {
  const k = Math.round((x / PI) * 12);
  if (Math.abs(x - (k * PI) / 12) > 1e-9) return num(x);
  if (k === 0) return '0';
  const g = (p: number, q: number): number => (q === 0 ? p : g(q, p % q));
  const d = g(k, 12);
  const [n, m] = [k / d, 12 / d];
  const numer = n === 1 ? '\\pi' : `${n}\\pi`;
  return m === 1 ? numer : `\\frac{${numer}}{${m}}`;
}

const fns = [
  {
    button: 'sin',
    name: '\\sin',
    f: Math.sin,
    // The solutions in [0, 2π): α and π − α, where α = sin⁻¹ a.
    solve: (a: number) => (Math.abs(a) > 1 ? [] : [Math.asin(a), PI - Math.asin(a)]),
    general: '\\alpha+2k\\pi\\ \\text{或}\\ \\pi-\\alpha+2k\\pi\\ \\ (\\alpha=\\sin^{-1}a)',
  },
  {
    button: 'cos',
    name: '\\cos',
    f: Math.cos,
    solve: (a: number) => (Math.abs(a) > 1 ? [] : [Math.acos(a), -Math.acos(a)]),
    general: '\\pm\\beta+2k\\pi\\ \\ (\\beta=\\cos^{-1}a)',
  },
  {
    button: 'tan',
    name: '\\tan',
    f: Math.tan,
    solve: (a: number) => [Math.atan(a), Math.atan(a) + PI],
    general: '\\gamma+k\\pi\\ \\ (\\gamma=\\tan^{-1}a)',
  },
];

export default {
  title: '三角方程式：水平線和曲線的交點',
  description:
    '上方「函數」一列選擇 sin、cos 或 tan，畫出 y = sin x（或 cos x、tan x）在 0 到 2π 的圖形。用滑桿改變 a，水平線 y = a 和曲線的交點就是方程式在 [0, 2π) 中的解，標成圓點並列在下方。a 接近 ±1/2、±√2/2、±√3/2、±1、±√3、±√3/3 或 0 時會自動對齊，解用 π 的倍數表示。sin 和 cos 在 |a| > 1 時沒有交點，無解。',
  boundingBox: [-0.5, 2.8, 6.9, -2.5],
  aspect: 1.6,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const fn = () => fns[which];
    const sa = board.create('slider', [[0.3, 2.5], [2.8, 2.5], [-2, 0.5, 2]], { name: 'a', snapWidth: 0.01, digits: 2 });
    const a = () => {
      const v = sa.Value();
      return specials.find(([s]) => Math.abs(v - s) < magnet)?.[0] ?? v;
    };
    const aText = () => specials.find(([s]) => Math.abs(a() - s) < 1e-12)?.[1] ?? num(a());

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[-0.3, 0], [6.8, 0]], thin);
    board.create('arrow', [[0, -top], [0, top + 0.1]], thin);
    for (const y of [-2, -1, 1, 2]) {
      board.create('segment', [[-0.05, y], [0.05, y]], thin);
      board.create('text', [-0.1, y, String(y)], { anchorX: 'right', anchorY: 'middle', fixed: true, fontSize: 11, strokeColor: color.muted });
    }
    piTicks(board, ctx, { y: 0, from: 1, to: 4 });

    // Clip tan so nothing is drawn across its asymptotes.
    const curve = (x: number) => {
      const y = fn().f(x);
      return Math.abs(y) > top + 0.2 ? NaN : y;
    };
    board.create('functiongraph', [curve, 0, 2 * PI], { fixed: true, strokeColor: color.accent, strokeWidth: 3, highlight: false });
    board.create('segment', [[0, () => a()], [2 * PI, () => a()]], { fixed: true, strokeColor: color.accent2, strokeWidth: 2, highlight: false });

    const solutions = () => {
      const xs = fn()
        .solve(a())
        .map((x) => ((x % (2 * PI)) + 2 * PI) % (2 * PI))
        .map((x) => (Math.abs(x - 2 * PI) < 1e-9 ? 0 : x));
      return [...new Set(xs.map((x) => +x.toFixed(9)))].sort((p, q) => p - q);
    };
    for (let i = 0; i < 2; i++) {
      const show = () => solutions().length > i;
      const x = () => solutions()[i] ?? 0;
      board.create('point', [x, () => a()], { fixed: true, withLabel: false, size: 5, strokeColor: color.accent2, fillColor: color.accent2, visible: show });
      board.create('segment', [[x, 0], [x, () => a()]], { ...thin, dash: 2, visible: show });
      board.create('point', [x, 0], { fixed: true, withLabel: false, size: 3, strokeColor: color.accent2, fillColor: color.bg, visible: show });
    }

    fns.forEach((g, i) =>
      ctx.button(
        g.button,
        () => {
          which = i;
          board.update();
        },
        { row: '函數', pressed: () => which === i },
      ),
    );
    ctx.legend([
      { label: '$y=\\sin x$、$\\cos x$ 或 $\\tan x$', color: color.accent, width: 3 },
      { label: '$y=a$', color: color.accent2, width: 2 },
    ]);
    ctx.readout(() => {
      const xs = solutions();
      const eq = `$${fn().name} x=${aText()}$`;
      if (xs.length === 0) return `${eq}：$|a|>1$，水平線碰不到曲線，無解。`;
      return `${eq} 在 $[0,2\\pi)$ 中的解：$x=${xs.map(piText).join(',\\ ')}$`;
    });
    ctx.readout(() => (solutions().length ? `一般解：$x=${fn().general}$，$k$ 是整數` : ''));
  },
} satisfies GraphDef;
