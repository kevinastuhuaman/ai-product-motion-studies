import type { APIRoute } from "astro";
import { studies } from "../data/studies";

const lines = [
  "# AI Product Motion Studies",
  "",
  "> Three original product-motion studies by Kevin Astuhuaman. The interactive artifact uses synthetic data to explain AI workflow structure, accountable recovery, and cross-surface product continuity.",
  "",
  "## Studies",
  "",
  ...studies.map((study) => "- " + study.title + ": " + study.thesis + " Intent: " + study.intent + ". States: " + study.states.map((state) => state.label).join(", ") + ". Reduced motion: " + study.reducedMotion),
  "",
  "## Product decisions",
  "",
  "- Motion explains state, sequence, causality, or recovery. It is not decorative.",
  "- Stable shells and continuity objects help users identify what changed.",
  "- Failure states expose who decides, what evidence matters, and how a run resumes.",
  "- Shared product truth remains recognizable across web, native, mobile, CLI, and MCP while each surface keeps its own interaction model.",
  "- Every state is directly selectable and remains understandable when motion is disabled.",
  "",
  "## Public boundary",
  "",
  "This is an original public-safe product design artifact with synthetic scenarios. It contains no Trackly production code, applicant data, employer assets, private prompts, credentials, or private infrastructure.",
  "",
  "## Links",
  "",
  "- Live artifact: https://kevinastuhuaman.github.io/ai-product-motion-studies/",
  "- Motion specification: https://kevinastuhuaman.github.io/ai-product-motion-studies/motion-spec.json",
  "- Structured project record: https://kevinastuhuaman.github.io/ai-product-motion-studies/project.json",
  "- Source: https://github.com/kevinastuhuaman/ai-product-motion-studies",
  "- Kevin's portfolio: https://portfolio.kevinastuhuaman.com",
];

export const GET: APIRoute = () =>
  new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
