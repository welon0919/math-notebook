---
subject: algebra
order: 6
name: 換底公式
latex: \log_a b=\dfrac{\log_c b}{\log_c a}
note: $a,c>0$ 且 $a,c\neq 1$，$b>0$。計算機只有 $\log$ 或 $\ln$ 時很好用。
related: [logarithm-laws]
---

## 符號說明

- $a$：原本的底數，$b$：真數。
- $c$：換成的新底數，可以是任何正數且 $c\neq 1$，最常用 $10$ 或 $e$。
- 條件：$a,c>0$ 且 $a,c\neq 1$，$b>0$。

## 使用時機

- **用計算機求值**：計算機通常只有 $\log$（底數 10）和 $\ln$（底數 $e$），例如 $\log_2 3=\dfrac{\log 3}{\log 2}$。
- **不同底數的對數相乘或比較**：先換成同一個底數，常常可以約分。
- 推出常用的結果 $\log_a b=\dfrac{1}{\log_b a}$（取 $c=b$）。

## 例題

**例題 1**　求 $\log_2 3\cdot\log_3 8$。

<details class="example-solution">
<summary>看解答</summary>

都換成常用對數：

$$
\begin{aligned}\log_2 3\cdot\log_3 8&=\frac{\log 3}{\log 2}\cdot\frac{\log 8}{\log 3}\\&=\frac{\log 8}{\log 2}=\frac{3\log 2}{\log 2}=3.\end{aligned}
$$

（$\log 8=\log 2^3=3\log 2$。）

**驗算**：$\log_3 8=\log_3 2^3=3\log_3 2$，而 $\log_2 3\cdot\log_3 2=1$（互為倒數），所以乘積是 $3$。

</details>

**例題 2**　已知 $\log 2\approx 0.3010$、$\log 3\approx 0.4771$，求 $\log_2 3$ 的近似值。

<details class="example-solution">
<summary>看解答</summary>

$$
\log_2 3=\frac{\log 3}{\log 2}\approx\frac{0.4771}{0.3010}\approx 1.585.
$$

**驗算**：若 $\log_2 3\approx 1.585$，則 $\log 3=\log_2 3\cdot\log 2\approx 1.585\times 0.3010\approx 0.4771$，和已知的 $\log 3$ 相符。

</details>

## 推導

設 $x=\log_a b$，依定義 $a^x=b$。

1. 兩邊都是正數，可以取以 $c$ 為底的對數：$\log_c\left(a^x\right)=\log_c b$。
2. 對數律「次方變乘法」：$x\log_c a=\log_c b$。
3. 因為 $a\neq 1$，所以 $\log_c a\neq 0$（$\log_c a=0$ 表示 $a=c^0=1$）。兩邊除以 $\log_c a$：
   $$
   \log_a b=x=\frac{\log_c b}{\log_c a}.
   $$
