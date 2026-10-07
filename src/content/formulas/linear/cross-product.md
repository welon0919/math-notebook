---
subject: linear
order: 3
name: 外積
latex: \mathbf{u}\times\mathbf{v}=\begin{vmatrix}\mathbf{i}&\mathbf{j}&\mathbf{k}\\ u_1&u_2&u_3\\ v_1&v_2&v_3\end{vmatrix}
note: 只用於三維向量。結果同時垂直於 $\mathbf{u}$、$\mathbf{v}$，長度 $|\mathbf{u}|\,|\mathbf{v}|\sin\theta$ 等於兩向量張成的平行四邊形面積。
related: [dot-product, determinant-2x2, triangle-area]
---

## 符號說明

- $\mathbf{u}=(u_1,u_2,u_3)$、$\mathbf{v}=(v_1,v_2,v_3)$：**三維**向量（外積只在三維定義）。
- $\mathbf{i},\mathbf{j},\mathbf{k}$：$x$、$y$、$z$ 軸方向的單位向量。
- 公式中的「行列式」是幫助記憶的寫法：沿第一列展開，得到
  $$
  \begin{aligned}
  \mathbf{u}\times\mathbf{v}=(&u_2v_3-u_3v_2,\\
  &u_3v_1-u_1v_3,\\
  &u_1v_2-u_2v_1).
  \end{aligned}
  $$
- 結果是一個**向量**，同時垂直於 $\mathbf{u}$ 和 $\mathbf{v}$，方向依右手定則，長度 $|\mathbf{u}|\,|\mathbf{v}|\sin\theta$。

## 使用時機

- **求平面的法向量**：平面上兩個方向向量的外積，垂直於整個平面。
- **求空間中的面積**：$|\mathbf{u}\times\mathbf{v}|$ 是兩向量張成的平行四邊形面積，一半就是三角形面積。
- **物理**：力矩 $\boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}$、帶電粒子在磁場中受的力。

## 例題

**例題 1**　求 $\mathbf{u}=(1,2,3)$ 與 $\mathbf{v}=(4,5,6)$ 的外積。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
\mathbf{u}\times\mathbf{v}&=(2\cdot 6-3\cdot 5,\\
&\qquad 3\cdot 4-1\cdot 6,\\
&\qquad 1\cdot 5-2\cdot 4)\\
&=(-3,\ 6,\ -3).
\end{aligned}
$$

**驗算**：結果要同時垂直於兩個向量。$(-3,6,-3)\cdot(1,2,3)=-3+12-9=0$；$(-3,6,-3)\cdot(4,5,6)=-12+30-18=0$。

</details>

**例題 2**　求 $A(1,0,0)$、$B(0,2,0)$、$C(0,0,3)$ 三點構成的三角形面積。

<details class="example-solution">
<summary>看解答</summary>

$\overrightarrow{AB}=(-1,2,0)$、$\overrightarrow{AC}=(-1,0,3)$：

$$
\begin{aligned}
&\overrightarrow{AB}\times\overrightarrow{AC}\\
={}&(2\cdot 3-0\cdot 0,\\
&\ \ 0\cdot(-1)-(-1)\cdot 3,\\
&\ \ (-1)\cdot 0-2\cdot(-1))\\
={}&(6,\ 3,\ 2).
\end{aligned}
$$

長度 $\sqrt{36+9+4}=7$ 是平行四邊形面積，三角形面積是一半：$\frac{7}{2}$。

**驗算**：用海龍公式。$AB=\sqrt{5}$、$AC=\sqrt{10}$、$BC=\sqrt{13}$，由 $16\Delta^2=4\cdot AB^2\cdot AC^2-(AB^2+AC^2-BC^2)^2=200-4=196$，得 $\Delta=\frac{14}{4}=\frac{7}{2}$。

</details>

## 推導

**垂直**：計算 $\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v})$，展開後六項兩兩抵消：

$$
\begin{aligned}
&u_1(u_2v_3-u_3v_2)+u_2(u_3v_1-u_1v_3)\\
&\quad+u_3(u_1v_2-u_2v_1)=0.
\end{aligned}
$$

同理 $\mathbf{v}\cdot(\mathbf{u}\times\mathbf{v})=0$。內積為 $0$，所以 $\mathbf{u}\times\mathbf{v}$ 同時垂直於 $\mathbf{u}$ 和 $\mathbf{v}$。

**長度**：先證明 $|\mathbf{u}\times\mathbf{v}|^2=|\mathbf{u}|^2|\mathbf{v}|^2-(\mathbf{u}\cdot\mathbf{v})^2$。右邊展開成兩個雙重和：

$$
\sum_{i,j}u_i^2v_j^2-\sum_{i,j}u_iv_iu_jv_j.
$$

$i=j$ 的項兩邊都是 $u_i^2v_i^2$，互相抵消；$i\neq j$ 的項把 $(i,j)$ 和 $(j,i)$ 配成一對（$i<j$）：

$$
\begin{aligned}&\sum_{i<j}\left(u_i^2v_j^2+u_j^2v_i^2-2u_iv_iu_jv_j\right)\\={}&\sum_{i<j}(u_iv_j-u_jv_i)^2.\end{aligned}
$$

這正是外積三個分量的平方和，也就是左邊。再用內積公式 $\mathbf{u}\cdot\mathbf{v}=|\mathbf{u}|\,|\mathbf{v}|\cos\theta$：

$$
\begin{aligned}
|\mathbf{u}\times\mathbf{v}|^2&=|\mathbf{u}|^2|\mathbf{v}|^2(1-\cos^2\theta)\\
&=|\mathbf{u}|^2|\mathbf{v}|^2\sin^2\theta.
\end{aligned}
$$

因為 $0\le\theta\le\pi$，$\sin\theta\ge 0$，開根號得 $|\mathbf{u}\times\mathbf{v}|=|\mathbf{u}|\,|\mathbf{v}|\sin\theta$，就是以 $\mathbf{u}$、$\mathbf{v}$ 為兩邊的平行四邊形面積（底 $|\mathbf{u}|$、高 $|\mathbf{v}|\sin\theta$）。
