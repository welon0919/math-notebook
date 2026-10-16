import type { GraphDef } from '../types';

const maxPieces = 12;

/**
 * Cut the unit square in half, keep one half as piece 1, cut the other half in half,
 * and so on, alternating vertical and horizontal cuts. Piece k has area 1/2^k.
 */
function pieces(): [number, number, number, number][] {
  const out: [number, number, number, number][] = [];
  let [x0, y0, x1, y1] = [0, 0, 1, 1];
  for (let k = 1; k <= maxPieces; k++) {
    if (k % 2 === 1) {
      const xm = (x0 + x1) / 2;
      out.push([x0, y0, xm, y1]);
      x0 = xm;
    } else {
      const ym = (y0 + y1) / 2;
      out.push([x0, y0, x1, ym]);
      y0 = ym;
    }
  }
  return out;
}

export default {
  title: '無窮等比級數：一再對半切的正方形',
  description:
    '面積 1 的正方形先切一半，剩下的再切一半，一直切下去。拖動滑桿改變塗色的塊數 n：塗色面積是 1/2 + 1/4 + … + 1/2ⁿ = 1 − 1/2ⁿ，剩下的空白只有 1/2ⁿ，n 越大越接近 0，所以總和趨近 1。',
  boundingBox: [-0.1, 1.1, 1.1, -0.4],
  aspect: 0.8,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sn = board.create('slider', [[0.05, -0.22], [0.75, -0.22], [1, 1, maxPieces]], {
      name: 'n',
      snapWidth: 1,
      digits: 0,
    });
    const count = () => Math.round(sn.Value());
    const hidden = { visible: false, fixed: true, withLabel: false };

    pieces().forEach(([x0, y0, x1, y1], i) => {
      const shaded = () => i < count();
      board.create(
        'polygon',
        [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(([x, y]) => board.create('point', [x, y], hidden)),
        {
          fixed: true,
          vertices: { visible: false },
          fillColor: color.accent,
          fillOpacity: () => (shaded() ? 0.35 : 0),
          // Outline only the shaded pieces; with the outer square they also bound the blank remainder.
          borders: { strokeColor: color.ink, strokeWidth: 1, strokeOpacity: () => (shaded() ? 1 : 0) },
        },
      );
      // Label the pieces big enough to hold a fraction.
      if (i < 4) {
        board.create('text', [(x0 + x1) / 2, (y0 + y1) / 2, ctx.tex(`\\frac{1}{${2 ** (i + 1)}}`)], {
          anchorX: 'middle',
          anchorY: 'middle',
          fixed: true,
          fontSize: 18,
          visible: shaded,
        });
      }
    });
    board.create('polygon', [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => board.create('point', [x, y], hidden)), {
      fixed: true,
      vertices: { visible: false },
      fillOpacity: 0,
      borders: { strokeColor: color.ink, strokeWidth: 2 },
    });

    // Exact fractions: 1 - 1/2^n = (2^n - 1)/2^n.
    ctx.readout(() => {
      const k = count();
      const terms = k === 1 ? '\\frac{1}{2}' : k === 2 ? '\\frac{1}{2}+\\frac{1}{4}' : `\\frac{1}{2}+\\frac{1}{4}+\\cdots+\\frac{1}{${2 ** k}}`;
      return `塗色面積 $S_{${k}}=${terms}=1-\\frac{1}{${2 ** k}}=\\frac{${2 ** k - 1}}{${2 ** k}}$`;
    });
    ctx.readout(() => `剩下的空白 $\\frac{1}{${2 ** count()}}$，$n$ 越大越接近 $0$，所以 $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots=1$。`);
  },
} satisfies GraphDef;
