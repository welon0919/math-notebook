import { magnet, unitGrid, vectorTip } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-4, -4, 7, 4];
const eps = 1e-9;

export default {
  title: '柯西–施瓦茨不等式：投影不比原向量長',
  description:
    '把 u 投影到 v 的方向得到 p，長度 |u·v|/|v|。u − p 和 v 垂直，所以 p、u − p、u 圍成直角三角形，斜邊 u 不短於股 p：|u·v|/|v| ≤ |u|，也就是 |u·v| ≤ |u||v|。兩向量平行時 u − p = 0，等號成立。可以拖動 u 和 v。',
  boundingBox: [-4.5, 4.5, 7.5, -4.5],
  axis: true,
  build(board, ctx) {
    const { color } = ctx;
    unitGrid(board, ctx);
    const V = vectorTip(board, ctx, { at: [4, 1], name: '\\mathbf{v}', color: color.accent2, area });
    const U = vectorTip(board, ctx, { at: [2, 3], name: '\\mathbf{u}', color: color.accent, area });
    // Free dragging, with a magnet so parallel (the equality case) can be reached exactly.
    magnet(U, V, [0, 180]);
    magnet(V, U, [0, 180]);
    const O = board.create('point', [0, 0], { visible: false, fixed: true });

    const dot = () => U.X() * V.X() + U.Y() * V.Y();
    const lenU = () => Math.hypot(U.X(), U.Y());
    const lenV = () => Math.hypot(V.X(), V.Y());
    const k = () => (lenV() < eps ? NaN : dot() / lenV() ** 2);
    const P = board.create('point', [() => k() * V.X(), () => k() * V.Y()], { visible: false, fixed: true });

    ctx.name('proj', board.create('line', [O, V], { strokeColor: color.accent2, strokeWidth: 1, strokeOpacity: 0.4, dash: 1 }));
    ctx.name('proj', board.create('arrow', [O, P], { fixed: true, strokeColor: color.ink, strokeWidth: 5, strokeOpacity: 0.7 }));
    ctx.name('proj', board.create('text', [() => P.X() / 2 + 0.25 * Math.sign(k() || 1) * (V.Y() / (lenV() || 1)), () => P.Y() / 2 - 0.25 * Math.sign(k() || 1) * (V.X() / (lenV() || 1)), ctx.tex('\\mathbf{p}')], { fixed: true, anchorX: 'middle', anchorY: 'middle', fontSize: 16 }));

    ctx.name('tri', board.create('polygon', [O, P, U], { fixed: true, vertices: { visible: false }, fillColor: color.accent, fillOpacity: 0.15, borders: { visible: false } }));
    ctx.name('perp', board.create('segment', [P, U], { strokeColor: color.ink, strokeWidth: 2, dash: 2 }));
    ctx.name('perp', board.create('nonreflexangle', [U, P, O], {
      radius: 0.3,
      withLabel: false,
      fillOpacity: 0.15,
      visible: () => Math.hypot(P.X(), P.Y()) > 0.3 && Math.hypot(U.X() - P.X(), U.Y() - P.Y()) > 0.3,
    }));
    // u's length, drawn over u's arrow so a step can highlight it.
    ctx.name('ulen', board.create('segment', [O, U], { strokeColor: color.accent, strokeWidth: 5, strokeOpacity: 0.5 }));

    const f = ctx.fmt;
    ctx.readout(() => {
      if (lenV() < eps) return '$\\mathbf{v}=\\mathbf{0}$：兩邊都是 $0$。';
      const lhs = Math.abs(dot());
      const rhs = lenU() * lenV();
      return `$|\\mathbf{u}\\cdot\\mathbf{v}|=${f(lhs)}\\ ${Math.abs(lhs - rhs) < 1e-9 ? '=' : '\\le'}\\ |\\mathbf{u}|\\,|\\mathbf{v}|=${f(rhs)}$`;
    });
    ctx.readout(() => (lenV() < eps ? '' : `$|\\mathbf{p}|=\\dfrac{|\\mathbf{u}\\cdot\\mathbf{v}|}{|\\mathbf{v}|}=${f(Math.abs(dot()) / lenV())}$，$|\\mathbf{u}|=${f(lenU())}$`));
  },
  steps: [
    {
      text: '把 $\\mathbf{u}$ 投影到 $\\mathbf{v}$ 的方向：$\\mathbf{p}=\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{|\\mathbf{v}|^2}\\,\\mathbf{v}$，長度 $|\\mathbf{p}|=\\dfrac{|\\mathbf{u}\\cdot\\mathbf{v}|}{|\\mathbf{v}|}$。',
      show: ['proj'],
      highlight: ['proj'],
    },
    {
      text: '$\\mathbf{u}-\\mathbf{p}$ 和 $\\mathbf{v}$ 垂直，所以 $\\mathbf{p}$、$\\mathbf{u}-\\mathbf{p}$、$\\mathbf{u}$ 圍成直角三角形，斜邊是 $\\mathbf{u}$。',
      show: ['tri', 'perp'],
      highlight: ['tri', 'perp'],
    },
    {
      text: '斜邊不短於股：$|\\mathbf{p}|\\le|\\mathbf{u}|$，即 $\\dfrac{|\\mathbf{u}\\cdot\\mathbf{v}|}{|\\mathbf{v}|}\\le|\\mathbf{u}|$，乘以 $|\\mathbf{v}|$ 得 $|\\mathbf{u}\\cdot\\mathbf{v}|\\le|\\mathbf{u}|\\,|\\mathbf{v}|$。',
      show: ['ulen'],
      highlight: ['proj', 'ulen'],
    },
    {
      text: '等號成立 $\\iff\\mathbf{u}-\\mathbf{p}=\\mathbf{0}\\iff\\mathbf{u}$ 是 $\\mathbf{v}$ 的倍數。把 $\\mathbf{u}$ 拖到 $\\mathbf{v}$ 的直線上試試。',
      highlight: ['perp', 'proj'],
    },
  ],
} satisfies GraphDef;
