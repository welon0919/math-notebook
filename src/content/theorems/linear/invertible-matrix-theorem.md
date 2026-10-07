---
subject: linear
order: 2
name: 可逆矩陣定理
statement: 對 $n$ 階方陣 $A$，下列敘述等價：$$\begin{aligned}&A\ \text{可逆}\\ &\det A\neq 0\\ &A\mathbf{x}=\mathbf{0}\ \text{只有零解}\\ &\operatorname{rank}A=n\\ &0\ \text{不是}\ A\ \text{的特徵值}\end{aligned}$$
note: 這些條件說的都是同一件事：$A$ 沒有把任何方向壓扁。
proofType: sketch
related: [determinant-properties, rank-nullity-theorem, characteristic-equation, inverse-2x2]
---

## 白話解釋

對方陣來說，這五個條件說的是**同一件事**：$A$ 沒有把任何方向壓扁。只要其中一個成立，其他全部成立；只要一個不成立，全部都不成立。

- 壓扁了某個方向 $\Longleftrightarrow$ 有非零向量被送到 $\mathbf{0}$（$A\mathbf{x}=\mathbf{0}$ 有非零解）。
- 被送到 $\mathbf{0}$ 的非零向量，就是特徵值 $0$ 的特徵向量。
- 壓扁之後面積或體積變成 $0$，所以行列式為 $0$；也就無法把它還原，沒有反矩陣。

## 使用時機

- **挑最好檢查的條件**：$2$、$3$ 階通常算行列式最快；大矩陣則用列運算求秩。
- **由一個條件得到其他結論**：例如知道 $\det A\neq 0$，就知道 $A\mathbf{x}=\mathbf{b}$ 對每個 $\mathbf{b}$ 都有唯一解。
- **連結特徵值**：$0$ 是特徵值，就表示 $A$ 不可逆。

## 例題

**例題 1**　$A=\begin{pmatrix}1&2\\ 2&4\end{pmatrix}$ 可逆嗎？用其他條件印證。

<details class="example-solution">
<summary>看解答</summary>

$\det A=4-4=0$，所以**不可逆**。其他條件也應該都不成立：

- $A\mathbf{x}=\mathbf{0}$ 有非零解：$A(2,-1)^T=(2-2,\ 4-4)=(0,0)$。
- 秩不是 $2$：第二列是第一列的 $2$ 倍，化簡後只剩一個領導元，$\operatorname{rank}A=1$。
- $0$ 是特徵值：$A(2,-1)^T=\mathbf{0}=0\cdot(2,-1)^T$。

**驗算**：特徵方程式 $\lambda^2-5\lambda+0=\lambda(\lambda-5)$，確實有根 $0$。

</details>

**例題 2**　$k$ 為何值時，$A=\begin{pmatrix}1&k\\ k&4\end{pmatrix}$ 可逆？

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}&\det A=4-k^2\neq 0\\ \iff{}&k\neq 2\ \text{且}\ k\neq -2.\end{aligned}
$$

$k\neq\pm 2$ 時 $A$ 可逆；因此對這些 $k$，方程組 $A\mathbf{x}=\mathbf{b}$ 對每個 $\mathbf{b}$ 都有唯一解。

**驗算**：$k=2$ 時 $A=\begin{pmatrix}1&2\\ 2&4\end{pmatrix}$，就是例題 1 中不可逆的矩陣。

</details>

## 證明概要

完整證明需要**初等矩陣**和**行列式的一般定義**（$n$ 階行列式的展開與性質），屬於大一線性代數的內容。各條件之間的關係如下：

1. **可逆 $\Rightarrow$ $A\mathbf{x}=\mathbf{0}$ 只有零解**：若 $A\mathbf{x}=\mathbf{0}$，兩邊左乘 $A^{-1}$ 得 $\mathbf{x}=A^{-1}\mathbf{0}=\mathbf{0}$。
2. **只有零解 $\Leftrightarrow$ $\operatorname{rank}A=n$**：只有零解表示零化度為 $0$，由秩–零化度定理，秩 $=n-0=n$。
3. **$\operatorname{rank}A=n$ $\Rightarrow$ 可逆**：$n$ 個領導元表示最簡列梯形是 $I$。每個列運算都等於左乘一個可逆的**初等矩陣** $E_i$，所以 $E_k\cdots E_1A=I$，於是 $A^{-1}=E_k\cdots E_1$。（這裡也要用到：方陣只要一邊的反矩陣存在，另一邊也成立。）
4. **可逆 $\Leftrightarrow$ $\det A\neq 0$**：若可逆，$\det A\det(A^{-1})=\det I=1$，所以 $\det A\neq 0$。反過來，列運算只會讓行列式變號、乘上非零數或不變，若 $\det A\neq 0$，最簡列梯形的行列式也不為 $0$，對角線不能有 $0$，所以是 $I$，由第 3 點 $A$ 可逆。
5. **$0$ 不是特徵值 $\Leftrightarrow$ 只有零解**：$0$ 是特徵值，就是存在 $\mathbf{x}\neq\mathbf{0}$ 使 $A\mathbf{x}=0\mathbf{x}=\mathbf{0}$。
