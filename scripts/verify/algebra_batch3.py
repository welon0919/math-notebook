"""Recompute every example and practice answer in algebra lessons 9–12.

Run: scripts/verify/.venv/bin/python scripts/verify/algebra_batch3.py
"""

from sympy import (Abs, Complement, FiniteSet, Interval, Rational, S, Union, cbrt, expand, maximum, minimum, root,
                   simplify, solve, solveset, sqrt, symbols)
from sympy.calculus.util import continuous_domain, function_range

x, y, a, b, t, K = symbols('x y a b t K', real=True)
pos_a, pos_b = symbols('a b', positive=True)
failures = 0


def tidy(value):
    """Simplify interval endpoints, which solveset may leave as e.g. -log(9)/log(3)."""
    if isinstance(value, Interval):
        return Interval(simplify(value.start), simplify(value.end), value.left_open, value.right_open)
    if isinstance(value, Union):
        return Union(*map(tidy, value.args))
    return value


def check(label, got, expected):
    global failures
    got = tidy(got)
    # Sets, tuples and lists compare directly; expressions may need simplifying first.
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def domain(expr):
    return continuous_domain(expr, x, S.Reals)


def rng(expr, dom=S.Reals):
    return function_range(expr, x, dom)


def inverse(expr, dom_check=None):
    """Solve y = expr for x; keep the solution that maps back (or the one dom_check accepts)."""
    sols = solve(expr - y, x)
    if dom_check:
        sols = [s for s in sols if dom_check(s)]
    assert len(sols) == 1, sols
    return sols[0].subs(y, x)


print('== functions-domain-range')
check('概念 f(4) for 2x+3', (2 * x + 3).subs(x, 4), 11)
check('概念 定義域 1/(x-2)', domain(1 / (x - 2)), Complement(S.Reals, FiniteSet(2)))
check('概念 定義域 sqrt(3-x)', domain(sqrt(3 - x)), Interval(-S.Infinity, 3))
check('概念 定義域 sqrt(x+1)/(x-3)', domain(sqrt(x + 1) / (x - 3)), Interval.Ropen(-1, 3) | Interval.open(3, S.Infinity))
check('概念 值域 x^2-4x+1', rng(x**2 - 4 * x + 1), Interval(-3, S.Infinity))
check('概念 值域 1/x', rng(1 / x, Complement(S.Reals, FiniteSet(0))), Complement(S.Reals, FiniteSet(0)))
check('例題1b x=4 時 y', set(solve(y**2 - 4, y)), {-2, 2})
check('例題2a', domain((x + 1) / (x**2 - 4)), Complement(S.Reals, FiniteSet(-2, 2)))
check('例題2b', domain(sqrt(6 - 2 * x)), Interval(-S.Infinity, 3))
check('例題2c', domain(sqrt(x - 1) + 1 / (x - 5)), Interval.Ropen(1, 5) | Interval.open(5, S.Infinity))
A = x * (10 - x)
check('例題3 配方', expand(-(x - 5)**2 + 25), expand(A))
check('例題3 值域', rng(A, Interval.open(0, 10)), Interval.Lopen(0, 25))
check('錯誤1 f(x+1)', expand((x + 1)**2), x**2 + 2 * x + 1)
check('錯誤2 定義域', domain((x**2 - 4) / (x - 2)), Complement(S.Reals, FiniteSet(2)))
check('錯誤3 值域', rng(x**2, Interval(-1, 2)), Interval(0, 4))
f1 = 3 * x - 2
check('練習1', (f1.subs(x, 2), f1.subs(x, -1), expand(f1.subs(x, a + 1))), (4, -5, 3 * a + 1))
check('練習2b x=3', set(solve(y**2 - 4, y)), {-2, 2})
check('練習3', domain(sqrt(x + 3) / (x - 1)), Interval.Ropen(-3, 1) | Interval.open(1, S.Infinity))
check('練習4', rng(x**2 - 6 * x + 10), Interval(1, S.Infinity))
check('練習5', rng(2 * x**2 - 4 * x + 3, Interval(0, 3)), Interval(1, 9))

print('== function-transformations')
check('例題1 (0,0)->(-1,-3)', (2 * (x + 1)**2 - 3).subs(x, -1), -3)
check('例題1 (1,1)->(0,-1)', (2 * (x + 1)**2 - 3).subs(x, 0), -1)
f, g = 2 * x - 1, x**2 + 1
fg, gf = expand(f.subs(x, g)), expand(g.subs(x, f))
check('例題2 f(g(x))', fg, 2 * x**2 + 1)
check('例題2 g(f(x))', gf, 4 * x**2 - 4 * x + 2)
check('例題2 f(g(2)), g(f(2))', (fg.subs(x, 2), gf.subs(x, 2)), (9, 10))
F = Rational(9, 5) * ((K - 273)) + 32
check('例題3 F(K)', expand(F), Rational(9, 5) * K - Rational(2297, 5))
check('例題3 F(300)', F.subs(K, 300), Rational(403, 5))
check('錯誤1 (2x)^2 在 x=1', ((2 * x)**2).subs(x, 1), 4)
check('錯誤2', (x**2 + 1), (x + 1).subs(x, x**2))
check('練習1 最低點', minimum(Abs(x + 2) - 3, x, S.Reals), -3)
check('練習2 最大值', maximum(-2 * (x - 1)**2 + 4, x, S.Reals), 4)
f3, g3 = x + 2, x**2 - 1
check('練習3 f(g(x)), g(f(x))', (expand(f3.subs(x, g3)), expand(g3.subs(x, f3))), (x**2 + 1, x**2 + 4 * x + 3))
check('練習3 解', solve(expand(f3.subs(x, g3)) - expand(g3.subs(x, f3)), x), [Rational(-1, 2)])
check('練習4', domain(sqrt(2 * x - 6)), Interval(3, S.Infinity))
check('練習5', (1 / x**2).subs(x, x**2 + 1), 1 / (x**2 + 1)**2)

print('== inverse-functions')
check('概念 2x+3 反函數', inverse(2 * x + 3), (x - 3) / 2)
check('例題1', inverse(3 * x - 4), (x + 4) / 3)
check('例題2 反函數（x>=1 那支）', inverse(x**2 - 2 * x + 3, lambda s: s.subs(y, 6) >= 1), 1 + sqrt(x - 2))
check('例題2 值域', rng(x**2 - 2 * x + 3, Interval(1, S.Infinity)), Interval(2, S.Infinity))
check('例題2 f^-1(f(3))', (1 + sqrt(x - 2)).subs(x, (x**2 - 2 * x + 3).subs(x, 3)), 3)
fx = (x - 100) / 32
check('例題3', inverse(fx), 32 * x + 100)
check('例題3 f^-1(200)', (32 * x + 100).subs(x, 200), 6500)
check('錯誤3 f(5)', sqrt(x - 1).subs(x, 5), 2)
check('練習1', inverse(5 - 2 * x), (5 - x) / 2)
check('練習1 f^-1(1)', ((5 - x) / 2).subs(x, 1), 2)
check('練習3', inverse((2 * x + 1) / (x - 3)), (3 * x + 1) / (x - 2))
check('練習4', inverse(sqrt(x + 4), lambda s: True), x**2 - 4)
check('練習4 值域', rng(sqrt(x + 4), Interval(-4, S.Infinity)), Interval(0, S.Infinity))
f5 = 2 * (x - 1)**3 + 3
check('練習5 f(3)', f5.subs(x, 3), 19)
check('練習5 反函數在 19', (1 + cbrt((x - 3) / 2)).subs(x, 19), 3)

print('== exponential-functions')
check('概念 8^(2/3)', S(8)**Rational(2, 3), 4)
check('例題1a', S(8)**Rational(2, 3), 4)
check('例題1b', Rational(27, 8)**Rational(-1, 3), Rational(2, 3))
check('例題1c', simplify((pos_a**3 * pos_b**-2)**2 / (pos_a**-1 * pos_b)), pos_a**7 / pos_b**5)
vals = [sqrt(2), root(4, 3), root(8, 5)]
check('例題2 由小到大', sorted(vals, key=lambda v: float(v)), [sqrt(2), root(8, 5), root(4, 3)])
N = 500 * 2**(t / 20)
check('例題3 N(120)', N.subs(t, 120), 32000)
check('例題3 N>16000', solveset(N > 16000, t, S.Reals), Interval.open(100, S.Infinity))
check('概念 (1/3)^x >= 9', solveset(Rational(1, 3)**x >= 9, x, S.Reals), Interval(-S.Infinity, -2))
check('錯誤1', S(2)**3 * S(2)**4, 128)
check('錯誤2', S(2)**-3, Rational(1, 8))
check('錯誤3', solveset(Rational(1, 2)**x > Rational(1, 8), x, S.Reals), Interval.open(-S.Infinity, 3))
check('練習1', (S(16)**Rational(3, 4), S(9)**Rational(-3, 2)), (8, Rational(1, 27)))
px, py = symbols('x y', positive=True)
check('練習2', simplify((px**Rational(1, 2) * py**-1)**4 * px**-1 * py**3), px / py)
check('練習3', solveset(3**(2 * x - 1) - 27, x, S.Reals), FiniteSet(2))
check('練習4', solveset(Rational(1, 4)**x <= 8, x, S.Reals), Interval(Rational(-3, 2), S.Infinity))
check('練習5 值域', rng(2**(x - 1) - 4), Interval.open(-4, S.Infinity))
check('練習5 交點', solveset(2**(x - 1) - 4, x, S.Reals), FiniteSet(3))

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
