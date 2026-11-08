# Tâm's Bot Office

Cozy office UI showing each bot's live status from `bots.json`. The page polls `./bots.json` every 60s.

| Surface | URL | Access |
| --- | --- | --- |
| **Cursor Live App (private)** | Set slug `bot-office` when you publish — e.g. `https://bot-office.<your-apps-host>/` (exact host shown in the Apps tray) | **Owner only** (private / invited), Cursor sign-in |
| **GitHub Pages (legacy)** | https://lobi.github.io/bot-office/ | Public until you turn Pages off |

## Cursor Live App (private)

1. Merge this branch to `main`.
2. Open this cloud agent run (or start a new cloud agent on `lobi/bot-office` and say **“Deploy this repo as a private Live App”**).
3. When the **Apps tray** appears, preview the app, then **Publish**.
4. Choose slug **`bot-office`** (or the closest available name).
5. Complete security checks, then set sharing to **only you** (not public, not whole team unless you want that).

After publish, use the Live App URL for daily viewing. GitHub Pages can stay on until you confirm the private app works.

### Local smoke test

```bash
npm install
npm run build
npm run preview
```

Open the URL Vite prints (port 4173) and confirm bots load from `/bots.json`.

### Automated access (optional)

Scripts can call the private app with a Cursor API key:

```bash
curl -H "x-cursor-app-token: $CURSOR_API_KEY" "https://<your-live-app-url>/bots.json"
```

Create keys in the [Cursor Apps dashboard](https://cursor.com/docs/cloud-agent/apps).

## Updating status

`bots.json`: `{"updatedAt": ISO, "bots":[{id,name,role,room,status,currentTask,reportsTo}]}`

- `status`: `working | idle | waiting | blocked | unknown` (`waiting` = waiting on Tâm, shown in the "Cần anh" tray)
- `room`: `swiftgas | library | projects | commerce | lobby`
- Keep `id` stable. Bots missing from the file show as `unknown`.
- No secrets in this file.

After you change `bots.json`, push to `main`. Then either wait for the Live App to redeploy from `main` (if wired) or **republish** from the Apps tray so the hosted copy updates. GitHub Pages still redeploys within ~1 minute on push until you disable it.

### Option A: edit + push

```bash
cd bot-office
# edit bots.json (update status/currentTask and updatedAt)
git commit -am "status: dev working" && git push
```

### Option B: gh api (no clone)

```bash
SHA=$(gh api repos/lobi/bot-office/contents/bots.json --jq .sha)
gh api -X PUT repos/lobi/bot-office/contents/bots.json \
  -f message="status update" -f sha="$SHA" \
  -f content="$(base64 -w0 bots.json)"
```
