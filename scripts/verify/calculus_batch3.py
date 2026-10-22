"""Recompute every example and practice answer in calculus lessons 9–12 and the extreme-value-theorem page.

Run: scripts/verify/.venv/bin/python -u scripts/verify/calculus_batch3.py
"""

from sympy import (E, Rational, cbrt, diff, exp, expand, factor, log, pi, simplify, sin, solve, sqrt, symbols,
                   solve_univariate_inequality, Interval, Union, oo, Eq, nsimplify, S)

x = symbols('x', real=True)
xp = symbols('xp', positive=True)
t = symbols('t', real=True)
failures = 0


def check(label, got, expected):
    global failures
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def approx(label, got, expected, tol):
    global failures
    ok = abs(float(got) - expected) < tol
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {float(got):.6f}")
    if not ok:
        failures += 1
        print(f'     expected ≈ {expected}')


def signs(expr, points, var=x):
    """The sign of expr at each sample point: '+', '-' or '0'."""
    out = []
    for p in points:
        v = expr.subs(var, p)
        out.append('+' if v > 0 else '-' if v < 0 else '0')
    return ''.join(out)


def where_positive(expr, var=x):
    return solve_univariate_inequality(expr > 0, var, relational=False)


print('== extrema-monotonicity')
f = x**3 - 3 * x
df = diff(f, x)
check('例題1 f′ 因式', factor(df), 3 * (x - 1) * (x + 1))
check('例題1 符號表 f′(−2), f′(0), f′(2)', (df.subs(x, -2), df.subs(x, 0), df.subs(x, 2)), (9, -3, 9))
check('例題1 遞增', where_positive(df), Union(Interval.open(-oo, -1), Interval.open(1, oo)))
check('例題1 極值', (f.subs(x, -1), f.subs(x, 1)), (2, -2))
check('例題1 二階', (diff(f, x, 2).subs(x, -1), diff(f, x, 2).subs(x, 1)), (-6, 6))
check('例題1 f(3)', f.subs(x, 3), 18)
f = x**4 - 4 * x**3
df = diff(f, x)
check('例題2 f′', factor(df), 4 * x**2 * (x - 3))
check('例題2 臨界點', solve(df, x), [0, 3])
check('例題2 f″(3), f″(0)', (diff(f, x, 2).subs(x, 3), diff(f, x, 2).subs(x, 0)), (36, 0))
check('例題2 f(3)', f.subs(x, 3), -27)
check('例題2 x=0 兩側', signs(df, [-0.1, 0.1, 2.9, 3.1]), '---+')
check('例題2 最小值', (f - (-27)).subs(x, 3), 0)
check('例題2 f ≥ −27', factor(f + 27), (x - 3)**2 * (x**2 + 2 * x + 3))
f = x**3 - 6 * x**2 + 9 * x + 1
df = diff(f, x)
check('例題3 f′', factor(df), 3 * (x - 1) * (x - 3))
vals = [f.subs(x, v) for v in (0, 1, 3, 5)]
check('例題3 函數值', vals, [1, 5, 1, 21])
check('例題3 最大最小', (max(vals), min(vals)), (21, 1))
check('錯誤1 x³', signs(diff(x**3, x), [-0.1, 0.1]), '++')
check('錯誤3 x⁴', (diff(x**4, x, 2).subs(x, 0), signs(diff(x**4, x), [-0.1, 0.1])), (0, '-+'))
f = x**3 - 12 * x
df = diff(f, x)
check('練習1 f′', factor(df), 3 * (x - 2) * (x + 2))
check('練習1 極值', (f.subs(x, -2), f.subs(x, 2)), (16, -16))
f = x * exp(-x)
check('練習2 f′', simplify(diff(f, x) - exp(-x) * (1 - x)), 0)
check('練習2 極大', (solve(diff(f, x), x), f.subs(x, 1)), ([1], exp(-1)))
f = xp + 4 / xp
check('練習3 臨界點', solve(diff(f, xp), xp), [2])
check('練習3 函數值', [f.subs(xp, v) for v in (1, 2, 4)], [5, 4, 5])
# x^(2/3) for real x, as the real cube root of x² (sympy's (−1)^(2/3) is complex).
f23 = lambda v: cbrt(S(v)**2)
check('練習4 f′', simplify(diff(xp**Rational(2, 3), xp) - Rational(2, 3) * xp**Rational(-1, 3)), 0)
check('練習4(b)', (f23(-1), f23(0), f23(8)), (1, 0, 4))
dfx = (x - 1)**2 * (x + 2)
check('練習5 臨界點', sorted(solve(dfx, x)), [-2, 1])
check('練習5 符號', signs(dfx, [-2.1, -1.9, 0.9, 1.1]), '-+++')

print('== extreme-value-theorem')
f = x**2 - 2 * x
check('例題1 臨界點', solve(diff(f, x), x), [1])
check('例題1 函數值', [f.subs(x, v) for v in (0, 1, 3)], [0, -1, 3])
check('例題1 配方', expand((x - 1)**2 - 1), f)
check('例題2 1/x 遞減', diff(1 / xp, xp) < 0, True)
check('例題2 f(1)', (1 / xp).subs(xp, 1), 1)
check('圖 x³−3x 端點', [(x**3 - 3 * x).subs(x, v) for v in (Rational(-3, 2), Rational(11, 5))], [Rational(9, 8), Rational(506, 125)])
approx('圖 f(2.2)', Rational(506, 125), 4.048, 1e-9)

print('== concavity-curve-sketching')
check('概念 x³−3x²+1 反曲點', (solve(diff(x**3 - 3 * x**2 + 1, x, 2), x), (x**3 - 3 * x**2 + 1).subs(x, 1)), ([1], -1))
check('概念 √x 二階', diff(sqrt(xp), xp, 2), -Rational(1, 4) * xp**Rational(-3, 2))
f = x**3 - 6 * x**2 + 9 * x + 1
check('例題1 f″', diff(f, x, 2), 6 * x - 12)
check('例題1 反曲點', (solve(diff(f, x, 2), x), f.subs(x, 2)), ([2], 3))
check('例題1 對稱', simplify(f.subs(x, 2 + t) + f.subs(x, 2 - t) - 6), 0)
f = x / (x**2 + 1)
check('例題2 奇函數', simplify(f.subs(x, -x) + f), 0)
check('例題2 f′', simplify(diff(f, x) - (1 - x**2) / (x**2 + 1)**2), 0)
check('例題2 極值', (f.subs(x, 1), f.subs(x, -1)), (Rational(1, 2), -Rational(1, 2)))
f2 = diff(f, x, 2)
check('例題2 f″', simplify(f2 - 2 * x * (x**2 - 3) / (x**2 + 1)**3), 0)
check('例題2 f″ 零點', sorted(solve(f2, x), key=float), [-sqrt(3), 0, sqrt(3)])
check('例題2 符號', signs(f2, [-2, -1, 1, 2]), '-+-+')
check('例題2 f(√3)', simplify(f.subs(x, sqrt(3))), sqrt(3) / 4)
from sympy import limit
check('例題2 漸近線', (limit(f, x, oo), limit(f, x, -oo)), (0, 0))
f = exp(-x**2 / 2)
check('例題3 f′', simplify(diff(f, x) + x * exp(-x**2 / 2)), 0)
check('例題3 f″', simplify(diff(f, x, 2) - (x**2 - 1) * exp(-x**2 / 2)), 0)
approx('例題3 f(1)', f.subs(x, 1), 0.607, 5e-4)
check('例題3 反曲點是最陡處', solve(diff(f, x, 2), x), [-1, 1])
check('錯誤1 x⁴', signs(diff(x**4, x, 2), [-0.1, 0.1]), '++')
check('錯誤3 e^−x', (diff(exp(-x), x), diff(exp(-x), x, 2)), (-exp(-x), exp(-x)))
f = x**4 - 6 * x**2
check('練習1', (expand(diff(f, x, 2)), f.subs(x, 1), f.subs(x, -1)), (12 * x**2 - 12, -5, -5))
f = x**3 - 3 * x**2
check('練習2', (solve(diff(f, x, 2), x), f.subs(x, 1)), ([1], -2))
f = log(x**2 + 1)
check('練習3 f″', simplify(diff(f, x, 2) - 2 * (1 - x**2) / (x**2 + 1)**2), 0)
check('練習3 反曲點', [(r, f.subs(x, r)) for r in solve(diff(f, x, 2), x)], [(-1, log(2)), (1, log(2))])
f = x**3 - 3 * x
check('練習4 截距', sorted(solve(f, x), key=float), [-sqrt(3), 0, sqrt(3)])
check('練習4 反曲點', solve(diff(f, x, 2), x), [0])
check('練習5', (diff(sin(x), x, 2), solve(sin(x), x)), (-sin(x), [0, pi]))

print('== optimization')
A = x * (60 - 2 * x)
check('例題1', (solve(diff(A, x), x), A.subs(x, 15)), ([15], 450))
check('例題1 配方', expand(-2 * (x - 15)**2 + 450), expand(A))
V = x * (30 - 2 * x)**2
check('例題2 V′', factor(diff(V, x)), factor((30 - 2 * x) * (30 - 6 * x)))
check('例題2 臨界點', sorted(solve(diff(V, x), x)), [5, 15])
check('例題2 V(5), V(4), V(6), V(15)', [V.subs(x, v) for v in (5, 4, 6, 15)], [2000, 1936, 1944, 0])
r = symbols('r', positive=True)
h = 16 / r**2
check('例題3 h', solve(Eq(pi * r**2 * symbols('h'), 16 * pi), symbols('h')), [16 / r**2])
Sr = 2 * pi * r**2 + 2 * pi * r * h
check('例題3 S', simplify(Sr - (2 * pi * r**2 + 32 * pi / r)), 0)
check('例題3 S′', simplify(diff(Sr, r) - 4 * pi * (r**3 - 8) / r**2), 0)
check('例題3', (solve(diff(Sr, r), r), h.subs(r, 2), Sr.subs(r, 2)), ([2], 4, 24 * pi))
approx('例題3 24π', 24 * pi, 75.4, 0.05)
check('錯誤1 牆 20 公尺', (A.subs(x, 20), diff(A, x).subs(x, 20) < 0), (400, True))
P = x * (20 - x)
check('練習1', (solve(diff(P, x), x), P.subs(x, 10)), ([10], 100))
D = (x - 3)**2 + x
check('練習2', (expand(D), solve(diff(D, x), x), sqrt(D.subs(x, Rational(5, 2)))), (x**2 - 5 * x + 9, [Rational(5, 2)], sqrt(11) / 2))
approx('練習2 ≈', sqrt(11) / 2, 1.66, 5e-3)
Ar = 2 * x * sqrt(25 - x**2)
check('練習3 A′', simplify(diff(Ar, x) - (50 - 4 * x**2) / sqrt(25 - x**2)), 0)
check('練習3', [(c, simplify(Ar.subs(x, c))) for c in solve(diff(Ar, x), x) if c > 0], [(5 * sqrt(2) / 2, 25)])
v = symbols('v', positive=True)
C = 400 / v * (200 + v**2 / 50)
check('練習4 C', simplify(C - (80000 / v + 8 * v)), 0)
check('練習4', (solve(diff(C, v), v), C.subs(v, 100), C.subs(v, 40)), ([100], 1600, 2320))
approx('練習4 C(110)', C.subs(v, 110), 1607.3, 0.05)

print('== related-rates')
y = symbols('y', real=True)
yf = symbols('yf', cls=__import__('sympy').Function)(x)
def implicit_slope(eq):
    d = diff(eq.subs(y, yf), x)
    return solve(d, diff(yf, x))[0].subs(yf, y)
s = implicit_slope(x**2 + y**2 - 25)
check('圓 y′', s, -x / y)
check('圓 (3,4)', s.subs({x: 3, y: 4}), -Rational(3, 4))
check('圓 直接微分', simplify(diff(sqrt(25 - x**2), x) + x / sqrt(25 - x**2)), 0)
eq = x**2 + x * y + y**2 - 7
check('例題1 點在曲線上', eq.subs({x: 1, y: 2}), 0)
s = implicit_slope(eq)
check('例題1 y′', simplify(s + (2 * x + y) / (x + 2 * y)), 0)
check('例題1 (1,2)', s.subs({x: 1, y: 2}), -Rational(4, 5))
approx('例題1 驗算', eq.subs({x: 1.01, y: 1.992}) + 7, 7.0001, 5e-5)
X, Y = [symbols(n, cls=__import__('sympy').Function)(t) for n in ('X', 'Y')]
d = diff(X**2 + Y**2 - 25, t)
dy = solve(d, diff(Y, t))[0]
check('例題2', dy.subs(diff(X, t), Rational(4, 5)).subs({X: 3, Y: 4}), -Rational(3, 5))
H = symbols('H', cls=__import__('sympy').Function)(t)
Vc = pi / 12 * H**3
check('例題3 V', simplify(Rational(1, 3) * pi * (H / 2)**2 * H - Vc), 0)
dh = solve(Eq(diff(Vc, t), 4 * pi), diff(H, t))[0]
check('例題3', dh.subs(H, 4), 1)
check('練習1', (implicit_slope(x * y - 6).subs({x: 2, y: 3}), diff(6 / x, x).subs(x, 2)), (-Rational(3, 2), -Rational(3, 2)))
check('練習2', implicit_slope(y**2 - x**3).subs({x: 4, y: 8}), 3)
eq = exp(y) + x * y - E
check('練習3 點', eq.subs({x: 0, y: 1}), 0)
check('練習3', simplify(implicit_slope(eq).subs({x: 0, y: 1})), -exp(-1))
R = symbols('R', cls=__import__('sympy').Function)(t)
dr = solve(Eq(diff(Rational(4, 3) * pi * R**3, t), 100 * pi), diff(R, t))[0]
check('練習4', dr.subs(R, 5), 1)
xs, ss = symbols('x_s s', positive=True)
check('練習5 s', solve(Eq(ss / Rational(18, 10), (xs + ss) / 6), ss), [3 * xs / 7])
check('練習5 ds/dt', Rational(3, 7) * Rational(14, 10), Rational(3, 5))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
