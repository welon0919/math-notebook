import type { GraphDef } from '../types';

const rad = (d: number) => (d * Math.PI) / 180;
// Bearings are measured clockwise from north: a point at bearing θ, distance d is (d sin θ, d cos θ).
const at = (bearing: number, d: number): [number, number] => [d * Math.sin(rad(bearing)), d * Math.cos(rad(bearing))];
const A = at(20, 6);
const B = at(80, 10);

export default {
  title: '方位角：北偏東 20° 與北偏東 80°',
  description:
    '港口 O 的正北方畫成向上的箭頭。甲船沿北偏東 20° 航行 6 公里到 A，乙船沿北偏東 80° 航行 10 公里到 B。兩個方位角都從正北順時針量起，標在圖上；兩條航線的夾角 ∠AOB = 80° − 20° = 60°。虛線 AB 是兩船的距離。',
  boundingBox: [-2.5, 8, 11.5, -1.5],
  aspect: 14 / 9.5,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const fixed = { fixed: true, highlight: false };
    board.create('arrow', [[0, 0], [0, 7.5]], { ...fixed, strokeColor: color.muted, strokeWidth: 1.5 });
    board.create('text', [0.25, 7.4, '北'], { ...fixed, anchorX: 'left', anchorY: 'middle', fontSize: 13, strokeColor: color.muted });
    board.create('segment', [[-1.5, 0], [11, 0]], { ...fixed, strokeColor: color.muted, strokeWidth: 1, dash: 2 });
    const point = (p: [number, number], name: string, offset: [number, number]) =>
      board.create('point', p, { ...fixed, name, size: 3, strokeColor: color.ink, fillColor: color.ink, label: { offset } });
    const O = point([0, 0], 'O', [-14, -12]);
    const N = board.create('point', [0, 1], { visible: false, fixed: true });
    const Ap = point(A, 'A', [6, 8]);
    const Bp = point(B, 'B', [8, 6]);
    board.create('segment', [O, Ap], { ...fixed, strokeColor: color.accent, strokeWidth: 2.5 });
    board.create('segment', [O, Bp], { ...fixed, strokeColor: color.accent2, strokeWidth: 2.5 });
    board.create('segment', [Ap, Bp], { ...fixed, strokeColor: color.ink, strokeWidth: 1.5, dash: 2 });
    // Bearings run clockwise from north, so each angle goes from the ship's line back to north.
    board.create('angle', [Ap, O, N], { ...fixed, radius: 1.2, name: ctx.tex('20^\\circ'), strokeColor: color.accent, fillColor: color.accent, fillOpacity: 0.15, label: { strokeColor: color.accent } });
    board.create('angle', [Bp, O, N], { ...fixed, radius: 2.6, name: ctx.tex('80^\\circ'), strokeColor: color.accent2, fillColor: color.accent2, fillOpacity: 0.08, label: { strokeColor: color.accent2 } });
    const text = (p: [number, number], latex: string, anchorX: 'left' | 'right') =>
      board.create('text', [p[0], p[1], ctx.tex(latex)], { ...fixed, anchorX, anchorY: 'middle', fontSize: 14 });
    // Three quarters of the way out, clear of the angle marks near O.
    text([A[0] * 0.75 + 0.35, A[1] * 0.75], '6\\ \\text{km}', 'left');
    text([B[0] / 2, B[1] / 2 - 0.5], '10\\ \\text{km}', 'left');
  },
} satisfies GraphDef;
