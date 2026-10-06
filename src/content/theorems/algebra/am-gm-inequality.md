---
subject: algebra
order: 4
name: 算幾不等式
statement: 若 $a,b\ge 0$，則 $\dfrac{a+b}{2}\ge\sqrt{ab}$，等號成立若且唯若 $a=b$。
note: 算術平均不小於幾何平均；和固定時，兩數相等乘積最大。
proofType: full
related: [multiplication-formulas]
---

## 白話解釋

兩個非負數的**算術平均** $\dfrac{a+b}{2}$，一定不小於**幾何平均** $\sqrt{ab}$；只有兩數相等時才會一樣大。

換成生活的說法：**周長固定的長方形中，正方形的面積最大**；面積固定的長方形中，正方形的周長最小。

## 使用時機

- **求最小值**：當兩項的**乘積是定值**時，例如 $x+\dfrac{4}{x}$（$x>0$），兩項乘積是 $4$。
- **求最大值**：當兩數的**和是定值**時，乘積的最大值是 $\left(\dfrac{a+b}{2}\right)^2$。
- 用來**證明其他不等式**。

使用時要確認三件事：兩數非負、和或積是定值、等號真的能成立。

## 例題

**例題 1**　$x>0$，求 $x+\dfrac{4}{x}$ 的最小值，並求出此時的 $x$。

<details class="example-solution">
<summary>看解答</summary>

$x$ 和 $\dfrac{4}{x}$ 都是正數，由算幾不等式：

$$
\frac{x+\frac{4}{x}}{2}\ge\sqrt{x\cdot\frac{4}{x}}=\sqrt{4}=2,
$$

兩邊乘以 $2$ 得 $x+\frac{4}{x}\ge 4$。

等號成立的條件是 $x=\dfrac{4}{x}$，即 $x^2=4$，又 $x>0$，所以 $x=2$。

最小值是 $4$，在 $x=2$ 時取得。

**驗算**：$x=2$ 時 $2+2=4$；試其他值，$x=1$ 得 $5$，$x=4$ 得 $5$，都比 $4$ 大。

</details>

**例題 2**　用 $20$ 公尺長的圍籬圍成一個長方形，面積最大是多少？

<details class="example-solution">
<summary>看解答</summary>

設長為 $\ell$、寬為 $w$（公尺），周長 $2(\ell+w)=20$，所以 $\ell+w=10$。由算幾不等式：

$$
\sqrt{\ell w}\le\frac{\ell+w}{2}=5\quad\Longrightarrow\quad \ell w\le 25.
$$

等號在 $\ell=w$ 時成立，配合 $\ell+w=10$ 得 $\ell=w=5$。

面積最大是 $25$ 平方公尺，此時圍成邊長 $5$ 公尺的正方形。

**驗算**：$\ell=6,w=4$ 時面積 $24$；$\ell=7,w=3$ 時面積 $21$，都比 $25$ 小。

</details>

## 證明

設 $a,b\ge 0$，所以 $\sqrt{a}$、$\sqrt{b}$ 都是實數，而且 $\left(\sqrt{a}\right)^2=a$、$\left(\sqrt{b}\right)^2=b$、$\sqrt{a}\sqrt{b}=\sqrt{ab}$。

任何實數的平方都不是負的，所以

$$
\left(\sqrt{a}-\sqrt{b}\right)^2\ge 0.
$$

用乘法公式 $(p-q)^2=p^2-2pq+q^2$ 展開左邊，再把 $-2\sqrt{ab}$ 移到右邊，最後兩邊除以 $2$：

$$
\begin{aligned}a-2\sqrt{ab}+b&\ge 0\\ a+b&\ge 2\sqrt{ab}\\ \frac{a+b}{2}&\ge\sqrt{ab}.\end{aligned}
$$

**等號何時成立**：上面每一步都是等價的變形，所以等號成立 $\iff\left(\sqrt{a}-\sqrt{b}\right)^2=0\iff\sqrt{a}=\sqrt{b}$。兩個非負數的平方根相等，表示它們本身相等（兩邊平方即可），所以 $\iff a=b$。
