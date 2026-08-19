const REDDIT_RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.reddit.com/user/zuccenoo/submitted.rss';

function extractImage(item) {
    let img = null;

    // clean thumbnail if it exists
    if (item.thumbnail && item.thumbnail !== 'self' && item.thumbnail !== '' && item.thumbnail !== 'default') {
        img = item.thumbnail
            .replace(/&amp;/g, '&')  // decode HTML entities
            .split('?')[0]           // strip query params
            .replace('preview.redd.it', 'i.redd.it'); // use public CDN
    }

    // fallback — parse from description
    if (!img) {
        const match = item.description.match(/https:\/\/preview\.redd\.it\/[^"'\s]+/);
        if (match) {
            img = match[0]
                .replace(/&amp;/g, '&')
                .split('?')[0]
                .replace('preview.redd.it', 'i.redd.it');
        }
    }

    return img;
}

export async function fetchRedditArt() {
    const res = await fetch(REDDIT_RSS_URL);
    const data = await res.json();

    if (data.status !== 'ok') {
        throw new Error('RSS fetch failed');
    }

    const posts = data.items
        .map((item) => ({
            title: item.title,
            img: extractImage(item),
            url: item.link,
            date: item.pubDate,
        }))
        .filter((p) => p.img);

    return posts;
}