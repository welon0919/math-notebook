---
subject: algebra
order: 3
name: 根與係數關係
statement: 若 $ax^2+bx+c=0$ 的兩根為 $\alpha,\beta$，則$$\begin{aligned}\alpha+\beta&=-\frac{b}{a},\\ \alpha\beta&=\frac{c}{a}.\end{aligned}$$
note: 不必真的解出根，也能知道兩根的和與積。
proofType: full
related: [quadratic-formula, factor-theorem]
---

## 白話解釋

一元二次方程式的兩個根，**加起來**和**乘起來**都可以直接從係數讀出來，不需要先把根解出來：

$$
\alpha+\beta=-\frac{b}{a},\qquad \alpha\beta=\frac{c}{a}.
$$

這個關係也叫做**韋達定理**。

## 使用時機

- **已知一根，求另一根**：例如知道一根，用兩根和或兩根積馬上得到另一根。
- **求兩根的對稱式**，例如 $\alpha^2+\beta^2$、$\dfrac{1}{\alpha}+\dfrac{1}{\beta}$，把它們改寫成只含 $\alpha+\beta$ 和 $\alpha\beta$ 的式子。
- **由兩根造方程式**：以 $\alpha,\beta$ 為根的二次方程式可以寫成 $x^2-(\alpha+\beta)x+\alpha\beta=0$。

## 例題

**例題 1**　設 $\alpha,\beta$ 是 $2x^2-6x+1=0$ 的兩根，求 $\alpha^2+\beta^2$ 與 $\dfrac{1}{\alpha}+\dfrac{1}{\beta}$。

<details class="example-solution">
<summary>看解答</summary>

$a=2$，$b=-6$，$c=1$，所以

$$
\alpha+\beta=-\frac{-6}{2}=3,\qquad \alpha\beta=\frac{1}{2}.
$$

由 $(\alpha+\beta)^2=\alpha^2+2\alpha\beta+\beta^2$：

$$
\begin{aligned}\alpha^2+\beta^2&=(\alpha+\beta)^2-2\alpha\beta\\&=9-1=8.\end{aligned}
$$

通分：

$$
\frac{1}{\alpha}+\frac{1}{\beta}=\frac{\alpha+\beta}{\alpha\beta}=\frac{3}{\frac{1}{2}}=6.
$$

**驗算**：用公式解，兩根是 $\dfrac{3\pm\sqrt{7}}{2}$。平方相加：$\dfrac{(9+6\sqrt{7}+7)+(9-6\sqrt{7}+7)}{4}=\dfrac{32}{4}=8$。

</details>

**例題 2**　求以 $2+\sqrt{3}$ 和 $2-\sqrt{3}$ 為兩根、首項係數為 $1$ 的二次方程式。

<details class="example-solution">
<summary>看解答</summary>

兩根和 $=(2+\sqrt{3})+(2-\sqrt{3})=4$，兩根積 $=(2+\sqrt{3})(2-\sqrt{3})=4-3=1$。所以方程式是

$$
x^2-4x+1=0.
$$

**驗算**：用公式解，$x=\dfrac{4\pm\sqrt{16-4}}{2}=\dfrac{4\pm 2\sqrt{3}}{2}=2\pm\sqrt{3}$。

</details>

## 證明

設 $a\neq 0$，$D=b^2-4ac$。由二次公式，兩根是

$$
\alpha=\frac{-b+\sqrt{D}}{2a},\qquad \beta=\frac{-b-\sqrt{D}}{2a}.
$$

**兩根和**：分母相同，分子相加時 $+\sqrt{D}$ 與 $-\sqrt{D}$ 抵消：

$$
\begin{aligned}\alpha+\beta&=\frac{(-b+\sqrt{D})+(-b-\sqrt{D})}{2a}\\&=\frac{-2b}{2a}=-\frac{b}{a}.\end{aligned}
$$

**兩根積**：分子用平方差公式 $(p+q)(p-q)=p^2-q^2$，其中 $p=-b$、$q=\sqrt{D}$：

$$
\begin{aligned}\alpha\beta&=\frac{(-b)^2-\left(\sqrt{D}\right)^2}{4a^2}\\&=\frac{b^2-(b^2-4ac)}{4a^2}\\&=\frac{4ac}{4a^2}=\frac{c}{a}.\end{aligned}
$$

$D=0$（重根）時兩根都是 $-\dfrac{b}{2a}$，上面的計算照樣成立。$D<0$ 時兩根是共軛複數，$\sqrt{D}$ 換成 $i\sqrt{-D}$，計算步驟和結果都相同。
