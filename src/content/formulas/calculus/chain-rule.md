---
subject: calculus
order: 4
name: 連鎖律
latex: \dfrac{d}{dx}f\big(g(x)\big)=f'\big(g(x)\big)\,g'(x)
note: 外層微分（裡面不動）再乘上內層的微分。
related: [product-quotient-rules, common-derivatives, power-rule]
---

## 符號說明

- $f\big(g(x)\big)$：**合成函數**，$g$ 是**內層**、$f$ 是**外層**。
- $f'\big(g(x)\big)$：外層函數的導數，在內層的值 $g(x)$ 計算（裡面不動）。
- 萊布尼茲寫法：令 $u=g(x)$、$y=f(u)$，則 $\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$。

## 使用時機

- 微分**一個函數套在另一個函數裡**，例如 $(3x+1)^5$、$\sin(x^2)$、$e^{-x^2}$。
- 和乘法、除法法則搭配，微分較複雜的式子。
- **相關變化率**：例如氣球半徑隨時間變化時，體積隨時間的變化率。

## 例題

**例題 1**　求 $\big((3x+1)^5\big)'$。

<details class="example-solution">
<summary>看解答</summary>

外層 $u^5$（導數 $5u^4$），內層 $u=3x+1$（導數 $3$）：

$$
\begin{aligned}\big((3x+1)^5\big)'&=5(3x+1)^4\cdot 3\\&=15(3x+1)^4.\end{aligned}
$$

**驗算**：$x=0$ 時公式值為 $15$；差商 $\frac{(1.0003)^5-1}{0.0001}\approx 15.009$，接近 $15$。

</details>

**例題 2**　求 $(\sin^2 x)'$，並化簡。

<details class="example-solution">
<summary>看解答</summary>

$\sin^2 x=(\sin x)^2$，外層 $u^2$（導數 $2u$），內層 $u=\sin x$（導數 $\cos x$）：

$$
(\sin^2 x)'=2\sin x\cos x=\sin 2x.
$$

（最後一步用倍角公式。）

**驗算**：由降冪公式 $\sin^2 x=\frac{1-\cos 2x}{2}$，微分得 $\frac{0-(-\sin 2x)\cdot 2}{2}=\sin 2x$，兩種算法相同。

</details>

## 推導

令 $u=g(x)$，$k=g(x+h)-g(x)$。直覺上

$$
\begin{aligned}&\frac{f(u+k)-f(u)}{h}\\={}&\frac{f(u+k)-f(u)}{k}\cdot\frac{k}{h},\end{aligned}
$$

但 $k$ 可能等於 $0$，不能直接除。為了避開這個問題，定義一個輔助函數

$$
\varphi(k)=\begin{cases}\dfrac{f(u+k)-f(u)}{k}, & k\neq 0,\\[2mm] f'(u), & k=0.\end{cases}
$$

- 由導數的定義，$k\to 0$ 時 $\varphi(k)\to f'(u)=\varphi(0)$。
- 不管 $k$ 是不是 $0$，都有 $f(u+k)-f(u)=\varphi(k)\cdot k$（$k=0$ 時兩邊都是 $0$）。

所以

$$
\begin{aligned}&\frac{f\big(g(x+h)\big)-f\big(g(x)\big)}{h}\\={}&\varphi(k)\cdot\frac{g(x+h)-g(x)}{h}.\end{aligned}
$$

當 $h\to 0$：$g$ 可微所以連續，$k\to 0$，於是 $\varphi(k)\to f'(u)=f'\big(g(x)\big)$；而 $\frac{g(x+h)-g(x)}{h}\to g'(x)$。兩者相乘，得 $f'\big(g(x)\big)\,g'(x)$。
