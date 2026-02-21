# Social Media Feed API — Cloudflare Worker

Free, zero-cost worker that scrapes `@dtulip_wedding` on Instagram and TikTok and returns JSON to the website.

## Deploy in 3 Steps

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare (free account)
```bash
wrangler login
# Opens browser — sign up / log in at cloudflare.com (free)
```

### 3. Deploy the Worker
```bash
cd social-api
wrangler deploy
```

Wrangler will print your Worker URL, something like:
```
https://tulip-social-api.YOUR-SUBDOMAIN.workers.dev
```

### 4. Set the URL in the website
Create or edit `.env.local` in the project root:
```
VITE_SOCIAL_API_URL=https://tulip-social-api.YOUR-SUBDOMAIN.workers.dev
```

Restart the dev server (`npm run dev`) and the footer will now show real posts.

---

## Optional: Enable Caching (recommended)

Without caching, every page load hits Instagram/TikTok. Add a KV namespace:

```bash
wrangler kv namespace create SOCIAL_CACHE
# Copy the `id` from the output
```

Then edit `wrangler.toml` and uncomment:
```toml
[[kv_namespaces]]
binding = "SOCIAL_CACHE"
id = "PASTE_YOUR_ID_HERE"
```

Then redeploy:
```bash
wrangler deploy
```

This caches results for 1 hour so the scraper only runs once per hour.

---

## API Endpoints

| Endpoint | Returns |
|---|---|
| `GET /` | Both Instagram + TikTok combined |
| `GET /instagram` | Instagram posts only |
| `GET /tiktok` | TikTok videos only |

---

## Troubleshooting

- **Instagram returns empty**: Instagram occasionally rate-limits. Wait a few minutes and try again.
- **TikTok returns empty**: TikTok changes their page structure frequently. Open an issue if this happens.
- **CORS error**: Make sure you're fetching from the correct Worker URL set in `VITE_SOCIAL_API_URL`.
