---
subject: linear
order: 4
name: 譜定理
statement: 實對稱矩陣 $A$（$A^T=A$）的特徵值都是實數，且可被正交對角化：存在正交矩陣 $Q$ 使 $Q^TAQ$ 為對角矩陣。
note: 對稱矩陣的作用，只是沿著幾個互相垂直的方向各自伸縮。
proofType: sketch
related: [characteristic-equation, trace-determinant-eigenvalues, transpose-inverse-rules, dot-product]
---

## 白話解釋

一般的矩陣作用在平面上，可能會旋轉、傾斜、伸縮混在一起。**對稱矩陣**則很單純：可以找到幾個**互相垂直**的方向，矩陣只是沿著每個方向各自伸縮（伸縮倍率就是特徵值）。

換成坐標的說法：把坐標軸轉到這些方向上（正交矩陣 $Q$ 代表旋轉或鏡射），矩陣就變成對角矩陣 $Q^TAQ$。

## 使用時機

- **對角化對稱矩陣**，再用來計算 $A^k$ 等。
- **二次曲線的主軸**：例如判斷 $2x^2+2xy+2y^2=1$ 是什麼形狀、軸在哪個方向。
- **統計與資料分析**：共變異數矩陣是對稱的，主成分分析就是找它的特徵向量。

## 例題

**例題 1**　將 $A=\begin{pmatrix}2&1\\ 1&2\end{pmatrix}$ 正交對角化。

<details class="example-solution">
<summary>看解答</summary>

$\operatorname{tr}A=4$、$\det A=3$，特徵值是 $\lambda^2-4\lambda+3=0$ 的根：$\lambda=1$、$\lambda=3$。

- $\lambda=1$：$A-I=\begin{pmatrix}1&1\\ 1&1\end{pmatrix}$，特徵向量 $(1,-1)$。
- $\lambda=3$：$A-3I=\begin{pmatrix}-1&1\\ 1&-1\end{pmatrix}$，特徵向量 $(1,1)$。

兩個特徵向量互相垂直（內積 $1-1=0$）。各除以長度 $\sqrt{2}$ 當作 $Q$ 的兩行：

$$
\begin{aligned}Q&=\frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\ -1&1\end{pmatrix},\\ Q^TAQ&=\begin{pmatrix}1&0\\ 0&3\end{pmatrix}.\end{aligned}
$$

**驗算**：$AQ$ 的兩行是 $\frac{1}{\sqrt{2}}(1,-1)$ 和 $\frac{1}{\sqrt{2}}(3,3)$，也就是 $1$ 倍和 $3$ 倍的兩個特徵向量；再左乘 $Q^T$，因為 $Q$ 的兩行是互相垂直的單位向量，得到 $\operatorname{diag}(1,3)$。

</details>

**例題 2**　$2x^2+2xy+2y^2=1$ 是什麼圖形？

<details class="example-solution">
<summary>看解答</summary>

左邊可以寫成 $\mathbf{x}^TA\mathbf{x}$，$A$ 是例題 1 的矩陣（$xy$ 的係數 $2$ 平均分給兩個非對角元素）。在特徵向量方向的新坐標 $(X,Y)$ 中（$X$ 沿 $(1,-1)$、$Y$ 沿 $(1,1)$），方程式變成

$$
X^2+3Y^2=1,
$$

是一個**橢圓**：沿 $(1,-1)$ 方向的半軸長 $1$，沿 $(1,1)$ 方向的半軸長 $\frac{1}{\sqrt{3}}$。

**驗算**：沿 $(1,-1)$ 方向距離 $1$ 的點 $\left(\frac{1}{\sqrt{2}},-\frac{1}{\sqrt{2}}\right)$ 代入，$2\cdot\frac{1}{2}-2\cdot\frac{1}{2}+2\cdot\frac{1}{2}=1$；沿 $(1,1)$ 方向距離 $\frac{1}{\sqrt{3}}$ 的點 $\left(\frac{1}{\sqrt{6}},\frac{1}{\sqrt{6}}\right)$ 代入，$\frac{2}{6}+\frac{2}{6}+\frac{2}{6}=1$。

</details>

## 證明概要

完整證明需要**複數向量的內積**，以及對矩陣階數做**數學歸納法**並用到**正交補空間**，屬於大一線性代數後段的內容。以下是三個主要步驟。

**關鍵等式**：對稱矩陣（$A^T=A$）滿足 $(A\mathbf{x})\cdot\mathbf{y}=\mathbf{x}\cdot(A\mathbf{y})$。理由：把內積寫成矩陣乘法，$(A\mathbf{x})\cdot\mathbf{y}=(A\mathbf{x})^T\mathbf{y}=\mathbf{x}^TA^T\mathbf{y}=\mathbf{x}^TA\mathbf{y}$。

1. **特徵值都是實數**：若 $A\mathbf{x}=\lambda\mathbf{x}$（$\lambda$、$\mathbf{x}$ 可能是複數），計算 $\overline{\mathbf{x}}^TA\mathbf{x}$ 兩種方式：它等於 $\lambda\,\overline{\mathbf{x}}^T\mathbf{x}$；又因為 $A$ 是實對稱矩陣，它也等於 $\overline{\lambda}\,\overline{\mathbf{x}}^T\mathbf{x}$。而 $\overline{\mathbf{x}}^T\mathbf{x}=\sum|x_i|^2>0$，所以 $\lambda=\overline{\lambda}$，是實數。
2. **不同特徵值的特徵向量互相垂直**：設 $A\mathbf{x}=\lambda_1\mathbf{x}$、$A\mathbf{y}=\lambda_2\mathbf{y}$，$\lambda_1\neq\lambda_2$。由關鍵等式，$\lambda_1(\mathbf{x}\cdot\mathbf{y})=(A\mathbf{x})\cdot\mathbf{y}=\mathbf{x}\cdot(A\mathbf{y})=\lambda_2(\mathbf{x}\cdot\mathbf{y})$，所以 $(\lambda_1-\lambda_2)(\mathbf{x}\cdot\mathbf{y})=0$，得 $\mathbf{x}\cdot\mathbf{y}=0$。
3. **一定湊得到 $n$ 個互相垂直的特徵向量**（包含特徵值重複的情形）：取一個單位特徵向量 $\mathbf{q}_1$，所有垂直於它的向量構成一個 $n-1$ 維空間，$A$ 會把這個空間送回自己（由關鍵等式），再對這個較小的空間重複同樣的論證（數學歸納法）。

把這 $n$ 個單位特徵向量排成 $Q$ 的各行，$Q$ 是正交矩陣（$Q^TQ=I$），而 $Q^TAQ$ 就是以特徵值為對角線的對角矩陣。
