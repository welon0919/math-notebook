"""Recompute every example and practice answer in calculus lessons 13–16.

Run: scripts/verify/.venv/bin/python -u scripts/verify/calculus_batch4.py
"""

from sympy import (E, Abs, Rational, Sum, cos, diff, exp, expand, factor, integrate, limit, log, oo, pi, sec, simplify,
                   sin, solve, sqrt, symbols, tan, Integral)

x = symbols('x', real=True)
xp = symbols('xp', positive=True)
t, u = symbols('t u', real=True)
n, i = symbols('n i', positive=True, integer=True)
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


def antiderivative(label, F, f, var=x):
    """F is an antiderivative of f: differentiate it back."""
    check(label, simplify(diff(F, var) - f), 0)


print('== lhopitals-rule')
f, g = exp(2 * x) - 1, sin(x)
check('圖 f′(0)/g′(0)', diff(f, x).subs(x, 0) / diff(g, x).subs(x, 0), 2)
check('例題1(a)', limit(f / g, x, 0), 2)
check('例題1(b)', limit((x - sin(x)) / x**3, x, 0), Rational(1, 6))
check('例題1(b) 第一次', limit((1 - cos(x)) / (3 * x**2), x, 0), Rational(1, 6))
approx('例題1(b) 驗算', ((x - sin(x)) / x**3).subs(x, 0.01), 0.166666, 5e-6)
check('例題2', limit(x**2 / exp(x), x, oo), 0)
approx('例題2 x=20', 400 / exp(20), 8e-7, 5e-8)
check('例題3 ln', limit(log(1 + 2 * x) / x, x, 0, '+'), 2)
check('例題3', limit((1 + 2 * x)**(1 / x), x, 0, '+'), E**2)
approx('例題3 驗算', Rational(1002, 1000)**1000, 7.374, 5e-4)
approx('例題3 e²', E**2, 7.389, 5e-4)
check('錯誤1', (x**2 + 1).subs(x, 1) / (x + 1).subs(x, 1), 1)
check('練習1', limit((1 - cos(x)) / x**2, x, 0), Rational(1, 2))
check('練習2', limit(x * log(x), x, 0, '+'), 0)
check('練習3', limit(1 / x - 1 / (exp(x) - 1), x, 0), Rational(1, 2))
check('練習3 通分', simplify((exp(x) - 1 - x) / (x * (exp(x) - 1)) - (1 / x - 1 / (exp(x) - 1))), 0)
check('練習4', limit((1 + 3 / x)**x, x, oo), E**3)
approx('練習4 e³', E**3, 20.09, 5e-3)
check('練習5', limit(x**x, x, 0, '+'), 1)
approx('練習5 驗算', Rational(1, 1000)**Rational(1, 1000), 0.9931, 5e-5)

print('== antiderivatives')
C = symbols('C')
check('族 斜率', diff(x**2 + C, x).subs(x, 1), 2)
check('族 初始條件', solve(1 + C - 3, C), [2])
antiderivative('ln|x| (x<0)', log(-x), 1 / x)
antiderivative('公式 sec²', tan(x), sec(x)**2)
antiderivative('例題1', 2 * x**Rational(3, 2) + 2 / x + exp(x), 3 * sqrt(x) - 2 / x**2 + exp(x))
antiderivative('例題2(a)', x**2 / 2 + log(x), (x**2 + 1) / x)
antiderivative('例題2(b)', 2 * sin(x) + tan(x), 2 * cos(x) + sec(x)**2)
v = 20 - 10 * t
s = -5 * t**2 + 20 * t + 25
check('例題3 v', (diff(v, t), v.subs(t, 0)), (-10, 20))
check('例題3 s', (diff(s, t) - v, s.subs(t, 0)), (0, 25))
check('例題3 落地', solve(s, t), [-1, 5])
check('例題3 落地速度', v.subs(t, 5), -30)
check('例題3 最高點', (solve(v, t), s.subs(t, 2)), ([2], 45))
check('錯誤3', (diff(x**4 / 4, x), integrate(x * x, x)), (x**3, x**3 / 3))
antiderivative('練習1', x**4 / 4 - x**2 + x, x**3 - 2 * x + 1)
antiderivative('練習2', 2 * sqrt(xp), 1 / sqrt(xp), xp)
F = 2 * x**3 - 2 * x + 3
check('練習3', (diff(F, x), F.subs(x, 1)), (6 * x**2 - 2, 3))
antiderivative('練習4', 4 * exp(x) + cos(x), 4 * exp(x) - sin(x))
v = 20 - 4 * t
s = 20 * t - 2 * t**2
check('練習5', (solve(v, t), diff(s, t) - v, s.subs(t, 5)), ([5], 0, 50))

print('== definite-integrals')
riemann = Sum(9 * i**2 / n**2 * 3 / n, (i, 1, n)).doit()
check('例題1 黎曼和', simplify(riemann - Rational(9, 2) * (1 + 1 / n) * (2 + 1 / n)), 0)
check('例題1 極限', limit(riemann, n, oo), 9)
approx('例題1 n=6', riemann.subs(n, 6), 11.4, 0.05)
check('例題1 基本定理', integrate(x**2, (x, 0, 3)), 9)
check('例題2(a)', integrate(3 * x**2 - 2 * x + 1, (x, 1, 2)), 5)
check('例題2(b)', integrate(cos(x), (x, 0, pi / 2)), 1)
v = t**2 - 4 * t + 3
check('例題3 位移', integrate(v, (t, 0, 3)), 0)
check('例題3 兩段', (integrate(v, (t, 0, 1)), integrate(v, (t, 1, 3))), (Rational(4, 3), -Rational(4, 3)))
check('例題3 路程', integrate(Abs(v), (t, 0, 3)), Rational(8, 3))
check('例題3 因式', factor(v), (t - 1) * (t - 3))
check('錯誤2 只代上限', (2**3 - 2**2 + 2), 6)
Fbad = -1 / (x - 1)
check('錯誤3 錯誤值', Fbad.subs(x, 2) - Fbad.subs(x, 0), -2)
check('錯誤3 發散', integrate(1 / (x - 1)**2, (x, 0, 2)), oo)
check('練習1', integrate(x**3 + exp(x), (x, 0, 1)), E - Rational(3, 4))
approx('練習1 ≈', E - Rational(3, 4), 1.968, 5e-4)
check('練習2', (integrate(x**3, (x, -1, 1)), integrate(Abs(x**3), (x, -1, 1))), (0, Rational(1, 2)))
right = sum((Rational(k, 2))**2 for k in range(1, 5)) * Rational(1, 2)
check('練習3 黎曼和', right, Rational(15, 4))
check('練習3 精確值', integrate(x**2, (x, 0, 2)), Rational(8, 3))
check('練習4', diff(Integral(sqrt(1 + t**2), (t, 0, x)), x).doit(), sqrt(1 + x**2))

print('== substitution')
antiderivative('概念', (x**2 + 1)**4 / 4, 2 * x * (x**2 + 1)**3)
b = symbols('b', positive=True)
check('圖 兩塊面積', simplify(integrate(2 * x * (x**2 + 1)**3, (x, 0, b)) - integrate(u**3, (u, 1, b**2 + 1))), 0)
check('圖 b=1', integrate(u**3, (u, 1, 2)), Rational(15, 4))
antiderivative('例題1(a)', (x**3 + 1)**6 / 18, x**2 * (x**3 + 1)**5)
antiderivative('例題1(b)', sin(3 * x) / 3, cos(3 * x))
antiderivative('例題2(a)', exp(x**2) / 2, x * exp(x**2))
antiderivative('例題2(b)', -log(cos(x)), tan(x))
check('例題3', integrate(x * sqrt(x**2 + 1), (x, 0, sqrt(3))), Rational(7, 3))
check('例題3 換限', Rational(1, 2) * integrate(sqrt(u), (u, 1, 4)), Rational(7, 3))
check('錯誤1 錯誤答案的導數', simplify(diff((x**2 + 1)**4 / 8, x) - x * (x**2 + 1)**3), 0)
antiderivative('錯誤1 正確', x**7 / 7 + 3 * x**5 / 5 + x**3 + x, (x**2 + 1)**3)
approx('錯誤2 錯誤值', Rational(1, 3) * sqrt(3)**Rational(3, 2), 0.760, 5e-4)
antiderivative('練習1', (2 * x + 3)**5 / 10, (2 * x + 3)**4)
antiderivative('練習2 u=sin', sin(x)**2 / 2, sin(x) * cos(x))
antiderivative('練習2 u=cos', -cos(x)**2 / 2, sin(x) * cos(x))
check('練習2 相差常數', simplify(sin(x)**2 / 2 + cos(x)**2 / 2), Rational(1, 2))
antiderivative('練習3', log(1 + exp(x)), exp(x) / (1 + exp(x)))
check('練習4', integrate(log(xp) / xp, (xp, 1, E)), Rational(1, 2))
check('練習5', integrate(x * (1 - x**2)**4, (x, 0, 1)), Rational(1, 10))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
