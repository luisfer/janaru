# Efficiency baseline — 2026-07-10

Measured with `node scripts/score.mjs` against live project journals after Janaru v3 validators landed.

## mekong-dashboard

| Metric | Value |
|--------|-------|
| contexts | 6 |
| median tokens | 195 |
| max tokens | 605 (`2026-06-09` bloated — fails validate) |
| under budget | 83% |
| with Updated | 100% |
| days since last save | 0 |
| dictionary | 3.0.0 |

July contexts (`2026-07-05` … `2026-07-10`) all pass validate. June 9 is the anti-pattern fixture source.

## dripdrop-app

| Metric | Value |
|--------|-------|
| contexts | 3 |
| median tokens | 179 |
| max tokens | 323 (`2026-04-28` install-era — slightly over) |
| under budget | 67% |
| with Updated | 67% (`2026-06-10` missing timestamp) |
| days since last save | 1 |
| dictionary | 3.0.0 |

## Targets (v3)

- `context.md` ≤ ~300 tokens
- Required: `Updated:`, `## State`|`## Status`, actionable `## Next`
- Path: `journals/YYYY-MM-DD/`
- Dictionary `version:` present
