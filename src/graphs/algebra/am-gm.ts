import type { GraphDef } from '../types';

// AB is the diameter: a + b = len is fixed while C moves.
const len = 8;
const step = 0.1;
const snap = (v: number) => Math.round(v / step) * step;
const eps = 1e-9;

export default {
  title: '算幾不等式：半圓中的半徑與垂線',
  description:
    '直徑 AB 上取點 C，AC = a、CB = b。以 AB 為直徑畫半圓，從 C 作垂線交半圓於 D，則 CD = √(ab)，而半徑 OD = (a+b)/2。OD 是直角三角形 OCD 的斜邊，所以 (a+b)/2 ≥ √(ab)；拖動 C 到圓心 O 時兩者相等，也就是 a = b。',
  boundingBox: [-1, 5.5, len + 1, -2],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const A = board.create('point', [0, 0], { name: 'A', fixed: true, strokeColor: color.ink, fillColor: color.ink, size: 3, label: { offset: [-14, -14] } });
    const B = board.create('point', [len, 0], { name: 'B', fixed: true, strokeColor: color.ink, fillColor: color.ink, size: 3, label: { offset: [6, -14] } });
    const ab = board.create('segment', [A, B], { fixed: true });
    const C = board.create('glider', [2, 0, ab], { name: 'C', snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset: [4, -16] } });

    const a = () => snap(C.X());
    const b = () => len - a();
    const r = len / 2;
    // D is where the perpendicular at C meets the semicircle: x² + y² = r² measured from O.
    const dy = () => Math.sqrt(Math.max(0, r * r - (a() - r) ** 2));
    const D = board.create('point', [a, dy], { name: 'D', fixed: true, strokeColor: color.ink, fillColor: color.ink, size: 3, label: { offset: [6, 10] } });
    const O = board.create('point', [r, 0], { name: 'O', fixed: true, strokeColor: color.ink, fillColor: color.ink, size: 3, label: { offset: [-4, -16] } });

    const label = (x: () => number, y: () => number, latex: string) =>
      board.create('text', [x, y, ctx.tex(latex)], { anchorX: 'middle', anchorY: 'middle', fixed: true });
    label(() => a() / 2, () => -0.9, 'a');
    label(() => a() + b() / 2, () => -0.9, 'b');

    // Triangles ACD and DCB, used to show the similarity.
    const triangle = (pts: typeof A[]) =>
      board.create('polygon', pts, { fixed: true, vertices: { visible: false }, fillColor: color.accent, fillOpacity: 0.2, borders: { visible: false } });
    ctx.name('triangles', triangle([A, C, D]));
    ctx.name('triangles', triangle([D, C, B]));

    ctx.name('circle', board.create('curve', [(t: number) => r + r * Math.cos(t), (t: number) => r * Math.sin(t), 0, Math.PI], { strokeColor: color.ink, strokeWidth: 2 }));
    ctx.name('circle', O);

    ctx.name('perp', board.create('segment', [C, D], { strokeColor: color.accent2, strokeWidth: 3 }));
    ctx.name('perp', D);
    ctx.name('perp', board.create('angle', [B, C, D], { radius: 0.35, withLabel: false, fillOpacity: 0.15 }));
    ctx.name('perp', label(() => a() + 0.45, () => dy() / 2, '\\sqrt{ab}'));

    ctx.name('chords', board.create('segment', [A, D], { strokeWidth: 1.5 }));
    ctx.name('chords', board.create('segment', [B, D], { strokeWidth: 1.5 }));
    ctx.name('chords', board.create('angle', [A, D, B], { radius: 0.35, withLabel: false, fillOpacity: 0.15 }));

    ctx.name('radius', board.create('segment', [O, D], { strokeColor: color.accent, strokeWidth: 3 }));
    ctx.name('radius', label(() => (r + a()) / 2 + (a() < r ? 0.6 : -0.6), () => dy() / 2 + 0.5, '\\frac{a+b}{2}'));

    const f = ctx.fmt;
    ctx.readout(() => `$a=${f(a())},\\ b=${f(b())}$`);
    ctx.readout(() => {
      const am = (a() + b()) / 2;
      const gm = Math.sqrt(a() * b());
      const sign = Math.abs(am - gm) < eps ? '=' : '\\ge';
      return `$\\dfrac{a+b}{2}=${f(am)}\\ ${sign}\\ \\sqrt{ab}=${f(gm)}$`;
    });
  },
  steps: [
    {
      text: '在直徑 $AB$ 上取 $C$，$AC=a$、$CB=b$。以 $AB$ 為直徑畫半圓，圓心 $O$，半徑 $\\dfrac{a+b}{2}$。',
      show: ['circle'],
    },
    {
      text: '從 $C$ 作 $AB$ 的垂線，交半圓於 $D$。',
      show: ['perp'],
      highlight: ['perp'],
    },
    {
      text: '$\\angle ADB=90^\\circ$，所以 $\\triangle ACD\\sim\\triangle DCB$，得 $CD^2=ab$，$CD=\\sqrt{ab}$。',
      show: ['chords', 'triangles'],
      highlight: ['triangles'],
    },
    {
      text: '半徑 $OD=\\dfrac{a+b}{2}$ 是直角三角形 $OCD$ 的斜邊，不短於股 $CD$：$\\dfrac{a+b}{2}\\ge\\sqrt{ab}$。',
      show: ['radius'],
      highlight: ['radius', 'perp'],
    },
    {
      text: '把 $C$ 拖到圓心 $O$（$a=b$）時，$CD$ 和 $OD$ 重合，等號成立。',
      highlight: ['radius', 'perp'],
    },
  ],
} satisfies GraphDef;
