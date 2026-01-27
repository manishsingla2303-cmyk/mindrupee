const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// Create directories
const POSTS_DIR = path.join(__dirname, '../posts');
const PUBLIC_IMG_DIR = path.join(__dirname, '../public/images/blog');

if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_IMG_DIR)) fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

async function downloadImage(url, filename) {
    try {
        // Determine extension
        const ext = path.extname(url).split('?')[0] || '.jpg';
        const localFilename = `${filename}${ext}`;
        const localPath = path.join(PUBLIC_IMG_DIR, localFilename);
        const publicPath = `/images/blog/${localFilename}`;

        if (fs.existsSync(localPath)) return publicPath;

        // Handle the broken domain issue during migration too
        let fetchUrl = url;
        if (url.includes('mindrupee.com/wp-content')) {
            fetchUrl = url.replace('mindrupee.com/wp-content', 'blog.mindrupee.com/wp-content');
            if (fetchUrl.startsWith('http://')) fetchUrl = fetchUrl.replace('http://', 'https://');
        }

        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${fetchUrl}: ${res.statusText}`);

        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(localPath, buffer);
        console.log(`Downloaded image: ${localFilename}`);
        return publicPath;
    } catch (error) {
        console.error(`Error downloading image ${url}:`, error.message);
        return null; // Keep original URL or placeholder if failed
    }
}

async function migrate() {
    console.log('Fetching posts from WordPress...');
    const res = await fetch('https://blog.mindrupee.com/wp-json/wp/v2/posts?per_page=100&_embed');
    const posts = await res.json();

    console.log(`Found ${posts.length} posts.`);

    for (const post of posts) {
        console.log(`Processing: ${post.title.rendered}`);

        const slug = post.slug;
        const date = new Date(post.date).toISOString().split('T')[0];
        const title = post.title.rendered;

        // 1. Handle Featured Image
        let featuredImage = '/placeholder.svg';
        const remoteFeatured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        if (remoteFeatured) {
            const local = await downloadImage(remoteFeatured, `${slug}-featured`);
            if (local) featuredImage = local;
        }

        // 2. Handle Content Images & Conversion
        // We add a rule to Turndown to hook into image conversion
        turndownService.addRule('images', {
            filter: 'img',
            replacement: function (content, node) {
                const alt = node.getAttribute('alt') || '';
                const src = node.getAttribute('src') || '';
                // We can't easily download async inside this sync callback.
                // So we will do a two-pass approach or just let it be markdown image links for now, 
                // AND THEN regex replace them after conversion?
                // Actually, let's keep it simple: Regex replace in the HTML BEFORE conversion.
                return `![${alt}](${src})`;
            }
        });

        // Custom logic to download images found in content
        let contentHtml = post.content.rendered;
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        let match;
        let imgIndex = 0;

        // We need to collect all matches first to avoid infinite loops if we modify string
        const matches = [...contentHtml.matchAll(imgRegex)];

        for (const m of matches) {
            const originalUrl = m[1];
            const localUrl = await downloadImage(originalUrl, `${slug}-${imgIndex++}`);
            if (localUrl) {
                contentHtml = contentHtml.replace(originalUrl, localUrl);
            }
        }

        // Remove iframes or convert them? Turndown usually drops iframes.
        // Let's keep them as HTML.
        turndownService.keep(['iframe']);

        const markdown = turndownService.turndown(contentHtml);

        // Get Author
        const author = post._embedded?.author?.[0]?.name || "MindRubee Team";

        // Get Category
        let category = "Blog";
        if (post._embedded?.["wp:term"]?.[0]?.[0]) {
            category = post._embedded["wp:term"][0][0].name;
        }

        const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
category: "${category}"
author: "${author}"
image: "${featuredImage}"
excerpt: "${post.excerpt.rendered.replace(/<[^>]*>?/gm, "").slice(0, 160).replace(/"/g, '\\"') + '...'}"
---

${markdown}
`;

        fs.writeFileSync(path.join(POSTS_DIR, `${slug}.mdx`), fileContent);
    }

    console.log('Migration complete!');
}

migrate();
