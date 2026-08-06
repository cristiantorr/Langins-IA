# AGENTS.md

## Repo nature — read first
- **No build tooling, no runtime deps, no test runner.** `package.json` is a stub (empty `test` script); there is no lint/typecheck/install workflow. Do not run `npm *`.
- Every site is a fully self-contained static page (vanilla HTML/CSS/JS + CDN). Serve with `npx serve` (a plain `file:` open breaks the SW/manifest).

## Layout
- Canonical code lives in `landings-portafolios/` (also the working dir) as `portafolio01-…`, `portafolio02-…`, … `portafolio25-…`.
- **Ignore root clutter**: `portafolio04-neon-command-center/` and `landings-portaf-Afilios/` are stray duplicates/moves. Edit inside `landings-portafolios/`.
- `landing-donacion/` and `landing-tienda/` are unrelated single landings (do not touch unless asked).

## Per-site structure (identical every portfolio)
`index.html` · `css/style.css` · `js/app.js` · `manifest.webmanifest` · `sw.js` · `assets/icon-{192,512}.png`
- Icons are "CT" PNGs generated with Python Pillow inside `C:\Users\User\AppData\Local\Temp\opencode\gen_*.py` (temporary, not committed). Re-generate with the same pattern; do not add an icon library.

## Conventions that matter
- Portraits use `https://randomuser.me/api/portraits/men/N.jpg` **plus** an `avatarFallback(img)` that swaps to an inline SVG "CT" monogram on error. Keep the fallback: some `randomuser` IDs 404, and the fallback is what keeps the design intact.
- Wrap every anime call in `if (window.anime)` so the page works with and without the CDN.
- SW guard must be `if (navigator.serviceWorker && navigator.serviceWorker.register)`; the weaker `"serviceWorker" in navigator` throws runtime errors and breaks smoke tests.
- Reuse identical person data (don't improvise): **Cristian Torres**, Full Stack Developer, `ps4cristiantorr@gmail.com`, Medellín-Colombia; stack PHP/Laravel/Node · React/TypeScript/Tailwind · WordPress/ACF · MySQL/AWS/Docker. Experiences 2014→2026.

## Verify (no test runner; do these manually)
- `node --check <site>/js/app.js` and `<site>/sw.js`.
- Brace-balance each CSS file (count matching `{`/`}`) and `JSON.parse` each manifest.
- For runtime smoke, run the JS inside node `vm` with **stubs for** `document`, `anime`, `setTimeout/setInterval`, and `IntersectionObserver`. The stub's `document.querySelector` must return objects (never null) or the render path throws.