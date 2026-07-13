import { readFile } from "node:fs/promises";

const file = new URL("../src/data/motion-spec.json", import.meta.url);
/** @typedef {{ id: string, label: string, headline: string, detail: string, durationMs: number }} ValidatedState */
/** @typedef {{ id: string, intent: string, sceneRole: string, composition: string, transition: { durationMs: number, easing: string }, reducedMotion: string, states: ValidatedState[] }} ValidatedStudy */
/** @type {{ version: string, studies: ValidatedStudy[] }} */
const spec = JSON.parse(await readFile(file, "utf8"));
const errors = [];

if (spec.version !== "2.0") errors.push("motion spec version must be 2.0");
if (!Array.isArray(spec.studies) || spec.studies.length !== 3) errors.push("exactly three studies are required");

const ids = new Set();
for (const study of spec.studies ?? []) {
  if (!study.id || ids.has(study.id)) errors.push(`invalid or duplicate study id: ${study.id}`);
  ids.add(study.id);
  if (!study.intent || !study.sceneRole || !study.composition) errors.push(`${study.id}: missing narrative fields`);
  if (!study.transition?.durationMs || !study.transition?.easing) errors.push(`${study.id}: incomplete transition`);
  if (!study.reducedMotion) errors.push(`${study.id}: missing reduced-motion equivalent`);
  if (!Array.isArray(study.states) || study.states.length < 4) errors.push(`${study.id}: needs at least four states`);
  const stateIds = new Set();
  for (const state of study.states ?? []) {
    if (!state.id || stateIds.has(state.id)) errors.push(`${study.id}: invalid or duplicate state id ${state.id}`);
    stateIds.add(state.id);
    if (!state.label || !state.headline || !state.detail || !Number.isFinite(state.durationMs) || state.durationMs < 1000) errors.push(`${study.id}/${state.id}: incomplete state`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${spec.studies.length} studies and ${spec.studies.reduce((sum, study) => sum + study.states.length, 0)} motion states.`);
