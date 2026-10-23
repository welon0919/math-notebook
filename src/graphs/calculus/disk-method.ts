import { shadeUnder, snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const f = Math.sqrt;
// Disks are drawn as ellipses: a circle seen at a slant looks narrow from the side.
const slant = 0.3;
const num = (v: number) => String(+v.toFixed(3));

export default {
  title: '圓盤法：y = √x 繞 x 軸旋轉',
  description:
    '淡色區域是 y = √x、x 軸和 x = 4 圍成的平面區域。把它繞 x 軸轉一圈，得到一個像碗的立體，上下兩條曲線 y = √x 和 y = −√x 是它的輪廓，右端是半徑 2 的圓。用滑桿移動 x，畫出在 x 處垂直切下的一片薄圓盤（從側面看是橢圓），半徑是 √x，截面積是 π(√x)² = πx。把所有薄片的體積加起來，就是 ∫₀⁴ πx dx = 8π。',
  boundingBox: [-0.6, 2.9, 4.9, -2.9],
  aspect: 5.5 / 5.8,
  build(board, ctx) {
    const { color } = ctx;
    const sx = board.create('slider', [[0.3, -2.5], [2.8, -2.5], [0.2, 2.5, 4]], { name: 'x', snapWidth: step, digits: 1 });
    const x = () => snap(sx.Value(), step);

    shadeUnder(board, f, () => 0, () => 4, { fillColor: color.accent, fillOpacity: 0.15 });
    board.create('functiongraph', [f, 0, 4], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('functiongraph', [(t: number) => -f(t), 0, 4], { fixed: true, strokeColor: color.muted, strokeWidth: 2 });
    const ellipse = (at: () => number, attrs: object) =>
      board.create(
        'curve',
        [(s: number) => at() + slant * f(at()) * Math.cos(s), (s: number) => f(at()) * Math.sin(s), 0, 2 * Math.PI],
        { fixed: true, ...attrs },
      );
    ellipse(() => 4, { strokeColor: color.muted, strokeWidth: 1.5 });
    ellipse(x, { strokeColor: color.accent2, strokeWidth: 2, fillColor: color.accent2, fillOpacity: 0.35 });
    board.create('segment', [[x, 0], [x, () => f(x())]], { fixed: true, strokeColor: color.highlight, strokeWidth: 3 });

    ctx.legend([
      { label: '$y=\\sqrt x$', color: color.accent, width: 3 },
      { label: '在 $x$ 處的薄圓盤', color: color.accent2, width: 2 },
      { label: '半徑 $\\sqrt x$', color: color.highlight, width: 3 },
    ]);
    ctx.readout(() => `$x=${num(x())}$：半徑 $r=\\sqrt x=${num(f(x()))}$，截面積 $\\pi r^2=\\pi x=${num(Math.PI * x())}$`);
    ctx.readout(() => '體積 $V=\\displaystyle\\int_0^4\\pi x\\,dx=8\\pi\\approx25.13$');
  },
} satisfies GraphDef;
