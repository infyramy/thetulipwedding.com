/**
 * THE TULIP WEDDINGS - Social Media Feed Scraper
 * Cloudflare Worker - Free Tier (100k requests/day)
 * 
 * Endpoints:
 *   GET /instagram  -> returns latest IG posts from @dtulip_wedding
 *   GET /tiktok     -> returns latest TikTok videos from @dtulip_wedding
 *   GET /           -> returns both combined
 *
 * Deploy: wrangler deploy
 */

const IG_USERNAME = 'dtulip_wedding';
const TIKTOK_USERNAME = 'dtulip_wedding';
const CACHE_TTL = 3600; // 1 hour cache

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

// ────────────────────────────────────────────
// INSTAGRAM SCRAPER
// Uses Instagram's internal web API (no login required for public profiles)
// ────────────────────────────────────────────
async function scrapeInstagram(env) {
    const cacheKey = `ig_${IG_USERNAME}`;

    // Try KV cache first
    if (env.SOCIAL_CACHE) {
        const cached = await env.SOCIAL_CACHE.get(cacheKey);
        if (cached) return JSON.parse(cached);
    }

    try {
        // Method 1: Instagram web_profile_info API (works for public accounts)
        const resp = await fetch(
            `https://i.instagram.com/api/v1/users/web_profile_info/?username=${IG_USERNAME}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
                    'x-ig-app-id': '936619743392459',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://www.instagram.com/',
                    'x-requested-with': 'XMLHttpRequest',
                },
            }
        );

        if (!resp.ok) throw new Error(`IG API returned ${resp.status}`);

        const data = await resp.json();
        const user = data?.data?.user;
        if (!user) throw new Error('User not found in IG response');

        const posts = (user.edge_owner_to_timeline_media?.edges || [])
            .slice(0, 12)
            .map(({ node }) => ({
                id: node.id,
                shortcode: node.shortcode,
                url: `https://www.instagram.com/p/${node.shortcode}/`,
                thumbnail: node.thumbnail_src || node.display_url,
                isVideo: node.is_video || false,
                likes: node.edge_liked_by?.count || 0,
                caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
                timestamp: node.taken_at_timestamp,
                dimensions: node.dimensions,
            }));

        const result = {
            platform: 'instagram',
            username: user.username,
            fullName: user.full_name,
            profilePic: user.profile_pic_url_hd || user.profile_pic_url,
            followers: user.edge_followed_by?.count,
            posts,
            fetchedAt: Date.now(),
        };

        // Cache in KV if available
        if (env.SOCIAL_CACHE) {
            await env.SOCIAL_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: CACHE_TTL });
        }

        return result;
    } catch (err) {
        // Method 2: Fallback - try the GraphQL endpoint
        try {
            const gqlResp = await fetch(
                `https://www.instagram.com/${IG_USERNAME}/?__a=1&__d=dis`,
                {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'application/json',
                        'Referer': 'https://www.instagram.com/',
                    },
                }
            );

            if (gqlResp.ok) {
                const gqlData = await gqlResp.json();
                const user = gqlData?.graphql?.user || gqlData?.data?.user;
                if (user) {
                    return {
                        platform: 'instagram',
                        username: user.username,
                        posts: (user.edge_owner_to_timeline_media?.edges || []).slice(0, 12).map(({ node }) => ({
                            id: node.id,
                            shortcode: node.shortcode,
                            url: `https://www.instagram.com/p/${node.shortcode}/`,
                            thumbnail: node.thumbnail_src || node.display_url,
                            isVideo: node.is_video,
                            caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
                        })),
                        fetchedAt: Date.now(),
                    };
                }
            }
        } catch (_) { }

        return { platform: 'instagram', error: err.message, posts: [], fetchedAt: Date.now() };
    }
}

// ────────────────────────────────────────────
// TIKTOK SCRAPER
// Parses TikTok profile page for video data from SIGI_STATE
// ────────────────────────────────────────────
async function scrapeTikTok(env) {
    const cacheKey = `tt_${TIKTOK_USERNAME}`;

    if (env.SOCIAL_CACHE) {
        const cached = await env.SOCIAL_CACHE.get(cacheKey);
        if (cached) return JSON.parse(cached);
    }

    try {
        const resp = await fetch(`https://www.tiktok.com/@${TIKTOK_USERNAME}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
                'sec-fetch-mode': 'navigate',
            },
        });

        const html = await resp.text();

        // Extract SIGI_STATE JSON from page
        const sigiMatch = html.match(/<script id="SIGI_STATE" type="application\/json">([\s\S]*?)<\/script>/);
        if (!sigiMatch) throw new Error('SIGI_STATE not found in TikTok page');

        const sigiData = JSON.parse(sigiMatch[1]);
        const itemModule = sigiData?.ItemModule || {};
        const userDetail = sigiData?.UserModule?.users?.[TIKTOK_USERNAME];

        const videos = Object.values(itemModule)
            .slice(0, 12)
            .map((item) => ({
                id: item.id,
                url: `https://www.tiktok.com/@${item.author}/video/${item.id}`,
                thumbnail: item.video?.cover || item.video?.dynamicCover,
                description: item.desc,
                likes: item.stats?.diggCount,
                plays: item.stats?.playCount,
                comments: item.stats?.commentCount,
                shares: item.stats?.shareCount,
                timestamp: item.createTime,
                duration: item.video?.duration,
            }));

        const result = {
            platform: 'tiktok',
            username: TIKTOK_USERNAME,
            fullName: userDetail?.nickname,
            profilePic: userDetail?.avatarLarger,
            followers: sigiData?.UserModule?.stats?.[TIKTOK_USERNAME]?.followerCount,
            videos,
            fetchedAt: Date.now(),
        };

        if (env.SOCIAL_CACHE) {
            await env.SOCIAL_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: CACHE_TTL });
        }

        return result;
    } catch (err) {
        return { platform: 'tiktok', error: err.message, videos: [], fetchedAt: Date.now() };
    }
}

// ────────────────────────────────────────────
// MAIN REQUEST HANDLER
// ────────────────────────────────────────────
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        let body;
        if (url.pathname === '/instagram') {
            body = await scrapeInstagram(env);
        } else if (url.pathname === '/tiktok') {
            body = await scrapeTikTok(env);
        } else {
            // Returns both
            const [ig, tt] = await Promise.all([scrapeInstagram(env), scrapeTikTok(env)]);
            body = { instagram: ig, tiktok: tt };
        }

        return new Response(JSON.stringify(body), {
            headers: CORS_HEADERS,
            status: 200,
        });
    },
};
