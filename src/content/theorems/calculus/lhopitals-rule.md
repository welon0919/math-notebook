---
subject: calculus
order: 4
name: 羅必達法則
statement: 若 $\displaystyle\lim_{x\to a}\frac{f(x)}{g(x)}$ 為 $\dfrac{0}{0}$ 或 $\dfrac{\infty}{\infty}$ 型，且 $\displaystyle\lim_{x\to a}\frac{f'(x)}{g'(x)}$ 存在，則兩個極限相等。
note: 遇到 $\dfrac{0}{0}$ 這類不定型，可以分子、分母各自微分後再求極限。
proofType: full
related: [mean-value-theorem, important-limits, taylor-series]
---

## 白話解釋

當分子和分母同時趨近 $0$（或同時趨近 $\infty$），直接代入得不到答案，因為結果取決於「誰跑得比較快」。羅必達法則說：這時可以**比較分子和分母的變化速度**，也就是各自微分後再求極限。

使用時要確認三件事：

1. 真的是 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型。不是的話不能用。
2. 是分子、分母**各自**微分，不是用除法法則微分整個分式。
3. 微分後的極限要存在。若 $\lim\frac{f'}{g'}$ 不存在，不代表原來的極限不存在。例如 $\lim\limits_{x\to\infty}\frac{x+\sin x}{x}=1$，但 $\frac{1+\cos x}{1}$ 一直在 $0$ 和 $2$ 之間擺盪，沒有極限。

## 使用時機

- **$\frac{0}{0}$ 型**，例如 $\lim\limits_{x\to 0}\frac{e^x-1-x}{x^2}$。
- **$\frac{\infty}{\infty}$ 型**，例如比較成長速度：$\lim\limits_{x\to\infty}\frac{\ln x}{x}$。
- 其他不定型（$0\cdot\infty$、$\infty-\infty$ 等）先改寫成分式再用，例如 $x\ln x=\frac{\ln x}{1/x}$。

## 例題

**例題 1**　求 $\lim\limits_{x\to 0}\frac{e^x-1-x}{x^2}$。

<details class="example-solution">
<summary>看解答</summary>

$x\to 0$ 時分子 $\to 1-1-0=0$、分母 $\to 0$，是 $\frac{0}{0}$ 型。分子分母各自微分：

$$
\lim_{x\to 0}\frac{e^x-1}{2x}.
$$

還是 $\frac{0}{0}$ 型，再用一次：

$$
\lim_{x\to 0}\frac{e^x}{2}=\frac{1}{2}.
$$

**驗算**：用泰勒展開，$e^x-1-x=\frac{x^2}{2}+\frac{x^3}{6}+\cdots$，除以 $x^2$ 得 $\frac{1}{2}+\frac{x}{6}+\cdots\to\frac{1}{2}$。

</details>

**例題 2**　求 $\lim\limits_{x\to\infty}\frac{\ln x}{x}$。

<details class="example-solution">
<summary>看解答</summary>

$x\to\infty$ 時 $\ln x\to\infty$、$x\to\infty$，是 $\frac{\infty}{\infty}$ 型：

$$
\lim_{x\to\infty}\frac{\ln x}{x}=\lim_{x\to\infty}\frac{1/x}{1}=0.
$$

意思是 $\ln x$ 雖然會無限變大，但比 $x$ 慢得多。

**驗算**：$x=10^6$ 時 $\frac{\ln 10^6}{10^6}\approx\frac{13.8}{10^6}=0.0000138$，非常接近 $0$。

</details>

## 證明

這裡完整證明 $x\to a$（$a$ 為實數）的 $\frac{0}{0}$ 型，並假設均值定理成立。

**設定**：在 $a$ 附近（不含 $a$）$f$、$g$ 可微且 $g'(x)\neq 0$；$\lim\limits_{x\to a}f(x)=\lim\limits_{x\to a}g(x)=0$；$\lim\limits_{x\to a}\frac{f'(x)}{g'(x)}=L$。

另外規定 $f(a)=g(a)=0$。這不影響 $x\to a$ 的極限（極限本來就不看 $x=a$ 的值），但讓 $f$、$g$ 在 $a$ 連續。

**第一步：柯西均值定理。** 取 $x>a$（在 $a$ 附近）。對 $a\le t\le x$，令

$$
h(t)=f(t)\,g(x)-g(t)\,f(x).
$$

因為 $f(a)=g(a)=0$，得 $h(a)=0$；而 $h(x)=f(x)g(x)-g(x)f(x)=0$。所以 $h(a)=h(x)$，對 $h$ 用均值定理（此時割線斜率為 $0$），存在 $c\in(a,x)$ 使 $h'(c)=0$：

$$
f'(c)\,g(x)-g'(c)\,f(x)=0.
$$

**第二步：$g(x)\neq 0$。** 若 $g(x)=0=g(a)$，對 $g$ 在 $[a,x]$ 用均值定理，會有某點的 $g'$ 等於 $0$，和設定矛盾。所以 $g(x)\neq 0$，又 $g'(c)\neq 0$，第一步的式子可以改寫成

$$
\frac{f(x)}{g(x)}=\frac{f'(c)}{g'(c)},\qquad a<c<x.
$$

**第三步：取極限。** 當 $x\to a^+$，夾在 $a$ 和 $x$ 之間的 $c$ 也 $\to a^+$，所以右邊趨近 $L$，左邊也就趨近 $L$。$x<a$ 的情形同理（$c$ 在 $x$ 和 $a$ 之間）。兩側極限都是 $L$，所以 $\lim\limits_{x\to a}\frac{f(x)}{g(x)}=L$。

**其他情形**：$x\to\infty$ 的 $\frac{0}{0}$ 型，令 $x=\frac{1}{t}$，化成 $t\to 0^+$ 的情形，上面的證明照樣適用。$\frac{\infty}{\infty}$ 型同樣以柯西均值定理為核心，但估計比較繁瑣，這裡不列出。
