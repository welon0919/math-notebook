import { defineConfig, devices } from '@playwright/test';

const port = 4322;

// Every graph page is checked at phone and desktop width, in light and dark mode.
const variants = [
  { width: 375, height: 812, scheme: 'light' },
  { width: 375, height: 812, scheme: 'dark' },
  { width: 1280, height: 900, scheme: 'light' },
  { width: 1280, height: 900, scheme: 'dark' },
] as const;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${port}`,
  },
  projects: variants.map(({ width, height, scheme }) => ({
    name: `${width}-${scheme}`,
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width, height },
      colorScheme: scheme,
      // Phone width also gets touch, like a real phone.
      hasTouch: width < 600,
      isMobile: width < 600,
    },
  })),
  // Test the production build, which is what visitors get.
  webServer: {
    command: `pnpm build && pnpm preview --port ${port} --ignore-lock`,
    url: `http://localhost:${port}`,
    timeout: 180_000,
    reuseExistingServer: false,
  },
});
