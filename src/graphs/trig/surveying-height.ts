import type { GraphDef } from '../types';

// Drawn to scale: the tower's foot F is at the origin, B is 10 m from it and A is 20 m further out.
const h = 10 * Math.sqrt(3);
const [xB, xA] = [10, 30];

export default {
  title: '兩個仰角測塔高',
  description:
    '水平地面上有一座塔 FT，高 h。在 A 點測得塔頂 T 的仰角是 30°，朝塔走 20 公尺到 B 點，測得仰角是 60°。圖中畫出地面、塔、兩條視線 AT 和 BT，標出兩個仰角、AB = 20 公尺和塔高 h。',
  boundingBox: [-4, 21, 34, -4.5],
  aspect: 38 / 25.5,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const fixed = { fixed: true, highlight: false };
    const point = (x: number, y: number, name: string, offset: [number, number]) =>
      board.create('point', [x, y], { ...fixed, name, size: 3, strokeColor: color.ink, fillColor: color.ink, label: { offset } });
    board.create('segment', [[-3, 0], [33, 0]], { ...fixed, strokeColor: color.muted, strokeWidth: 2 });
    const F = point(0, 0, 'F', [-14, -12]);
    const T = point(0, h, 'T', [-14, 6]);
    const B = point(xB, 0, 'B', [-4, -16]);
    const A = point(xA, 0, 'A', [-4, -16]);
    board.create('segment', [F, T], { ...fixed, strokeColor: color.ink, strokeWidth: 4 });
    board.create('segment', [A, T], { ...fixed, strokeColor: color.accent, strokeWidth: 2 });
    board.create('segment', [B, T], { ...fixed, strokeColor: color.accent2, strokeWidth: 2 });
    board.create('angle', [T, A, F], { ...fixed, radius: 3.5, name: ctx.tex('30^\\circ'), strokeColor: color.accent, fillColor: color.accent, fillOpacity: 0.15, label: { strokeColor: color.accent } });
    board.create('angle', [T, B, F], { ...fixed, radius: 2.5, name: ctx.tex('60^\\circ'), strokeColor: color.accent2, fillColor: color.accent2, fillOpacity: 0.15, label: { strokeColor: color.accent2 } });
    board.create('angle', [B, F, T], { ...fixed, radius: 1.2, withLabel: false, fillOpacity: 0.1, strokeColor: color.muted, fillColor: color.muted });
    const text = (x: number, y: number, latex: string, anchorX: 'left' | 'right' | 'middle' = 'middle') =>
      board.create('text', [x, y, ctx.tex(latex)], { ...fixed, anchorX, anchorY: 'middle', fontSize: 14 });
    text(-0.8, h / 2, 'h', 'right');
    text((xA + xB) / 2, -2.2, '20\\ \\text{m}');
  },
} satisfies GraphDef;
