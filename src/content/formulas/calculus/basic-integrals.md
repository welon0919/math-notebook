---
subject: calculus
order: 6
name: 基本積分
latex: \begin{aligned}\int x^n\,dx&=\dfrac{x^{n+1}}{n+1}+C\quad(n\neq -1)\\ \int\dfrac{1}{x}\,dx&=\ln|x|+C\\ \int e^x\,dx&=e^x+C\\ \int\sin x\,dx&=-\cos x+C\\ \int\cos x\,dx&=\sin x+C\end{aligned}
note: 不定積分都要加上積分常數 $C$。
related: [fundamental-theorem-of-calculus, common-derivatives, power-reduction]
---

## 符號說明

- $\int f(x)\,dx$：**不定積分**，代表所有導數等於 $f(x)$ 的函數（反導數）。
- $C$：**積分常數**。同一個函數的反導數彼此只差一個常數。
- $dx$：表示對變數 $x$ 積分。
- $\ln|x|$：$\frac{1}{x}$ 的反導數，對 $x>0$ 和 $x<0$ 都成立（$x=0$ 時沒有定義）。

## 使用時機

- **求反導數**：微分的反運算，例如已知速度求位置。
- **計算定積分**：由微積分基本定理，$\int_a^b f(x)\,dx=F(b)-F(a)$，只要先找到反導數 $F$。
- 和降冪公式、換元積分、分部積分搭配，處理更複雜的積分。

## 例題

**例題 1**　求 $\int(3x^2-4x+5)\,dx$。

<details class="example-solution">
<summary>看解答</summary>

逐項積分（常數倍和加減可以分開）：

$$
\begin{aligned}
&\int(3x^2-4x+5)\,dx\\
={}&3\cdot\frac{x^3}{3}-4\cdot\frac{x^2}{2}+5x+C\\
={}&x^3-2x^2+5x+C.
\end{aligned}
$$

**驗算**：微分 $x^3-2x^2+5x+C$ 得 $3x^2-4x+5$。

</details>

**例題 2**　求 $\int_0^{\pi}\sin x\,dx$。

<details class="example-solution">
<summary>看解答</summary>

$-\cos x$ 是 $\sin x$ 的反導數：

$$
\begin{aligned}
\int_0^{\pi}\sin x\,dx&=\big[-\cos x\big]_0^{\pi}\\
&=(-\cos\pi)-(-\cos 0)\\
&=1+1=2.
\end{aligned}
$$

這表示正弦曲線的一個拱形，和 $x$ 軸圍成的面積是 $2$。

**驗算**：把 $[0,\pi]$ 切成 $1000$ 等分、用中點的高度近似，長方形面積總和約 $2.0000008$，非常接近 $2$。

</details>

## 推導

每一條都只要**把右邊微分，檢查會得到左邊的被積函數**：

- $\left(\frac{x^{n+1}}{n+1}\right)'=\frac{(n+1)x^n}{n+1}=x^n$，需要 $n\neq -1$（否則分母為 $0$）。
- $x>0$ 時 $(\ln x)'=\frac{1}{x}$；$x<0$ 時 $\ln|x|=\ln(-x)$，連鎖律得 $\frac{1}{-x}\cdot(-1)=\frac{1}{x}$。
- $(e^x)'=e^x$；$(-\cos x)'=\sin x$；$(\sin x)'=\cos x$。

**為什麼要加 $C$**：若 $F'=G'=f$ 在一個區間上成立，則 $(F-G)'=0$。由均值定理，導數處處為 $0$ 的函數在區間上是常數（任取兩點 $p<q$，存在 $c$ 使 $(F-G)(q)-(F-G)(p)=0\cdot(q-p)=0$）。所以所有反導數都是 $F+C$ 的形式。
