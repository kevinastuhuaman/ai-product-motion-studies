import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "pages.spec.ts",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4333/ai-product-motion-studies/",
  },
  webServer: {
    command: "cross-env TEST_PAGES=1 npx astro build && http-server .pages-preview -a 127.0.0.1 -p 4333 -c-1",
    url: "http://127.0.0.1:4333/ai-product-motion-studies/",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [{ name: "pages", use: { ...devices["Desktop Chrome"] } }],
});
