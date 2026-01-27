const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_PATH = path.join(process.cwd(), 'posts');

function getPostSlugs() {
    try {
        return fs.readdirSync(POSTS_PATH);
    } catch (e) {
        console.error("Error reading posts dir:", e.message);
        return [];
    }
}

function getPostBySlug(slug) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug: realSlug, title: data.title };
    } catch (e) {
        // console.log(`Skipping ${slug}: ${e.message}`);
        return null;
    }
}

function verify() {
    console.log("Checking posts in:", POSTS_PATH);
    const slugs = getPostSlugs();
    console.log("Found files:", slugs);

    const posts = slugs.map(getPostBySlug).filter(p => p !== null);
    console.log(`Successfully parsed ${posts.length} posts.`);
    posts.forEach(p => console.log(`- ${p.title}`));
}

verify();
