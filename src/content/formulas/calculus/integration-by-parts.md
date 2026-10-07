---
subject: calculus
order: 7
name: 分部積分
latex: \int u\,dv=uv-\int v\,du
note: 由乘法法則反推。$u$ 選微分後變簡單的（如 $x$、$\ln x$）。
related: [product-quotient-rules, basic-integrals, fundamental-theorem-of-calculus]
---

## 符號說明

- $u$、$v$：兩個可微的函數。
- $du=u'(x)\,dx$、$dv=v'(x)\,dx$：微分的簡寫。公式也可以寫成 $\int uv'\,dx=uv-\int u'v\,dx$。
- 使用時要把被積式拆成 $u$ 和 $dv$ 兩部分：$u$ 要拿來**微分**，$dv$ 要拿來**積分**。

## 使用時機

- **多項式乘上 $e^x$、$\sin x$、$\cos x$**：取多項式為 $u$，微分後次數會降低。
- **含 $\ln x$**：取 $u=\ln x$，因為 $\ln x$ 的導數 $\frac{1}{x}$ 比它本身簡單。
- 選 $u$ 的原則：選**微分後變簡單**的那一個，而且 $dv$ 要**積得出來**。

## 例題

**例題 1**　求 $\int xe^x\,dx$。

<details class="example-solution">
<summary>看解答</summary>

取 $u=x$、$dv=e^x\,dx$，則 $du=dx$、$v=e^x$：

$$
\begin{aligned}
\int xe^x\,dx&=xe^x-\int e^x\,dx\\
&=xe^x-e^x+C.
\end{aligned}
$$

**驗算**：$(xe^x-e^x)'=(e^x+xe^x)-e^x=xe^x$。

</details>

**例題 2**　求 $\int_1^e\ln x\,dx$。

<details class="example-solution">
<summary>看解答</summary>

取 $u=\ln x$、$dv=dx$，則 $du=\frac{1}{x}\,dx$、$v=x$：

$$
\begin{aligned}
\int_1^e\ln x\,dx&=\big[x\ln x\big]_1^e-\int_1^e x\cdot\frac{1}{x}\,dx\\
&=(e\cdot 1-1\cdot 0)-(e-1)\\
&=1.
\end{aligned}
$$

**驗算**：反導數是 $x\ln x-x$，微分得 $\ln x+1-1=\ln x$；代入上下限 $(e-e)-(0-1)=1$。

</details>

## 推導

由乘法法則：

$$
(uv)'=u'v+uv'.
$$

兩邊對 $x$ 積分。左邊是 $uv$ 的導數，積分回去就是 $uv$（加上常數，併入右邊的積分常數）：

$$
uv=\int u'v\,dx+\int uv'\,dx.
$$

移項得 $\int uv'\,dx=uv-\int u'v\,dx$，用 $du=u'\,dx$、$dv=v'\,dx$ 改寫就是 $\int u\,dv=uv-\int v\,du$。

**定積分版本**：由微積分基本定理，$\int_a^b (uv)'\,dx=\big[uv\big]_a^b$，所以

$$
\int_a^b uv'\,dx=\big[uv\big]_a^b-\int_a^b u'v\,dx.
$$
