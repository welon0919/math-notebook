"""Recompute every example and practice answer in calculus lessons 5–8.

Run: scripts/verify/.venv/bin/python -u scripts/verify/calculus_batch2.py
"""

from sympy import (E, Abs, Rational, cos, diff, exp, expand, limit, log, pi, simplify, sin, sqrt, symbols, tan, sec, solve,
                   Eq, factor, N)

x, t = symbols('x t', real=True)
h = symbols('h', real=True)
k, a = symbols('k a', positive=True)
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


def by_definition(f, var=x):
    """The derivative as the limit of the difference quotient."""
    return limit(simplify((f.subs(var, var + h) - f) / h), h, 0)


def quotient(f, at, step=0.001):
    """Forward difference quotient, as the lessons compute it."""
    return (f.subs(x, at + step) - f.subs(x, at)) / step


print('== derivatives')
s = 5 * t**2
check('概念 平均速度', simplify((s.subs(t, 2 + h) - s.subs(t, 2)) / h), 20 + 5 * h)
f = x**2 - 3 * x
check('例題1 差商', simplify((f.subs(x, x + h) - f) / h), 2 * x + h - 3)
check('例題1 f′', by_definition(f), 2 * x - 3)
check('例題1 f′(1), f′(2)', (2 - 3, 4 - 3), (-1, 1))
check('例題1 頂點', solve(2 * x - 3, x), [Rational(3, 2)])
f = 1 / x
check('例題2 差商', simplify((f.subs(x, x + h) - f) / h + 1 / (x * (x + h))), 0)
check('例題2 f′', by_definition(f), -1 / x**2)
tangent = -x / 4 + 1
check('例題2 切線', expand(f.subs(x, 2) + by_definition(f).subs(x, 2) * (x - 2)), tangent)
H = 20 * t - 5 * t**2
check('例題3 v(t)', by_definition(H, t), 20 - 10 * t)
check('例題3 v(1), v(3)', (10, -10), ((20 - 10 * t).subs(t, 1), (20 - 10 * t).subs(t, 3)))
check('例題3 最高點', (solve(20 - 10 * t, t), H.subs(t, 2)), ([2], 20))
check('例題3 配方', expand(-5 * (t - 2)**2 + 20), H)
check('例題3 圖的切線 t=1', expand(H.subs(t, 1) + 10 * (t - 1)), 10 * t + 5)
check('錯誤1', by_definition(x**2), 2 * x)
check('錯誤1 反例', ((3 + 1)**2, 3**2 + 1**2), (16, 10))
check('錯誤2 切線', expand(9 + 6 * (x - 3)), 6 * x - 9)
check('錯誤3 |x| 左右', (limit(Abs(h) / h, h, 0, '-'), limit(Abs(h) / h, h, 0, '+')), (-1, 1))
check('練習1', by_definition(3 * x + 2), 3)
check('練習2', by_definition(sqrt(x)), 1 / (2 * sqrt(x)))
check('練習3 差商', expand(((1 + h)**3 - 1) / h), 3 + 3 * h + h**2)
check('練習3 切線', expand(1 + 3 * (x - 1)), 3 * x - 2)
check('練習4', by_definition(x**2 - 4 * x), 2 * x - 4)
check('練習4 點', (solve(2 * x - 4, x), (x**2 - 4 * x).subs(x, 2)), ([2], -4))
check('練習5', 120 + Rational(8, 10), Rational(1208, 10))

print('== differentiation-rules')
n = symbols('n', positive=True, integer=True)
for m in range(1, 7):
    check(f'冪次法則 n={m}', by_definition(x**m), m * x**(m - 1))
check('對照 x^-1', diff(x**-1, x), -1 / x**2)
check('對照 x^(1/2)', diff(sqrt(x), x), 1 / (2 * sqrt(x)))
check('多項式', diff(4 * x**3 - 5 * x**2 + 7, x), 12 * x**2 - 10 * x)
check('x·x', diff(x * x, x), 2 * x)
F, G, DF, DG = symbols('F G DF DG')
check('乘法 面積', expand((F + DF) * (G + DG) - F * G), G * DF + F * DG + DF * DG)
fx, gx = symbols('f g', cls=__import__('sympy').Function)
check('乘法法則', diff(fx(x) * gx(x), x), diff(fx(x), x) * gx(x) + fx(x) * diff(gx(x), x))
check('除法法則', simplify(diff(fx(x) / gx(x), x) - (diff(fx(x), x) * gx(x) - fx(x) * diff(gx(x), x)) / gx(x)**2), 0)

y = 2 * x**3 - 4 * sqrt(x) + 3 / x
check('例題1', diff(y, x), 6 * x**2 - 2 / sqrt(x) - 3 / x**2)
check('例題1 y′(1)', diff(y, x).subs(x, 1), 1)
approx('例題1 差商', quotient(y, 1), 1.009, 5e-4)
y = (x**2 + 1) * (x**3 - 2 * x)
check('例題2(1)', expand(diff(y, x)), 5 * x**4 - 3 * x**2 - 2)
check('例題2(1) 展開', expand(y), x**5 - x**3 - 2 * x)
y = x**2 / (x + 1)
check('例題2(2)', simplify(diff(y, x) - (x**2 + 2 * x) / (x + 1)**2), 0)
check('例題2(2) y′(1)', diff(y, x).subs(x, 1), Rational(3, 4))
approx('例題2(2) 差商', quotient(y, 1), 0.7501, 5e-5)
s = t**3 - 6 * t**2 + 9 * t
v, acc = diff(s, t), diff(s, t, 2)
check('例題3 v', v, 3 * t**2 - 12 * t + 9)
check('例題3 a', acc, 6 * t - 12)
check('例題3 靜止', solve(v, t), [1, 3])
check('例題3 位置', (s.subs(t, 1), s.subs(t, 3)), (4, 0))
check('例題3 加速度', (acc.subs(t, 1), acc.subs(t, 3)), (-6, 6))
check('例題3 v<0', __import__('sympy').solve_univariate_inequality(v < 0, t, relational=False), __import__('sympy').Interval.open(1, 3))
check('錯誤1', diff(x**5, x), 5 * x**4)
check('錯誤2', simplify(diff(x / (x + 1), x)), 1 / (x + 1)**2)
check('錯誤2 改寫', simplify(x / (x + 1) - (1 - 1 / (x + 1))), 0)
check('錯誤3', diff(x**-2, x), -2 / x**3)
approx('錯誤3 差商', quotient(x**-2, 1), -1.997, 5e-4)
y = x**Rational(3, 2) + 1 / sqrt(x)
check('練習1', diff(y, x).subs(x, 4), Rational(47, 16))
check('練習2', simplify(diff((x - 1) / (x + 1), x)), 2 / (x + 1)**2)
f = x**4 - 2 * x**3
check('練習3', (expand(diff(f, x, 2)), diff(f, x, 2).subs(x, 2)), (12 * x**2 - 12 * x, 24))
y = x**3 - 2 * x
check('練習4', expand(y.subs(x, 1) + diff(y, x).subs(x, 1) * (x - 1)), x - 2)
y = x**3 - 3 * x**2 - 9 * x + 2
check('練習5', [(r, y.subs(x, r)) for r in solve(diff(y, x), x)], [(-1, 7), (3, -25)])

print('== chain-rule')
check('概念 (3x+1)²', diff((3 * x + 1)**2, x), 2 * (3 * x + 1) * 3)
check('概念 √(x²+1)', diff(sqrt(x**2 + 1), x), x / sqrt(x**2 + 1))
y = (x**2 + 1)**5
check('例題1(a)', diff(y, x), 10 * x * (x**2 + 1)**4)
check('例題1(a) x=1', diff(y, x).subs(x, 1), 160)
approx('例題1(a) 差商', quotient(y, 1), 160.5, 0.1)
check('例題1(b)', simplify(diff((2 * x - 1)**-3, x) + 6 / (2 * x - 1)**4), 0)
y = ((x**2 + 1)**3 + 2)**2
check('例題2(a)', simplify(diff(y, x) - 12 * x * (x**2 + 1)**2 * ((x**2 + 1)**3 + 2)), 0)
check('例題2(a) x=1, x=0', (diff(y, x).subs(x, 1), diff(y, x).subs(x, 0)), (480, 0))
y = x**2 * sqrt(1 - x)
check('例題2(b)', simplify(diff(y, x) - (4 * x - 5 * x**2) / (2 * sqrt(1 - x))), 0)
check('例題2(b) x=1/2', simplify(diff(y, x).subs(x, Rational(1, 2)) - 3 / (4 * sqrt(2))), 0)
approx('例題2(b) x=1/2 ≈', diff(y, x).subs(x, Rational(1, 2)), 0.530, 5e-4)
approx('例題2(b) 差商', quotient(y, 0.5), 0.530, 5e-4)
r = 3 * t
A = pi * r**2
check('例題3', diff(A, t).subs(t, 2), 36 * pi)
approx('例題3 ≈', 36 * pi, 113, 0.2)
check('錯誤1', diff((3 * x + 1)**5, x), 15 * (3 * x + 1)**4)
approx('錯誤1 差商', quotient((3 * x + 1)**5, 0), 15.09, 0.005)
check('錯誤2', 5 * 2**4, 80)
check('錯誤3', diff(sqrt(x**2 + 9), x).subs(x, 4), Rational(4, 5))
approx('錯誤3 增加量', sqrt(x**2 + 9).subs(x, 4.001) - 5, 0.0008, 1e-5)
approx('錯誤3 錯誤值', 1 / (2 * sqrt(8)), 0.18, 5e-3)
check('練習1', diff((1 - 4 * x)**3, x), -12 * (1 - 4 * x)**2)
y = sqrt(x**2 + 9)
check('練習2', expand(y.subs(x, 4) + diff(y, x).subs(x, 4) * (x - 4)), Rational(4, 5) * x + Rational(9, 5))
check('練習3', simplify(diff(x / (x**2 + 1)**2, x) - (1 - 3 * x**2) / (x**2 + 1)**3), 0)
check('練習4', -1 * 3, -3)
V = Rational(4, 3) * pi * (2 + t)**3
check('練習5', diff(V, t).subs(t, 1), 36 * pi)

print('== transcendental-derivatives')
check('sin 和角後的式子', simplify((sin(x + h) - sin(x)) / h - (sin(x) * (cos(h) - 1) / h + cos(x) * sin(h) / h)), 0)
check('(cos h − 1)/h → 0', limit((cos(h) - 1) / h, h, 0), 0)
check('(sin x)′', by_definition(sin(x)), cos(x))
check('(cos x)′', by_definition(cos(x)), -sin(x))
check('(tan x)′', simplify(diff(tan(x), x) - sec(x)**2), 0)
approx('k_2', (2**Rational(1, 1000) - 1) * 1000, 0.693, 5e-4)
approx('k_3', (3**Rational(1, 1000) - 1) * 1000, 1.099, 5e-4)
for step, value in [(Rational(1, 10), 1.0517), (Rational(1, 100), 1.0050), (Rational(1, 1000), 1.0005)]:
    approx(f'(e^h − 1)/h, h={step}', (exp(step) - 1) / step, value, 5e-5)
check('(e^h − 1)/h → 1', limit((exp(h) - 1) / h, h, 0), 1)
check('(e^x)′', by_definition(exp(x)), exp(x))
check('(ln x)′', diff(log(x), x), 1 / x)
check('(a^x)′', simplify(diff(a**x, x) - a**x * log(a)), 0)
check('(log_a x)′', simplify(diff(log(x) / log(a), x) - 1 / (x * log(a))), 0)
check('k_2 = ln 2', limit((2**h - 1) / h, h, 0), log(2))
r = symbols('r', real=True)
xp = symbols('xp', positive=True)
check('(x^r)′ 經由 e^(r ln x)', simplify(diff(exp(r * log(xp)), xp) - r * xp**(r - 1)), 0)
check('連鎖 e^(3x)', diff(exp(3 * x), x), 3 * exp(3 * x))
check('連鎖 ln(x²+1)', diff(log(x**2 + 1), x), 2 * x / (x**2 + 1))
check('連鎖 sin 5x', diff(sin(5 * x), x), 5 * cos(5 * x))
check('對數微分法 x^x', simplify(diff(xp**xp, xp) - xp**xp * (log(xp) + 1)), 0)

y = exp(-x) * cos(2 * x)
check('例題1(a)', simplify(diff(y, x) + exp(-x) * (cos(2 * x) + 2 * sin(2 * x))), 0)
y = log(cos(x))
check('例題1(b)', simplify(diff(y, x) + tan(x)), 0)
check('例題1(b) x=0', diff(y, x).subs(x, 0), 0)
y = xp**xp
dy = diff(y, xp)
check('例題2 x=1', (y.subs(xp, 1), dy.subs(xp, 1)), (1, 1))
check('例題2 水平切線', solve(log(xp) + 1, xp), [exp(-1)])
approx('例題2 1/e', exp(-1), 0.368, 5e-4)
approx('例題2 e^(−1/e)', exp(-exp(-1)), 0.692, 5e-4)
approx('例題2 y′(2)', dy.subs(xp, 2), 6.77, 5e-3)
approx('例題2 差商', ((2.001)**2.001 - 4) / 0.001, 6.78, 5e-3)
T = 20 + 60 * exp(-t / 20)
dT = diff(T, t)
check('例題3 T′', simplify(dT + 3 * exp(-t / 20)), 0)
check('例題3 T′(0)', dT.subs(t, 0), -3)
approx('例題3 T′(20)', dT.subs(t, 20), -1.10, 5e-3)
check('例題3 T′ = −1', [simplify(s - 20 * log(3)) for s in solve(Eq(dT, -1), t)], [0])
approx('例題3 20 ln 3', 20 * log(3), 21.97, 5e-3)
check('例題3 溫度', T.subs(t, 20 * log(3)), 40)
check('例題3 T′ = −0.05(T − 20)', simplify(dT + Rational(1, 20) * (T - 20)), 0)
approx('例題3 圖 T(20)', T.subs(t, 20), 42.1, 0.05)
check('例題3 圖 切線', expand(T.subs(t, 0) + dT.subs(t, 0) * t), 80 - 3 * t)
check('錯誤1', diff(exp(2 * x), x), 2 * exp(2 * x))
approx('錯誤1 差商', quotient(exp(2 * x), 0), 2.002, 5e-4)
check('錯誤2', diff(log(2 * x), x), 1 / x)
check('錯誤3 錯誤值 x=2', 2 * 2**(2 - 1), 4)
check('練習1(a)', diff(exp(x**2), x), 2 * x * exp(x**2))
check('練習1(b)', diff(3**x, x), 3**x * log(3))
y = x**2 * log(x)
check('練習2', simplify(diff(y, x) - (2 * x * log(x) + x)), 0)
check('練習2 x=e', simplify(diff(y, x).subs(x, E)), 3 * E)
check('練習3', simplify(diff(sin(x) * cos(x), x) - cos(2 * x)), 0)
y = exp(sin(x))
check('練習4', expand(y.subs(x, 0) + diff(y, x).subs(x, 0) * x), x + 1)
y = log(xp) / xp
check('練習5', simplify(diff(y, xp) - (1 - log(xp)) / xp**2), 0)
check('練習5 x=e', solve(1 - log(xp), xp), [E])

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
