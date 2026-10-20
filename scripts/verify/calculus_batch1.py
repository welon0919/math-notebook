"""Recompute every example and practice answer in calculus lessons 1–4 and the squeeze-theorem page.

Run: scripts/verify/.venv/bin/python -u scripts/verify/calculus_batch1.py
"""

from sympy import (E, Abs, Piecewise, Rational, cos, limit, nsolve, oo, pi, simplify, sin, sqrt, symbols, tan, factor,
                   cancel, solve, Eq)

x = symbols('x', real=True)
t, h = symbols('t h', real=True)
n = symbols('n', positive=True)
k, a, b = symbols('k a b')
failures = 0


def check(label, got, expected):
    global failures
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def approx(label, got, expected, tol=5e-7):
    global failures
    ok = abs(float(got) - expected) < tol
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {float(got):.7f}")
    if not ok:
        failures += 1
        print(f'     expected ≈ {expected}')


def one_sided(expr, at):
    return limit(expr, x, at, '-'), limit(expr, x, at, '+')


def sides(left, right, at):
    """One-sided limits of a piecewise function, from the pieces on each side (sympy's limit of a Piecewise is unreliable)."""
    return limit(left, x, at, '-'), limit(right, x, at, '+')


print('== limits')
hole = (x**2 - 1) / (x - 1)
for v, s in [(0.9, 1.9), (0.99, 1.99), (0.999, 1.999), (1.1, 2.1), (1.01, 2.01), (1.001, 2.001)]:
    approx(f'表格 f({v})', hole.subs(x, v), s, 1e-9)
check('概念 lim (x²−1)/(x−1)', limit(hole, x, 1), 2)
check('1/x² → ∞', limit(1 / x**2, x, 0), oo)

r = (sqrt(x + 9) - 3) / x
for v, s in [(-0.1, 0.167132), (-0.01, 0.166713), (-0.001, 0.166671), (0.1, 0.166206), (0.01, 0.166620), (0.001, 0.166662)]:
    approx(f'例題1 表格 x={v}', r.subs(x, v), s, 5e-7)
approx('例題1 √9.01', sqrt(9.01), 3.0016662, 5e-8)

f2 = Piecewise((x + 1, x < 1), (3, Eq(x, 1)), (3 - x, x <= 3), (x - 2, True))
check('例題2 x=1 左右極限', sides(x + 1, 3 - x, 1), (2, 2))
check('例題2 f(1)', f2.subs(x, 1), 3)
check('例題2 x=3 左右極限', sides(3 - x, x - 2, 3), (0, 1))
check('例題2 f(3)', f2.subs(x, 3), 0)
for v, s in [(0.999, 1.999), (1.001, 1.999), (2.999, 0.001), (3.001, 1.001)]:
    approx(f'例題2 驗算 f({v})', f2.subs(x, v), s, 1e-9)

P = Piecewise((30, x <= 1), (50, x <= 2), (70, True))
check('例題3 t→1 左右', sides(30, 50, 1), (30, 50))
check('例題3 t→1.5', sides(50, 50, Rational(3, 2)), (50, 50))
check('例題3 P 的值', [P.subs(x, v) for v in (Rational(1, 2), 1, Rational(6, 5), 2, Rational(5, 2), 3)], [30, 30, 50, 50, 70, 70])

check('錯誤2 |x−2|/(x−2) 左右', one_sided(Abs(x - 2) / (x - 2), 2), (-1, 1))
check('錯誤3 sin(π/x) 在 1, 0.1, 0.01, 0.001', [sin(pi / Rational(1, 10**j)) for j in range(4)], [0, 0, 0, 0])
check('錯誤3 sin(π/(2/201))', sin(pi / Rational(2, 201)), 1)

p1 = Piecewise((x**2 - 1, x < 2), (5, Eq(x, 2)), (2 * x - 1, True))
check('練習1 左右極限', sides(x**2 - 1, 2 * x - 1, 2), (3, 3))
check('練習1 f(2)', p1.subs(x, 2), 5)
check('練習2 k', solve(Eq(2 + k, 1 + 3), k), [2])
check('練習3 左右極限', one_sided((x**2 - 3 * x) / Abs(x - 3), 3), (-3, 3))
check('練習4 右極限', limit(sqrt(x - 1), x, 1, '+'), 0)
g = (2**x - 1) / x
for v, s in [(-0.01, 0.6908), (-0.001, 0.6929), (0.001, 0.6934), (0.01, 0.6956)]:
    approx(f'練習5 x={v}', g.subs(x, v), s, 5e-5)
approx('練習5 極限 = ln 2', limit(g, x, 0), 0.693147, 1e-6)

print('== limit-techniques')
check('直接代入 x³−2x+1 在 2', (x**3 - 2 * x + 1).subs(x, 2), 5)
check('約分 (x²−4)/(x−2)', limit((x**2 - 4) / (x - 2), x, 2), 4)
check('有理化 (√x−2)/(x−4)', limit((sqrt(x) - 2) / (x - 4), x, 4), Rational(1, 4))
check('有理化 化簡', simplify((sqrt(x) - 2) / (x - 4) - 1 / (sqrt(x) + 2)), 0)
check('sin x / x', limit(sin(x) / x, x, 0), 1)
check('tan x / x', limit(tan(x) / x, x, 0), 1)
# cos x < sin x / x < 1 on 0 < |x| < π/2, checked on a grid.
grid = [s * j / 100 * float(pi / 2) for j in range(1, 100) for s in (1, -1)]
check('cos x < sin x/x < 1', all(float(cos(v)) < float(sin(v) / v) < 1 for v in grid), True)

e1 = (x**2 - x - 6) / (x**2 - 9)
check('例題1 約分', cancel(e1), (x + 2) / (x + 3))
check('例題1', limit(e1, x, 3), Rational(5, 6))
approx('例題1 驗算 分子', (x**2 - x - 6).subs(x, 3.001), 0.005001, 1e-12)
approx('例題1 驗算 分母', (x**2 - 9).subs(x, 3.001), 0.006001, 1e-12)
approx('例題1 驗算 x=3.001', e1.subs(x, 3.001), 0.83336, 5e-6)
check('例題2', limit(r, x, 0), Rational(1, 6))
check('例題2 化簡', simplify(r - 1 / (sqrt(x + 9) + 3)), 0)
check('例題3(1)', limit(sin(4 * x) / (2 * x), x, 0), 2)
approx('例題3(1) 驗算', (sin(4 * x) / (2 * x)).subs(x, 0.001), 1.999995, 5e-7)
check('例題3(2)', limit((1 - cos(x)) / x**2, x, 0), Rational(1, 2))
check('例題3(2) 改寫', simplify((1 - cos(x)) / x**2 - (sin(x) / x)**2 / (1 + cos(x))), 0)
approx('例題3(2) 驗算', ((1 - cos(x)) / x**2).subs(x, 0.01), 0.499996, 5e-7)

check('錯誤1 三個 0/0', [limit(e, x, 2) for e in [(x**2 - 4) / (x - 2), (x - 2) / (x - 2), (x - 2)**2 / (x - 2)]], [4, 1, 0])
approx('錯誤2 sin 1°', sin(pi / 180), 0.017452, 5e-7)
check('錯誤2 度數的極限', limit(sin(pi * x / 180) / x, x, 0), pi / 180)
approx('錯誤2 π/180', pi / 180, 0.017453, 5e-7)
check('錯誤3', limit(sin(3 * x) / x, x, 0), 3)
approx('錯誤3 驗算', (sin(3 * x) / x).subs(x, 0.01), 2.9996, 5e-5)

check('練習1', limit((x**3 - 8) / (x - 2), x, 2), 12)
check('練習1 因式', factor(x**3 - 8), (x - 2) * (x**2 + 2 * x + 4))
check('練習2', limit((sqrt(x + 3) - 2) / (x - 1), x, 1), Rational(1, 4))
check('練習3(a)', limit(sin(5 * x) / (2 * x), x, 0), Rational(5, 2))
check('練習3(b)', limit(sin(2 * x) / sin(3 * x), x, 0), Rational(2, 3))
check('練習4', limit(x * cos(1 / x), x, 0), 0)
s = 5 * t**2
avg = (s.subs(t, 2 + h) - s.subs(t, 2)) / h
check('練習5 平均速度', simplify(avg), 20 + 5 * h)
check('練習5 瞬時速度', limit(avg, h, 0), 20)

print('== squeeze-theorem')
check('例題1', limit(x**2 * sin(1 / x), x, 0), 0)
approx('例題1 驗算', (x**2 * sin(1 / x)).subs(x, 0.01), -0.0000506, 5e-8)
check('例題2', limit(sin(x) / x, x, oo), 0)
approx('例題2 驗算', (sin(x) / x).subs(x, 1000), 0.000827, 5e-7)

print('== limits-at-infinity')
check('概念 (3x²+1)/(x²−5)', limit((3 * x**2 + 1) / (x**2 - 5), x, oo), 3)
check('概念 (2x+1)/(x²+3)', limit((2 * x + 1) / (x**2 + 3), x, oo), 0)
check('概念 (x²+1)/(x−1)', limit((x**2 + 1) / (x - 1), x, oo), oo)
check('概念 1/(x−2) 左右', one_sided(1 / (x - 2), 2), (-oo, oo))
fa = (2 * x + 1) / (x - 1)
check('概念 (2x+1)/(x−1) = 2 + 3/(x−1)', simplify(fa - (2 + 3 / (x - 1))), 0)
check('概念 漸近線 y=2', (limit(fa, x, oo), limit(fa, x, -oo)), (2, 2))
check('概念 漸近線 x=1', one_sided(fa, 1), (-oo, oo))
for m, s in [(1, 2), (10, 2.59374), (100, 2.70481), (1000, 2.71692), (10000, 2.71815)]:
    approx(f'e 表格 n={m}', (1 + Rational(1, m))**m, s, 5e-6)
check('e', limit((1 + 1 / n)**n, n, oo), E)

check('例題1(1)', limit((4 * x**2 - x) / (2 * x**2 + 5), x, oo), 2)
check('例題1(2)', limit((3 * x + 2) / (x**2 + 1), x, oo), 0)
check('例題1(3)', limit(x**3 / (x**2 + 1), x, -oo), -oo)
approx('例題1 驗算 (1) x=1000', ((4 * x**2 - x) / (2 * x**2 + 5)).subs(x, 1000), 1.9995, 5e-5)
check('例題1 驗算 (1) 分子分母', ((4 * x**2 - x).subs(x, 1000), (2 * x**2 + 5).subs(x, 1000)), (3999000, 2000005))
approx('例題1 驗算 (2) x=1000', ((3 * x + 2) / (x**2 + 1)).subs(x, 1000), 0.003, 5e-6)
approx('例題1 驗算 (3) x=−1000', (x**3 / (x**2 + 1)).subs(x, -1000), -999.999, 5e-4)

f2 = (2 * x**2 - 2) / (x**2 - x - 2)
check('例題2 約分', cancel(f2), (2 * x - 2) / (x - 2))
check('例題2 水平', (limit(f2, x, oo), limit(f2, x, -oo)), (2, 2))
check('例題2 x=2 左右', one_sided(f2, 2), (-oo, oo))
check('例題2 x=−1 是洞', limit(f2, x, -1), Rational(4, 3))
approx('例題2 驗算 2.01', f2.subs(x, 2.01), 202, 1e-6)
approx('例題2 驗算 1.99', f2.subs(x, 1.99), -198, 1e-6)

C = 500 * t / (200 + 10 * t)
check('例題3 C(t)', simplify(C - 50 * t / (20 + t)), 0)
check('例題3 極限', limit(C, t, oo), 50)
check('例題3 C = 50 − 1000/(20+t)', simplify(C - (50 - 1000 / (20 + t))), 0)
check('例題3 C=40', solve(Eq(50 * t / (20 + t), 40), t), [80])

check('錯誤1', limit(sqrt(x**2 + x) - x, x, oo), Rational(1, 2))
approx('錯誤1 驗算', (sqrt(x**2 + x) - x).subs(x, 10000), 0.49999, 5e-5)
check('錯誤2', limit((x**2 - 1) / (x - 1), x, 1), 2)
approx('錯誤3 1.001^1000', Rational(1001, 1000)**1000, 2.717, 5e-4)

check('練習1(a)', limit((5 * x**3 - 2 * x) / (2 * x**3 + x**2), x, oo), Rational(5, 2))
check('練習1(b)', limit((x + 1) / (x**2 + 1), x, -oo), 0)
check('練習2', limit(sqrt(x**2 + 6 * x) - x, x, oo), 3)
approx('練習2 驗算', (sqrt(x**2 + 6 * x) - x).subs(x, 10000), 2.9996, 5e-5)
check('練習3', limit(sqrt(4 * x**2 + 1) / x, x, -oo), -2)
f4 = (x + 3) / (x**2 - 9)
check('練習4 約分', cancel(f4), 1 / (x - 3))
check('練習4 水平', limit(f4, x, oo), 0)
check('練習4 x=3 左右', one_sided(f4, 3), (-oo, oo))
check('練習4 x=−3 是洞', limit(f4, x, -3), Rational(-1, 6))
check('練習5', limit((1 + 1 / n)**(2 * n), n, oo), E**2)
approx('練習5 e²', E**2, 7.389, 5e-4)
approx('練習5 驗算', Rational(1001, 1000)**2000, 7.382, 5e-4)

print('== continuity')
fk = Piecewise((x**2 + k, x < 2), (3 * x - 1, True))
ks = solve(Eq(limit(x**2 + k, x, 2), (3 * x - 1).subs(x, 2)), k)
check('例題1 k', ks, [1])
fk1 = fk.subs(k, 1)
check('例題1 連續', (*sides(x**2 + 1, 3 * x - 1, 2), fk1.subs(x, 2)), (5, 5, 5))

fc = (x**2 - 1) / (x**2 - 3 * x + 2)
check('例題2 不連續點', solve(x**2 - 3 * x + 2, x), [1, 2])
check('例題2 約分', cancel(fc), (x + 1) / (x - 2))
check('例題2 x=1 可去', limit(fc, x, 1), -2)
check('例題2 x=2 無窮', one_sided(fc, 2), (-oo, oo))

fr = x**3 - x - 1
check('例題3 f(1), f(2)', (fr.subs(x, 1), fr.subs(x, 2)), (-1, 5))
check('例題3 f(1.5)', fr.subs(x, Rational(3, 2)), Rational(7, 8))
check('例題3 f(1.25)', fr.subs(x, Rational(5, 4)), Rational(-19, 64))
check('例題3 f(1.25) = −0.296875', Rational(-19, 64), Rational(-296875, 1000000))
root = nsolve(fr, x, 1.3)
approx('例題3 根', root, 1.3247, 5e-5)
check('例題3 根在 [1.25, 1.5]', 1.25 < root < 1.5, True)
check('例題3 只有一個實根', len([s for s in solve(fr, x) if s.is_real]), 1)

fe = (x**2 - 4) / (x - 2)
check('錯誤1 極限 4 ≠ f(2)=3', limit(fe, x, 2), 4)
check('錯誤2 1/x 端點', ((1 / x).subs(x, -1), (1 / x).subs(x, 1)), (-1, 1))
check('錯誤3 x²−1', ((x**2 - 1).subs(x, -2), (x**2 - 1).subs(x, 2), solve(x**2 - 1, x)), (3, 3, [-1, 1]))

sol = solve([Eq(a + b, 1), Eq(3 * a + b, 11)], [a, b])
check('練習1 a, b', (sol[a], sol[b]), (5, -4))
check('練習1 f(3)', (2 * x + 5).subs(x, 3), 11)
check('練習2(a)', sides(x + 2, x**2, 0), (2, 0))
check('練習2(b)', limit((x**2 + x - 6) / (x - 2), x, 2), 5)
check('練習2(c)', one_sided(1 / (x + 1)**2, -1), (oo, oo))
fcos = cos(x) - x
check('練習3 端點', (fcos.subs(x, 0), fcos.subs(x, pi / 2)), (1, -pi / 2))
approx('練習3 根', nsolve(fcos, x, 0.7), 0.739, 5e-4)
check('練習4', limit((sqrt(x) - 1) / (x - 1), x, 1), Rational(1, 2))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
