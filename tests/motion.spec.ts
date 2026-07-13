import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./", { waitUntil: "networkidle" });
});

test("renders three original studies and a valid first state", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Motion should explain what changed." })).toBeVisible();
  await expect(page.getByRole("tab")).toHaveCount(3);
  await expect(page.locator("[data-motion-lab]")).toHaveAttribute("data-study", "capture-to-workflow");
  await expect(page.locator("[data-motion-lab]")).toHaveAttribute("data-step-id", "capture");
  await expect(page.getByText("Three actions, one recording")).toBeVisible();
});

test("manual states expose structure, review, and recovery", async ({ page }) => {
  await page.getByRole("button", { name: "Inspect", exact: true }).click();
  await expect(page.locator("[data-motion-lab]")).toHaveAttribute("data-step-id", "inspect");
  await expect(page.getByText("Review before submit")).toBeVisible();
  await page.getByRole("tab", { name: /From failure to accountable recovery/i }).click();
  await page.getByRole("button", { name: "Review", exact: true }).click();
  await expect(page.locator("[data-motion-lab]")).toHaveAttribute("data-study", "exception-to-recovery");
  await expect(page.locator("[data-motion-lab]")).toHaveAttribute("data-step-id", "review");
  await expect(page.getByText("One field changed after validation")).toBeVisible();
  await page.getByRole("button", { name: "Resumed", exact: true }).click();
  await expect(page.getByText("Approval binds to the new state")).toBeVisible();
});

test("cross-surface study preserves the shared record", async ({ page }) => {
  await page.getByRole("tab", { name: /One product system/i }).click();
  const record = page.locator(".shared-record");
  await expect(record.getByText("Founding Product Manager")).toBeVisible();
  for (const state of ["Web", "macOS", "Mobile", "CLI + MCP"]) {
    await page.getByRole("button", { name: state, exact: true }).click();
    await expect(record.getByText("92")).toBeVisible();
  }
  await expect(page.locator("[data-motion-lab]")).toHaveAttribute("data-step-id", "agent");
  await expect(page.getByText("trackly jobs get --id 2048")).toBeVisible();
});

test("reduced motion pauses playback and keeps every state selectable", async ({ page }) => {
  const toggle = page.getByRole("checkbox", { name: "Reduced motion" });
  await toggle.check();
  await expect(page.locator("[data-motion-lab]")).toHaveClass(/reduced/);
  await expect(page.getByRole("button", { name: "Play sequence" })).toBeVisible();
  await page.getByRole("button", { name: "Ready", exact: true }).click();
  await expect(page.getByText("Validated before execution")).toBeVisible();
});

test("has no serious accessibility violations or horizontal overflow", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
  expect(serious).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});

