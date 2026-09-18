# Case integration map

## Repository

- Static Cloudflare Pages site; the production surface is `site/index.html`.
- Hash router and all page markup live in the single HTML document. No `package.json` or build script is present; `wrangler.toml` defines deployment configuration.
- Global tokens, Archivo and IBM Plex Mono, loader, navigation, footer, sound system and route transitions remain in `site/index.html`.
- Normal assets live under `site/media/`; new case media uses `site/media/work/{chef4me,relay}/`.

## Existing routes

- `/work/biscuit-ai`: original markup retained as `/work/biscuit-ai-legacy`; approved native replacement is created by `site/work-cases.js`.
- `/work/chef4me`: original markup retained as `/work/chef4me-legacy`; approved native replacement is created by `site/work-cases.js`.
- `/work/relay`: original markup retained as `/work/relay-legacy`; approved native replacement is created by `site/work-cases.js`.

## Shared behaviour to preserve

- `site/index.html`: global navigation, loader, route resolver, route metadata, Work index, footer, transitions, sound dock and unrelated cases.
- `site/work-cases.css`: scoped editorial case-study presentation layer; reuses existing brand tokens and fonts.
- `site/work-cases.js`: native semantic route pages, image/video helpers, FAQ details, next-case links and approved media paths.

## Approved media

- Chef4Me: 18 extracted source images under `site/media/work/chef4me/`; C3 is `17-...plantain...png` and is used in the organic-social section.
- RELAY: static pipeline hero `site/media/work/relay/01-relay-pipeline...jpg`; workflow videos `01`–`07-workflow.webm`, each paired with its corresponding extracted poster; supporting UI captures are also present.
- Biscuit AI: the supplied HTML references `biscuit-ai-assets/` files, but that directory was not included beside the HTML. The available `site/media/biscuit-ai.jpg` hero is used and the missing screenshot source is documented rather than recreated.

## Existing user changes

- `site/index.html` was already modified/staged before this implementation. The new route-layer changes were added on top and should be reviewed together before committing.
