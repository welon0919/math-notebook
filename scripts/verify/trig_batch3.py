"""Recompute every example and practice answer in trig lessons 9–12 and the sum-product formula page.

Run: scripts/verify/.venv/bin/python scripts/verify/trig_batch3.py
"""

from sympy import (FiniteSet, Interval, Rational, atan, atan2, cos, expand, expand_trig, maximum, minimum, nsimplify, pi,
                   radsimp, simplify, sin, solveset, sqrt, symbols, tan, trigsimp)

x, t, a, b, th = symbols('x t alpha beta theta', real=True)
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


def identity(label, lhs, rhs, vars_=(a, b, x, th, t), symbolic=True):
    """Symbolic check (expanding trig functions), backed by numeric samples.
    Pass symbolic=False for large multiples like sin(880πt), which expand_trig cannot handle in reasonable time."""
    global failures
    ok = symbolic and simplify(expand_trig(lhs - rhs)) == 0
    if not ok:
        samples = [(0.3, 1.1), (2.0, -0.7), (4.1, 2.9), (-1.3, 0.45)]
        ok = all(abs(complex((lhs - rhs).subs({v: s[i % 2] + 0.17 * i for i, v in enumerate(vars_)}).evalf())) < 1e-9 for s in samples)
    print(f"{'OK  ' if ok else 'FAIL'} {label}")
    if not ok:
        failures += 1


def d(v):
    return v * pi / 180


print('== angle-sum-difference')
check('概念 sin90 vs 和', (sin(d(90)), sin(d(30)) + sin(d(60)) > 1), (1, True))
A_ = (cos(a), sin(a))
B_ = (cos(b), sin(b))
ab2 = (A_[0] - B_[0])**2 + (A_[1] - B_[1])**2
check('概念 |AB|²', simplify(expand(ab2) - (2 - 2 * (cos(a) * cos(b) + sin(a) * sin(b)))), 0)
a2b2 = (cos(a - b) - 1)**2 + sin(a - b)**2
check('概念 |A\'B\'|²', simplify(a2b2 - (2 - 2 * cos(a - b))), 0)
identity('cos(α−β)', cos(a - b), cos(a) * cos(b) + sin(a) * sin(b))
identity('cos(α+β)', cos(a + b), cos(a) * cos(b) - sin(a) * sin(b))
identity('sin(α+β)', sin(a + b), sin(a) * cos(b) + cos(a) * sin(b))
identity('sin(α−β)', sin(a - b), sin(a) * cos(b) - cos(a) * sin(b))
identity('tan(α+β)', tan(a + b), (tan(a) + tan(b)) / (1 - tan(a) * tan(b)))
identity('tan(α−β)', tan(a - b), (tan(a) - tan(b)) / (1 + tan(a) * tan(b)))
check('例題1 sin15', sin(d(15)), (sqrt(6) - sqrt(2)) / 4)
check('例題1 cos75', cos(d(75)), (sqrt(6) - sqrt(2)) / 4)
check('例題1 tan75', tan(d(75)), 2 + sqrt(3))
check('例題1 有理化', radsimp((3 + sqrt(3)) / (3 - sqrt(3))), 2 + sqrt(3))
approx('例題1 sin15 ≈ 0.259', (2.449 - 1.414) / 4, 0.259)
sa, ca = Rational(3, 5), Rational(-4, 5)
cb, sb = Rational(5, 13), Rational(-12, 13)
check('例題2', (sa * cb + ca * sb, ca * cb + sa * sb), (Rational(63, 65), Rational(-56, 65)))
check('例題3 tan(α+β)', (Rational(1, 2) + Rational(1, 3)) / (1 - Rational(1, 6)), 1)
s3 = atan(Rational(1, 2)) + atan(Rational(1, 3))
check('例題3 tan(α+β)=1（展開）', simplify(expand_trig(tan(s3))), 1)
check('例題3 0 < α+β < π/2，所以是 π/4', (0 < float(s3) < float(pi / 2), abs(float(s3 - pi / 4)) < 1e-15), (True, True))
check('例題3 幾何', (atan2(1, 2), atan2(1, 3)), (atan(Rational(1, 2)), atan(Rational(1, 3))))
check('錯誤2', (cos(pi / 2), cos(pi / 4)**2 + sin(pi / 4)**2), (0, 1))
check('錯誤3 正確分母', 1 - tan(pi / 4)**2, 0)
check('練習1', (cos(d(15)), sin(d(105))), ((sqrt(6) + sqrt(2)) / 4, (sqrt(6) + sqrt(2)) / 4))
check('練習2', sin(d(20)) * cos(d(40)) + cos(d(20)) * sin(d(40)) - sqrt(3) / 2, 0)
ca3, sa3 = Rational(-3, 5), Rational(-4, 5)
sb3, cb3 = Rational(12, 13), Rational(-5, 13)
check('練習3', ca3 * cb3 - sa3 * sb3, Rational(63, 65))
identity('練習4', sin(a + b) * sin(a - b), sin(a)**2 - sin(b)**2)
check('練習5 tan15', tan(d(15)), 2 - sqrt(3))
check('練習5', simplify(tan(d(75)) - tan(d(15))), 2 * sqrt(3))

print('== double-half-angle')
identity('sin2θ', sin(2 * th), 2 * sin(th) * cos(th))
identity('cos2θ 三式', cos(2 * th) - (2 * cos(th)**2 - 1), 1 - 2 * sin(th)**2 - (cos(th)**2 - sin(th)**2))
identity('tan2θ', tan(2 * th), 2 * tan(th) / (1 - tan(th)**2))
identity('降冪 sin²', sin(th)**2, (1 - cos(2 * th)) / 2)
identity('降冪 cos²', cos(th)**2, (1 + cos(2 * th)) / 2)
identity('tan(θ/2)', tan(th / 2), sin(th) / (1 + cos(th)))
s1, c1 = Rational(3, 5), Rational(-4, 5)
check('例題1', (2 * s1 * c1, 1 - 2 * s1**2, (2 * s1 * c1) / (1 - 2 * s1**2)), (Rational(-24, 25), Rational(7, 25), Rational(-24, 7)))
check('例題1 驗算', (2 * Rational(-3, 4)) / (1 - Rational(9, 16)), Rational(-24, 7))
check('例題2 cos(π/8)', simplify(cos(pi / 8) - sqrt(2 + sqrt(2)) / 2), 0)
check('例題2 sin15', simplify(sin(d(15)) - sqrt(2 - sqrt(3)) / 2), 0)
check('例題2 兩種寫法相等', expand(((sqrt(6) - sqrt(2)) / 4)**2), (2 - sqrt(3)) / 4)
identity('例題3 cos3θ', cos(3 * th), 4 * cos(th)**3 - 3 * cos(th))
check('例題3 θ=60°', (cos(d(180)), 4 * Rational(1, 2)**3 - 3 * Rational(1, 2)), (-1, -1))
check('錯誤1', (sin(pi), 2 * sin(pi / 2)), (0, 2))
check('錯誤2', cos(d(150)), -sqrt(3) / 2)
check('錯誤3', (sin(0)**2, (1 + cos(0)) / 2), (0, 1))
s_, c_ = Rational(-12, 13), Rational(-5, 13)
check('練習1', (2 * s_ * c_, 2 * c_**2 - 1), (Rational(120, 169), Rational(-119, 169)))
check('練習1 驗算', Rational(120, 169)**2 + Rational(119, 169)**2, 1)
identity('練習2', (1 - cos(2 * th)) / sin(2 * th), tan(th))
check('練習3', (simplify(sin(pi / 8) - sqrt(2 - sqrt(2)) / 2), simplify(tan(pi / 8) - (sqrt(2) - 1))), (0, 0))
check('練習4 範圍', (maximum(sin(x)**2, x, Interval(0, pi)), minimum(sin(x)**2, x, Interval(0, pi))), (1, 0))
check('練習4 週期 π', simplify(sin(x + pi)**2 - sin(x)**2), 0)
th5 = atan(2)
check('練習5', (simplify(expand_trig(tan(2 * th5))), simplify(expand_trig(sin(2 * th5)))), (Rational(-4, 3), Rational(4, 5)))
check('練習5 第二象限', (float(2 * th5) > float(pi / 2), float(2 * th5) < float(pi)), (True, True))

print('== sum-product-formulas 與公式頁 sum-product')
identity('積化和差 1', sin(a) * cos(b), (sin(a + b) + sin(a - b)) / 2)
identity('積化和差 2', cos(a) * sin(b), (sin(a + b) - sin(a - b)) / 2)
identity('積化和差 3', cos(a) * cos(b), (cos(a + b) + cos(a - b)) / 2)
identity('積化和差 4', sin(a) * sin(b), -(cos(a + b) - cos(a - b)) / 2)
A, B = a, b
identity('和差化積 1', sin(A) + sin(B), 2 * sin((A + B) / 2) * cos((A - B) / 2))
identity('和差化積 2', sin(A) - sin(B), 2 * cos((A + B) / 2) * sin((A - B) / 2))
identity('和差化積 3', cos(A) + cos(B), 2 * cos((A + B) / 2) * cos((A - B) / 2))
identity('和差化積 4', cos(A) - cos(B), -2 * sin((A + B) / 2) * sin((A - B) / 2))
identity('概念 拍', sin(10 * x) + sin(11 * x), 2 * sin(21 * x / 2) * cos(x / 2))
check('例題1', (simplify(sin(d(75)) * cos(d(15)) - (2 + sqrt(3)) / 4), simplify(cos(d(75)) * cos(d(15)))), (0, Rational(1, 4)))
check('例題2', (simplify(sin(d(75)) + sin(d(15)) - sqrt(6) / 2), simplify(cos(d(75)) - cos(d(15)) + sqrt(2) / 2)), (0, 0))
identity('例題3', sin(880 * pi * t) + sin(888 * pi * t), 2 * cos(4 * pi * t) * sin(884 * pi * t), symbolic=False)
check('例題3 |cos(4πt)| 週期 1/4', simplify(cos(4 * pi * (t + Rational(1, 4))) + cos(4 * pi * t)), 0)
check('錯誤2', (cos(0) - cos(pi), -2 * sin(pi / 2) * sin(-pi / 2)), (2, 2))
check('錯誤3', (sin(pi / 4) * cos(pi / 4), sin(pi / 2)), (Rational(1, 2), 1))
check('練習1', simplify(sin(d(15)) * sin(d(75))), Rational(1, 4))
check('練習2', simplify(sin(d(105)) - sin(d(15))), sqrt(2) / 2)
identity('練習3', (sin(x) + sin(3 * x)) / (cos(x) + cos(3 * x)), tan(2 * x))
check('練習4（50 位數）', abs((cos(d(20)) + cos(d(100)) + cos(d(140))).evalf(50)) < 1e-45, True)
approx('練習4（數值）', cos(d(20)) + cos(d(100)) + cos(d(140)), 0, 1e-12)
identity('練習5', sin(x) * sin(x), (1 - cos(2 * x)) / 2)
check('公式頁 例題1', simplify(cos(d(105)) * cos(d(15))), Rational(-1, 4))
check('公式頁 例題2', solveset(sin(x) + sin(3 * x), x, Interval(0, pi)), FiniteSet(0, pi / 2, pi))

print('== combining-sine-cosine')
identity('概念 展開', 2 * sin(x + pi / 6), sqrt(3) * sin(x) + cos(x))
check('例題1 最大最小', (sqrt(3) * sin(pi / 3) + cos(pi / 3), sqrt(3) * sin(4 * pi / 3) + cos(4 * pi / 3)), (2, -2))
identity('例題2 疊合', sqrt(2) * sin(x - pi / 4), sin(x) - cos(x))
f2 = sin(x) - cos(x)
check('例題2 [0,π] 最大最小', (maximum(f2, x, Interval(0, pi)), minimum(f2, x, Interval(0, pi))), (sqrt(2), -1))
check('例題2 端點', (f2.subs(x, 0), f2.subs(x, 3 * pi / 4), f2.subs(x, pi)), (-1, sqrt(2), 1))
phi = atan2(4, 3)
check('例題3 r', sqrt(9 + 16), 5)
check('例題3 sin t, cos t', (simplify(sin(pi / 2 - phi)), simplify(cos(pi / 2 - phi))), (Rational(3, 5), Rational(4, 5)))
check('例題3 v', 3 * Rational(3, 5) + 4 * Rational(4, 5), 5)
check('例題3 最大值', maximum(3 * sin(x) + 4 * cos(x), x, Interval(0, 2 * pi)), 5)
check('錯誤2 錯誤值 vs 正確值', (sqrt(2) * sin(-pi / 4), sqrt(2) * sin(3 * pi / 4)), (-1, 1))
identity('錯誤2', sqrt(2) * sin(x + 3 * pi / 4), -sin(x) + cos(x))
identity('練習1', 2 * sin(x + pi / 3), sin(x) + sqrt(3) * cos(x))
y2 = 5 * sin(x) - 12 * cos(x) + 1
check('練習2', (maximum(y2, x, Interval(0, 2 * pi)), minimum(y2, x, Interval(0, 2 * pi))), (14, -12))
identity('練習3', sqrt(2) * sin(x + 3 * pi / 4), cos(x) - sin(x))
identity('練習4', 2 * sin(2 * x + pi / 3), sin(2 * x) + sqrt(3) * cos(2 * x))
y5 = sin(x)**2 + sqrt(3) * sin(x) * cos(x)
identity('練習5 化簡', y5, sin(2 * x - pi / 6) + Rational(1, 2))
check('練習5', (maximum(y5, x, Interval(0, 2 * pi)), minimum(y5, x, Interval(0, 2 * pi))), (Rational(3, 2), Rational(-1, 2)))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
