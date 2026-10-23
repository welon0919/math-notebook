"""Recompute every example and practice answer in calculus lessons 17–20 and the series-tests page.

Run: scripts/verify/.venv/bin/python -u scripts/verify/calculus_batch5.py
"""

from sympy import (E, Abs, Rational, Sum, cos, diff, exp, factorial, integrate, limit, log, oo, pi, series, simplify,
                   sin, solve, sqrt, symbols, harmonic, nsimplify, S)

x = symbols('x', real=True)
xp = symbols('xp', positive=True)
n, k = symbols('n k', positive=True, integer=True)
r, h = symbols('r h', positive=True)
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
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {float(got):.7f}")
    if not ok:
        failures += 1
        print(f'     expected ≈ {expected}')


def antiderivative(label, F, f, var=x):
    check(label, simplify(diff(F, var) - f), 0)


def ratio(a, var=n):
    return limit(simplify(a.subs(var, var + 1) / a), var, oo)


print('== integration-by-parts')
antiderivative('例題1', x * sin(x) + cos(x), x * cos(x))
antiderivative('例題2(a)', exp(x) * (x**2 - 2 * x + 2), x**2 * exp(x))
antiderivative('例題2(b)', xp**2 / 2 * log(xp) - xp**2 / 4, xp * log(xp), xp)
antiderivative('例題3', exp(x) * (sin(x) - cos(x)) / 2, exp(x) * sin(x))
check('錯誤2 錯誤答案的導數', simplify(diff(x**2 * exp(x) - 2 * x * exp(x) - 2 * exp(x), x) - (x**2 * exp(x) - 4 * exp(x))), 0)
antiderivative('錯誤1 正確', x * exp(x) - exp(x), x * exp(x))
antiderivative('練習1', x / 2 * exp(2 * x) - exp(2 * x) / 4, x * exp(2 * x))
antiderivative('練習2', xp * log(xp) - xp, log(xp), xp)
check('練習3', integrate(x * sin(x), (x, 0, pi)), pi)
antiderivative('練習4', exp(x) * (sin(x) + cos(x)) / 2, exp(x) * cos(x))
approx('圖 x sin x 最大值', max(float((x * sin(x)).subs(x, 2 + i / 1000)) for i in range(-100, 100)), 1.82, 0.01)

print('== area-volume')
check('例題1 交點', solve(x**2 - x - 2, x), [-1, 2])
check('例題1', integrate(x + 2 - x**2, (x, -1, 2)), Rational(9, 2))
check('例題1 兩端', (2 + 4 - Rational(8, 3), Rational(1, 2) - 2 + Rational(1, 3)), (Rational(10, 3), -Rational(7, 6)))
check('圓盤 √x', integrate(pi * x, (x, 0, 4)), 8 * pi)
approx('圓盤 8π', 8 * pi, 25.13, 0.005)
check('例題2 圓錐', integrate(pi * (r / h * x)**2, (x, 0, h)), pi * r**2 * h / 3)
check('例題3', integrate(4 * (4 - x**2), (x, -2, 2)), Rational(128, 3))
approx('例題3 ≈', Rational(128, 3), 42.7, 0.05)
check('錯誤1', integrate(x**2 - x - 2, (x, -1, 2)), -Rational(9, 2))
check('錯誤2 錯誤值', integrate(x - x**3, (x, -1, 1)), 0)
check('錯誤2 分段', (integrate(x**3 - x, (x, -1, 0)), integrate(x - x**3, (x, 0, 1))), (Rational(1, 4), Rational(1, 4)))
check('錯誤3 錯誤值', integrate(pi * sqrt(x), (x, 0, 4)), 16 * pi / 3)
check('練習1', integrate(sqrt(x) - x**2, (x, 0, 1)), Rational(1, 3))
check('練習2', simplify(integrate(Abs(cos(x) - sin(x)), (x, 0, pi / 2)) - 2 * (sqrt(2) - 1)), 0)
approx('練習2 ≈', 2 * (sqrt(2) - 1), 0.828, 5e-4)
check('練習3', integrate(pi * x**4, (x, 0, 1)), pi / 5)
check('練習4 球', integrate(pi * (r**2 - x**2), (x, -r, r)), Rational(4, 3) * pi * r**3)

print('== infinite-series')
check('例題1 拆項', simplify(1 / (k * (k + 1)) - (1 / k - 1 / (k + 1))), 0)
check('例題1 部分和', simplify(Sum(1 / (k * (k + 1)), (k, 1, n)).doit() - (1 - 1 / (n + 1))), 0)
check('例題1 和', Sum(1 / (k * (k + 1)), (k, 1, oo)).doit(), 1)
check('例題1 S1..S3', [sum(Rational(1, j * (j + 1)) for j in range(1, m + 1)) for m in (1, 2, 3)], [Rational(1, 2), Rational(2, 3), Rational(3, 4)])
check('例題2(a)', limit(n / (n + 1), n, oo), 1)
check('調和 分組 1/3+1/4 > 1/2', Rational(1, 3) + Rational(1, 4) > Rational(1, 2), True)
approx('調和 S_30', harmonic(30), 3.99, 0.005)
H, m = 0.0, 0
while H <= 10:
    m += 1
    H += 1 / m
check('調和 超過 10 的項數（一萬多）', 10000 < m < 20000, True)
print(f'     （第 {m} 項）')
check('1/n² 的和', Sum(1 / n**2, (n, 1, oo)).doit(), pi**2 / 6)
check('例題3(a)', ratio(n / 2**n), Rational(1, 2))
check('例題3(b)', ratio(2**n / factorial(n)), 0)
check('例題3(c)', ratio(factorial(n) / 10**n), oo)
check('例題3(c) 前幾項', [factorial(j) / 10**j for j in (1, 2, 3)], [Rational(1, 10), Rational(2, 100), Rational(6, 1000)])
check('錯誤2', Sum(Rational(1, 2)**n, (n, 1, oo)).doit(), 1)
check('錯誤3 L=1', (ratio(1 / n), ratio(1 / n**2)), (1, 1))
check('練習1', Sum(Rational(2, 3)**n, (n, 0, oo)).doit(), 3)
check('練習2', Sum(1 / (n * (n + 2)), (n, 1, oo)).doit(), Rational(3, 4))
check('練習3', limit((n**2 + 1) / (2 * n**2), n, oo), Rational(1, 2))
check('練習4', ratio(n**2 / 3**n), Rational(1, 3))
check('練習5', ratio(3**n / n**2), 3)

print('== series-tests')
check('極限比較', limit(((3 * n + 1) / (n**3 - 2)) / (1 / n**2), n, oo), 3)
check('根值', limit(n / (2 * n + 1), n, oo), Rational(1, 2))
check('例題1 極限比較', limit((1 / (n**2 + 1)) / (1 / n**2), n, oo), 1)
S4 = 1 - Rational(1, 2) + Rational(1, 3) - Rational(1, 4)
check('例題2 S4', S4, Rational(7, 12))
check('例題2 和', Sum((-1)**(n + 1) / n, (n, 1, oo)).doit(), log(2))
approx('例題2 誤差', log(2) - S4, 0.110, 5e-4)
check('例題2 誤差 ≤ 1/5', abs(float(log(2) - S4)) <= 0.2, True)
t = symbols('t', positive=True)
check('例題3 積分', simplify(integrate(1 / (xp * log(xp)), (xp, 2, t)) - (log(log(t)) - log(log(2)))), 0)
check('p=2 瑕積分', integrate(1 / xp**2, (xp, 1, oo)), 1)
check('p=1 瑕積分', integrate(1 / xp, (xp, 1, oo)), oo)
alt = [sum((-1)**(j + 1) / j for j in range(1, N + 1)) for N in range(1, 21)]
check('圖 誤差 ≤ 下一項（N=1..19）', all(abs(float(log(2)) - alt[N - 1]) <= 1 / (N + 1) for N in range(1, 20)), True)

print('== taylor-series')
check('e^x 係數', [diff(exp(x), x, j).subs(x, 0) / factorial(j) for j in range(5)], [1, 1, Rational(1, 2), Rational(1, 6), Rational(1, 24)])
check('cos 導數在 0', [diff(cos(x), x, j).subs(x, 0) for j in range(5)], [1, 0, -1, 0, 1])
check('sin 級數', series(sin(x), x, 0, 8).removeO(), x - x**3 / 6 + x**5 / 120 - x**7 / 5040)
check('cos 級數', series(cos(x), x, 0, 7).removeO(), 1 - x**2 / 2 + x**4 / 24 - x**6 / 720)
check('1/(1−x) 導數', [diff(1 / (1 - x), x, j).subs(x, 0) for j in range(5)], [1, 1, 2, 6, 24])
check('sin 逐項微分', diff(x - x**3 / 6 + x**5 / 120, x), 1 - x**2 / 2 + x**4 / 24)
check('例題2(a)', limit(Abs(x) / (n + 1), n, oo), 0)
check('例題2(b)', limit((n + 1) / n * Abs(x), n, oo), Abs(x))
P3 = sum(Rational(1, 2)**j / factorial(j) for j in range(4))
approx('例題3(a)', P3, 1.645833, 5e-7)
approx('例題3(a) 真值', exp(Rational(1, 2)), 1.648721, 5e-7)
approx('例題3(a) 誤差', exp(Rational(1, 2)) - P3, 0.0029, 5e-5)
s2 = Rational(1, 2) - Rational(1, 2)**3 / 6
approx('例題3(b)', s2, 0.479167, 5e-7)
approx('例題3(b) 下一項', Rational(1, 2)**5 / 120, 0.00026, 5e-6)
approx('例題3(b) 真值', sin(Rational(1, 2)), 0.479426, 5e-7)
approx('例題3(b) 誤差', sin(Rational(1, 2)) - s2, 0.000259, 5e-7)
check('例題3(b) 誤差 ≤ 下一項', float(sin(Rational(1, 2)) - s2) <= float(Rational(1, 2)**5 / 120), True)
check('錯誤1 x=1', 1 + 1 + 1 + 1, 4)
approx('錯誤1 正確 x=1', 1 + 1 + Rational(1, 2) + Rational(1, 6), 2.667, 5e-4)
approx('錯誤3 正確', 0.5236 - 0.5236**3 / 6, 0.4997, 5e-5)
check('錯誤3 錯誤值', 30 - Rational(30**3, 6), -4470)
check('練習1 e^−x', series(exp(-x), x, 0, 5).removeO(), 1 - x + x**2 / 2 - x**3 / 6 + x**4 / 24)
check('練習1 e^2x', series(exp(2 * x), x, 0, 4).removeO(), 1 + 2 * x + 2 * x**2 + Rational(4, 3) * x**3)
approx('練習2', Rational(1, 10) - Rational(1, 6000), 0.0998333, 5e-8)
approx('練習2 下一項', Rational(1, 10)**5 / 120, 8.3e-8, 5e-10)
approx('練習2 真值', sin(Rational(1, 10)), 0.0998334, 5e-8)
check('練習3 和', Sum((x / 3)**k, (k, 0, oo)).doit().args[0][0], 3 / (3 - x))
check('練習4 係數', [diff(log(1 + x), x, j).subs(x, 0) / factorial(j) for j in range(1, 5)], [1, -Rational(1, 2), Rational(1, 3), -Rational(1, 4)])
check('練習4 一般式', [diff(log(1 + x), x, j).subs(x, 0) for j in range(1, 6)], [(-1)**(j + 1) * factorial(j - 1) for j in range(1, 6)])
est = Rational(1, 10) - Rational(1, 200) + Rational(1, 3000)
approx('練習4 估計', est, 0.095333, 5e-7)
approx('練習4 真值', log(Rational(11, 10)), 0.095310, 5e-7)
check('練習4 誤差 ≤ 0.000025', abs(float(log(Rational(11, 10)) - est)) <= 0.000025, True)
check('練習5 x=1', Sum((-1)**(k + 1) / k, (k, 1, oo)).doit(), log(2))

print('== 修改：表格法、墊圈法、弧長、直接比較、端點')
antiderivative('表格法 x²eˣ', x**2 * exp(x) - 2 * x * exp(x) + 2 * exp(x), x**2 * exp(x))
antiderivative('練習5 表格法', -x**3 * cos(x) + 3 * x**2 * sin(x) + 6 * x * cos(x) - 6 * sin(x), x**3 * sin(x))
check('墊圈 例題2', integrate(pi * (x**2 - x**4), (x, 0, 1)), 2 * pi / 15)
check('墊圈 驗算', integrate(pi * x**2, (x, 0, 1)) - integrate(pi * x**4, (x, 0, 1)), 2 * pi / 15)
check('墊圈 錯誤3', integrate(pi * (x - x**2)**2, (x, 0, 1)), pi / 30)
check('墊圈 錯誤3 圓環', (pi * 4 - pi * 1, pi * (2 - 1)**2), (3 * pi, pi))
check('弧長 直線', integrate(sqrt(1 + 2**2), (x, 0, 1)), sqrt(5))
f = Rational(2, 3) * xp**Rational(3, 2)
check('弧長 例題3 1+f′²', simplify(1 + diff(f, xp)**2), 1 + xp)
check('弧長 例題3', integrate(sqrt(1 + x), (x, 0, 3)), Rational(14, 3))
check('弧長 例題3 弦長', sqrt(3**2 + (2 * sqrt(3))**2), sqrt(21))
approx('弧長 √21', sqrt(21), 4.58, 5e-3)
check('弧長 練習5 1+f′²', simplify(1 + diff(xp**Rational(3, 2), xp)**2), 1 + Rational(9, 4) * xp)
L5 = integrate(sqrt(1 + Rational(9, 4) * x), (x, 0, 4))
check('弧長 練習5', simplify(L5 - Rational(8, 27) * (10 * sqrt(10) - 1)), 0)
approx('弧長 練習5 ≈', L5, 9.07, 5e-3)
approx('弧長 練習5 弦長', sqrt(80), 8.94, 5e-3)
check('直接比較 1/n² ≤ 1/(n(n−1))', simplify(n * (n - 1) - n**2), -n)
check('直接比較 Σ1/(n(n−1))', Sum(1 / (n * (n - 1)), (n, 2, oo)).doit(), 1)
check('例題2(b) 收斂', all(Rational(1, 2**j + j) < Rational(1, 2**j) for j in range(1, 50)), True)
check('例題2(c) √n ≤ n', all(sqrt(j) <= j for j in range(1, 50)), True)
check('練習6(b) ln 3 > 1', log(3) > 1, True)
check('端點 Σxᵏ/k 比值', limit(n / (n + 1) * Abs(x), n, oo), Abs(x))
check('端點 x=−1 收斂', Sum((-1)**k / k, (k, 1, oo)).doit(), -log(2))
check('端點 x=1 發散', Sum(1 / k, (k, 1, oo)).doit(), oo)

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
