"""Recompute every example and practice answer in trig lessons 5–8 and the angle-relations formula page.

Run: scripts/verify/.venv/bin/python scripts/verify/trig_batch2.py
"""

from sympy import (Rational, S, acos, asin, atan, cos, cot, csc, expand, pi, sec, simplify, sin, solveset, sqrt, symbols,
                   tan, Interval, FiniteSet)

x, t, th = symbols('x t theta', real=True)
failures = 0


def check(label, got, expected):
    global failures
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def approx(label, got, expected, tol=0.005):
    global failures
    ok = abs(float(got) - expected) < tol
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {float(got):.4f}")
    if not ok:
        failures += 1
        print(f'     expected ≈ {expected}')


def identity(label, lhs, rhs, samples=(0.3, 1.1, 2.0, 2.9, 4.0, 5.5, -0.7)):
    """Symbolic check, backed by numeric samples (avoiding points where either side is undefined)."""
    global failures
    ok = simplify(lhs - rhs) == 0
    if not ok:
        ok = all(abs(complex((lhs - rhs).subs(th, v).evalf())) < 1e-9 for v in samples)
    print(f"{'OK  ' if ok else 'FAIL'} {label}")
    if not ok:
        failures += 1


def sol(expr, lo, hi):
    return solveset(expr, x, Interval(lo, hi))


print('== amplitude-period-phase')
f1 = 3 * sin(2 * x - pi / 3) + 1
check('例題1 提出 B', expand(2 * (x - pi / 6)), 2 * x - pi / 3)
check('例題1 最高點', sol(2 * x - pi / 3 - pi / 2, 0, pi), FiniteSet(5 * pi / 12))
check('例題1 最高點的值', f1.subs(x, 5 * pi / 12), 4)
check('例題1 最大最小', (1 + 3, 1 - 3), (4, -2))
check('例題1 平移量', 5 * pi / 12 - pi / 4, pi / 6)
f2 = 2 * sin(x / 2 - pi / 4)
xs = [pi / 2, 3 * pi / 2, 5 * pi / 2, 7 * pi / 2, 9 * pi / 2]
check('例題2 五點的 x', [simplify(v / 2 - pi / 4) for v in xs], [0, pi / 2, pi, 3 * pi / 2, 2 * pi])
check('例題2 五點的 y', [f2.subs(x, v) for v in xs], [0, 2, 0, -2, 0])
check('例題2 週期', 2 * pi / Rational(1, 2), 4 * pi)
d = 3 * sin(pi * t / 6) + 7
check('例題3 最高最低', (d.subs(t, 3), d.subs(t, 9)), (10, 4))
check('例題3 週期 12', simplify(d.subs(t, t + 12) - d), 0)
check('例題3 d(5)', d.subs(t, 5), Rational(17, 2))
check('例題3 水深 8.5 的時刻', solveset(d - Rational(17, 2), t, Interval(0, 12)), FiniteSet(1, 5))
check('錯誤1 sin2x 最高點', sol(2 * x - pi / 2, 0, pi / 2), FiniteSet(pi / 4))
check('錯誤2', simplify(sin(2 * (x + pi)) - sin(2 * x)), 0)
check('錯誤3', (-3 * sin(3 * pi / 2) + 1, 1 + 3, 1 - 3), (4, 4, -2))
check('練習1', (4, 2 * pi / 3, -2 + 4, -2 - 4), (4, 2 * pi / 3, 2, -6))
check('練習1 最大最小（代值）', (4 * cos(0) - 2, 4 * cos(3 * pi / 3) - 2), (2, -6))
check('練習2', expand((x + pi / 2) / 3), x / 3 + pi / 6)
check('練習2 週期', 2 * pi / Rational(1, 3), 6 * pi)
y3 = 3 * sin(2 * x) + 2
check('練習3 最大最小', (y3.subs(x, pi / 4), y3.subs(x, 3 * pi / 4)), (5, -1))
check('練習3 x=0 在中線、往上', (y3.subs(x, 0), y3.diff(x).subs(x, 0) > 0), (2, True))
check('練習3 週期', simplify(y3.subs(x, x + pi) - y3), 0)
h = 25 - 20 * cos(pi * t / 5)
check('練習5', (h.subs(t, 0), h.subs(t, Rational(5, 2)), h.subs(t, 5)), (5, 25, 45))
check('練習5 週期', simplify(h.subs(t, t + 10) - h), 0)

print('== tangent-graph')
check('概念 值表', [tan(v) for v in (-pi / 3, -pi / 4, 0, pi / 4, pi / 3)], [-sqrt(3), -1, 0, 1, sqrt(3)])
check('概念 tan(x+π)', simplify(tan(x + pi) - tan(x)), 0)
check('概念 奇函數', simplify(tan(-x) + tan(x)), 0)
check('例題1 週期', simplify(tan(2 * (x + pi / 2)) - tan(2 * x)), 0)
check('例題1 點', (tan(2 * (pi / 8)), tan(2 * (-pi / 8))), (1, -1))
check('例題2-1', (tan(4 * pi / 3), tan(-5 * pi / 6)), (sqrt(3), sqrt(3) / 3))
check('例題2-2', solveset(tan(x) + 1, x, Interval.open(-pi / 2, pi / 2)), FiniteSet(-pi / 4))
check('例題3', [10 * tan(v) for v in (pi / 6, pi / 4, pi / 3)], [10 * sqrt(3) / 3, 10, 10 * sqrt(3)])
approx('例題3 5.77', 10 * 1.732 / 3, 5.77)
approx('例題3 17.32', 10 * 1.732, 17.32)
approx('例題3 移動 4.23', 10 - 10 * 1.732 / 3, 4.23)
approx('例題3 移動 7.32', 10 * 1.732 - 10, 7.32)
check('錯誤1', tan(5 * pi / 4), 1)
check('錯誤3', simplify(tan(2 * x + pi) - tan(2 * x)), 0)
check('練習1', (tan(7 * pi / 6), tan(-pi / 3), tan(3 * pi / 4)), (sqrt(3) / 3, -sqrt(3), -1))
check('練習2 週期', simplify(tan((x + 2 * pi) / 2) - tan(x / 2)), 0)
check('練習2 漸近線', [cos((pi + 2 * k * pi) / 2) for k in range(-2, 3)], [0] * 5)
check('練習4 零點', [tan(pi / 4 + k * pi - pi / 4) for k in range(-2, 3)], [0] * 5)
check('練習4 漸近線', [cos(3 * pi / 4 + k * pi - pi / 4) for k in range(-2, 3)], [0] * 5)
approx('練習5 4−π', 4 - 3.14, 0.86)
check('練習5 大小', (tan(2) < 0, 0 < tan(4) < tan(1), simplify(tan(4) - tan(4 - pi))), (True, True, 0))

print('== inverse-trig-functions')
check('概念 sin x = 1/2 的解', [sin(v) for v in (pi / 6, 5 * pi / 6, 13 * pi / 6)], [Rational(1, 2)] * 3)
check('概念 asin(sin 5π/6)', asin(sin(5 * pi / 6)), pi / 6)
xs_ = [Rational(k, 10) for k in range(-10, 11)]
check('概念 sin(acos x) = √(1−x²)', all(simplify(sin(acos(v)) - sqrt(1 - v**2)) == 0 for v in xs_), True)
check('例題1', (asin(Rational(-1, 2)), acos(Rational(-1, 2)), atan(sqrt(3))), (-pi / 6, 2 * pi / 3, pi / 3))
check('例題2', (asin(sin(5 * pi / 6)), acos(cos(-pi / 4))), (pi / 6, pi / 4))
a3 = asin(Rational(-3, 5))
check('例題3-1', (simplify(cos(a3)), simplify(tan(a3))), (Rational(4, 5), Rational(-3, 4)))
check('例題3-2', all(simplify(tan(asin(v)) - v / sqrt(1 - v**2)) == 0 for v in xs_[1:-1]), True)
check('錯誤1', (asin(Rational(1, 2)), sin(2) != Rational(1, 2)), (pi / 6, True))
check('錯誤2 cos(−π/3)', cos(-pi / 3), Rational(1, 2))
check('練習1', (acos(sqrt(2) / 2), asin(1), atan(-1), acos(-1)), (pi / 4, pi / 2, -pi / 4, pi))
check('練習2', asin(sin(4 * pi / 3)), -pi / 3)
check('練習3', simplify(cos(atan(2))), sqrt(5) / 5)
check('練習4', solveset(2 * x - 1 >= -1, x, S.Reals).intersect(solveset(2 * x - 1 <= 1, x, S.Reals)), Interval(0, 1))
check('練習5', all(simplify(tan(acos(v)) - sqrt(1 - v**2) / v) == 0 for v in xs_ if v != 0), True)
check('練習5 驗算', (tan(acos(Rational(1, 2))), sqrt(Rational(3, 4)) / Rational(1, 2)), (sqrt(3), sqrt(3)))

print('== basic-identities 與公式頁 angle-relations')
identity('平方關係', sin(th)**2 + cos(th)**2, 1)
identity('1+tan²=sec²', 1 + tan(th)**2, sec(th)**2)
identity('1+cot²=csc²', 1 + cot(th)**2, csc(th)**2)
for name, lhs, rhs in [
    ('sin(−θ)', sin(-th), -sin(th)), ('cos(−θ)', cos(-th), cos(th)), ('tan(−θ)', tan(-th), -tan(th)),
    ('sin(π−θ)', sin(pi - th), sin(th)), ('cos(π−θ)', cos(pi - th), -cos(th)), ('tan(π−θ)', tan(pi - th), -tan(th)),
    ('sin(π/2−θ)', sin(pi / 2 - th), cos(th)), ('cos(π/2−θ)', cos(pi / 2 - th), sin(th)), ('tan(π/2−θ)', tan(pi / 2 - th), cot(th)),
    ('sin(π+θ)', sin(pi + th), -sin(th)), ('cos(π+θ)', cos(pi + th), -cos(th)), ('tan(π+θ)', tan(pi + th), tan(th)),
]:
    identity('關係 ' + name, lhs, rhs)
s1 = Rational(-5, 13)
c1 = -sqrt(1 - s1**2)
check('例題1', (c1, s1 / c1, 1 / c1), (Rational(-12, 13), Rational(5, 12), Rational(-13, 12)))
identity('例題2', sin(-th) * cos(pi - th) / sin(pi / 2 - th), sin(th))
check('例題2 驗算 θ=π/6', (sin(-pi / 6) * cos(pi - pi / 6) / sin(pi / 2 - pi / 6)), Rational(1, 2))
identity('例題3', cos(th) / (1 - sin(th)), (1 + sin(th)) / cos(th))
check('錯誤1 θ=π/4', sin(pi / 4) + cos(pi / 4), sqrt(2))
check('錯誤3 反例', (sin(-pi / 2), sqrt(1 - cos(-pi / 2)**2)), (-1, 1))
c_ = Rational(-4, 5)
s_ = sqrt(1 - c_**2)
check('練習1', (s_, s_ / c_, 1 / s_), (Rational(3, 5), Rational(-3, 4), Rational(5, 3)))
c2 = 1 / sqrt(1 + (-2)**2)
check('練習2', (c2, -2 * c2), (sqrt(5) / 5, -2 * sqrt(5) / 5))
check('練習3', simplify(sin(pi / 9)**2 + sin(7 * pi / 18)**2), 1)
identity('練習4', tan(th) + cot(th), sec(th) * csc(th))
s5, c5 = Rational(4, 5), Rational(-3, 5)
check('練習5', (s5 + c5, s5 * c5, s5 - c5, s5**2 + c5**2), (Rational(1, 5), Rational(-12, 25), Rational(7, 5), 1))
check('練習5 θ 在 (0, π)', (s5 > 0), True)
check('公式頁 例題1', sin(5 * pi / 6) + cos(-pi / 3) + tan(3 * pi / 4), 0)
identity('公式頁 例題2', cos(pi - th) * sin(pi / 2 - th) / cos(-th), -cos(th))
check('公式頁 例題2 驗算', cos(pi - pi / 3) * sin(pi / 2 - pi / 3) / cos(-pi / 3), Rational(-1, 2))
check('公式頁 cos(5π/6)', cos(5 * pi / 6), -sqrt(3) / 2)

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
