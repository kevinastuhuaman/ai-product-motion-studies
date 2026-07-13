import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kevinastuhuaman.github.io",
  base: process.env.TEST_BASE === "root" ? "/" : "/ai-product-motion-studies",
  outDir: process.env.TEST_PAGES === "1" ? "./.pages-preview/ai-product-motion-studies" : "./dist",
  output: "static",
  trailingSlash: "always",
});
