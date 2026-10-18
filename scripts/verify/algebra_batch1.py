"""Recompute every example and practice answer in algebra lessons 1–4.

Run: scripts/verify/.venv/bin/python scripts/verify/algebra_batch1.py
"""

from sympy import Abs, Eq, Interval, Rational, S, div, expand, factor, nsimplify, simplify, solve, solveset, symbols

x, y, k, a, d, t = symbols('x y k a d t', real=True)
failures = 0


def check(label, got, expected):
    global failures
    # Sets, tuples and dicts compare directly; expressions may need simplifying first.
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f"     expected {expected}")


def solve_real(expr):
    return solveset(expr, x, domain=S.Reals)


print('== real-numbers-absolute-value')
check('概念 0.(36)', nsimplify('0.' + '36' * 20, rational=True).limit_denominator(1000), Rational(4, 11))
check('概念 |2x-3|<5', solve_real(Abs(2 * x - 3) < 5), Interval.open(-1, 4))
check('例題1 奇數平方是奇數', expand((2 * k + 1)**2 - 2 * (2 * k**2 + 2 * k)), 1)
check('例題1 p=2m 代入 p^2=2q^2 得 q^2=2m^2', solve(Eq((2 * a)**2, 2 * y), y), [2 * a**2])
check('例題2 |2x-1|=7', solve_real(Eq(Abs(2 * x - 1), 7)), {-3, 4})
check('例題3 |d-20|<=0.05', solveset(Abs(d - 20) <= Rational(5, 100), d, S.Reals), Interval(Rational(1995, 100), Rational(2005, 100)))
check('例題3 合格的螺絲', [v for v in ['19.93', '20.04', '20.06'] if abs(Rational(v) - 20) <= Rational(5, 100)], ['20.04'])
check('錯誤1 |3+(-5)|', Abs(3 - 5), 2)
check('錯誤3 |x-2|>3', solve_real(Abs(x - 2) > 3), Interval.open(-S.Infinity, -1) | Interval.open(5, S.Infinity))
check('練習1 0.(27)', Rational(27, 99), Rational(3, 11))
check('練習2 sqrt(49) 有理', S(49) ** Rational(1, 2), 7)
check('練習2 sqrt(12) 無理', (S(12) ** Rational(1, 2)).is_rational, False)
check('練習3 |3x+1|=8', solve_real(Eq(Abs(3 * x + 1), 8)), {-3, Rational(7, 3)})
check('練習4 |x-4|<2.5', solve_real(Abs(x - 4) < Rational(5, 2)), Interval.open(Rational(3, 2), Rational(13, 2)))
check('練習5 |2x+5|>=3', solve_real(Abs(2 * x + 5) >= 3), Interval(-S.Infinity, -4) | Interval(-1, S.Infinity))

print('== linear-equations-inequalities')
check('概念 3(x-2)+4=x+6', solve_real(Eq(3 * (x - 2) + 4, x + 6)), {4})
check('概念 2(x+1)=2x+2 無限多解', solve_real(Eq(2 * (x + 1), 2 * x + 2)), S.Reals)
check('概念 2(x+1)=2x+5 無解', solve_real(Eq(2 * (x + 1), 2 * x + 5)), S.EmptySet)
check('概念 5-2x>11', solve_real(5 - 2 * x > 11), Interval.open(-S.Infinity, -3))
check('概念 -1<=2x+3<7', solve_real(2 * x + 3 >= -1) & solve_real(2 * x + 3 < 7), Interval.Ropen(-2, 2))
check('例題1', solve_real(Eq((x + 1) / 2 - (x - 2) / 3, 2)), {5})
check('例題2', solve_real(3 * (x - 1) - 5 * x >= 7), Interval(-S.Infinity, -5))
check('例題3 B 比較便宜', solveset(499 + Rational(1, 2) * t < 199 + Rational(3, 2) * t, t, S.Reals), Interval.open(300, S.Infinity))
check('例題3 t=300 費用', (199 + Rational(3, 2) * 300, 499 + Rational(1, 2) * 300), (649, 649))
check('例題3 t=400 費用', (199 + Rational(3, 2) * 400, 499 + Rational(1, 2) * 400), (799, 699))
check('練習1', solve_real(Eq(5 * x - 2 * (x + 4), 7)), {5})
check('練習2', solve_real(Eq((2 * x - 1) / 3 + 1, (x + 5) / 2)), {11})
check('練習3', solve_real(7 - 4 * x < 19), Interval.open(-3, S.Infinity))
check('練習4', solve_real(1 - 2 * x > -3) & solve_real(1 - 2 * x <= 5), Interval.Ropen(-2, 2))
check('練習5', solve_real(Abs(4 - x) <= 3), Interval(1, 7))

print('== systems-of-two-equations')
check('概念 代入', solve([Eq(y, 2 * x - 1), Eq(3 * x + 2 * y, 12)], [x, y]), {x: 2, y: 3})
check('概念 加減', solve([Eq(2 * x + 3 * y, 12), Eq(3 * x - 2 * y, 5)], [x, y]), {x: 3, y: 2})
check('概念 無解', solve([Eq(x + 2 * y, 3), Eq(2 * x + 4 * y, 7)], [x, y]), [])
check('例題1', solve([Eq(x + y, 7), Eq(2 * x - y, 2)], [x, y]), {x: 3, y: 4})
no_solution_k = [kv for kv in range(-20, 21) if solve([Eq(kv * x + 2 * y, 3), Eq(3 * x + y, 1)], [x, y]) == []]
check('例題2 無解的 k', no_solution_k, [6])
check('例題3', solve([Eq(x + y, 50), Eq(280 * x + 200 * y, 11600)], [x, y]), {x: 20, y: 30})
check('錯誤2', solve([Eq(3 * x - 2 * y, 4), Eq(x - 2 * y, 0)], [x, y]), {x: 2, y: 1})
check('練習1', solve([Eq(3 * x + y, 11), Eq(x - y, 1)], [x, y]), {x: 3, y: 2})
check('練習2', solve([Eq(2 * x + 5 * y, 1), Eq(3 * x - 2 * y, 11)], [x, y]), {x: 3, y: -1})
check('練習3a 無限多解', solve([Eq(2 * x - y, 3), Eq(-4 * x + 2 * y, -6)], [x, y]), {x: y / 2 + Rational(3, 2)})
check('練習3b 無解', solve([Eq(2 * x - y, 3), Eq(4 * x - 2 * y, 5)], [x, y]), [])
check('練習3c', solve([Eq(2 * x - y, 3), Eq(x + y, 3)], [x, y]), {x: 2, y: 1})
check('練習4', solve([Eq((x + 1) / 2 + y / 3, 3), Eq(2 * x - y, 3)], [x, y]), {x: 3, y: 3})
check('練習5', solve([Eq(x + y, 40), Eq(4 * x + 2 * y, 110)], [x, y]), {x: 15, y: 25})

print('== polynomial-division')
check('概念 乘法', expand((2 * x + 3) * (x**2 - x + 4)), 2 * x**3 + x**2 + 5 * x + 12)
check('概念 綜合除法', div(2 * x**3 - 5 * x**2 + 3 * x - 7, x - 3, x), (2 * x**2 + x + 6, 11))
check('例題1', div(x**3 - 2 * x**2 + 4, x**2 + x - 1, x), (x - 3, 4 * x + 1))
check('例題2', div(x**3 - 4, x - 2, x), (x**2 + 2 * x + 4, 4))
f3 = x**3 + k * x**2 - 4 * x + 12
k3 = solve(f3.subs(x, -2), k)
check('例題3 k', k3, [-3])
f3 = f3.subs(k, -3)
check('例題3 f(1)', f3.subs(x, 1), 6)
check('例題3 分解', factor(f3), (x - 3) * (x - 2) * (x + 2))
check('錯誤1 錯的結果', div(x - 4, x - 2, x), (1, -2))
check('錯誤2 用 3 的錯誤餘式', div(x**2 + 5 * x + 1, x - 3, x), (x + 8, 25))
check('錯誤2 正確', div(x**2 + 5 * x + 1, x + 3, x), (x + 2, -5))
check('錯誤3', div(4 * x**2 + 2 * x - 3, 2 * x - 1, x), (2 * x + 2, -1))
check('練習1', expand((3 * x**2 - 2 * x + 1) * (x - 4)), 3 * x**3 - 14 * x**2 + 9 * x - 4)
check('練習2', div(x**4 - 3 * x**2 + x - 5, x + 2, x), (x**3 - 2 * x**2 + x - 1, -3))
check('練習3', div(2 * x**3 + 3 * x**2 - x + 5, x**2 + 1, x), (2 * x + 3, -3 * x + 2))
f4 = x**3 - 2 * x**2 + a * x + 6
a4 = solve(Eq(f4.subs(x, 1), 2), a)
check('練習4 a', a4, [-3])
check('練習4 f(2)', f4.subs(a, -3).subs(x, 2), 0)
f5 = 2 * x**3 - x**2 + k * x + 3
check('練習5 k', solve(Eq(f5.subs(x, Rational(-1, 2)), 4), k), [-3])

print('== theorem: triangle-inequality')
xs = [Rational(n, 4) for n in range(-12, 13)]
check('定理 |a+b|<=|a|+|b|，等號 ⇔ ab>=0', all((abs(p + q) <= abs(p) + abs(q)) and ((abs(p + q) == abs(p) + abs(q)) == (p * q >= 0)) for p in xs for q in xs), True)
check('例題1 |x|<=2,|y|<=3 時 |x+y| 最大值', max(abs(p + q) for p in xs if abs(p) <= 2 for q in xs if abs(q) <= 3), 5)
grid = [Rational(n, 10) for n in range(-50, 101)]
values = {v: abs(v - 1) + abs(v - 5) for v in grid}
check('例題2 最小值', min(values.values()), 4)
check('例題2 最小值發生在 [1,5]', [v for v in grid if values[v] == 4] == [v for v in grid if 1 <= v <= 5], True)

print('== theorem: division-algorithm')
check('例題1', div(x**3 + 2 * x**2 - x + 3, x**2 + 1, x), (x + 2, -2 * x + 1))
ab = solve([Eq(a + k, 3), Eq(-a + k, -1)], [a, k])
check('例題2 餘式 ax+b', ab[a] * x + ab[k], 2 * x + 1)
sample = x**3 + x + 1  # one f with f(1)=3 and f(-1)=-1; its remainder must be 2x+1
check('例題2 驗證：x^3+x+1 的 f(1), f(-1), 餘式', (sample.subs(x, 1), sample.subs(x, -1), div(sample, x**2 - 1, x)[1]), (3, -1, 2 * x + 1))

print('== page: /algebra/long-division/ presets')
check('整除', div(x**2 + 5 * x + 6, x + 2, x), (x + 3, 0))
check('缺項、有餘式', div(x**3 - 2 * x**2 + 4, x**2 + x - 1, x), (x - 3, 4 * x + 1))
check('首項係數不是 1', div(6 * x**3 + x**2 - 4 * x + 5, 2 * x - 1, x), (3 * x**2 + 2 * x - 1, 4))
check('兩邊都缺項', div(x**4 - 1, x**2 + 1, x), (x**2 - 1, 0))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
