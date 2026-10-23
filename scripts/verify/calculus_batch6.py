"""Recompute every example and practice answer in the added calculus lesson 瑕積分 (improper-integrals).

Run: scripts/verify/.venv/bin/python -u scripts/verify/calculus_batch6.py
"""

from sympy import Rational, exp, integrate, limit, log, oo, pi, simplify, sqrt, symbols

x, r = symbols('x r', positive=True)
t = symbols('t', positive=True)
p = symbols('p', positive=True)
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
    print(f"{'OK  ' if ok else 'FAIL'} {label}: {float(got):.6g}")
    if not ok:
        failures += 1
        print(f'     expected ≈ {expected}')


print('== improper-integrals')
check('p 積分 一般式 (p=3)', simplify(integrate(x**-3, (x, 1, t)) - (t**(1 - 3) - 1) / (1 - 3)), 0)
for q in (Rational(1, 2), 1, 2, 3):
    print(f'     ∫₁^∞ x^(−{q}) =', integrate(x**-q, (x, 1, oo)))
check('p 積分 p=2', integrate(x**-2, (x, 1, oo)), 1)
check('p 積分 p=3 = 1/(p−1)', integrate(x**-3, (x, 1, oo)), Rational(1, 2))
check('p 積分 p=1 發散', integrate(1 / x, (x, 1, oo)), oo)
check('p 積分 p=1/2 發散', integrate(x**Rational(-1, 2), (x, 1, oo)), oo)
check('∫₀¹ p=1/2 收斂', integrate(x**Rational(-1, 2), (x, 0, 1)), 2)
check('∫₀¹ p=2 發散', integrate(x**-2, (x, 0, 1)), oo)
check('例題1(a) ∫₁ᵗ', integrate(x**-2, (x, 1, t)), 1 - 1 / t)
check('例題1(b) ∫₁ᵗ', integrate(1 / x, (x, 1, t)), log(t))
check('例題2(a)', limit(2 - 2 * sqrt(t), t, 0, '+'), 2)
y = symbols('y', real=True)
left = -1 / (t - 1) - 1
check('例題2(b) 左半', simplify(integrate(1 / (y - 1)**2, (y, 0, t)) - left), 0)
check('例題2(b) 左半發散', limit(left, t, 1, '-'), oo)
F = -t * exp(-t) - exp(-t) + 1
check('例題3 ∫₀ᵗ', simplify(integrate(x * exp(-x), (x, 0, t)) - F), 0)
check('例題3 t e^−t → 0', limit(t * exp(-t), t, oo), 0)
check('例題3', integrate(x * exp(-x), (x, 0, oo)), 1)
approx('例題3 t=10', F.subs(t, 10), 0.9995, 5e-5)
check('錯誤1 ∫₀¹ 1/x² 發散', limit(1 / t - 1, t, 0, '+'), oo)
check('錯誤2 右半發散', limit(t**2 / 2, t, oo), oo)
check('練習1', integrate(x**-3, (x, 1, oo)), Rational(1, 2))
check('練習2', integrate(exp(-2 * x), (x, 0, oo)), Rational(1, 2))
check('練習3 ∫ₜ¹', simplify(integrate(log(x), (x, t, 1)) - (-1 - t * log(t) + t)), 0)
check('練習3', integrate(log(x), (x, 0, 1)), -1)
check('練習4 比較', all(1 / (k * k + 1) < Rational(1, k * k) for k in range(1, 50)), True)
check('練習4 實際值', integrate(1 / (x**2 + 1), (x, 1, oo)), pi / 4)
G, M, R = symbols('G M R', positive=True)
check('練習5(a)', integrate(G * M / r**2, (r, R, oo)), G * M / R)
g, Rv = 9.8, 6.4e6
approx('練習5(b) W', g * Rv, 6.27e7, 5e5)
approx('練習5(b) v', sqrt(2 * g * Rv), 1.12e4, 50)
approx('圖 ln 20', log(20), 2.9957, 5e-5)

print()
print('all passed' if failures == 0 else f'{failures} FAILED')
