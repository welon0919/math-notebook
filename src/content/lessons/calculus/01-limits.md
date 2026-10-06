---
subject: calculus
order: 1
title: 極限
example: 求 $\displaystyle\lim_{x\to 2}\frac{x^2-4}{x-2}$。
solution: 直接代入會得到 $\dfrac{0}{0}$。先化簡：$\dfrac{x^2-4}{x-2}=\dfrac{(x-2)(x+2)}{x-2}=x+2$（$x\neq 2$），所以極限為 $2+2=4$。
---

**極限**描述的是：當 $x$ 越來越靠近某個值 $a$ 時，$f(x)$ 會越來越靠近哪個值。記作

$$
\lim_{x\to a}f(x)=L
$$

重點是「靠近」而不是「等於」：$f(a)$ 是否有定義、等於多少，都不影響極限。

## 計算方法

1. **直接代入**：多項式、根式、三角函數等在定義域內連續，直接代入即可。
2. **因式分解約去**：遇到 $\dfrac{0}{0}$，先把共同因式約掉。
3. **有理化**：含根號時，分子分母同乘共軛式。
4. **除以最高次**：$x\to\infty$ 時，分子分母同除以最高次方。例如

$$
\lim_{x\to\infty}\frac{3x^2+1}{x^2-5}=\lim_{x\to\infty}\frac{3+\frac{1}{x^2}}{1-\frac{5}{x^2}}=3
$$

## 連續

若 $\displaystyle\lim_{x\to a}f(x)=f(a)$，就說 $f$ 在 $a$ **連續**：圖形在該點沒有斷開。

## 兩個重要極限

$$
\lim_{x\to 0}\frac{\sin x}{x}=1,\qquad \lim_{n\to\infty}\left(1+\frac{1}{n}\right)^n=e\approx 2.718
$$
