# 數學筆記本：專案計畫（給 Claude Code 執行）

## 給 AI 的工作方式

- 依照下方「階段」順序執行，一次只做一個階段。每個階段完成後：執行 `pnpm build` 確認沒有錯誤，列出改了哪些檔案，然後停下來等我確認，再進下一階段。
- 不確定的設計決定，先問我，不要自己猜。
- 所有網站上的文字使用**繁體中文（台灣用語）**；程式碼、檔名、變數用英文。
- 套件管理一律使用 **pnpm**（`pnpm add`、`pnpm dev`、`pnpm build`），不要使用 npm 或 yarn，也不要產生 `package-lock.json` 或 `yarn.lock`。
- 每個階段結束時做一次 git commit，訊息用英文簡短描述。

## 專案目標

一個簡單、乾淨的數學學習網站，提供：

1. **課程**：代數、三角函數、微積分、線性代數的入門課程，每堂附例題與可展開的解答。
2. **公式**：各科常用公式，可搜尋。
3. **定理**：重要定理，附一句白話說明。

對象：高中到大學一年級學生。手機和電腦都要好用。

## 技術選擇

| 項目 | 選擇 | 理由 |
|---|---|---|
| 框架 | Astro（TypeScript） | 內容型網站，大部分頁面是靜態的，速度快 |
| 內容格式 | Markdown（`.md`），放在 Astro content collections | 之後新增課程只要新增檔案 |
| 數學排版 | KaTeX，透過 `remark-math` + `rehype-katex` | 建置時就渲染好，不需在瀏覽器載入 |
| 輸出 | 純靜態網站（`astro build` 產生 `dist/`） | 不需要伺服器，可免費託管 |
| 部署 | GitHub Pages、Netlify 或 Vercel 擇一 | 都支援免費靜態網站 |
| 樣式 | 純 CSS（CSS 變數），不用 UI 框架 | 保持簡單 |

## 資料夾結構

```
math-notebook/
├─ src/
│  ├─ content/
│  │  ├─ config.ts              # content collection 的 schema
│  │  ├─ lessons/
│  │  │  ├─ algebra/01-quadratic.md
│  │  │  └─ ...
│  │  ├─ formulas/algebra.json  # 每科一個檔案
│  │  └─ theorems/algebra.json
│  ├─ pages/
│  │  ├─ index.astro            # 首頁：四個科目入口
│  │  ├─ [subject]/index.astro  # 科目頁：課程 / 公式 / 定理 三個分頁
│  │  └─ [subject]/[lesson].astro
│  ├─ components/
│  │  ├─ SubjectTabs.astro
│  │  ├─ FormulaList.astro      # 含搜尋（少量 client-side JS）
│  │  ├─ TheoremList.astro
│  │  └─ Example.astro          # 例題 + 「看解答」展開
│  ├─ layouts/Base.astro
│  └─ styles/global.css
├─ astro.config.mjs
└─ README.md
```

## 內容資料格式

**課程**（Markdown frontmatter）：

```yaml
---
subject: algebra        # algebra | trig | calculus | linear
order: 1
title: 一元二次方程式
example: 解 $x^2-5x+6=0$。
solution: 因式分解得 $(x-2)(x-3)=0$，所以 $x=2$ 或 $x=3$。
---
正文用 Markdown，數學式用 $...$ 與 $$...$$。
```

**公式**（JSON 陣列）：`{ "name": "二次公式", "latex": "x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}", "note": "選填" }`

**定理**（JSON 陣列）：`{ "name": "餘式定理", "statement": "含 $...$ 的文字", "note": "選填" }`

用 zod 在 `content/config.ts` 驗證這些欄位，格式錯誤時建置要失敗。

## 階段

### 階段 1：專案骨架
- 用 `pnpm create astro@latest` 建立 Astro + TypeScript 專案，在 `package.json` 加上 `packageManager` 欄位，並用 `pnpm add` 安裝 `remark-math`、`rehype-katex`、`katex`，設定好 KaTeX CSS。
- 建立 `Base.astro` layout、首頁、四個科目的空白頁面與導覽。
- **完成條件**：`pnpm dev` 可以打開首頁並切換四個科目；頁面上一個測試算式 $e^{i\pi}+1=0$ 正確顯示。

### 階段 2：內容系統與初始內容
- 建立 content collections 與 schema。
- 每科填入：3–4 堂課（附例題和解答）、8–10 條公式、4 條定理。內容參考下方「初始內容清單」。
- **完成條件**：所有算式都能正確渲染，沒有 KaTeX 錯誤（紅字）；`pnpm build` 通過。

### 階段 3：頁面與互動
- 科目頁有「課程 / 公式 / 定理」三個分頁。
- 公式與定理可依名稱、說明搜尋，找不到時顯示提示文字。
- 例題的解答預設收起，點「看解答」展開（用 `<details>` 即可）。
- **完成條件**：手機寬度（375px）下版面不會橫向捲動，寬的算式在自己的區塊內捲動。

### 階段 4：視覺設計
- 風格：方格筆記本。淡色方格背景、內容區左側一條紅色邊線、深藍墨水色文字。
- 字型：標題 Noto Serif TC，內文 Noto Sans TC。
- 支援深色模式（`prefers-color-scheme`），鍵盤操作有清楚的 focus 樣式。
- **完成條件**：淺色與深色模式下文字對比清楚。

### 階段 5：部署
- 網站維持純靜態輸出，部署設定也使用 pnpm（例如 GitHub Actions 裡用 `pnpm/action-setup`），撰寫 `README.md`（本機開發、新增課程的方式、部署步驟）。
- 部署前先問我要用 GitHub Pages、Netlify 還是 Vercel，再依選擇加入對應設定（例如 GitHub Actions workflow）。
- **完成條件**：部署後所有頁面、搜尋與算式都正常顯示。

## 初始內容清單

**代數**
- 課程：一元二次方程式、指數與對數、數列與級數
- 公式：二次公式、乘法公式、立方和差、指數律、對數律、換底公式、等差級數和、等比級數和、二項式定理
- 定理：餘式定理、因式定理、根與係數關係、算幾不等式

**三角函數**
- 課程：直角三角形與三角比、單位圓與弧度、解三角形
- 公式：特殊角表、平方關係、商數關係、和角、倍角、降冪、度與弧度換算、三角形面積
- 定理：畢氏定理、正弦定理、餘弦定理、疊合

**微積分**
- 課程：極限、導數與極值、積分
- 公式：導數定義、冪次法則、乘法/除法法則、連鎖律、常見導數、基本積分、分部積分、重要極限、泰勒展開
- 定理：微積分基本定理、均值定理、中間值定理、羅必達法則

**線性代數**
- 課程：向量與內積、矩陣運算、線性方程組、特徵值與特徵向量
- 公式：內積、向量長度、外積、投影、二階行列式、二階反矩陣、轉置與反矩陣、行列式性質、特徵方程式、跡與行列式
- 定理：秩–零化度定理、可逆矩陣定理、柯西–施瓦茨不等式、譜定理

## 之後可以做的（先不要做）
- 機率與統計、幾何等新科目
- 每堂課加入更多練習題
- 使用者帳號與學習進度紀錄
