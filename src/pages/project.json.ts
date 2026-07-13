import type { APIRoute } from "astro";
import { buildDate } from "../data/build-date";
import { studies } from "../data/studies";

const record = {
  name: "AI Product Motion Studies",
  author: "Kevin Astuhuaman",
  canonical: "https://kevinastuhuaman.github.io/ai-product-motion-studies/",
  repository: "https://github.com/kevinastuhuaman/ai-product-motion-studies",
  status: "public interactive artifact",
  publicationMode: "open source",
  updated: buildDate,
  purpose: "Demonstrate product motion as an explanation of state, causality, authority, recovery, and cross-surface continuity.",
  studies: studies.map((study) => ({
    id: study.id,
    title: study.title,
    thesis: study.thesis,
    intent: study.intent,
    module: study.module,
    states: study.states.map((state) => state.label),
    reducedMotion: study.reducedMotion,
  })),
  boundaries: [
    "Original interface and motion design",
    "Synthetic scenarios and data",
    "No Trackly production code or applicant data",
    "No employer assets or confidential systems",
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(record, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
