"""Recompute every example and practice answer in algebra lessons 5–8.

Run: scripts/verify/.venv/bin/python scripts/verify/algebra_batch2.py
"""

from sympy import Interval, Rational, S, Union, div, expand, factor, maximum, minimum, solve, solveset, sqrt, symbols

x, t, k = symbols('x t k', real=True)
failures = 0


def check(label, got, expected):
    global failures
    # Sets, tuples and lists compare directly; expressions may need expanding first.
    ok = got == expected or (hasattr(got, 'free_symbols') and expand(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def roots(expr):
    return solveset(expr, x, S.Reals)


print('== factoring')
check('概念 提公因式', expand(3 * x**2 * (2 * x - 3)), 6 * x**3 - 9 * x**2)
check('概念 分組', factor(x**3 + 2 * x**2 - 3 * x - 6), (x + 2) * (x**2 - 3))
check('概念 (2x-3)^2', factor(4 * x**2 - 12 * x + 9), (2 * x - 3)**2)
check('概念 平方差', factor(9 * x**2 - 25), (3 * x - 5) * (3 * x + 5))
check('概念 立方差', factor(x**3 - 8), (x - 2) * (x**2 + 2 * x + 4))
check('概念 十字交乘', factor(6 * x**2 + x - 2), (2 * x - 1) * (3 * x + 2))
check('概念 有理根分解', factor(x**3 - 2 * x**2 - 5 * x + 6), (x - 3) * (x - 1) * (x + 2))
check('例題1a', factor(2 * x**3 - 8 * x), 2 * x * (x - 2) * (x + 2))
check('例題1b', factor(27 * x**3 + 1), (3 * x + 1) * (9 * x**2 - 3 * x + 1))
check('例題1b 9x^2-3x+1 不可再分解', factor(9 * x**2 - 3 * x + 1), 9 * x**2 - 3 * x + 1)
check('例題2', factor(6 * x**2 - 7 * x - 3), (2 * x - 3) * (3 * x + 1))
f3 = 2 * x**3 - 3 * x**2 - 11 * x + 6
check('例題3 f(1),f(-1),f(2),f(-2)', [f3.subs(x, v) for v in (1, -1, 2, -2)], [-6, 12, -12, 0])
check('例題3 綜合除法', div(f3, x + 2, x), (2 * x**2 - 7 * x + 3, 0))
check('例題3', factor(f3), (x - 3) * (x + 2) * (2 * x - 1))
check('錯誤1', factor(x**3 - x), x * (x - 1) * (x + 1))
check('錯誤3 錯誤展開', expand((6 * x - 1) * (x + 2)), 6 * x**2 + 11 * x - 2)
check('練習1', factor(x**2 - 10 * x + 25), (x - 5)**2)
check('練習2', factor(16 * x**2 - 49), (4 * x - 7) * (4 * x + 7))
check('練習3', factor(3 * x**2 + 10 * x - 8), (3 * x - 2) * (x + 4))
check('練習4', factor(x**3 + 3 * x**2 - 4 * x - 12), (x - 2) * (x + 2) * (x + 3))
check('練習5 綜合除法', div(x**3 - 7 * x + 6, x - 1, x), (x**2 + x - 6, 0))
check('練習5', factor(x**3 - 7 * x + 6), (x - 2) * (x - 1) * (x + 3))

print('== quadratic-equations')
check('概念 配方', roots(x**2 + 6 * x + 2), {-3 - sqrt(7), -3 + sqrt(7)})
a_, b_, c_ = symbols('a b c')
r1 = (-b_ + sqrt(b_**2 - 4 * a_ * c_)) / (2 * a_)
r2 = (-b_ - sqrt(b_**2 - 4 * a_ * c_)) / (2 * a_)
check('概念 兩根和', r1 + r2, -b_ / a_)
check('概念 兩根積', expand(r1 * r2), c_ / a_)
check('例題1', roots(x**2 - 5 * x + 6), {2, 3})
check('例題2a', roots(x**2 - 4 * x - 1), {2 - sqrt(5), 2 + sqrt(5)})
check('例題2b 重根的 k', set(solve(k**2 - 36, k)), {-6, 6})
check('例題2b 重根', (roots(x**2 + 6 * x + 9), roots(x**2 - 6 * x + 9)), ({-3}, {3}))
check('例題3', roots(x * (13 - x) - 40), {5, 8})
check('錯誤1', roots(x**2 - 3 * x), {0, 3})
check('錯誤2', roots((x - 2) * (x - 3) - 2), {1, 4})
check('錯誤2 x=5 代回', ((x - 2) * (x - 3)).subs(x, 5), 6)
check('錯誤3 4+sqrt5 代回', expand((x**2 - 4 * x - 1).subs(x, 4 + sqrt(5))), 4 + 4 * sqrt(5))
check('練習1', roots(x**2 + 2 * x - 15), {-5, 3})
check('練習2', roots(3 * x**2 - 5 * x - 2), {Rational(-1, 3), 2})
check('練習3', roots(x**2 + 8 * x + 11), {-4 - sqrt(5), -4 + sqrt(5)})
check('練習4 判別式', [b * b - 4 * a * c for a, b, c in [(2, -3, 5), (4, -12, 9), (1, 1, -3)]], [-31, 0, 13])
al, be = solve(x**2 - 3 * x - 5, x)
check('練習5 α²+β²', expand(al**2 + be**2), 19)
check('練習5 1/α+1/β', (1 / al + 1 / be).simplify(), Rational(-3, 5))

print('== quadratic-functions')
check('概念 2x²-8x+5 頂點式', expand(2 * (x - 2)**2 - 3), 2 * x**2 - 8 * x + 5)
check('例題1 頂點式', expand(-(x - 3)**2 + 4), -x**2 + 6 * x - 5)
check('例題1 x 軸交點', roots(-x**2 + 6 * x - 5), {1, 5})
f2 = 2 * x**2 + 4 * x - 1
check('例題2 頂點式', expand(2 * (x + 1)**2 - 3), f2)
check('例題2 最大最小', (maximum(f2, x, Interval(-3, 1)), minimum(f2, x, Interval(-3, 1))), (5, -3))
A = x * (40 - 2 * x)
check('例題3 頂點式', expand(-2 * (x - 10)**2 + 200), A)
check('例題3 最大面積', maximum(A, x, Interval.open(0, 20)), 200)
check('錯誤2 x=0 時的錯誤結果', (2 * (x - 2)**2 + 1).subs(x, 0), 9)
g = x**2 - 4 * x + 1
check('錯誤3 在 [3,5]', (minimum(g, x, Interval(3, 5)), maximum(g, x, Interval(3, 5))), (-2, 6))
check('練習1', expand((x + 3)**2 - 5), x**2 + 6 * x + 4)
check('練習2', (expand(-2 * (x - 2)**2 + 5), maximum(-2 * x**2 + 8 * x - 3, x, S.Reals)), (-2 * x**2 + 8 * x - 3, 5))
check('練習3 交點', roots(x**2 - 2 * x - 8), {-2, 4})
check('練習3 頂點 y', (x**2 - 2 * x - 8).subs(x, 1), -9)
h4 = -x**2 + 2 * x + 3
check('練習4', (maximum(h4, x, Interval(-2, 2)), minimum(h4, x, Interval(-2, 2))), (4, -5))
hb = -5 * t**2 + 20 * t + 1
check('練習5 頂點式', expand(-5 * (t - 2)**2 + 21), hb)
check('練習5 最高', maximum(hb, t, S.Reals), 21)

print('== polynomial-equations-inequalities')
check('概念 四次', roots(x**4 - 5 * x**2 + 4), {-2, -1, 1, 2})
check('概念 符號表', solveset((x + 2) * (x - 1) * (x - 3) > 0, x, S.Reals), Union(Interval.open(-2, 1), Interval.open(3, S.Infinity)))
check('概念 重根', solveset((x - 1)**2 * (x - 4) < 0, x, S.Reals), Union(Interval.open(-S.Infinity, 1), Interval.open(1, 4)))
f1 = x**3 - 4 * x**2 + x + 6
check('例題1 f(1), f(-1)', (f1.subs(x, 1), f1.subs(x, -1)), (4, 0))
check('例題1 綜合除法', div(f1, x + 1, x), (x**2 - 5 * x + 6, 0))
check('例題1', roots(f1), {-1, 2, 3})
check('例題2a', solveset(2 * x**2 - x - 6 <= 0, x, S.Reals), Interval(Rational(-3, 2), 2))
check('例題2b', solveset(x**2 - 4 * x + 5 > 0, x, S.Reals), S.Reals)
V = x * (12 - 2 * x)**2
check('例題3 V-128 分解', factor(V - 128), 4 * (x - 8) * (x - 2)**2)
check('例題3 綜合除法', div(x**3 - 12 * x**2 + 36 * x - 32, x - 2, x), (x**2 - 10 * x + 16, 0))
check('例題3 最大容積', maximum(V, x, Interval.open(0, 6)), 128)
check('錯誤1', solveset((x - 1) * (x - 4) < 0, x, S.Reals), Interval.open(1, 4))
check('錯誤2', solveset(x**3 > 4 * x, x, S.Reals), Union(Interval.open(-2, 0), Interval.open(2, S.Infinity)))
check('錯誤3', solveset((x - 1)**2 * (x + 2) > 0, x, S.Reals), Union(Interval.open(-2, 1), Interval.open(1, S.Infinity)))
check('練習1 綜合除法', div(x**3 + 2 * x**2 - 5 * x - 6, x - 2, x), (x**2 + 4 * x + 3, 0))
check('練習1', roots(x**3 + 2 * x**2 - 5 * x - 6), {-3, -1, 2})
check('練習2', roots(x**4 - 10 * x**2 + 9), {-3, -1, 1, 3})
check('練習3', solveset(x**2 - 2 * x - 15 > 0, x, S.Reals), Union(Interval.open(-S.Infinity, -3), Interval.open(5, S.Infinity)))
check('練習4', solveset(-2 * x**2 + 5 * x + 3 >= 0, x, S.Reals), Interval(Rational(-1, 2), 3))
check('練習5', solveset((x + 1) * (x - 2)**2 * (x - 4) <= 0, x, S.Reals), Interval(-1, 4))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
