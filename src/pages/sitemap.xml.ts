import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const base = "https://kevinastuhuaman.github.io/ai-product-motion-studies/";
  const urls = [base, base + "llms.txt", base + "motion-spec.json", base + "project.json"];
  const body = urls.map((url) => "  <url><loc>" + url + "</loc></url>").join("\n");
  const xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" + body + "\n</urlset>\n";
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};

