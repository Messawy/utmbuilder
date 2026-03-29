# Campaign & UTM Builder — WideBot / Hulul

Free tool for media buyers to generate UTM-tagged URLs with structured naming conventions. Supports domain-specific filtering (WideBot vs Hulul), paid vs organic platforms, Arabic/English language switching, and branded URL shortening.

## Live URL
`https://saasgate.io/utm-builder/`

---

## Deploy to Cloudflare Pages

### Step 1: Push to GitHub

```bash
cd wb-utm-builder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wb-utm-builder.git
git push -u origin main
```

### Step 2: Connect Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select the `wb-utm-builder` repo
3. Build settings:

| Setting | Value |
|---------|-------|
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |

4. Click **Save and Deploy**

### Step 3: Custom Domain

To serve at `saasgate.io/utm-builder/`:
- Use a Cloudflare Worker to proxy `/utm-builder/*` to the Pages project
- OR deploy as a subdomain like `utm.saasgate.io`

---

## Configuration

### Shortener Proxy
Update the `SHORTENER_PROXY` variable in `src/App.jsx` with your Cloudflare Worker URL:
```
var SHORTENER_PROXY = "https://shortener-proxy.YOUR_ACCOUNT.workers.dev";
```

### GTM Tracking
GTM (GTM-5XB9XJ5) is included in `index.html`.

---

## Local Development

```bash
npm install
npm run dev
```

## Tech Stack
- React 18 + Vite 6
- localStorage for persistence
- Cloudflare Worker proxy for short.io integration
- Brand-aware color system (WideBot/Hulul palettes)
