---
name: dg-build
description: Build Daily Grind from src/ into the single-file index.html and the website build in dist/, check that index.html is up to date, and package dist/ for itch.io or a website. Use after any edit under src/, when a check says index.html does not match src/, or when the user asks to build, publish, package or deploy the game.
---

# Daily Grind build

`src/` is the source of truth. **Never edit the root `index.html`**: it is generated, and the next build overwrites it.

## Build

```bash
node tools/build.js
```

Writes the root `index.html` (one file, everything inlined; committed; QA tools read it) and `dist/` (the website build; not committed). It prints the size of each. Commit the `src/` change and the regenerated `index.html` in the same commit.

## Check

```bash
node tools/build.js --check
```

Fails when `index.html` is not what `src/` builds: either `index.html` was edited by hand (move the change into the matching `src/` file) or the build was not run (run it). The fuller check also starts the website build from a local server and reloads it offline:

```bash
node tools/qa/check-build.js
```

## Where things go

| Change | File |
|---|---|
| Numbers, rules | `src/js/01-config.js` |
| Pathways, jobs, items, buildings | `src/js/02-world.js` |
| Other script sections | `src/js/03-…` to `12-start.js` (see `CODE_MAP.md`) |
| Styles | `src/css/` (later files win) |
| Markup, pop-ups | `src/index.html` |
| A picture | put it in `src/img/`, write `@img(name.webp)` where a URL goes |
| Manifest, icons, service worker | `src/pwa/` (`node tools/make-icons.js <outside folder>` redraws the icons) |

Blocks that should exist in only one output are wrapped in `@site` or `@single` markers (see the comment at the top of `tools/build.js`). The script parts share one closure: do not turn them into modules, and keep the line `  if(!load())fresh();` unique in `src/js/12-start.js`.

## Publish

- **itch.io:** build, then zip the *contents* of `dist/` (so `index.html` is at the top of the zip) and upload it as an HTML game.

```bash
cd dist && zip -r ../daily-grind-web.zip . && cd ..
```

- **Your own site:** copy the contents of `dist/` to the web root. It must be served over https for the offline cache and "install as an app" to work.
- **GitHub Pages or a single file to share:** the root `index.html`.

Do not commit `dist/` or the zip. Do not publish without the user asking.
