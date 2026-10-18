"""Recompute every example and practice answer in algebra lessons 17–18.

Run: scripts/verify/.venv/bin/python scripts/verify/algebra_batch5.py
"""

from sympy import I, Abs, Poly, Rational, S, binomial, conjugate, div, expand, factorial, simplify, solve, sqrt, symbols

x, y, a, b = symbols('x y a b')
failures = 0


def check(label, got, expected):
    global failures
    ok = got == expected or (hasattr(got, 'free_symbols') and simplify(got - expected) == 0)
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {got}")
    if not ok:
        failures += 1
        print(f'     expected {expected}')


def coeff(expr, power):
    return Poly(expand(expr), x).coeff_monomial(x**power)


print('== binomial-theorem')
check('概念 巴斯卡第四列', [binomial(4, j) for j in range(5)], [1, 4, 6, 4, 1])
check('概念 (a+b)^4', expand((a + b)**4), a**4 + 4 * a**3 * b + 6 * a**2 * b**2 + 4 * a * b**3 + b**4)
check('概念 C(4,2) 公式', factorial(4) / (factorial(2) * factorial(2)), 6)
check('概念 巴斯卡規則 n=7..12', all(binomial(n, k) == binomial(n - 1, k - 1) + binomial(n - 1, k) for n in range(7, 13) for k in range(1, n)), True)
check('概念 Σ C(n,k)=2^n n=0..10', all(sum(binomial(n, k) for k in range(n + 1)) == 2**n for n in range(11)), True)
check('例題1', expand((x + 2)**4), x**4 + 8 * x**3 + 24 * x**2 + 32 * x + 16)
e2 = expand((2 * x - 1 / x)**7 * x**7)  # multiply by x^7 to get a polynomial; x^k here is x^(k-7) before
check('例題2 x^3 係數', Poly(e2, x).coeff_monomial(x**10), 672)
check('例題2 沒有常數項', Poly(e2, x).coeff_monomial(x**7), 0)
partial = sum(binomial(10, k) * Rational(2, 100)**k for k in range(4))
check('例題3 前四項', partial, Rational(121896, 100000))
check('例題3 真值', round(float(Rational(102, 100)**10), 6), 1.218994)
check('例題3 第五項', binomial(10, 4) * Rational(2, 100)**4, Rational(336, 10**7))
check('錯誤1 (a+b)^3', expand((a + b)**3), a**3 + 3 * a**2 * b + 3 * a * b**2 + b**3)
check('錯誤2 (x-2)^3', expand((x - 2)**3), x**3 - 6 * x**2 + 12 * x - 8)
check('錯誤2 錯誤式在 x=1', (x**3 - 6 * x**2 - 12 * x - 8).subs(x, 1), -25)
check('錯誤3 第 3 項', binomial(6, 2), 15)
check('練習1', (binomial(6, 2), binomial(8, 5), binomial(10, 0)), (15, 56, 1))
check('練習2', expand((2 * x - 1)**3), 8 * x**3 - 12 * x**2 + 6 * x - 1)
check('練習3', coeff((x + 3)**5, 2), 270)
e4 = expand((x**2 + 1 / x)**6 * x**6)
check('練習4 常數項', Poly(e4, x).coeff_monomial(x**6), 15)
check('練習5 餘式', div(expand((x + 1)**8), x**2, x)[1], 8 * x + 1)

print('== complex-numbers')
check('概念 加法', (3 + 2 * I) + (1 - 5 * I), 4 - 3 * I)
check('概念 乘法', expand((1 + 2 * I) * (3 - I)), 5 + 5 * I)
check('概念 i 的次方', [I**k for k in range(1, 6)], [I, -1, -I, 1, I])
check('概念 除法', simplify((1 + I) / (2 - I)), Rational(1, 5) + Rational(3, 5) * I)
check('概念 sqrt(-4)', sqrt(-4), 2 * I)
check('例題1 乘法', expand((3 + 2 * I) * (1 - 4 * I)), 11 - 10 * I)
check('例題1 i^23', I**23, -I)
check('例題2', simplify((5 + 5 * I) / (2 - I)), 1 + 3 * I)
r = solve(x**2 - 4 * x + 13, x)
check('例題3 根', set(r), {2 + 3 * I, 2 - 3 * I})
check('例題3 距離', Abs((2 + 3 * I) - (2 - 3 * I)), 6)
check('例題3 絕對值', Abs(2 + 3 * I), sqrt(13))
check('錯誤1', sqrt(-4) * sqrt(-9), -6)
check('錯誤2', expand((2 + 3 * I) * (2 - 3 * I)), 13)
check('錯誤3', Abs(3 + 4 * I), 5)
check('練習1', expand((4 - 3 * I) - (1 + 2 * I) + 2 * I * (3 - I)), 5 + I)
check('練習2', simplify((1 + 2 * I) / (3 - 4 * I)), Rational(-1, 5) + Rational(2, 5) * I)
check('練習3', set(solve(x**2 + 2 * x + 5, x)), {-1 + 2 * I, -1 - 2 * I})
check('練習4', solve([x + y - 5, x - y - 1], [x, y]), {x: 3, y: 2})
check('練習5', Abs((4 - 2 * I) - (1 + 2 * I)), 5)
zz = 3 + 2 * I
check('概念 |z|^2 = z z̄', expand(zz * conjugate(zz)), Abs(zz)**2)

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
raise SystemExit(1 if failures else 0)
