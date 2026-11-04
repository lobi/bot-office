# Tâm's Bot Office

Live: https://lobi.github.io/bot-office/ — a cozy office showing each bot's live status from `bots.json`.
The page polls `./bots.json` every 60s.

## Updating status

`bots.json`: `{"updatedAt": ISO, "bots":[{id,name,role,room,status,currentTask,reportsTo}]}`
- `status`: `working | idle | waiting | blocked | unknown` (`waiting` = waiting on Tâm, shown in the "Cần anh" tray)
- `room`: `swiftgas | library | projects | commerce | lobby`
- Keep `id` stable. Bots missing from the file show as `unknown`. No secrets — the repo is public.

### Option A: edit + push
```bash
cd /workspace/repos/bot-office
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
Pages redeploys within ~1 minute after each push.
