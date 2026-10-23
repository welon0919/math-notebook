# Math Notebook (數學筆記本)

A math learning site for high school to first-year university students: lessons, formulas, and theorems for algebra, trigonometry, calculus, and linear algebra. Fully static site built with Astro, deployed on Netlify from GitHub.

- GitHub: https://github.com/welon0919/math-notebook
- Live site: https://math-notebook-238.netlify.app
## Commands

```bash
pnpm install        # install dependencies
pnpm dev            # local dev server
pnpm build          # production build (run after every change; must pass)
pnpm preview        # preview the build
pnpm test:e2e       # Playwright: builds, then checks every page that has a <Graph>
scripts/verify/.venv/bin/python scripts/verify/<subject>_batch<n>.py   # SymPy answer checks
```

The SymPy virtualenv is created with `python3 -m venv scripts/verify/.venv && scripts/verify/.venv/bin/pip install sympy` (it is gitignored).

Use pnpm only. Never use npm or yarn, and never create `package-lock.json` or `yarn.lock`.

## Project structure

```
src/
  content.config.ts          zod schemas for lessons, formulas and theorems
  content/
    lessons/<subject>/<slug>.mdx       one lesson per file → /<subject>/<slug>/
    formulas/<subject>/<slug>.md(x)    one formula per file → /<subject>/formulas/<slug>/
    theorems/<subject>/<slug>.md(x)    one theorem per file → /<subject>/theorems/<slug>/
  data/
    subjects.ts              subject ids, names and one-line descriptions (home page)
    units.ts                 each subject's units, in teaching order
  lib/
    lessons.ts               loads lessons and fails the build on broken rules (see below)
    items.ts                 loads formulas and theorems; their URLs and prev/next
    math.ts                  KaTeX rendering for text outside Markdown (components, graph labels)
    rehype-katex-strict.mjs  turns any KaTeX error or warning into a build failure
    long-division.ts         long / synthetic division steps, checked against f = g·q + r
    search.ts                text normalization for search
  components/                Solution, Graph, ProofStep, Derivation, Stepper, LongDivision,
                             SyntheticDivision, SubjectTabs, FormulaList, TheoremList, ItemDetail, …
  pages/
    index.astro                        home
    [subject]/index.astro              subject page: lessons grouped by unit, formulas, theorems
    [subject]/[lesson].astro           lesson page; passes the components above to MDX (no imports needed)
    [subject]/formulas/[slug].astro    formula detail page
    [subject]/theorems/[slug].astro    theorem detail page
    algebra/long-division.astro        step-by-step long division page
  graphs/
    types.ts                 GraphDef and GraphContext (colors, readout, button, animate, proof steps)
    helpers.ts               shared helpers (snap, piTicks, keepInside, magnet, …)
    terminal-side.ts         factory for fixed "angle through a point" diagrams (not a graph itself)
    sinusoid-plot.ts         factory for fixed function plots in worked examples (not a graph itself)
    <subject>/<name>.ts      one graph per file, used as <Graph name="<subject>/<name>" />
  scripts/
    graph.ts                 browser runtime: lazy-loads JSXGraph, draws graphs, readouts, buttons,
                             proof steps, redraws on light/dark change
    search.ts                site search
  layouts/Base.astro, styles/global.css
astro.config.mjs             MDX, remark-math + rehype-katex (strict), redirects from old numbered URLs
docs/
  course-guidelines.md       how to write lessons, graphs and checks — read before writing content
  syllabus.md                full course outline and confirmed decisions
features/                    feature plans (FEATURE-*.md), including progress; gitignored, local only
PLAN.md                      the original project plan
scripts/verify/              SymPy scripts, one per content batch (not part of the site)
tests/graphs.spec.ts         e2e test; playwright.config.ts runs it at 375 / 1280 px × light / dark
public/                      favicons
netlify.toml                 build command, publish dir, Node and pnpm versions, cache headers
```

Subject keys: `algebra`, `trig`, `calculus`, `linear`.

Details worth knowing:

- **Build-time checks** (`src/lib/lessons.ts`): a lesson's folder must match its `subject`; slugs are unique across the site; `unit` must be listed in `units.ts`; `order` is unique per subject and units never go backwards; `prerequisites` must exist, come earlier in the same subject (cross-subject is allowed) and form no cycle; `formulas` / `theorems` slugs must exist. Any violation fails `pnpm build`.
- **Lesson frontmatter**: `subject`, `unit`, `order`, `title`, `summary`, optional `prerequisites`, `formulas`, `theorems`. Every lesson body has the sections 學習目標, 概念說明, 例題, 常見錯誤, 練習題 (details in `docs/course-guidelines.md`).
- **Graphs**: graph files are also imported at build time for their title and description, so they may only `import type` from `jsxgraph`. Colors come from `ctx.color` (CSS variables) so dark mode works. A graph inside `<Solution>` draws when the solution is opened. `<Graph … proof />` with `<ProofStep>` paragraphs makes a step-by-step proof (one per page).
- **KaTeX** runs with `strict: 'error'`: Chinese inside math must be in `\text{}`; any warning fails the build.
- **Node**: Node ≥ 22.12 (`engines` in `package.json`); Netlify uses `NODE_VERSION` in `netlify.toml`. pnpm's version is `packageManager` in `package.json` and `PNPM_VERSION` in `netlify.toml`.
- **Generated / ignored**: `dist/`, `.astro/`, `.netlify/`, `screenshots/`, `test-results/`, `features/`, `scripts/verify/.venv/`.

## Content rules

- All user-facing text on the site is in **Traditional Chinese (Taiwan usage)**; use the terminology of Taiwanese textbooks. Code, file names, and slugs are in English.
- Math uses KaTeX: inline `$...$`, display `$$...$$`.
- Slugs are lowercase, hyphenated English with no numeric prefix; ordering comes only from the `order` frontmatter field.
- Every step of a derivation or solution must be justified. Never skip steps with "obviously" or "it is easy to see".
- After adding or changing examples or exercises, verify the answers with SymPy (scripts go in `scripts/verify/`, not in the site).
- Coordinates, angles, and areas in graphs must be computed in code, never eyeballed.
- Do not add new formulas or theorems on your own; list them and ask me first.

## Git and GitHub workflow

- **Never commit directly to `main`.** Create a branch for each feature or content batch, e.g. `feature/graphs`, `content/algebra-unit-2`, `fix/unit-circle-sign`.
- Commit messages are short English descriptions, e.g. `Add lessons for algebra unit 2`.
- Commit only after a phase is done and `pnpm build` passes.
- **Ask me before pushing or opening a pull request.** Open PRs with `gh pr create`; the description should list what changed and what I need to review (e.g. "please check the solution to exercise 3").
- Never force push, delete branches, or rewrite `main` history.
- Never commit `node_modules/`, `dist/`, `.astro/`, `.netlify/`, `screenshots/`, or any file containing secrets.

## GitHub CLI (`gh`)

Before running any `gh` command, tell the user which command you want to run and what it will do (for example, "open a PR from `calculus` into `main` titled …", or "post this comment on PR #3"). Do this every time, including read-only commands such as `gh pr list`, and including when the user has already asked for the result. Run the command only after telling them.

## Deployment (Netlify)

- Netlify deploys `main` automatically, so `main` must always build.
- Every PR gets a Netlify Deploy Preview. Mention in the PR description which preview pages I should check.
- **Never run `netlify deploy` manually.**
- Build settings live in `netlify.toml`; don't rely on settings in the Netlify UI. If the Node or pnpm version changes, update both `package.json` and `netlify.toml`.

## How to work

- Follow the phases in the plan files under `features/` in order, one phase at a time. When a phase is done, list the files you changed and stop for my review.
- Ask me about design decisions you are unsure of; don't guess.
- If the code and a plan file disagree, the code wins — tell me what the difference is.