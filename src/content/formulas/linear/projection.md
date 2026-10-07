---
subject: linear
order: 4
name: 投影
latex: \operatorname{proj}_{\mathbf{v}}\mathbf{u}=\dfrac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\,\mathbf{v}
note: $\mathbf{u}$ 在 $\mathbf{v}$ 方向上的分量（正射影）。
related: [dot-product, vector-length, cauchy-schwarz-inequality]
---

## 符號說明

- $\operatorname{proj}_{\mathbf{v}}\mathbf{u}$：$\mathbf{u}$ 在 $\mathbf{v}$ 方向上的**投影向量**（正射影），需要 $\mathbf{v}\neq\mathbf{0}$。
- $\frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}$：一個數，代表投影是 $\mathbf{v}$ 的幾倍。
- $\mathbf{u}-\operatorname{proj}_{\mathbf{v}}\mathbf{u}$：$\mathbf{u}$ 垂直於 $\mathbf{v}$ 的部分。

## 使用時機

- **分解向量**：把力分成沿斜面方向和垂直斜面方向兩個分量。
- **點到直線的距離**：垂直部分的長度就是距離。
- **正交化**：從一組向量造出互相垂直的向量（格拉姆–施密特方法的基本步驟）。

## 例題

**例題 1**　求 $\mathbf{u}=(2,3)$ 在 $\mathbf{v}=(4,1)$ 上的投影。

<details class="example-solution">
<summary>看解答</summary>

$\mathbf{u}\cdot\mathbf{v}=8+3=11$，$\mathbf{v}\cdot\mathbf{v}=16+1=17$：

$$
\operatorname{proj}_{\mathbf{v}}\mathbf{u}=\frac{11}{17}(4,1)=\left(\frac{44}{17},\frac{11}{17}\right).
$$

**驗算**：剩下的部分 $\mathbf{u}-\operatorname{proj}_{\mathbf{v}}\mathbf{u}=\left(-\frac{10}{17},\frac{40}{17}\right)$，和 $\mathbf{v}$ 的內積 $-\frac{40}{17}+\frac{40}{17}=0$，確實垂直。

</details>

**例題 2**　求點 $P(3,4)$ 到直線 $y=x$ 的距離。

<details class="example-solution">
<summary>看解答</summary>

直線過原點、方向 $\mathbf{v}=(1,1)$。令 $\mathbf{u}=\overrightarrow{OP}=(3,4)$：

$$
\operatorname{proj}_{\mathbf{v}}\mathbf{u}=\frac{3+4}{2}(1,1)=\left(\frac{7}{2},\frac{7}{2}\right).
$$

垂直部分是 $(3,4)-\left(\frac{7}{2},\frac{7}{2}\right)=\left(-\frac{1}{2},\frac{1}{2}\right)$，長度

$$
\sqrt{\frac{1}{4}+\frac{1}{4}}=\frac{\sqrt{2}}{2}.
$$

**驗算**：點到直線距離公式，$x-y=0$ 的距離是 $\frac{|3-4|}{\sqrt{1^2+1^2}}=\frac{1}{\sqrt{2}}=\frac{\sqrt{2}}{2}$。

</details>

## 推導

投影應該是 $\mathbf{v}$ 的某個倍數 $c\mathbf{v}$，而且剩下的部分 $\mathbf{u}-c\mathbf{v}$ 要和 $\mathbf{v}$ 垂直（像從 $\mathbf{u}$ 的終點向直線作垂線）。垂直表示內積為 $0$：

$$
(\mathbf{u}-c\mathbf{v})\cdot\mathbf{v}=0.
$$

內積對加減和常數倍可以分開計算：

$$
\mathbf{u}\cdot\mathbf{v}-c\,(\mathbf{v}\cdot\mathbf{v})=0.
$$

$\mathbf{v}\neq\mathbf{0}$，所以 $\mathbf{v}\cdot\mathbf{v}=|\mathbf{v}|^2>0$，可以除：

$$
c=\frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}},\qquad \operatorname{proj}_{\mathbf{v}}\mathbf{u}=\frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\,\mathbf{v}.
$$

$c$ 由這個方程式唯一決定，所以把 $\mathbf{u}$ 分解成「平行 $\mathbf{v}$」加「垂直 $\mathbf{v}$」的方法只有這一種。
