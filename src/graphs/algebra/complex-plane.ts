import { keepInside } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));
/** A square in the |z| readout: (-3)^2, not -3^2. */
const sq = (v: number) => (v < 0 ? `(${num(v)})^2` : `${num(v)}^2`);

/** "3+2i", "-1-i", "2i", "0" with the signs written properly. */
function complex(a: number, b: number): string {
  const re = Math.abs(a) < 1e-9 ? '' : num(a);
  if (Math.abs(b) < 1e-9) return re || '0';
  const im = Math.abs(Math.abs(b) - 1) < 1e-9 ? 'i' : `${num(Math.abs(b))}i`;
  return re ? `${re}${b < 0 ? '-' : '+'}${im}` : `${b < 0 ? '-' : ''}${im}`;
}

export default {
  title: '複數平面',
  description:
    '橫軸是實部、縱軸是虛部，複數 a + bi 畫成點 (a, b)。拖動 z 和 w：z 的共軛複數 z̄ 是 z 對實軸的鏡射；|z| 是 z 到原點的距離；z + w 是以 0、z、w 為三個頂點的平行四邊形的第四個頂點，和向量相加一樣。',
  boundingBox: [-6, 4.5, 6, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    board.create('text', [5.3, 0.4, ctx.tex('\\mathrm{Re}')], { fixed: true, strokeColor: color.muted });
    board.create('text', [0.2, 4.1, ctx.tex('\\mathrm{Im}')], { fixed: true, strokeColor: color.muted });

    const point = (x: number, y: number, name: string, c: string) => {
      const p = board.create('point', [x, y], { name: ctx.tex(name), strokeColor: c, fillColor: c, label: { offset: [8, 8], strokeColor: c } });
      keepInside(p, [-5, -4, 5, 4]);
      p.on('drag', () => p.moveTo([Math.round(p.X() / step) * step, Math.round(p.Y() / step) * step]));
      return p;
    };
    const z = point(3, 2, 'z', color.accent);
    const w = point(-1, 1.5, 'w', color.accent2);

    // |z|: the segment from the origin.
    board.create('segment', [[0, 0], z], { strokeColor: color.accent, strokeWidth: 2.5, fixed: true, highlight: false });
    board.create('segment', [[0, 0], w], { strokeColor: color.accent2, strokeWidth: 2, fixed: true, highlight: false });

    // Conjugate: reflection across the real axis.
    const zbar = board.create('point', [() => z.X(), () => -z.Y()], {
      fixed: true,
      name: ctx.tex('\\bar z'),
      size: 3,
      strokeColor: color.muted,
      fillColor: color.muted,
      label: { offset: [8, -10], strokeColor: color.muted },
    });
    board.create('segment', [z, zbar], { strokeColor: color.muted, strokeWidth: 1, dash: 2, fixed: true, highlight: false });

    // z + w completes the parallelogram on 0, z, w.
    const sum = board.create('point', [() => z.X() + w.X(), () => z.Y() + w.Y()], {
      fixed: true,
      name: ctx.tex('z+w'),
      size: 4,
      strokeColor: color.highlight,
      fillColor: color.highlight,
      label: { offset: [8, 8], strokeColor: color.highlight },
    });
    for (const [p, q] of [[z, sum], [w, sum]] as const) {
      board.create('segment', [p, q], { strokeColor: color.highlight, strokeWidth: 1.5, dash: 2, fixed: true, highlight: false });
    }

    const zs = () => complex(z.X(), z.Y());
    ctx.readout(() => `$z=${zs()}$，$w=${complex(w.X(), w.Y())}$，$z+w=${complex(z.X() + w.X(), z.Y() + w.Y())}$`);
    ctx.readout(() => `共軛複數 $\\bar z=${complex(z.X(), -z.Y())}$：$z$ 對實軸的鏡射`);
    ctx.readout(
      () => `$|z|=\\sqrt{${sq(z.X())}+${sq(z.Y())}}=${num(Math.hypot(z.X(), z.Y()))}$：$z$ 到原點的距離`,
    );
  },
} satisfies GraphDef;
