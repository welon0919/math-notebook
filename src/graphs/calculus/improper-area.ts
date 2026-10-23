import { shadeUnder, snap } from '../helpers';
import type { GraphDef } from '../types';

interface Choice {
  button: string;
  latex: string;
  f: (x: number) => number;
  /** ∫₁ᵗ f(x) dx. */
  area: (t: number) => number;
  verdict: string;
}

const choices: Choice[] = [
  {
    button: 'y = 1/x²',
    latex: '\\dfrac{1}{x^2}',
    f: (x) => 1 / (x * x),
    area: (t) => 1 - 1 / t,
    verdict: '面積 $1-\\frac1t$ 越來越接近 $1$，但不會超過 $1$：$\\displaystyle\\int_1^\\infty\\frac{1}{x^2}\\,dx=1$，收斂。',
  },
  {
    button: 'y = 1/x',
    latex: '\\dfrac1x',
    f: (x) => 1 / x,
    area: (t) => Math.log(t),
    verdict: '面積 $\\ln t$ 一直增加，沒有上限（只是增加得很慢）：$\\displaystyle\\int_1^\\infty\\frac1x\\,dx$ 發散。',
  },
];

const step = 0.5;
const num = (v: number) => String(+v.toFixed(4));

export default {
  title: '瑕積分：面積有沒有上限',
  description:
    '用按鈕切換 y = 1/x² 和 y = 1/x，兩條曲線都從 (1, 1) 開始往右下降、越來越貼近 x 軸。用滑桿把右端點 t 往右拉，塗色的是 1 到 t 之間曲線下的面積。y = 1/x² 的面積是 1 − 1/t，趨近 1；y = 1/x 的面積是 ln t，一直增加沒有上限。',
  boundingBox: [-2.2, 1.35, 21, -0.25],
  aspect: 1.3,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const c = () => choices[which];
    const st = board.create('slider', [[5, 1.15], [14, 1.15], [1, 4, 20]], { name: 't', snapWidth: step, digits: 1 });
    const t = () => snap(st.Value(), step);

    shadeUnder(board, (x: number) => c().f(x), () => 1, t, { fillColor: color.accent, fillOpacity: 0.3 });
    board.create('functiongraph', [(x: number) => c().f(x), 0.75, 21], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('segment', [[t, 0], [t, () => c().f(t())]], { fixed: true, strokeColor: color.accent2, strokeWidth: 2 });

    choices.forEach((ch, i) =>
      ctx.button(
        ch.button,
        () => {
          which = i;
          board.update();
        },
        { row: '函數', pressed: () => which === i },
      ),
    );
    ctx.readout(() => `$t=${t()}$：$\\displaystyle\\int_1^t${c().latex}\\,dx=${num(c().area(t()))}$`);
    ctx.readout(() => c().verdict);
  },
} satisfies GraphDef;
