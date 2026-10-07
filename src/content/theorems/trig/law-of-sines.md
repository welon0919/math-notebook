---
subject: trig
order: 2
name: 正弦定理
statement: $\triangle ABC$ 中，$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}=2R$，其中 $R$ 為外接圓半徑。
note: 邊長和對角的正弦成正比：角越大，對邊越長。
proofType: full
related: [law-of-cosines, triangle-area]
---

## 白話解釋

三角形中，**每一邊的長度和它對角的正弦值成正比**，比值剛好是外接圓的直徑 $2R$。所以角越大（在 $0^\circ$ 到 $90^\circ$ 之間），對邊越長；知道兩個角和一邊，就能按比例算出其他邊。

## 使用時機

- 已知**兩角和一邊**，求其他邊。（第三個角用內角和 $180^\circ$ 求。）
- 已知**兩邊和其中一邊的對角**，求另一個角。這時要小心：$\sin B$ 的值可能對應兩個角（$B$ 和 $180^\circ-B$），可能有兩解、一解或無解。
- 求三角形的**外接圓半徑** $R=\frac{a}{2\sin A}$。

## 例題

**例題 1**　$\triangle ABC$ 中，$A=45^\circ$、$B=60^\circ$、$a=10$，求 $b$ 與外接圓半徑 $R$。

<details class="example-solution">
<summary>看解答</summary>

由正弦定理 $\frac{a}{\sin A}=\frac{b}{\sin B}$：

$$
\begin{aligned}
b&=\frac{a\sin B}{\sin A}=\frac{10\cdot\frac{\sqrt{3}}{2}}{\frac{\sqrt{2}}{2}}\\
&=\frac{10\sqrt{3}}{\sqrt{2}}=5\sqrt{6}\approx 12.25.
\end{aligned}
$$

$$
\begin{aligned}2R&=\frac{a}{\sin A}=\frac{10}{\frac{\sqrt{2}}{2}}=10\sqrt{2},\\ R&=5\sqrt{2}.\end{aligned}
$$

**驗算**：$\frac{b}{\sin B}=\frac{5\sqrt{6}}{\frac{\sqrt{3}}{2}}=\frac{10\sqrt{6}}{\sqrt{3}}=10\sqrt{2}$，和 $\frac{a}{\sin A}$ 相同。

</details>

**例題 2**　$\triangle ABC$ 中，$a=5$、$b=8$、$A=30^\circ$，求 $B$。

<details class="example-solution">
<summary>看解答</summary>

$$
\sin B=\frac{b\sin A}{a}=\frac{8\cdot\frac{1}{2}}{5}=\frac{4}{5}=0.8.
$$

$\sin B=0.8$ 的角有兩個：$B\approx 53.13^\circ$，或 $B\approx 180^\circ-53.13^\circ=126.87^\circ$。檢查兩者能否和 $A$ 組成三角形：

- $30^\circ+53.13^\circ<180^\circ$，可以。
- $30^\circ+126.87^\circ=156.87^\circ<180^\circ$，也可以。

所以有**兩個**三角形符合條件：$B\approx 53.13^\circ$ 或 $B\approx 126.87^\circ$。

**驗算**：$\sin 53.13^\circ\approx 0.8000$，$\sin 126.87^\circ=\sin 53.13^\circ\approx 0.8000$；兩種情形下 $\frac{b}{\sin B}=\frac{8}{0.8}=10=\frac{5}{0.5}=\frac{a}{\sin A}$。

</details>

## 證明

**第一部分：三個比值相等。** 用兩邊夾角的面積公式，同一個三角形的面積可以寫成三種形式：

$$
\begin{aligned}\Delta&=\frac{1}{2}bc\sin A\\&=\frac{1}{2}ca\sin B\\&=\frac{1}{2}ab\sin C.\end{aligned}
$$

三式都除以 $\frac{1}{2}abc$（邊長都是正數）：

$$
\frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}.
$$

取倒數，就得到 $\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}$。

**第二部分：比值等於 $2R$。** 畫出外接圓，圓心 $O$、半徑 $R$。從 $B$ 經過 $O$ 作直徑 $BD$，$BD=2R$，連接 $CD$。

- $\angle BCD$ 是半圓上的圓周角，所以 $\angle BCD=90^\circ$，$\triangle BCD$ 是直角三角形，$\sin\angle BDC=\frac{BC}{BD}=\frac{a}{2R}$。
- 若 $A$ 是銳角：$A$ 和 $D$ 在弦 $BC$ 的同一側，同弧 $BC$ 所對的圓周角相等，$\angle BDC=A$，所以 $\sin A=\frac{a}{2R}$。
- 若 $A$ 是鈍角：$A$ 和 $D$ 在弦 $BC$ 的兩側，$ABDC$ 是圓內接四邊形，對角互補，$\angle BDC=180^\circ-A$，而 $\sin(180^\circ-A)=\sin A$，結果相同。
- 若 $A=90^\circ$：$BC$ 本身就是直徑，$a=2R$，$\sin A=1=\frac{a}{2R}$。

三種情形都有 $\frac{a}{\sin A}=2R$。再由第一部分，三個比值都等於 $2R$。
