import { expect, test } from "@playwright/test";

test("GitHub Pages base path serves the product and machine routes", async ({ page, request }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "Motion should explain what changed." })).toBeVisible();
  for (const path of ["llms.txt", "motion-spec.json", "project.json", "sitemap.xml", "robots.txt"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  const spec = await (await request.get("motion-spec.json")).json() as {
    studies: Array<{ reducedMotion: string; states: Array<{ id: string }> }>;
  };
  expect(spec.studies).toHaveLength(3);
  expect(spec.studies.every((study) => study.reducedMotion && study.states.length >= 4)).toBe(true);
});
