import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { expect, test } from '@playwright/test';

/**
 * Opens every page whose content uses <Graph>, checks that each graph draws,
 * that the page has no console errors or horizontal scrolling, and saves a
 * full-page screenshot to screenshots/<width>-<scheme>/ for manual review.
 */

const contentDir = join(import.meta.dirname, '../src/content');

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]));
}

/** src/content/lessons/algebra/01-quadratic.mdx → /algebra/01-quadratic/; formulas and theorems get their kind in the path. */
function urlOf(file: string): string {
  const [kind, subject, name] = relative(contentDir, file).replace(/\.mdx$/, '').split('/');
  return kind === 'lessons' ? `/${subject}/${name}/` : `/${subject}/${kind}/${name}/`;
}

const pages = files(contentDir)
  .filter((f) => f.endsWith('.mdx') && readFileSync(f, 'utf8').includes('<Graph'))
  .map(urlOf)
  .sort();

test('graph pages are found', () => {
  expect(pages.length).toBeGreaterThan(0);
});

for (const path of pages) {
  test(path, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(`page error: ${error.message}`));
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      // Only this site's errors count; a blocked or offline web font is not a graph problem.
      const url = message.location().url;
      if (url && !url.startsWith(testInfo.project.use.baseURL ?? '')) return;
      errors.push(message.text());
    });

    await page.goto(path);
    const graphs = page.locator('figure.graph');
    const count = await graphs.count();
    expect(count, 'page should contain a graph').toBeGreaterThan(0);

    // Graphs load when scrolled near, so visit each one and wait for it to draw.
    for (let i = 0; i < count; i++) {
      const graph = graphs.nth(i);
      await graph.scrollIntoViewIfNeeded();
      await expect(graph.locator('.graph-board svg').first()).toBeVisible();
      await expect(graph.locator('[data-graph-status]')).toHaveCount(0);
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, 'page should not scroll sideways').toBeLessThanOrEqual(0);

    // Let fonts and KaTeX settle before the screenshot.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const name = path.replace(/^\/|\/$/g, '').replaceAll('/', '_');
    await page.screenshot({ path: `screenshots/${testInfo.project.name}/${name}.png`, fullPage: true });

    expect(errors, 'console errors').toEqual([]);
  });
}
