/**
 * Social Feed Scraper
 * Runs daily to scrape Instagram and TikTok posts for @dtulip_wedding
 * Downloads thumbnails locally to avoid CORS issues in the browser.
 * Saves results to public/social-feed.json for static serving.
 *
 * Run manually:  node scripts/scrape-feed.mjs
 * Cron daily:    0 3 * * * cd /path/to/project && node scripts/scrape-feed.mjs
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let puppeteer = null;
try { puppeteer = require('puppeteer'); } catch (_) { }

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../public/social-feed.json');
const THUMB_DIR = path.join(__dirname, '../public/assets/images/social');

const IG_USERNAME = 'dtulip_wedding';
const TIKTOK_USERNAME = 'dtulip_wedding';

// ─── Utility ──────────────────────────────────────────────────────────────────

function fetchUrl(url, headers = {}, binary = false) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, { headers }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location, headers, binary).then(resolve).catch(reject);
            }
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buf = Buffer.concat(chunks);
                resolve({
                    status: res.statusCode,
                    body: binary ? buf : buf.toString('utf-8'),
                    headers: res.headers,
                });
            });
        });
        req.on('error', reject);
        req.setTimeout(20000, () => { req.destroy(); reject(new Error('Request timeout')); });
    });
}

/**
 * Download an image from a remote URL and save it locally.
 * Returns the local public path (e.g. /assets/images/social/ig_abc123.jpg).
 */
async function downloadThumbnail(remoteUrl, filename) {
    if (!remoteUrl) return null;

    const localPath = path.join(THUMB_DIR, filename);
    const publicPath = `/assets/images/social/${filename}`;

    // Skip if already downloaded during this run (unlikely but safe)
    if (fs.existsSync(localPath)) {
        return publicPath;
    }

    try {
        const res = await fetchUrl(remoteUrl, {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': 'https://www.instagram.com/',
        }, true /* binary */);

        if (res.status === 200 && res.body.length > 0) {
            fs.writeFileSync(localPath, res.body);
            return publicPath;
        }
    } catch (err) {
        console.warn(`  ⚠ Could not download thumbnail: ${err.message}`);
    }
    return null;
}

// ─── Instagram Scraper ────────────────────────────────────────────────────────

async function scrapeInstagram() {
    console.log(`[IG] Fetching posts for @${IG_USERNAME}...`);

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'x-ig-app-id': '936619743392459',
        'x-requested-with': 'XMLHttpRequest',
        'Referer': `https://www.instagram.com/${IG_USERNAME}/`,
    };

    let rawPosts = [];

    // Method 1: Instagram's internal web API
    try {
        const apiUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${IG_USERNAME}`;
        const res = await fetchUrl(apiUrl, headers);

        if (res.status === 200) {
            const data = JSON.parse(res.body);
            const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

            rawPosts = edges.slice(0, 12).map((edge) => {
                const node = edge.node;
                return {
                    id: node.shortcode,
                    url: `https://www.instagram.com/p/${node.shortcode}/`,
                    remoteThumb: node.thumbnail_src || node.display_url,
                    caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
                    likes: node.edge_media_preview_like?.count || 0,
                    isVideo: node.__typename === 'GraphVideo',
                    type: 'instagram',
                    timestamp: node.taken_at_timestamp,
                };
            });

            if (rawPosts.length > 0) {
                console.log(`[IG] ✓ Got ${rawPosts.length} posts via API v1`);
            }
        }
    } catch (err) {
        console.warn('[IG] Method 1 failed:', err.message);
    }

    // Method 2 fallback
    if (rawPosts.length === 0) {
        try {
            const url = `https://www.instagram.com/${IG_USERNAME}/?__a=1&__d=1`;
            const res = await fetchUrl(url, { ...headers, 'Accept': 'application/json' });

            if (res.status === 200 && res.body.includes('"edge_owner_to_timeline_media"')) {
                const data = JSON.parse(res.body);
                const edges = data?.graphql?.user?.edge_owner_to_timeline_media?.edges ||
                    data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

                rawPosts = edges.slice(0, 12).map((edge) => {
                    const node = edge.node;
                    return {
                        id: node.shortcode,
                        url: `https://www.instagram.com/p/${node.shortcode}/`,
                        remoteThumb: node.thumbnail_src || node.display_url,
                        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
                        likes: node.edge_media_preview_like?.count || 0,
                        isVideo: node.__typename === 'GraphVideo',
                        type: 'instagram',
                        timestamp: node.taken_at_timestamp,
                    };
                });
                if (rawPosts.length > 0) console.log(`[IG] ✓ Got ${rawPosts.length} posts via fallback`);
            }
        } catch (err) {
            console.warn('[IG] Method 2 failed:', err.message);
        }
    }

    if (rawPosts.length === 0) {
        console.warn('[IG] ⚠ No posts found.');
        return [];
    }

    // Download thumbnails locally to avoid CORS
    console.log('[IG] Downloading thumbnails locally...');
    const posts = [];
    for (const p of rawPosts) {
        const ext = 'jpg';
        const filename = `ig_${p.id}.${ext}`;
        const localThumb = await downloadThumbnail(p.remoteThumb, filename);
        posts.push({
            id: p.id,
            url: p.url,
            thumbnail: localThumb || p.remoteThumb, // fallback to remote if download failed
            caption: p.caption,
            likes: p.likes,
            isVideo: p.isVideo,
            type: 'instagram',
            timestamp: p.timestamp,
        });
        process.stdout.write('.');
    }
    console.log('');
    console.log(`[IG] ✓ Saved ${posts.filter((p) => p.thumbnail?.startsWith('/')).length} thumbnails locally`);
    return posts;
}

// ─── TikTok Scraper (Puppeteer headless) ─────────────────────────────────────

async function scrapeTikTok() {
    console.log(`[TT] Fetching posts for @${TIKTOK_USERNAME}...`);

    if (!puppeteer) {
        console.warn('[TT] puppeteer not available.');
        return [];
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-blink-features=AutomationControlled',
                '--window-size=1280,800',
            ],
        });

        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        );
        await page.setViewport({ width: 1280, height: 800 });
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });

        await page.goto(`https://www.tiktok.com/@${TIKTOK_USERNAME}`, {
            waitUntil: 'networkidle2',
            timeout: 30000,
        });

        await page.waitForSelector('[data-e2e="user-post-item"]', { timeout: 15000 }).catch(() => { });

        const rawPosts = await page.evaluate((username) => {
            const sigiEl = document.getElementById('SIGI_STATE');
            if (sigiEl) {
                try {
                    const data = JSON.parse(sigiEl.textContent || '{}');
                    const items = Object.values(data?.ItemModule || data?.itemList || {});
                    if (items.length > 0) {
                        return items.slice(0, 8).map((item) => {
                            const videoId = item.id || item.aweme_id;
                            return {
                                id: String(videoId),
                                url: `https://www.tiktok.com/@${username}/video/${videoId}`,
                                remoteThumb: item.video?.cover || item.video?.dynamicCover || '',
                                caption: (item.desc || '').slice(0, 120),
                                likes: item.stats?.diggCount || 0,
                                views: item.stats?.playCount || 0,
                                isVideo: true,
                                type: 'tiktok',
                                timestamp: item.createTime,
                            };
                        }).filter((p) => p.id && p.url);
                    }
                } catch (_) { }
            }

            // DOM fallback
            const cards = document.querySelectorAll('[data-e2e="user-post-item"]');
            return Array.from(cards).slice(0, 8).map((el) => {
                const link = el.querySelector('a');
                const img = el.querySelector('img');
                const href = link?.href || '';
                const videoIdMatch = href.match(/\/video\/(\d+)/);
                return {
                    id: videoIdMatch?.[1] || '',
                    url: href,
                    remoteThumb: img?.src || '',
                    caption: img?.alt || '',
                    likes: 0,
                    views: 0,
                    isVideo: true,
                    type: 'tiktok',
                    timestamp: Math.floor(Date.now() / 1000),
                };
            }).filter((p) => p.url && p.id);
        }, TIKTOK_USERNAME);

        if (rawPosts.length === 0) {
            console.warn('[TT] ⚠ No posts found (TikTok bot detection may be active).');
            return [];
        }

        // Download thumbnails locally
        console.log(`[TT] Downloading ${rawPosts.length} thumbnails...`);
        const posts = [];
        for (const p of rawPosts) {
            const filename = `tt_${p.id}.jpg`;
            const localThumb = await downloadThumbnail(p.remoteThumb, filename);
            posts.push({
                id: p.id,
                url: p.url,
                thumbnail: localThumb || p.remoteThumb,
                caption: p.caption,
                likes: p.likes,
                views: p.views,
                isVideo: true,
                type: 'tiktok',
                timestamp: p.timestamp,
            });
            process.stdout.write('.');
        }
        console.log('');
        console.log(`[TT] ✓ Scraped ${posts.length} TikTok posts`);
        return posts;
    } catch (err) {
        console.warn('[TT] Puppeteer failed:', err.message);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('=== Social Feed Scraper ===');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log('');

    // Ensure output directories exist
    if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR, { recursive: true });

    // Load existing cache (preserve data if scraping partially fails)
    let existingCache = { instagram: [], tiktok: [], lastUpdated: null };
    if (fs.existsSync(OUTPUT_PATH)) {
        try { existingCache = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8')); } catch (_) { }
    }

    const [igPosts, ttPosts] = await Promise.all([scrapeInstagram(), scrapeTikTok()]);

    const output = {
        lastUpdated: new Date().toISOString(),
        instagram: igPosts.length > 0 ? igPosts : existingCache.instagram,
        tiktok: ttPosts.length > 0 ? ttPosts : existingCache.tiktok,
        _meta: {
            igFetched: igPosts.length,
            ttFetched: ttPosts.length,
            igFromCache: igPosts.length === 0,
            ttFromCache: ttPosts.length === 0,
        }
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
    console.log('');
    console.log(`✅ Saved to ${OUTPUT_PATH}`);
    console.log(`   Instagram: ${output.instagram.length} posts`);
    console.log(`   TikTok:    ${output.tiktok.length} posts`);
    console.log('');
    console.log('Thumbnails saved to public/assets/images/social/');
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
