---
subject: calculus
order: 2
name: 冪次法則
latex: \dfrac{d}{dx}x^n=nx^{n-1}
note: $n$ 可以是任意實數（例如 $\sqrt{x}=x^{1/2}$）。常數的導數為 $0$。
related: [derivative-definition, binomial-theorem, chain-rule]
---

## 符號說明

- $n$：任意實數。$n$ 是正整數時對所有 $x$ 成立；$n$ 不是整數時（例如 $\frac{1}{2}$），一般要求 $x>0$。
- 常數的導數是 $0$；另外常數倍和加減可以分開微分：$(cf)'=cf'$、$(f\pm g)'=f'\pm g'$（由極限的加法與常數倍性質得到）。

## 使用時機

- 微分**多項式**：逐項使用冪次法則。
- 微分**根號與分式**：先改寫成次方，例如 $\sqrt{x}=x^{\frac{1}{2}}$、$\frac{1}{x^2}=x^{-2}$。
- 和連鎖律搭配，微分 $(3x+1)^5$ 這類式子。

## 例題

**例題 1**　求 $f(x)=3x^4-5x^2+7x-2$ 的導函數，以及 $f'(1)$。

<details class="example-solution">
<summary>看解答</summary>

逐項微分：

$$
\begin{aligned}
f'(x)&=3\cdot 4x^3-5\cdot 2x+7\cdot 1-0\\
&=12x^3-10x+7.
\end{aligned}
$$

$f'(1)=12-10+7=9$。

**驗算**：用差商估計，$h=0.001$ 時 $\frac{f(1.001)-f(1)}{0.001}\approx 9.013$，接近 $9$（$h$ 越小越接近）。

</details>

**例題 2**　求 $g(x)=\sqrt{x}+\frac{1}{x^2}$ 的導函數，以及 $g'(4)$。

<details class="example-solution">
<summary>看解答</summary>

改寫成次方：$g(x)=x^{\frac{1}{2}}+x^{-2}$。

$$
\begin{aligned}
g'(x)&=\frac{1}{2}x^{-\frac{1}{2}}+(-2)x^{-3}\\
&=\frac{1}{2\sqrt{x}}-\frac{2}{x^3}.
\end{aligned}
$$

$$
g'(4)=\frac{1}{2\cdot 2}-\frac{2}{64}=\frac{8}{32}-\frac{1}{32}=\frac{7}{32}.
$$

**驗算**：$\frac{7}{32}=0.21875$；差商 $\frac{g(4.0001)-g(4)}{0.0001}\approx 0.21875$。

</details>

## 推導

**$n$ 是正整數**：由二項式定理，

$$
\begin{aligned}(x+h)^n&=x^n+nx^{n-1}h\\&\quad+\binom{n}{2}x^{n-2}h^2+\cdots+h^n.\end{aligned}
$$

減去 $x^n$ 再除以 $h$：

$$
\begin{aligned}&\frac{(x+h)^n-x^n}{h}\\={}&nx^{n-1}+\binom{n}{2}x^{n-2}h+\cdots+h^{n-1}.\end{aligned}
$$

右邊除了第一項，每一項都含有 $h$，$h\to 0$ 時都趨近 $0$，所以導數是 $nx^{n-1}$。

**$n$ 是任意實數（$x>0$）**：把 $x^n$ 寫成 $e^{n\ln x}$（因為 $e^{\ln x}=x$，兩邊 $n$ 次方即得）。用連鎖律，外層是 $e^u$（導數 $e^u$），內層是 $u=n\ln x$（導數 $\frac{n}{x}$）：

$$
\begin{aligned}
\left(x^n\right)'&=e^{n\ln x}\cdot\frac{n}{x}\\
&=x^n\cdot\frac{n}{x}=nx^{n-1}.
\end{aligned}
$$

這裡用到的 $(e^x)'=e^x$、$(\ln x)'=\frac{1}{x}$ 在「常見導數」中推導。
