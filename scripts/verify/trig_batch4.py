"""Recompute every example and practice answer in trig lessons 13–16 and the heron-formula and de-moivre theorem pages.

Run: scripts/verify/.venv/bin/python scripts/verify/trig_batch4.py
"""

from sympy import (FiniteSet, I, Interval, Rational, acos, arg, asin, atan2, cos, expand, nsimplify, pi, radsimp, re, im,
                   simplify, sin, solveset, sqrt, symbols, tan, Abs, S)

x = symbols('x', real=True)
z = symbols('z')
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


def d(v):
    return v * pi / 180


def deg(v):
    return simplify(v * 180 / pi)


def heron(a, b, c):
    s = (S(a) + b + c) / 2
    return sqrt(s * (s - a) * (s - b) * (s - c))


def law_cos_angle(a, b, c):
    """The angle opposite c."""
    return acos((S(a)**2 + b**2 - c**2) / (2 * a * b))


def roots_in_0_2pi(expr, claimed):
    """Check the claimed roots exactly, then scan [0, 2π) numerically so that no root is missed.
    (solveset is not reliable for every trigonometric equation.)"""
    exact = all(simplify(expr.subs(x, r)) == 0 for r in claimed)
    f = lambda v: float(expr.subs(x, v))
    n = 4000
    grid = [2 * float(pi) * i / n for i in range(n + 1)]
    vals = [f(v) for v in grid]
    found = []
    for i in range(n):
        a, b = vals[i], vals[i + 1]
        if a == 0 or a * b < 0:
            found.append(grid[i])
        # Tangent roots (no sign change): a local minimum of |f| that is essentially 0.
        elif 0 < i and a * b > 0 and a * vals[i - 1] > 0 and abs(a) < 1e-3 and abs(a) <= abs(vals[i - 1]) and abs(a) <= abs(b):
            found.append(grid[i])
    step = 2 * float(pi) / n
    # Merge hits that belong to the same root.
    found = [v for j, v in enumerate(found) if j == 0 or v - found[j - 1] > 3 * step]
    numeric = len(found) == len(claimed) and all(abs(fv - float(c)) < 2 * step for fv, c in zip(found, sorted(claimed, key=float)))
    return exact and numeric


print('== solving-triangles')
check('例題1 C', 180 - 45 - 60, 75)
b1 = 10 * sin(d(60)) / sin(d(45))
c1 = 10 * sin(d(75)) / sin(d(45))
check('例題1 b', radsimp(b1), 5 * sqrt(6))
check('例題1 c', simplify(c1 - 5 * (sqrt(3) + 1)), 0)
approx('例題1 b ≈ 12.2', b1, 12.25, 0.05)
approx('例題1 c ≈ 13.7', c1, 13.66, 0.05)
a2sq = 9 + 25 - 2 * 3 * 5 * cos(d(60))
check('例題2 a²', a2sq, 19)
check('例題2 a²+b²−c²', 19 + 9 - 25, 3)
approx('例題2 √19', sqrt(19), 4.36, 0.01)
sinB = sqrt(6) * sin(d(45)) / 2
check('例題3 sin B', simplify(sinB), sqrt(3) / 2)
c3a = 2 * sin(d(75)) / sin(d(45))
c3b = 2 * sin(d(15)) / sin(d(45))
check('例題3 c（B=60°）', simplify(c3a - (sqrt(3) + 1)), 0)
check('例題3 c（B=120°）', simplify(c3b - (sqrt(3) - 1)), 0)
check('例題3 驗算第二解', expand(6 + (sqrt(3) - 1)**2 - 2 * sqrt(6) * (sqrt(3) - 1) * sqrt(2) / 2), 4)
check('例題3 驗算第一解', expand(6 + (sqrt(3) + 1)**2 - 2 * sqrt(6) * (sqrt(3) + 1) * sqrt(2) / 2), 4)
check('錯誤2', (9 + 25 - 2 * 3 * 5 * Rational(1, 2), 9 + 25 - 2 * 3 * 5 * cos(d(120))), (19, 49))
cosA, cosB, cosC = (S(25) + 49 - 9) / 70, (S(9) + 49 - 25) / 42, (S(9) + 25 - 49) / 30
check('錯誤3 cos A, cos B, cos C', (cosA, cosB, cosC), (Rational(13, 14), Rational(11, 14), Rational(-1, 2)))
sinA = sqrt(1 - cosA**2)
check('錯誤3 sin A', sinA, 3 * sqrt(3) / 14)
check('錯誤3 sin C 由正弦定理', simplify(7 * sinA / 3), sqrt(3) / 2)
approx('錯誤3 A', deg(acos(cosA)), 21.79, 0.01)
approx('錯誤3 B', deg(acos(cosB)), 38.21, 0.01)
check('錯誤3 cos(A+B) = 1/2，A、B 都是銳角，所以 A+B = 60°', simplify(cosA * cosB - sinA * sqrt(1 - cosB**2)), Rational(1, 2))
check('練習1', (180 - 30 - 45, radsimp(4 * sin(d(45)) / sin(d(30)))), (105, 4 * sqrt(2)))
check('練習2', sqrt(25 + 64 - 2 * 5 * 8 * cos(d(60))), 7)
check('練習3', law_cos_angle(5, 8, 7), pi / 3)
check('練習4', [S(b) * sin(d(30)) / a for a, b in ((1, 2), (1, 3), (3, 2))], [1, Rational(3, 2), Rational(1, 3)])
check('練習5', 6 / sin(d(30)) / 2, 6)

print('== triangle-area-surveying 與定理頁 heron-formula')
check('概念 面積 = ½ab sinC = 海龍（5,6,7）', simplify(Rational(1, 2) * 5 * 6 * sin(law_cos_angle(5, 6, 7)) - heron(5, 6, 7)), 0)
check('例題1-1', Rational(1, 2) * 3 * 5 * sin(d(60)), 15 * sqrt(3) / 4)
check('例題1-2', heron(5, 6, 7), 6 * sqrt(6))
check('例題1-2 驗算 cos C, sin C', (cos(law_cos_angle(5, 6, 7)), simplify(sin(law_cos_angle(5, 6, 7)))), (Rational(1, 5), 2 * sqrt(6) / 5))
h = 20 * sin(d(60))
check('例題2 h', h, 10 * sqrt(3))
check('例題2 三角形 ABT 的角', (180 - 60, 180 - 30 - 120), (120, 30))
xh = h / sqrt(3)
check('例題2 方法二', (simplify(tan(d(60)) - h / xh), simplify(tan(d(30)) - h / (xh + 20))), (0, 0))
approx('例題2 ≈ 17.32', h, 17.32)
ab2 = 36 + 100 - 2 * 6 * 10 * cos(d(60))
check('例題3 AB', (ab2, sqrt(ab2)), (76, 2 * sqrt(19)))
approx('例題3 AB ≈ 8.72', sqrt(ab2), 8.72)
check('例題3 面積', Rational(1, 2) * 6 * 10 * sin(d(60)), 15 * sqrt(3))
approx('例題3 面積 ≈ 25.98', 15 * sqrt(3), 25.98)
# The diagram: bearings measured clockwise from north.
Apt = (6 * sin(d(20)), 6 * cos(d(20)))
Bpt = (10 * sin(d(80)), 10 * cos(d(80)))
check('例題3 圖的座標 AB²', simplify((Apt[0] - Bpt[0])**2 + (Apt[1] - Bpt[1])**2), 76)
approx('錯誤1 錯誤的值', sqrt(18 * 13 * 12 * 11), 175.75, 0.01)
approx('錯誤1 正確的值', 6 * sqrt(6), 14.70, 0.01)
check('錯誤2', (50 * tan(d(30)), 50 / tan(d(30))), (50 * sqrt(3) / 3, 50 * sqrt(3)))
check('練習1', Rational(1, 2) * 4 * 6 * sin(d(150)), 6)
check('練習2', heron(7, 8, 9), 12 * sqrt(5))
check('練習3', simplify(30 / tan(d(45)) - 30 / tan(d(60))), 30 - 10 * sqrt(3))
approx('練習3 ≈ 12.68', 30 - 10 * sqrt(3), 12.68)
check('練習4 最大角', law_cos_angle(3, 5, 7), 2 * pi / 3)
check('練習4 面積', (Rational(1, 2) * 3 * 5 * sin(d(120)), heron(3, 5, 7)), (15 * sqrt(3) / 4, 15 * sqrt(3) / 4))
check('練習5', (heron(13, 14, 15), heron(13, 14, 15) / 21), (84, 4))
a_, b_, c_ = symbols('a b c', positive=True)
s_ = (a_ + b_ + c_) / 2
cosC_ = (a_**2 + b_**2 - c_**2) / (2 * a_ * b_)
check('定理頁 證明 16Δ²', expand(4 * a_**2 * b_**2 * (1 - cosC_**2) - 16 * s_ * (s_ - a_) * (s_ - b_) * (s_ - c_)), 0)
check('定理頁 例題1 高', simplify(2 * heron(5, 6, 7) / 5), 12 * sqrt(6) / 5)

print('== trig-equations')
check('例題1', roots_in_0_2pi(2 * sin(x) - sqrt(3), [pi / 3, 2 * pi / 3]), True)
check('例題2', roots_in_0_2pi(cos(2 * x) - cos(x), [0, 2 * pi / 3, 4 * pi / 3]), True)
check('例題2 因式分解', expand((2 * x + 1) * (x - 1)), 2 * x**2 - x - 1)
check('例題3', roots_in_0_2pi(sin(x) + sqrt(3) * cos(x) - 1, [pi / 2, 11 * pi / 6]), True)
check('例題3 疊合', simplify(2 * sin(x + pi / 3) - sin(x) - sqrt(3) * cos(x)), 0)
check('錯誤1', roots_in_0_2pi(sin(x) - Rational(1, 2), [pi / 6, 5 * pi / 6]), True)
check('錯誤2', roots_in_0_2pi(sin(x) * cos(x) - sin(x), [0, pi]), True)
check('錯誤3', roots_in_0_2pi(sin(2 * x) - Rational(1, 2), [pi / 12, 5 * pi / 12, 13 * pi / 12, 17 * pi / 12]), True)
check('練習1', roots_in_0_2pi(cos(x) + sqrt(2) / 2, [3 * pi / 4, 5 * pi / 4]), True)
check('練習2', (tan(-pi / 3), tan(2 * pi / 3)), (-sqrt(3), -sqrt(3)))
check('練習3', roots_in_0_2pi(2 * sin(x)**2 + sin(x) - 1, [pi / 6, 5 * pi / 6, 3 * pi / 2]), True)
check('練習4', roots_in_0_2pi(sin(2 * x) - cos(x), [pi / 6, pi / 2, 5 * pi / 6, 3 * pi / 2]), True)
check('練習5', roots_in_0_2pi(sin(x) - cos(x) - 1, [pi / 2, pi]), True)

print('== polar-form 與定理頁 de-moivre')
check('例題1-1', (sqrt(1 + 3), atan2(sqrt(3), -1)), (2, 2 * pi / 3))
check('例題1-2', (4 * cos(7 * pi / 6), 4 * sin(7 * pi / 6)), (-2 * sqrt(3), -2))
zz, ww = 1 + sqrt(3) * I, sqrt(3) + I
check('例題2 極式', ((Abs(zz), arg(zz)), (Abs(ww), arg(ww))), ((2, pi / 3), (2, pi / 6)))
check('例題2 zw', expand(zz * ww), 4 * I)
check('例題2 z/w', simplify(radsimp(zz / ww)), sqrt(3) / 2 + I / 2)
check('例題3-1', expand((1 + I)**8), 16)
r3 = [2 * (cos((pi / 2 + 2 * k * pi) / 3) + I * sin((pi / 2 + 2 * k * pi) / 3)) for k in range(3)]
check('例題3-2 三個根', [simplify(r) for r in r3], [sqrt(3) + I, -sqrt(3) + I, -2 * I])
check('例題3-2 根^3 = 8i', [expand(r**3) for r in (sqrt(3) + I, -sqrt(3) + I, -2 * I)], [8 * I] * 3)
check('錯誤1', arg(-1 - I) + 2 * pi, 5 * pi / 4)
check('練習1', ((2 * cos(3 * pi / 4), 2 * sin(3 * pi / 4)), (Abs(-3 * I), arg(-3 * I) + 2 * pi)), ((-sqrt(2), sqrt(2)), (3, 3 * pi / 2)))
check('練習2', (Abs(-2 + 2 * I), arg(-2 + 2 * I)), (2 * sqrt(2), 3 * pi / 4))
check('練習3', expand(6 * (cos(d(120)) + I * sin(d(120)))), -3 + 3 * sqrt(3) * I)
check('練習3 直接相乘（數值）', abs(complex((2 * (cos(d(50)) + I * sin(d(50))) * 3 * (cos(d(70)) + I * sin(d(70)))).evalf()) - complex(-3, 3 * 3**0.5)) < 1e-12, True)
check('練習4', expand((sqrt(3) + I)**6), -64)
r5 = [sqrt(2) + sqrt(2) * I, -sqrt(2) + sqrt(2) * I, -sqrt(2) - sqrt(2) * I, sqrt(2) - sqrt(2) * I]
check('練習5', [expand(r**4) for r in r5], [-16] * 4)
check('練習5 公式給出的根', [expand(2 * (cos((pi + 2 * k * pi) / 4) + I * sin((pi + 2 * k * pi) / 4))) for k in range(4)], r5)
check('定理頁 例題1', expand((1 - sqrt(3) * I)**5), 16 + 16 * sqrt(3) * I)
check('定理頁 例題1 極式', (Abs(1 - sqrt(3) * I), arg(1 - sqrt(3) * I)), (2, -pi / 3))
check('定理頁 例題1 驗算 (1−√3i)³', expand((1 - sqrt(3) * I)**3), -8)
th = symbols('theta', real=True)
check('定理頁 例題2', (simplify(re(expand((cos(th) + I * sin(th))**2)) - cos(2 * th)), simplify(im(expand((cos(th) + I * sin(th))**2)) - sin(2 * th))), (0, 0))
# De Moivre for many n (numeric), the induction's claim.
ok = all(abs(complex(((1.3 * (cos(0.7) + I * sin(0.7)))**n - 1.3**n * (cos(0.7 * n) + I * sin(0.7 * n))).evalf())) < 1e-9 for n in range(1, 13))
check('定理頁 n = 1..12（數值）', ok, True)

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
