/**
 * Social Feed Scraper
 * Runs daily to scrape Instagram and TikTok posts for @dtulip_wedding
 * Saves results to public/social-feed.json for static serving
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

const IG_USERNAME = 'dtulip_wedding';
const TIKTOK_USERNAME = 'dtulip_wedding';

// ─── Utility ──────────────────────────────────────────────────────────────────

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, { headers }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location, headers).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
        });
        req.on('error', reject);
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('Request timeout')); });
    });
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
        'Cookie': '' // Public profile - no auth needed for public accounts
    };

    // Try method 1: Instagram's internal web API
    try {
        const apiUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${IG_USERNAME}`;
        const res = await fetchUrl(apiUrl, headers);

        if (res.status === 200) {
            const data = JSON.parse(res.body);
            const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

            const posts = edges.slice(0, 12).map((edge) => {
                const node = edge.node;
                const isVideo = node.__typename === 'GraphVideo';
                return {
                    id: node.shortcode,
                    url: `https://www.instagram.com/p/${node.shortcode}/`,
                    thumbnail: node.thumbnail_src || node.display_url,
                    caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
                    likes: node.edge_media_preview_like?.count || 0,
                    isVideo,
                    type: 'instagram',
                    timestamp: node.taken_at_timestamp,
                };
            });

            if (posts.length > 0) {
                console.log(`[IG] ✓ Scraped ${posts.length} posts via API v1`);
                return posts;
            }
        }
    } catch (err) {
        console.warn('[IG] Method 1 failed:', err.message);
    }

    // Try method 2: GraphQL query (older approach)
    try {
        const queryId = '17888483320059182';
        const url = `https://www.instagram.com/${IG_USERNAME}/?__a=1&__d=1`;
        const res = await fetchUrl(url, {
            ...headers,
            'Accept': 'application/json',
        });

        if (res.status === 200 && res.body.includes('"edge_owner_to_timeline_media"')) {
            const data = JSON.parse(res.body);
            const edges = data?.graphql?.user?.edge_owner_to_timeline_media?.edges ||
                data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

            const posts = edges.slice(0, 12).map((edge) => {
                const node = edge.node;
                return {
                    id: node.shortcode,
                    url: `https://www.instagram.com/p/${node.shortcode}/`,
                    thumbnail: node.thumbnail_src || node.display_url,
                    caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
                    likes: node.edge_media_preview_like?.count || 0,
                    isVideo: node.__typename === 'GraphVideo',
                    type: 'instagram',
                    timestamp: node.taken_at_timestamp,
                };
            });

            if (posts.length > 0) {
                console.log(`[IG] ✓ Scraped ${posts.length} posts via graphql`);
                return posts;
            }
        }
    } catch (err) {
        console.warn('[IG] Method 2 failed:', err.message);
    }

    // Method 3: Parse the profile page HTML
    try {
        const res = await fetchUrl(`https://www.instagram.com/${IG_USERNAME}/`, {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
        });

        // Extract JSON from script tag - Instagram embeds profile data here
        const match = res.body.match(/window\._sharedData\s*=\s*({.+?});<\/script>/);
        if (match) {
            const sharedData = JSON.parse(match[1]);
            const media = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user
                ?.edge_owner_to_timeline_media?.edges || [];

            const posts = media.slice(0, 12).map((edge) => {
                const node = edge.node;
                return {
                    id: node.shortcode,
                    url: `https://www.instagram.com/p/${node.shortcode}/`,
                    thumbnail: node.thumbnail_src,
                    caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
                    likes: node.edge_media_preview_like?.count || 0,
                    isVideo: node.is_video,
                    type: 'instagram',
                    timestamp: node.taken_at_timestamp,
                };
            });

            if (posts.length > 0) {
                console.log(`[IG] ✓ Scraped ${posts.length} posts from page HTML`);
                return posts;
            }
        }
    } catch (err) {
        console.warn('[IG] Method 3 failed:', err.message);
    }

    console.warn('[IG] ⚠ All methods failed. Instagram may require login or is rate limiting.');
    return [];
}

// ─── TikTok Scraper (Puppeteer headless) ─────────────────────────────────────

async function scrapeTikTok() {
    console.log(`[TT] Fetching posts for @${TIKTOK_USERNAME}...`);

    if (!puppeteer) {
        console.warn('[TT] puppeteer not available. Run: npm install puppeteer --save-dev --legacy-peer-deps');
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

        // Mask automation flags
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });

        await page.goto(`https://www.tiktok.com/@${TIKTOK_USERNAME}`, {
            waitUntil: 'networkidle2',
            timeout: 30000,
        });

        // Wait for video thumbnails to load
        await page.waitForSelector('[data-e2e="user-post-item"], [data-e2e="user-post-item-desc"]', { timeout: 15000 }).catch(() => { });

        const posts = await page.evaluate((username) => {
            // Try SIGI_STATE first (most reliable)
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
                                thumbnail: item.video?.cover || item.video?.dynamicCover || '',
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

            // Fallback: scrape DOM thumbnail cards
            const cards = document.querySelectorAll('[data-e2e="user-post-item"]');
            return Array.from(cards).slice(0, 8).map((el) => {
                const link = el.querySelector('a');
                const img = el.querySelector('img');
                const href = link?.href || '';
                const videoIdMatch = href.match(/\/video\/(\d+)/);
                return {
                    id: videoIdMatch?.[1] || '',
                    url: href,
                    thumbnail: img?.src || '',
                    caption: img?.alt || '',
                    likes: 0,
                    views: 0,
                    isVideo: true,
                    type: 'tiktok',
                    timestamp: Math.floor(Date.now() / 1000),
                };
            }).filter((p) => p.url && p.id);
        }, TIKTOK_USERNAME);

        if (posts.length > 0) {
            console.log(`[TT] ✓ Scraped ${posts.length} posts via Puppeteer`);
            return posts;
        }

        console.warn('[TT] ⚠ Puppeteer found no posts (profile may be private or TikTok layout changed).');
        return [];
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

    // Load existing cache (to preserve data if scraping fails)
    let existingCache = { instagram: [], tiktok: [], lastUpdated: null };
    if (fs.existsSync(OUTPUT_PATH)) {
        try {
            existingCache = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
        } catch (_) { }
    }

    const [igPosts, ttPosts] = await Promise.all([scrapeInstagram(), scrapeTikTok()]);

    const output = {
        lastUpdated: new Date().toISOString(),
        instagram: igPosts.length > 0 ? igPosts : existingCache.instagram,
        tiktok: ttPosts.length > 0 ? ttPosts : existingCache.tiktok,
        // Metadata for debugging
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
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
