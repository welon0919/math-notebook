import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.05;
const outer = (x: number) => x;
const inner = (x: number) => x * x;
// Disks are drawn as ellipses: a circle seen at a slant looks narrow from the side.
const slant = 0.3;
const num = (v: number) => String(+v.toFixed(3));

export default {
  title: '墊圈法：y = x 和 y = x² 之間繞 x 軸旋轉',
  description:
    '淡色區域是 y = x 和 y = x² 在 0 ≤ x ≤ 1 之間的平面區域。繞 x 軸轉一圈，得到一個中間挖空的立體：外輪廓是 y = ±x，內輪廓（挖掉的部分）是 y = ±x²。用滑桿移動 x，畫出在 x 處切下的薄片：外半徑 x、內半徑 x² 的圓環（從側面看是兩個橢圓之間的環），像一個墊圈。截面積是 π(x² − x⁴)。',
  boundingBox: [-0.15, 1.25, 1.35, -1.35],
  // Squeezed vertically so the tall frame stays a reasonable height on a phone.
  aspect: 0.85,
  build(board, ctx) {
    const { color } = ctx;
    const sx = board.create('slider', [[0.05, -1.2], [0.75, -1.2], [0.1, 0.6, 1]], { name: 'x', snapWidth: step, digits: 2 });
    const x = () => snap(sx.Value(), step);

    const n = 60;
    const xs = Array.from({ length: n + 1 }, (_, i) => i / n);
    board.create('curve', [[...xs, ...[...xs].reverse()], [...xs.map(outer), ...[...xs].reverse().map(inner)]], {
      fixed: true,
      strokeWidth: 0,
      fillColor: color.accent,
      fillOpacity: 0.15,
    });
    board.create('functiongraph', [outer, 0, 1], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('functiongraph', [inner, 0, 1], { fixed: true, strokeColor: color.highlight, strokeWidth: 3 });
    board.create('functiongraph', [(t: number) => -outer(t), 0, 1], { fixed: true, strokeColor: color.muted, strokeWidth: 1.5 });
    board.create('functiongraph', [(t: number) => -inner(t), 0, 1], { fixed: true, strokeColor: color.muted, strokeWidth: 1.5, dash: 2 });

    const ellipse = (radius: () => number, attrs: object) =>
      board.create(
        'curve',
        [(s: number) => x() + slant * radius() * Math.cos(s), (s: number) => radius() * Math.sin(s), 0, 2 * Math.PI],
        { fixed: true, ...attrs },
      );
    ellipse(() => outer(x()), { strokeColor: color.accent2, strokeWidth: 2, fillColor: color.accent2, fillOpacity: 0.35 });
    // The hole: drawn in the background color on top of the outer disk.
    ellipse(() => inner(x()), { strokeColor: color.accent2, strokeWidth: 2, fillColor: color.bg, fillOpacity: 1 });

    ctx.legend([
      { label: '外半徑 $y=x$', color: color.accent, width: 3 },
      { label: '內半徑 $y=x^2$', color: color.highlight, width: 3 },
      { label: '在 $x$ 處的墊圈', color: color.accent2, width: 2 },
    ]);
    ctx.readout(() => `$x=${num(x())}$：外半徑 $R=${num(outer(x()))}$，內半徑 $r=${num(inner(x()))}$`);
    ctx.readout(() => `截面積 $\\pi R^2-\\pi r^2=\\pi(x^2-x^4)=${num(Math.PI * (x() ** 2 - x() ** 4))}$`);
  },
} satisfies GraphDef;
