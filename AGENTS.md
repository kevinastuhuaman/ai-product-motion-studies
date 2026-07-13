# AGENTS.md

## Product boundary

This repository is a public-safe product design artifact. Use original interface elements and synthetic data only. Do not include Trackly production code, customer or applicant data, employer assets, private prompts, credentials, or private infrastructure detail.

## Motion rules

- Motion must explain state, sequence, causality, or recovery.
- Every study needs manual step controls, a reduced-motion state, and a static frame that still communicates the decision.
- Keep one attention target per state.
- Do not add decorative particles, gradients, or floating effects.
- Keep timing and state definitions in `src/data/studies.ts` as the single source of truth.

## Quality gate

Run `npm test`, `npm run build`, and `npm run validate:motion` before committing. Verify desktop and mobile pixels with Playwright. Do not merge until the repository's reviewer and CI gates pass.
