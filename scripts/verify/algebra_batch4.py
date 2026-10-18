"""Recompute every example and practice answer in algebra lessons 13–16.

Run: scripts/verify/.venv/bin/python scripts/verify/algebra_batch4.py
"""

from math import log10

from sympy import (FiniteSet, Interval, Rational, S, Sum, Union, expand, factor, isprime, log, simplify, solveset,
                   symbols)

x, k, m = symbols('x k m')
ki, ni = symbols('k n', integer=True, positive=True)
failures = 0
LOG2, LOG3 = 0.3010, 0.4771


def tidy(value):
    """Simplify interval endpoints, which solveset may leave as e.g. log(8)/log(2)."""
    if isinstance(value, Interval):
        return Interval(simplify(value.start), simplify(value.end), value.left_open, value.right_open)
    if isinstance(value, Union):
        return Union(*map(tidy, value.args))
    if isinstance(value, FiniteSet):
        return FiniteSet(*[simplify(v) for v in value])
    return value


def check(label, got, expected):
    global failures
    got = tidy(got)
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def close(label, got, expected, tol):
    global failures
    ok = abs(got - expected) <= tol
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got:.4f} (≈ {expected})")
    if not ok:
        failures += 1


def real_solutions(eq):
    return solveset(eq, x, S.Reals)


print('== logarithms')
check('例題1a log2 32', log(32, 2), 5)
check('例題1b log3 1/9', log(Rational(1, 9), 3), -2)
check('例題1c log4 8', simplify(log(8) / log(4)), Rational(3, 2))
check('例題2a', simplify(log(48, 2) - log(3, 2)), 4)
check('例題2b', simplify(2 * log(6, 3) - log(4, 3)), 2)
check('例題2c', simplify(log(9, 2) * log(8, 3)), 6)
check('例題3 2^100 位數', len(str(2**100)), 31)
close('例題3 100·log2', 100 * log10(2), 30.10, 0.01)
close('概念 log5 = 1 - log2', log10(5), 1 - LOG2, 0.0001)
close('錯誤1 log20', log10(20), 1.30, 0.01)
check('錯誤2 log8/log2', simplify(log(8) / log(2)), 3)
check('錯誤3 log 1000^2', log(1000**2, 10), 6)
check('練習1', (log(81, 3), S(5)**-2), (4, Rational(1, 25)))
check('練習2', simplify(log(4, 6) + log(9, 6)), 2)
check('練習3', simplify(log(3, 2) * log(4, 3) * log(8, 4)), 3)
close('練習4 log12', log10(12), 2 * LOG2 + LOG3, 0.0002)
close('練習4 log1.5', log10(1.5), LOG3 - LOG2, 0.0002)
inv = symbols('y', positive=True)
check('練習5 反函數 log2(x)-1 代回', simplify(2**((log(inv, 2) - 1) + 1)), inv)

print('== exp-log-equations')
check('概念 4^x=8^(x-1)', real_solutions(4**x - 8**(x - 1)), FiniteSet(3))
close('概念 log3 20', log10(20) / log10(3), (1 + LOG2) / LOG3, 0.001)
check('概念 換元', real_solutions(4**x - 3 * 2**x - 4), FiniteSet(2))
check('概念 對數方程式（含不合的根）', real_solutions(x * (x - 2) - 8), FiniteSet(-2, 4))
close('概念 複利 log2/log1.05', log10(2) / log10(1.05), 14.2, 0.05)
check('概念 1.05^14 < 2 <= 1.05^15', (1.05**14 < 2 <= 1.05**15), True)
check('例題1a', real_solutions(9**x - 27**(x - 1)), FiniteSet(3))
close('例題1b log2 3', log10(3) / log10(2), LOG3 / LOG2, 0.001)
check('例題2 x^2-1=3', real_solutions(x**2 - 4), FiniteSet(-2, 2))
check('例題3-1 t', 3 * 5730, 17190)
close('例題3-2 t', 5730 * log10(0.3) / log10(0.5), 5730 * (LOG3 - 1) / -LOG2, 15)
check('錯誤1', real_solutions(x * (x - 2) - 8), FiniteSet(-2, 4))
close('錯誤2 2^1.5', 2**1.5, 2.83, 0.01)
check('練習1', real_solutions(2**(x + 3) - 16**x), FiniteSet(1))
check('練習2', real_solutions(9**x - 10 * 3**x + 9), FiniteSet(0, 2))
check('練習3', real_solutions((x + 3) - 4 * (x - 1)), FiniteSet(Rational(7, 3)))
check('練習4', real_solutions(x * (x - 3) - 10), FiniteSet(-2, 5))
close('練習5 n 下限', log10(1.5) / log10(1.02), 20.5, 0.05)
check('練習5 1.02^20 < 1.5 < 1.02^21', (1.02**20 < 1.5 < 1.02**21), True)

print('== sequences-series')
check('例題1', sum(range(1, 100, 2)), 2500)
check('例題2 S6', sum(3 * 2**i for i in range(6)), 189)
check('例題3 總距離', 10 + 2 * Rational(6) / (1 - Rational(3, 5)), 40)
check('錯誤1 項數', len(range(3, 100, 4)), 25)
check('錯誤3', simplify(Sum(2 * ki + 1, (ki, 1, ni)).doit()), ni**2 + 2 * ni)
check('練習1', (5 + 19 * 3, sum(5 + 3 * i for i in range(20))), (62, 670))
check('練習2', sum(3 * j - 1 for j in range(1, 11)), 155)
check('練習3', Rational(1) / (1 + Rational(1, 2)), Rational(2, 3))
check('練習4', Rational(45, 100) / (1 - Rational(1, 100)), Rational(5, 11))
check('練習5 最少項數', next(j for j in range(1, 20) if 3**j - 1 > 2000), 7)
check('概念 Σk^2', factor(Sum(ki**2, (ki, 1, ni)).doit()), ni * (ni + 1) * (2 * ni + 1) / 6)

print('== mathematical-induction')
check('概念 n^2-n+41 前 40 個都是質數', all(isprime(j * j - j + 41) for j in range(1, 41)), True)
check('概念 n=41 不是質數', isprime(41 * 41 - 41 + 41), False)
check('概念 遞推 Σk', expand(k * (k + 1) / 2 + (k + 1) - (k + 1) * (k + 2) / 2), 0)
check('例題1 遞推', expand(k * (k + 1) * (2 * k + 1) / 6 + (k + 1)**2 - (k + 1) * (k + 2) * (2 * k + 3) / 6), 0)
check('例題1 十字交乘', factor(2 * k**2 + 7 * k + 6), (k + 2) * (2 * k + 3))
check('例題2 遞推', expand(5 * (4 * m + 1) - 1 - 4 * (5 * m + 1)), 0)
check('例題3 2^4=4^2, 2^5>5^2', (2**4 == 4**2, 2**5 > 5**2), (True, True))
check('例題3 2k^2-(k+1)^2', expand(2 * k**2 - (k + 1)**2 - ((k - 1)**2 - 2)), 0)
check('例題3 對 5..30 檢查 2^n>n^2', all(2**j > j * j for j in range(5, 31)), True)
check('錯誤3 遞推計算正確', expand((k**2 + k + 2) / 2 + (k + 1) - ((k + 1)**2 + (k + 1) + 2) / 2), 0)
check('錯誤3 起始步驟失敗', ((1**2 + 1 + 2) / 2 == 1), False)
check('練習1 遞推', expand(k**2 + 2 * k + 1 - (k + 1)**2), 0)
check('練習2 遞推', expand(k * (k + 1) * (k + 2) / 3 + (k + 1) * (k + 2) - (k + 1) * (k + 2) * (k + 3) / 3), 0)
check('練習3 遞推', expand((k + 1)**3 + 2 * (k + 1) - (k**3 + 2 * k) - 3 * (k**2 + k + 1)), 0)
check('練習3 對 1..50 檢查', all((j**3 + 2 * j) % 3 == 0 for j in range(1, 51)), True)
check('練習4 遞推', expand(2**ki - 1 + 2**ki - (2**(ki + 1) - 1)), 0)

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
