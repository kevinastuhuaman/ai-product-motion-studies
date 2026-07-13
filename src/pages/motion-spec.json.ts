import type { APIRoute } from "astro";
import { motionSpec } from "../data/studies";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(motionSpec, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
