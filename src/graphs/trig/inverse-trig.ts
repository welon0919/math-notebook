import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
const { PI } = Math;
// A dragged angle this close (in radians) to a special angle lands exactly on it.
const magnet = 0.03;
const view = 3.2;

const special: [number, string][] = [
  [-PI / 2, '-\\frac{\\pi}{2}'],
  [-PI / 3, '-\\frac{\\pi}{3}'],
  [-PI / 4, '-\\frac{\\pi}{4}'],
  [-PI / 6, '-\\frac{\\pi}{6}'],
  [0, '0'],
  [PI / 6, '\\frac{\\pi}{6}'],
  [PI / 4, '\\frac{\\pi}{4}'],
  [PI / 3, '\\frac{\\pi}{3}'],
  [PI / 2, '\\frac{\\pi}{2}'],
  [(2 * PI) / 3, '\\frac{2\\pi}{3}'],
  [(3 * PI) / 4, '\\frac{3\\pi}{4}'],
  [(5 * PI) / 6, '\\frac{5\\pi}{6}'],
  [PI, '\\pi'],
];

const fns = [
  {
    button: 'sin',
    name: '\\sin',
    f: Math.sin,
    lo: -PI / 2,
    hi: PI / 2,
    interval: '\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]',
    domain: '[-1,1]',
    start: PI / 6,
  },
  {
    button: 'cos',
    name: '\\cos',
    f: Math.cos,
    lo: 0,
    hi: PI,
    interval: '[0,\\pi]',
    domain: '[-1,1]',
    start: PI / 3,
  },
  {
    button: 'tan',
    name: '\\tan',
    f: Math.tan,
    // The open interval (−π/2, π/2), cut where tan leaves the frame.
    lo: -Math.atan(view),
    hi: Math.atan(view),
    interval: '\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)',
    domain: '\\text{所有實數}',
    start: PI / 4,
  },
];

export default {
  title: '反三角函數：限制定義域再鏡射',
  description:
    '上方「函數」一列選擇 sin、cos 或 tan。虛線是整條三角函數的圖形，粗實線是限制定義域後一對一的那一段（sin 取 −π/2 到 π/2，cos 取 0 到 π，tan 取 −π/2 到 π/2 之間），另一條粗實線是它對直線 y = x 的鏡射，也就是反三角函數的圖形。沿著限制後的那一段拖動點 P(a, b)，它的鏡射點 Q(b, a) 在反函數的圖形上；下方顯示 b 等於 a 的三角函數值，所以反三角函數把 b 送回 a。接近特殊角時 P 會自動對齊。',
  boundingBox: [-4.4, 3.3, 4.4, -3.3],
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    let a = fns[0].start;
    const fn = () => fns[which];

    board.create('line', [[0, 0], [1, 1]], { fixed: true, strokeColor: color.muted, strokeWidth: 1.5, dash: 3, highlight: false });
    board.create('functiongraph', [(x: number) => fn().f(x)], { fixed: true, strokeColor: color.muted, strokeWidth: 1.5, dash: 2, highlight: false });
    board.create('curve', [(t: number) => t, (t: number) => fn().f(t), () => fn().lo, () => fn().hi], {
      fixed: true,
      strokeColor: color.accent,
      strokeWidth: 3.5,
      highlight: false,
    });
    board.create('curve', [(t: number) => fn().f(t), (t: number) => t, () => fn().lo, () => fn().hi], {
      fixed: true,
      strokeColor: color.accent2,
      strokeWidth: 3.5,
      highlight: false,
    });

    const P = board.create('point', [a, fn().f(a)], { name: 'P', size: 4, label: { offset: [8, -12] } });
    const place = () => P.moveTo([a, fn().f(a)]);
    P.on('drag', () => {
      let t = Math.max(fn().lo, Math.min(fn().hi, P.X()));
      for (const [v] of special) {
        if (Math.abs(t - v) < magnet && v >= fn().lo - 1e-9 && v <= fn().hi + 1e-9) t = v;
      }
      a = t;
      place();
    });
    const b = () => fn().f(a);
    board.create('point', [() => b(), () => a], {
      fixed: true,
      name: 'Q',
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, 8], strokeColor: color.accent2 },
    });
    board.create('segment', [P, [() => b(), () => a]], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 2, highlight: false });

    ctx.legend([
      { label: '整條三角函數', color: color.muted, dash: true },
      { label: '限制定義域的一段', color: color.accent, width: 3.5 },
      { label: '反三角函數', color: color.accent2, width: 3.5 },
      { label: '$y=x$', color: color.muted, dash: true, width: 1.5 },
    ]);
    fns.forEach((g, i) =>
      ctx.button(
        g.button,
        () => {
          which = i;
          a = g.start;
          place();
          board.update();
        },
        { row: '函數', pressed: () => which === i },
      ),
    );

    const angle = () => special.find(([v]) => Math.abs(v - a) < 1e-9)?.[1] ?? num(a);
    ctx.readout(() => `限制在 $${fn().interval}$ 上，$${fn().name}$ 是一對一；反函數 $${fn().name}^{-1}x$ 的定義域是 $${fn().domain}$，值域是 $${fn().interval}$。`);
    ctx.readout(() => `$P(${num(a)},\\ ${num(b())})$：$${fn().name}\\left(${angle()}\\right)=${num(b())}$，所以 $${fn().name}^{-1}(${num(b())})=${angle()}$，也就是 $Q(${num(b())},\\ ${num(a)})$`);
  },
} satisfies GraphDef;
