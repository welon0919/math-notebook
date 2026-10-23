import type { GraphDef } from '../types';

export default {
  title: '倒圓錐水槽的截面',
  description:
    '倒放的圓錐水槽，從側面看是一個頂點朝下的三角形：高 12 公尺，頂端半徑 6 公尺。水深 h 時，水面是半徑 r 的圓，在截面上是一條水平線。兩個相似三角形（整個水槽和水的部分）給出 r : h = 6 : 12，所以 r = h/2。',
  boundingBox: [-8.5, 14, 8.5, -1.5],
  aspect: 17 / 15.5,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const fixed = { fixed: true, highlight: false };
    const h = 6;
    const r = h / 2;
    const pt = (x: number, y: number) => board.create('point', [x, y], { visible: false, fixed: true });
    board.create('polygon', [pt(0, 0), pt(r, h), pt(-r, h)], { ...fixed, vertices: { visible: false }, fillColor: color.accent, fillOpacity: 0.3, borders: { strokeWidth: 0 } });
    board.create('polygon', [pt(0, 0), pt(6, 12), pt(-6, 12)], { ...fixed, vertices: { visible: false }, fillOpacity: 0, borders: { strokeColor: color.ink, strokeWidth: 2 } });
    board.create('segment', [[-r, h], [r, h]], { ...fixed, strokeColor: color.accent, strokeWidth: 2 });
    const dim = { ...fixed, strokeColor: color.muted, strokeWidth: 1, dash: 2 };
    board.create('segment', [[0, 0], [0, 12]], dim);
    board.create('segment', [[0, 12], [6, 12]], { ...dim, dash: 0, strokeColor: color.ink });
    board.create('segment', [[0, h], [r, h]], { ...dim, dash: 0, strokeColor: color.accent2, strokeWidth: 3 });
    const label = (x: number, y: number, tex: string, attrs: object = {}) =>
      board.create('text', [x, y, ctx.tex(tex)], { ...fixed, fontSize: 14, strokeColor: color.ink, ...attrs });
    label(3, 12.2, '6', { anchorX: 'middle', anchorY: 'bottom' });
    label(r / 2, h + 0.2, 'r', { anchorX: 'middle', anchorY: 'bottom', strokeColor: color.accent2 });
    label(-0.3, h / 2, 'h', { anchorX: 'right', anchorY: 'middle' });
    // The full height, measured outside the cone so it doesn't overlap h.
    board.create('segment', [[7.2, 0], [7.2, 12]], { ...fixed, strokeColor: color.ink, strokeWidth: 1 });
    for (const y of [0, 12]) board.create('segment', [[7, y], [7.4, y]], { ...fixed, strokeColor: color.ink, strokeWidth: 1 });
    board.create('segment', [[0, 0], [7.2, 0]], dim);
    label(7.5, 6, '12', { anchorX: 'left', anchorY: 'middle' });
    board.create('segment', [[-0.15, h], [0.15, h]], { ...fixed, strokeColor: color.ink, strokeWidth: 1 });
  },
} satisfies GraphDef;
