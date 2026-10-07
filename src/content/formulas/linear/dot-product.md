---
subject: linear
order: 1
name: 內積
latex: \mathbf{u}\cdot\mathbf{v}=u_1v_1+u_2v_2+\cdots+u_nv_n=|\mathbf{u}|\,|\mathbf{v}|\cos\theta
note: $\theta$ 為兩向量夾角；內積為 $0$ 表示兩向量垂直。
related: [vector-length, projection, cauchy-schwarz-inequality]
---

## 符號說明

- $\mathbf{u}=(u_1,\dots,u_n)$、$\mathbf{v}=(v_1,\dots,v_n)$：$n$ 維向量，粗體字代表向量。
- $\mathbf{u}\cdot\mathbf{v}$：**內積**（點積），結果是一個**數**，不是向量。
- $|\mathbf{u}|$：向量的長度。
- $\theta$：兩向量的夾角，$0\le\theta\le\pi$。

## 使用時機

- **求兩向量的夾角**：$\cos\theta=\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{u}|\,|\mathbf{v}|}$。
- **判斷垂直**：兩個非零向量垂直，若且唯若內積為 $0$。
- **物理中的功**：力 $\mathbf{F}$ 使物體位移 $\mathbf{d}$，所做的功是 $W=\mathbf{F}\cdot\mathbf{d}$。

## 例題

**例題 1**　求 $\mathbf{u}=(1,1,0)$ 與 $\mathbf{v}=(1,0,1)$ 的夾角。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}\mathbf{u}\cdot\mathbf{v}&=1\cdot 1+1\cdot 0+0\cdot 1=1,\\ |\mathbf{u}|=|\mathbf{v}|&=\sqrt{2}.\end{aligned}
$$

$$
\cos\theta=\frac{1}{\sqrt{2}\cdot\sqrt{2}}=\frac{1}{2},\qquad \theta=60^\circ.
$$

**驗算**：$\mathbf{u}-\mathbf{v}=(0,1,-1)$，長度 $\sqrt{2}$。三角形三邊都是 $\sqrt{2}$，是正三角形，夾角確實是 $60^\circ$。

</details>

**例題 2**　$k$ 為何值時，$(2,k,-1)$ 與 $(3,1,4)$ 垂直？

<details class="example-solution">
<summary>看解答</summary>

垂直表示內積為 $0$：

$$
2\cdot 3+k\cdot 1+(-1)\cdot 4=k+2=0,
$$

所以 $k=-2$。

**驗算**：$(2,-2,-1)\cdot(3,1,4)=6-2-4=0$。

</details>

## 推導

說明兩種寫法相等：$u_1v_1+\cdots+u_nv_n=|\mathbf{u}|\,|\mathbf{v}|\cos\theta$。

以 $\mathbf{u}$、$\mathbf{v}$ 和 $\mathbf{u}-\mathbf{v}$ 為三邊作三角形，$\mathbf{u}$、$\mathbf{v}$ 的夾角是 $\theta$。由餘弦定理：

$$
|\mathbf{u}-\mathbf{v}|^2=|\mathbf{u}|^2+|\mathbf{v}|^2-2|\mathbf{u}|\,|\mathbf{v}|\cos\theta.
$$

另一方面，用分量計算長度平方，再用 $(p-q)^2=p^2-2pq+q^2$ 逐項展開：

$$
\begin{aligned}
|\mathbf{u}-\mathbf{v}|^2&=\sum_{i=1}^{n}(u_i-v_i)^2\\
&=\sum u_i^2+\sum v_i^2-2\sum u_iv_i\\
&=|\mathbf{u}|^2+|\mathbf{v}|^2-2\sum u_iv_i.
\end{aligned}
$$

兩式比較，得 $\sum u_iv_i=|\mathbf{u}|\,|\mathbf{v}|\cos\theta$。

當兩向量平行（$\mathbf{v}=t\mathbf{u}$），三角形退化，但可以直接檢查：左邊 $=t|\mathbf{u}|^2$；右邊 $=|t|\,|\mathbf{u}|^2\cos\theta$，其中 $t>0$ 時 $\theta=0$、$t<0$ 時 $\theta=\pi$，兩邊仍然相等。

在 $n>3$ 維時沒有直觀的「角度」，就反過來用 $\cos\theta=\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{u}|\,|\mathbf{v}|}$ 來**定義**夾角；柯西–施瓦茨不等式保證這個值在 $-1$ 和 $1$ 之間。
