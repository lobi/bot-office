# Bot Office — Cursor Live App

Static single-page app (`index.html`) with bot status from `bots.json`. Deploy as a **private** Cursor Live App (Cursor SSO); slug **`bot-office`**.

## Build (Live App)

```bash
npm install
npm run build   # output: dist/ (index.html + bots.json)
npm run preview # local smoke test on :4173
```

Do not add Postgres or a custom auth layer unless asked — Cursor handles SSO at the edge for private apps.

## Preserve

- Do not redesign the UI or change animation / reduced-motion / mobile behavior unless requested.
- Keep `DATA_URL = './bots.json'` and 60s polling.
- Keep `bots.json` at the repository root (source of truth); the build copies it into `dist/`.

## Security (publish checks)

- No API keys, tokens, or private keys in tracked files.
- No `.env` committed.

## Data updates

Owners update `bots.json` in git (`README.md`). After merge to `main`, republish or redeploy the Live App so hosted `bots.json` matches (GitHub Pages still updates on its own until disabled).
