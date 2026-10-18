/**
 * Polynomial long division worked out step by step, for the written layout on
 * /algebra/long-division/. Polynomials are coefficient arrays from the highest power
 * down, e.g. x^3 - 2x^2 + 4 is [1, -2, 0, 4]. Every quotient coefficient must be an
 * integer so the layout never shows fractions; a preset that breaks this fails the build.
 */

/** One term placed in the column of its power, shown from step `step` on. */
export interface Cell {
  power: number;
  tex: string;
  step: number;
}

export interface Row {
  kind: 'quotient' | 'dividend' | 'product' | 'difference';
  /** Step at which the row (or, for the quotient, each of its cells) appears. */
  step: number;
  cells: Cell[];
}

export interface LongDivision {
  /** Powers of the columns, highest first. */
  powers: number[];
  /** Dividend and divisor as LaTeX, zero terms left out. */
  dividendTex: string;
  divisorTex: string;
  rows: Row[];
  /** What each step does, as text with `$...$` math. Step i reveals the cells with `step === i`. */
  steps: string[];
  quotientTex: string;
  remainderTex: string;
}

/** `c x^p` with its sign: `signed` adds a leading + to positive terms. */
function term(c: number, p: number, signed: boolean): string {
  const a = Math.abs(c);
  const body = p === 0 ? `${a}` : `${a === 1 ? '' : a}${p === 1 ? 'x' : `x^{${p}}`}`;
  return `${c < 0 ? '-' : signed ? '+' : ''}${body}`;
}

/** Index i of a low-to-high array holds the coefficient of x^i. */
type Poly = number[];

const degree = (p: Poly) => {
  for (let i = p.length - 1; i >= 0; i--) if (p[i] !== 0) return i;
  return -1;
};

/** The polynomial as LaTeX, zero terms left out. */
function tex(p: Poly): string {
  const terms = [];
  for (let i = degree(p); i >= 0; i--) if (p[i] !== 0) terms.push(term(p[i], i, terms.length > 0));
  return terms.length > 0 ? terms.join('') : '0';
}

/** Cells for powers `from` down to `to`, zeros included so the columns line up. */
const cells = (p: Poly, from: number, to: number, step: number): Cell[] =>
  Array.from({ length: from - to + 1 }, (_, i) => from - i).map((power, i) => ({
    power,
    tex: term(p[power] ?? 0, power, i > 0),
    step,
  }));

export function longDivision(dividend: number[], divisor: number[]): LongDivision {
  const f: Poly = [...dividend].reverse();
  const g: Poly = [...divisor].reverse();
  const n = degree(f);
  const m = degree(g);
  if (m < 0 || n < m) throw new Error('long division: the divisor must be nonzero and not of higher degree.');

  const q: Poly = new Array(n - m + 1).fill(0);
  const quotient: Row = { kind: 'quotient', step: 0, cells: [] };
  const rows: Row[] = [quotient, { kind: 'dividend', step: 0, cells: cells(f, n, 0, 0) }];
  const steps = [`把被除式和除式都依降冪排列，缺少的次方補 $0$ 佔位：被除式寫成 $${cells(f, n, 0, 0).map((c) => c.tex).join('')}$。`];

  let r = [...f];
  while (degree(r) >= m) {
    const d = degree(r);
    const k = d - m;
    const c = r[d] / g[m];
    if (!Number.isInteger(c)) throw new Error(`long division: quotient coefficient ${r[d]}/${g[m]} is not an integer.`);
    q[k] = c;

    steps.push(
      `首項相除：$${term(r[d], d, false)}\\div ${term(g[m], m, false)}=${term(c, k, false)}$，寫在商的位置，和${k === 0 ? '常數項' : ` $${term(1, k, false)}$ 項`}對齊。`,
    );
    quotient.cells.push({ power: k, tex: term(c, k, quotient.cells.length > 0), step: steps.length - 1 });

    const product: Poly = new Array(d + 1).fill(0);
    g.forEach((gi, i) => (product[i + k] = c * gi));
    steps.push(`乘回去：$${term(c, k, false)}\\times(${tex(g)})=${tex(product)}$，寫在下面，同次方的項對齊。`);
    rows.push({ kind: 'product', step: steps.length - 1, cells: cells(product, d, k, steps.length - 1) });

    const next = r.map((ri, i) => ri - (product[i] ?? 0));
    steps.push(
      `相減：$(${tex(r)})-(${tex(product)})=${tex(next)}$。首項一定會抵消，因為商的這一項就是為了讓首項相同而選的。`,
    );
    // Start from the new leading term: a leading 0 would only be noise.
    const shown = degree(next) < 0 ? [{ power: 0, tex: '0', step: steps.length - 1 }] : cells(next, degree(next), 0, steps.length - 1);
    rows.push({ kind: 'difference', step: steps.length - 1, cells: shown });
    r = next;
  }

  // Check f = g q + r before showing it.
  const back = new Array(n + 1).fill(0);
  q.forEach((qi, i) => g.forEach((gj, j) => (back[i + j] += qi * gj)));
  if (f.some((fi, i) => fi !== back[i] + (r[i] ?? 0))) throw new Error('long division: f ≠ g·q + r.');

  const qTex = tex(q);
  const rTex = tex(r);
  // "+4" reads better than "+(4)"; keep the parentheses for a sum or a negative remainder.
  const plusR = /^[^-][^+-]*$/.test(rTex) ? `+${rTex}` : `+(${rTex})`;
  steps.push(
    degree(r) < 0
      ? `剩下 $0$，剛好整除。商式 $${qTex}$，餘式 $0$：$${tex(f)}=(${tex(g)})(${qTex})$。`
      : `$${rTex}$ 的次數比除式 $${tex(g)}$ 低，不能再除，停止。商式 $${qTex}$，餘式 $${rTex}$：$${tex(f)}=(${tex(g)})(${qTex})${plusR}$。`,
  );

  return {
    powers: Array.from({ length: n + 1 }, (_, i) => n - i),
    dividendTex: tex(f),
    divisorTex: tex(g),
    rows,
    steps,
    quotientTex: qTex,
    remainderTex: rTex,
  };
}
