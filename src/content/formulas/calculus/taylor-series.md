---
subject: calculus
order: 9
name: 泰勒展開
latex: f(x)=\sum_{n=0}^{\infty}\dfrac{f^{(n)}(a)}{n!}(x-a)^n
note: $a=0$ 時稱為馬克勞林級數，例如 $e^x=1+x+\dfrac{x^2}{2!}+\dfrac{x^3}{3!}+\cdots$、$\sin x=x-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\cdots$。
related: [binomial-theorem, important-limits, common-derivatives]
---

## 符號說明

- $f^{(n)}(a)$：$f$ 在 $a$ 的**第 $n$ 階導數**；$f^{(0)}=f$。
- $n!$：$n$ 階乘，$0!=1$。
- $a$：展開的**中心點**。$a=0$ 時稱為**馬克勞林級數**。
- 只取前幾項的和稱為**泰勒多項式**，在 $x$ 接近 $a$ 時是 $f(x)$ 的好近似。

## 使用時機

- **近似計算**：例如 $e^{0.1}$、$\sin 0.1$，用前幾項就很準。
- **在一點附近用多項式取代函數**：例如小角度時 $\sin x\approx x$、$\cos x\approx 1-\frac{x^2}{2}$。
- **求極限**：把函數換成級數，例如 $\lim\limits_{x\to 0}\frac{\sin x-x}{x^3}$。

常用的展開（對所有實數 $x$ 都成立）：

$$
\begin{aligned}
e^x&=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots\\
\sin x&=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots\\
\cos x&=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots
\end{aligned}
$$

## 例題

**例題 1**　用 $e^x$ 的前四項估計 $e^{0.1}$。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
e^{0.1}&\approx 1+0.1+\frac{0.01}{2}+\frac{0.001}{6}\\
&=1+0.1+0.005+0.000167\\
&\approx 1.105167.
\end{aligned}
$$

**驗算**：計算機算出 $e^{0.1}=1.1051709\ldots$，誤差約 $0.000004$，大約就是下一項 $\frac{0.1^4}{24}\approx 0.000004$ 的大小。

</details>

**例題 2**　求 $\lim\limits_{x\to 0}\frac{\sin x-x}{x^3}$。

<details class="example-solution">
<summary>看解答</summary>

代入 $\sin x$ 的展開：

$$
\begin{aligned}
\frac{\sin x-x}{x^3}&=\frac{-\frac{x^3}{6}+\frac{x^5}{120}-\cdots}{x^3}\\
&=-\frac{1}{6}+\frac{x^2}{120}-\cdots
\end{aligned}
$$

$x\to 0$ 時，除了第一項，其餘每一項都含有 $x$ 的正次方，都趨近 $0$，所以極限是 $-\frac{1}{6}$。

**驗算**：$x=0.01$ 時 $\frac{\sin 0.01-0.01}{0.000001}\approx -0.1666658$，接近 $-\frac{1}{6}\approx -0.1666667$。

</details>

## 推導

**係數怎麼來**：假設 $f$ 可以寫成以 $a$ 為中心的冪級數

$$
\begin{aligned}f(x)&=c_0+c_1(x-a)+c_2(x-a)^2\\&\quad+c_3(x-a)^3+\cdots\end{aligned}
$$

- 代入 $x=a$：除了 $c_0$，其餘項都是 $0$，所以 $c_0=f(a)$。
- 微分一次，$f'(x)=c_1+2c_2(x-a)+3c_3(x-a)^2+\cdots$，代入 $x=a$ 得 $c_1=f'(a)$。
- 微分 $k$ 次，$c_k(x-a)^k$ 變成 $k!\,c_k$，次方更低的項變成 $0$，次方更高的項還留有 $(x-a)$ 的因式。代入 $x=a$ 得 $f^{(k)}(a)=k!\,c_k$，所以

$$
c_k=\frac{f^{(k)}(a)}{k!}.
$$

**例：$e^x$**。$e^x$ 的每一階導數都是 $e^x$，在 $0$ 的值都是 $1$，所以 $c_k=\frac{1}{k!}$，得 $e^x=\sum\limits_{k=0}^{\infty}\frac{x^k}{k!}$。

**例：$\sin x$**。導數依序是 $\sin x,\cos x,-\sin x,-\cos x$，然後重複；在 $0$ 的值是 $0,1,0,-1$ 重複，所以只剩奇數次方，正負交錯。

這個推導說明「**如果** $f$ 能寫成冪級數，係數一定是這樣」，其中用到冪級數可以逐項微分。至於級數是否真的等於 $f(x)$，要用帶餘項的泰勒定理檢查，屬於大一微積分後段的內容；對 $e^x$、$\sin x$、$\cos x$ 而言，對所有實數 $x$ 都成立。
