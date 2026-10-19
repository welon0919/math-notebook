import { toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
// Within this many degrees of a multiple of 15°, a dragged point's angle lands exactly on it.
const magnetDeg = 1.5;
const maxR = 2.2;

/** "3+2i", "-1-i", "2i", "0" with the signs written properly. */
function complex(a: number, b: number): string {
  const re = Math.abs(a) < 0.005 ? '' : num(a);
  if (Math.abs(b) < 0.005) return re || '0';
  const im = Math.abs(Math.abs(b) - 1) < 0.005 ? 'i' : `${num(Math.abs(b))}i`;
  return re ? `${re}${b < 0 ? '-' : '+'}${im}` : `${b < 0 ? '-' : ''}${im}`;
}

const angleOf = (x: number, y: number) => {
  const d = toDegrees(Math.atan2(y, x));
  return d < -1e-9 ? d + 360 : Math.abs(d) < 1e-9 ? 0 : d;
};

export default {
  title: '複數相乘：長度相乘、角度相加',
  description:
    '複數平面上拖動 z 和 w（長度最多 2.2）。z 與實軸正向的夾角是 θ₁、長度 r₁；w 的是 θ₂、r₂。乘積 zw 畫成粗箭頭：它的長度是 r₁r₂，與實軸正向的夾角是 θ₁ + θ₂。虛線圓是單位圓。下方顯示三個複數的極式與直角坐標，可以核對長度相乘、角度相加。角度接近 15° 的倍數時會自動對齊。',
  boundingBox: [-4.8, 4.5, 4.8, -2.7],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[-4.6, 0], [4.6, 0]], thin);
    board.create('arrow', [[0, -2.6], [0, 4.4]], thin);
    board.create('text', [4.3, -0.3, ctx.tex('\\mathrm{Re}')], { fixed: true, strokeColor: color.muted });
    board.create('text', [0.15, 4.2, ctx.tex('\\mathrm{Im}')], { fixed: true, strokeColor: color.muted });
    board.create('circle', [[0, 0], 1], { ...thin, dash: 2 });

    const draggable = (r: number, deg: number, name: string, c: string) => {
      const t = (deg * Math.PI) / 180;
      const p = board.create('point', [r * Math.cos(t), r * Math.sin(t)], { name: ctx.tex(name), size: 4, strokeColor: c, fillColor: c, label: { offset: [8, 8], strokeColor: c } });
      p.on('drag', () => {
        let len = Math.min(maxR, Math.max(0.3, Math.hypot(p.X(), p.Y())));
        let a = Math.atan2(p.Y(), p.X());
        const d = toDegrees(a);
        const near = Math.round(d / 15) * 15;
        if (Math.abs(d - near) < magnetDeg) a = (near * Math.PI) / 180;
        // Lengths snap to tenths so products read cleanly.
        len = Math.round(len * 10) / 10;
        p.moveTo([len * Math.cos(a), len * Math.sin(a)]);
      });
      return p;
    };
    const z = draggable(1.5, 30, 'z', color.accent);
    const w = draggable(1.6, 75, 'w', color.accent2);

    const r1 = () => Math.hypot(z.X(), z.Y());
    const r2 = () => Math.hypot(w.X(), w.Y());
    const t1 = () => angleOf(z.X(), z.Y());
    const t2 = () => angleOf(w.X(), w.Y());
    const px = () => z.X() * w.X() - z.Y() * w.Y();
    const py = () => z.X() * w.Y() + z.Y() * w.X();

    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    board.create('arrow', [O, z], { fixed: true, strokeColor: color.accent, strokeWidth: 2.5, highlight: false });
    board.create('arrow', [O, w], { fixed: true, strokeColor: color.accent2, strokeWidth: 2.5, highlight: false });
    const P = board.create('point', [px, py], { fixed: true, name: ctx.tex('zw'), size: 4, strokeColor: color.highlight, fillColor: color.highlight, label: { offset: [8, 8], strokeColor: color.highlight } });
    board.create('arrow', [O, P], { fixed: true, strokeColor: color.highlight, strokeWidth: 4, highlight: false });

    // Angle marks from the positive real axis: θ₁, θ₂ and, farthest out, θ₁ + θ₂.
    const arc = (target: () => number, radius: number, c: string) =>
      board.create('curve', [(s: number) => radius * Math.cos(s), (s: number) => radius * Math.sin(s), 0, () => (target() * Math.PI) / 180], {
        fixed: true,
        strokeColor: c,
        strokeWidth: 2,
        highlight: false,
      });
    arc(t1, 0.35, color.accent);
    arc(t2, 0.55, color.accent2);
    arc(() => (t1() + t2()) % 360, 0.8, color.highlight);

    ctx.legend([
      { label: '$z$', color: color.accent, width: 2.5 },
      { label: '$w$', color: color.accent2, width: 2.5 },
      { label: '$zw$', color: color.highlight, width: 4 },
      { label: '單位圓', color: color.muted, dash: true, width: 1 },
    ]);
    const polar = (r: number, t: number) => `${num(r)}(\\cos${num(t)}^\\circ+i\\sin${num(t)}^\\circ)`;
    ctx.readout(() => `$z=${polar(r1(), t1())}=${complex(z.X(), z.Y())}$`);
    ctx.readout(() => `$w=${polar(r2(), t2())}=${complex(w.X(), w.Y())}$`);
    ctx.readout(() => {
      const t = t1() + t2();
      const shown = t >= 360 ? `${num(t)}^\\circ=${num(t - 360)}^\\circ+360^\\circ` : `${num(t)}^\\circ`;
      return `$zw$：長度 $r_1r_2=${num(r1() * r2())}$，角度 $\\theta_1+\\theta_2=${shown}$，$zw=${complex(px(), py())}$`;
    });
  },
} satisfies GraphDef;
