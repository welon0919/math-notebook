# 數學筆記本

給高中到大一學生的數學入門網站：代數、三角函數、微積分、線性代數的課程（附例題與可展開的解答）、可搜尋的公式與定理。

使用 [Astro](https://astro.build) 產生純靜態網站，數學式由 KaTeX 在建置時渲染。

## 本機開發

需要 Node.js 22.12 以上與 [pnpm](https://pnpm.io)（版本見 `package.json` 的 `packageManager`）。

```sh
pnpm install     # 安裝套件
pnpm dev         # 開發伺服器：http://localhost:4321
pnpm build       # 建置到 dist/
pnpm preview     # 預覽建置結果
```

> 本專案一律使用 pnpm，請不要用 npm 或 yarn。

開發伺服器用 Ctrl+C 結束；若是以 `pnpm dev --background` 在背景啟動，請用 `pnpm exec astro dev stop` 關閉。

## 專案結構

```
src/
├─ content.config.ts        # 內容格式（zod schema），格式錯誤會讓建置失敗
├─ content/
│  ├─ lessons/<科目>/*.md   # 課程
│  ├─ formulas/<科目>/*.md  # 公式（每條一個檔案）
│  └─ theorems/<科目>/*.md  # 定理（每條一個檔案）
├─ data/subjects.ts         # 科目清單（代號、名稱、簡介）
├─ lib/items.ts             # 載入公式與定理，檢查 slug 與 related
├─ components/              # 分頁、公式/定理清單、例題
├─ layouts/Base.astro
├─ pages/
└─ styles/global.css        # 方格筆記本主題（含深色模式）
```

科目代號：`algebra`（代數）、`trig`（三角函數）、`calculus`（微積分）、`linear`（線性代數）。

## 新增課程

在 `src/content/lessons/<科目代號>/` 新增一個 `.md` 檔，檔名會成為網址，例如 `algebra/04-polynomials.md` → `/algebra/04-polynomials/`。

```md
---
subject: algebra        # 必須和所在資料夾相同
order: 4                # 在課程列表中的順序
title: 多項式
example: 求 $(x+1)(x-2)$ 的展開式。
solution: 展開得 $x^2-x-2$。
---

正文用 Markdown。行內算式寫 $...$，獨立算式寫：

$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$
```

`example` 與 `solution` 也可以用 `$...$` 寫算式。

## 新增公式或定理

每條公式或定理是一個 Markdown 檔，放在 `src/content/formulas/<科目代號>/` 或 `src/content/theorems/<科目代號>/`。**檔名就是 slug**：英文小寫、用連字號連接（例如 `quadratic-formula.md`），而且全站（所有科目的公式與定理）不能重複。

公式：

```md
---
subject: algebra
order: 1                       # 在列表中的順序（同科目內不可重複）
name: 二次公式
latex: x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}
note: 選填，可含 $...$
related: [vieta]               # 選填：其他公式或定理的 slug，可跨科目
---
```

定理：

```md
---
subject: algebra
order: 1
name: 餘式定理
statement: 多項式 $f(x)$ 除以 $x-a$ 的餘式等於 $f(a)$。
note: 選填：一句白話說明
proofType: full                # full（完整證明）或 sketch（證明概要）
related: [factor-theorem]
---
```

frontmatter 裡的 LaTeX 直接照寫，反斜線**只寫一個**。若內容以 `|`、`[`、`{` 等符號開頭，或含有「: 」，請用單引號包起來，例如 `latex: '|\mathbf{v}|=...'`。**不要用雙引號**：雙引號會把 `\t`、`\f`、`\n` 當成控制字元（建置會失敗並提示）。

## 建置檢查

`pnpm build` 會在以下情況失敗並指出檔案：

- 欄位缺漏或型別錯誤
- 公式或定理的 slug 重複、檔案放錯科目資料夾、`order` 重複，或 `related` 指向不存在的 slug
- 任何算式有 KaTeX 錯誤（包含課程正文、例題、公式、定理）

## 部署（Netlify）

網站部署在 Netlify，建置設定在 `netlify.toml`（`pnpm build`、輸出 `dist/`、Node 22、pnpm 版本）。

### 第一次設定

```sh
pnpm --package=netlify-cli dlx netlify login          # 在瀏覽器登入 Netlify
pnpm --package=netlify-cli dlx netlify sites:create   # 建立網站（或用 link 連結既有網站）
```

### 每次發布

```sh
pnpm --package=netlify-cli dlx netlify deploy --build          # 先發布到預覽網址檢查
pnpm --package=netlify-cli dlx netlify deploy --build --prod   # 發布到正式網址
```

`--build` 會依照 `netlify.toml` 在本機建置後上傳 `dist/`。

### 改用 Git 自動部署（選用）

把專案推到 GitHub，在 Netlify 後台選 **Add new site → Import an existing project** 連結該 repo。Netlify 會讀取 `netlify.toml`，偵測到 `pnpm-lock.yaml` 後用 pnpm 建置，之後每次 push 到 `main` 就會自動部署。
