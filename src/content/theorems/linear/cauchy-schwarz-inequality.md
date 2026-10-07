---
subject: linear
order: 3
name: 柯西–施瓦茨不等式
statement: $|\mathbf{u}\cdot\mathbf{v}|\le|\mathbf{u}|\,|\mathbf{v}|$，等號成立若且唯若兩向量平行（其中一個是另一個的倍數）。
note: 內積的大小不會超過兩個長度相乘，因為 $|\cos\theta|\le 1$。
proofType: full
related: [dot-product, vector-length, projection, am-gm-inequality]
---

## 白話解釋

在二維、三維中，$\mathbf{u}\cdot\mathbf{v}=|\mathbf{u}|\,|\mathbf{v}|\cos\theta$，而 $|\cos\theta|\le 1$，所以內積的大小不會超過兩個長度相乘。只有兩向量**平行**（夾角 $0$ 或 $\pi$）時才會相等。

在更高維度，「夾角」本身就是用內積定義的，所以需要一個**不靠角度**的證明。柯西–施瓦茨不等式正好保證 $\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{u}|\,|\mathbf{v}|}$ 介於 $-1$ 和 $1$ 之間，夾角的定義才合理。

## 使用時機

- **定義任意維度的夾角**：保證 $\cos\theta$ 的值在 $[-1,1]$。
- **證明三角不等式** $|\mathbf{u}+\mathbf{v}|\le|\mathbf{u}|+|\mathbf{v}|$。
- **證明代數不等式**：選擇適當的兩個向量，例如證明 $(a+b+c)^2\le 3(a^2+b^2+c^2)$。

## 例題

**例題 1**　對 $\mathbf{u}=(1,2,3)$、$\mathbf{v}=(4,5,6)$ 驗證不等式。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
\mathbf{u}\cdot\mathbf{v}&=4+10+18=32,\\
|\mathbf{u}|\,|\mathbf{v}|&=\sqrt{14}\cdot\sqrt{77}=\sqrt{1078}\approx 32.83.
\end{aligned}
$$

$32\le 32.83$，不等式成立；兩向量不平行，所以是嚴格小於。

**驗算**：兩邊平方比較，$32^2=1024<1078$。

</details>

**例題 2**　實數 $a,b,c$ 滿足 $a+b+c=3$，證明 $a^2+b^2+c^2\ge 3$。

<details class="example-solution">
<summary>看解答</summary>

取 $\mathbf{u}=(a,b,c)$、$\mathbf{v}=(1,1,1)$，則 $\mathbf{u}\cdot\mathbf{v}=a+b+c=3$，$|\mathbf{v}|=\sqrt{3}$。由不等式：

$$
3\le\sqrt{a^2+b^2+c^2}\cdot\sqrt{3}.
$$

兩邊都不是負數，平方得 $9\le 3(a^2+b^2+c^2)$，即 $a^2+b^2+c^2\ge 3$。等號在 $\mathbf{u}$ 平行 $\mathbf{v}$ 時成立，也就是 $a=b=c=1$。

**驗算**：$a=b=c=1$ 時 $a^2+b^2+c^2=3$；$a=3,b=c=0$ 時是 $9\ge 3$。

</details>

## 證明

**$\mathbf{v}=\mathbf{0}$ 時**：兩邊都是 $0$，成立（而且 $\mathbf{v}=0\cdot\mathbf{u}$，算是平行）。

**$\mathbf{v}\neq\mathbf{0}$ 時**：長度的平方不會是負的，所以對任何實數 $t$：

$$
|\mathbf{u}-t\mathbf{v}|^2\ge 0.
$$

用內積展開（內積對加減、常數倍可以分開，且 $\mathbf{u}\cdot\mathbf{v}=\mathbf{v}\cdot\mathbf{u}$）：

$$
|\mathbf{u}|^2-2t\,(\mathbf{u}\cdot\mathbf{v})+t^2|\mathbf{v}|^2\ge 0.
$$

取 $t=\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{v}|^2}$（也就是投影的係數）代入：

$$
\begin{aligned}
&|\mathbf{u}|^2-2\frac{(\mathbf{u}\cdot\mathbf{v})^2}{|\mathbf{v}|^2}+\frac{(\mathbf{u}\cdot\mathbf{v})^2}{|\mathbf{v}|^2}\\
={}&|\mathbf{u}|^2-\frac{(\mathbf{u}\cdot\mathbf{v})^2}{|\mathbf{v}|^2}\ge 0.
\end{aligned}
$$

兩邊乘以 $|\mathbf{v}|^2>0$：$(\mathbf{u}\cdot\mathbf{v})^2\le|\mathbf{u}|^2|\mathbf{v}|^2$。兩邊開根號（都不是負數），得 $|\mathbf{u}\cdot\mathbf{v}|\le|\mathbf{u}|\,|\mathbf{v}|$。

**等號何時成立**：等號成立表示上面取的 $t$ 使 $|\mathbf{u}-t\mathbf{v}|^2=0$，也就是 $\mathbf{u}=t\mathbf{v}$，兩向量平行。反過來，若 $\mathbf{u}=s\mathbf{v}$，左邊 $|s|\,|\mathbf{v}|^2$、右邊 $|s|\,|\mathbf{v}|\cdot|\mathbf{v}|$，相等。
