# AGENTS.md

## Project
This repository contains local configuration for a Pi coding agent setup.

## Repository Layout
- `agent/settings.json` — agent defaults (provider, model, reasoning level, changelog version).
- `agent/models.json` — model/provider registry used by the local agent.
- `agent/themes/` - color themes.
- `agent/extensions/` - coding agent extensions written in TypeScript.

## Notes for Contributors
- Keep config-only scope unless intentionally adding code or docs.
- Do not commit secrets or real API keys.
- When changing models/providers, update both:
  - `agent/models.json`
  - `agent/settings.json` (if defaults should change)
