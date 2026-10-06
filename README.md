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
│  ├─ formulas/<科目>.json  # 公式
│  └─ theorems/<科目>.json  # 定理
├─ data/subjects.ts         # 科目清單（代號、名稱、簡介）
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

在對應科目的 JSON 陣列中加一筆，順序就是網站上的顯示順序：

```json
{ "name": "二次公式", "latex": "x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}", "note": "選填，可含 $...$" }
```

```json
{ "name": "餘式定理", "statement": "多項式 $f(x)$ 除以 $x-a$ 的餘式為 $f(a)$。", "note": "選填：一句白話說明" }
```

**JSON 裡的反斜線要寫兩次**（`\\frac`、`\\theta`）。只寫一個時，`\t`、`\n`、`\f` 等會被當成控制字元，建置會失敗並提示你。

## 建置檢查

`pnpm build` 會在以下情況失敗並指出檔案：

- 欄位缺漏或型別錯誤
- JSON 格式錯誤，或 LaTeX 反斜線沒有跳脫
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
