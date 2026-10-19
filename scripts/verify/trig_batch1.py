"""Recompute every example and practice answer in trig lessons 1–4.

Run: scripts/verify/.venv/bin/python scripts/verify/trig_batch1.py
"""

from sympy import Rational, S, atan2, cos, csc, deg, expand, pi, rad, sec, simplify, sin, sqrt, symbols, tan

x, t = symbols('x t', real=True)
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
    """Degrees to radians."""
    return v * pi / 180


def six(px, py):
    px, py = S(px), S(py)
    r = sqrt(px**2 + py**2)
    return [simplify(e) for e in (py / r, px / r, py / px, r / py, r / px, px / py)]


def coterminal(v):
    return v % 360


def reference(v):
    v = v % 360
    return v if v <= 90 else 180 - v if v <= 180 else v - 180 if v <= 270 else 360 - v


print('== right-triangle-trig')
check('概念 特殊角表 sin', [sin(d(a)) for a in (30, 45, 60)], [Rational(1, 2), sqrt(2) / 2, sqrt(3) / 2])
check('概念 特殊角表 cos', [cos(d(a)) for a in (30, 45, 60)], [sqrt(3) / 2, sqrt(2) / 2, Rational(1, 2)])
check('概念 特殊角表 tan', [tan(d(a)) for a in (30, 45, 60)], [sqrt(3) / 3, 1, sqrt(3)])
check('概念 正三角形的高', sqrt(2**2 - 1), sqrt(3))
check('例題1 a', 10 * sin(d(30)), 5)
check('例題1 b', 10 * cos(d(30)), 5 * sqrt(3))
check('例題1 驗算', 5**2 + (5 * sqrt(3))**2, 100)
check('例題2 鄰邊', sqrt(5**2 - 3**2), 4)
check('例題2 sin²+cos²', Rational(3, 5)**2 + Rational(4, 5)**2, 1)
check('例題3 高', 6 * sin(d(60)), 3 * sqrt(3))
check('例題3 離牆', 6 * cos(d(60)), 3)
check('例題3 新高度', 6 * sin(d(45)), 3 * sqrt(2))
approx('例題3 高度 5.20', 3 * sqrt(3), 5.20)
approx('例題3 新高度 4.24', 3 * sqrt(2), 4.24)
approx('例題3 下降 0.95（題目給的近似值）', 3 * (1.732 - 1.414), 0.954, 1e-9)
approx('例題3 下降 0.95（真值）', 3 * sqrt(3) - 3 * sqrt(2), 0.95)
check('錯誤1 sin B', Rational(4, 5), Rational(4, 5))
check('錯誤2 sin60/sin30', sin(d(60)) / sin(d(30)), sqrt(3))
check('錯誤2 sin60 ≠ 2 sin30', simplify(sin(d(60)) - 2 * sin(d(30))) != 0, True)
check('錯誤3 錯誤值', 6 * cos(d(30)), 3 * sqrt(3))
check('錯誤3 正確值', 6 / cos(d(30)), 4 * sqrt(3))
approx('錯誤3 4√3 ≈ 6.93', 4 * sqrt(3), 6.93)
check('練習1 斜邊', sqrt(5**2 + 12**2), 13)
check('練習2', sin(d(60)) * cos(d(30)) + cos(d(60)) * sin(d(30)), 1)
check('練習3 c', 7 / sin(d(45)), 7 * sqrt(2))
a4 = atan2(2, 1)
check('練習4', (sin(a4), cos(a4)), (2 * sqrt(5) / 5, sqrt(5) / 5))
check('練習5 高', 8 * sin(d(60)), 4 * sqrt(3))
check('練習5 面積', Rational(1, 2) * 8 * 4 * sqrt(3), 16 * sqrt(3))

print('== general-angles')
check('概念 同界角', (coterminal(750), coterminal(-120)), (30, 240))
check('概念 cos240', cos(d(240)), Rational(-1, 2))
check('概念 換點不變', six(-6, 8), six(-3, 4))
check('例題1', (coterminal(1000), coterminal(-480)), (280, 240))
check('例題2', six(-3, 4), [Rational(4, 5), Rational(-3, 5), Rational(-4, 3), Rational(5, 4), Rational(-5, 3), Rational(-3, 4)])
check('例題3 各項', (sin(d(780)), cos(d(-210)), sec(d(1200))), (sqrt(3) / 2, -sqrt(3) / 2, -2))
check('例題3 和', sin(d(780)) + cos(d(-210)) + sec(d(1200)), -2)
check('例題3 1200 的同界角', coterminal(1200), 120)
check('錯誤1 參考角', reference(240), 60)
check('錯誤2', cos(d(120)), Rational(-1, 2))
check('錯誤3', sec(d(30)), 2 * sqrt(3) / 3)
check('參考角公式（各象限）', [reference(v) for v in (40, 130, 220, 310)], [40, 50, 40, 50])
check('參考角性質 |trig θ| = trig α', all(abs(abs(float(f(d(v)))) - float(f(d(reference(v))))) < 1e-12 for f in (sin, cos, tan) for v in (130, 220, 310, 150, 225, 300)), True)
check('練習1', (coterminal(845), coterminal(-1000)), (125, 80))
check('練習2', six(5, -12), [Rational(-12, 13), Rational(5, 13), Rational(-12, 5), Rational(-13, 12), Rational(13, 5), Rational(-5, 12)])
check('練習3', (sin(d(300)), cos(d(135)), tan(d(210)), csc(d(270))), (-sqrt(3) / 2, -sqrt(2) / 2, sqrt(3) / 3, -1))
th4 = atan2(5, -12)
check('練習4 θ 在第二象限', (sin(th4) > 0, cos(th4) < 0, tan(th4)), (True, True, Rational(-5, 12)))
check('練習4', (cos(th4), csc(th4)), (Rational(-12, 13), Rational(13, 5)))
check('練習5', six(-1, -2)[:3], [-2 * sqrt(5) / 5, -sqrt(5) / 5, 2])

print('== unit-circle-radians')
check('概念 60°', rad(60), pi / 3)
approx('概念 1 弧度 ≈ 57.3°', deg(1), 57.3, 0.01)
check('概念 換算表', [rad(v) for v in (0, 30, 45, 60, 90, 180, 270, 360)], [0, pi / 6, pi / 4, pi / 3, pi / 2, pi, 3 * pi / 2, 2 * pi])
r_, th = symbols('r theta', positive=True)
check('概念 扇形面積', th / (2 * pi) * pi * r_**2, r_**2 * th / 2)
check('概念 週期', simplify(sin(x + 2 * pi) - sin(x)), 0)
check('例題1-1', rad(150), 5 * pi / 6)
check('例題1-2', deg(7 * pi / 4), 315)
approx('例題1-3', 360 / 3.14, 114.65)
check('例題1-3 四捨五入', round(360 / 3.14), 115)
check('例題2', (sin(5 * pi / 6), cos(5 * pi / 6), cos(13 * pi / 6)), (Rational(1, 2), -sqrt(3) / 2, sqrt(3) / 2))
check('例題3 θ', Rational(20, 60) * 2 * pi, 2 * pi / 3)
check('例題3 s', 12 * 2 * pi / 3, 8 * pi)
check('例題3 A', Rational(1, 2) * 144 * 2 * pi / 3, 48 * pi)
check('例題3 驗算', (24 * pi / 3, 144 * pi / 3), (8 * pi, 48 * pi))
check('錯誤2 θ=2π', Rational(1, 2) * r_**2 * 2 * pi, pi * r_**2)
check('錯誤3', (cos(pi / 6), sin(pi / 6)), (sqrt(3) / 2, Rational(1, 2)))
check('練習1', (rad(210), rad(-45), deg(5 * pi / 3), deg(3 * pi / 4)), (7 * pi / 6, -pi / 4, 300, 135))
check('練習2', (6 * pi / 4, Rational(1, 2) * 36 * pi / 4), (3 * pi / 2, 9 * pi / 2))
check('練習3', (Rational(10, 4), Rational(1, 2) * 4 * 10), (Rational(5, 2), 20))
check('練習4', (sin(7 * pi / 6), cos(-pi / 4), tan(5 * pi / 3)), (Rational(-1, 2), sqrt(2) / 2, -sqrt(3)))
th5 = atan2(Rational(4, 5), Rational(-3, 5))
check('練習5 在單位圓上', Rational(9, 25) + Rational(16, 25), 1)
check('練習5-1', (cos(th5), sin(th5), tan(th5)), (Rational(-3, 5), Rational(4, 5), Rational(-4, 3)))
check('練習5-2 θ+π', (simplify(cos(th5 + pi)), simplify(sin(th5 + pi))), (Rational(3, 5), Rational(-4, 5)))
check('練習5-2 −θ', (cos(-th5), sin(-th5)), (Rational(-3, 5), Rational(-4, 5)))

print('== sine-cosine-graphs')
check('概念 sin 值表', [sin(v * pi / 6) for v in (0, 1, 3, 5, 6, 7, 9, 11, 12)], [0, Rational(1, 2), 1, Rational(1, 2), 0, Rational(-1, 2), -1, Rational(-1, 2), 0])
check('概念 奇偶', (sin(-x) + sin(x), cos(-x) - cos(x)), (0, 0))
check('概念 sin(π−x)', sin(pi - x), sin(x))
check('概念 旋轉 90°', (cos(x + pi / 2), sin(x + pi / 2)), (-sin(x), cos(x)))
check('概念 零點', ([sin(k * pi) for k in range(-3, 4)], [cos(pi / 2 + k * pi) for k in range(-3, 4)]), ([0] * 7, [0] * 7))
check('例題1 換角', (sin(pi - 2), sin(pi - 3)), (sin(2), sin(3)))
approx('例題1 sin3', sin(3), 0.141)
approx('例題1 sin1', sin(1), 0.841)
approx('例題1 sin2', sin(2), 0.909)
check('例題1 大小', sin(3) < sin(1) < sin(2), True)
y2 = 3 - 2 * sin(x)
check('例題2 最大最小', (y2.subs(x, 3 * pi / 2), y2.subs(x, pi / 2)), (5, 1))
check('例題3', sin(x - pi / 2), -cos(x))
check('例題3 驗算', ((sin(-pi / 2), -cos(0)), (sin(pi / 2), -cos(pi))), ((-1, -1), (1, 1)))
check('錯誤1', (sin(pi / 2), sin(3 * pi / 2), sin(x + pi)), (1, -1, -sin(x)))
check('錯誤3', (cos(0), -cos(0)), (1, -1))
check('練習1', [v for v in (-3 * pi / 2, -pi / 2, pi / 2, 3 * pi / 2) if cos(v) == 0], [-3 * pi / 2, -pi / 2, pi / 2, 3 * pi / 2])
check('練習1 [−2π,2π] 內沒有別的', [k for k in range(-5, 5) if -2 * pi <= pi / 2 + k * pi <= 2 * pi], [-2, -1, 0, 1])
y_2 = 1 + 4 * cos(x)
check('練習2', (y_2.subs(x, 0), y_2.subs(x, pi)), (5, -3))
check('練習3', ((-x) * sin(-x) - x * sin(x), sin(-x) * cos(-x) + sin(x) * cos(x)), (0, 0))
h = sin(x) + cos(x)
check('練習3 (c)', (h.subs(x, pi / 4), h.subs(x, -pi / 4)), (sqrt(2), 0))
approx('練習4 2 弧度', deg(2), 114.59, 0.01)
approx('練習4 3 弧度', deg(3), 171.89, 0.01)
check('練習4 大小', (cos(1) > 0, cos(2) < 0, cos(3) < 0, cos(1) > cos(2) > cos(3)), (True, True, True, True))
y5 = t**2 - 2 * t
check('練習5 配方', expand((t - 1)**2 - 1), y5)
check('練習5 端點', (y5.subs(t, -1), y5.subs(t, 1)), (3, -1))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
