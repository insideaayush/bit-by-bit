import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents, { excerpt: true });

      const match = id.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
      const date = match ? match[1] : '';

      return {
        id,
        date: matterResult.data.date || date,
        title: matterResult.data.title,
        excerpt: matterResult.excerpt,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function generateRss() {
  const siteUrl = 'https://aayushgautam.xyz';
  const allPosts = getPosts();

  const feed = new RSS({
    title: 'Aayush Gautam\'s Blog',
    description: 'A collection of thoughts and writings by Aayush Gautam.',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'en',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Aayush Gautam`,
  });

  allPosts.forEach(post => {
    feed.item({
      title: post.title || '',
      description: post.excerpt || '',
      url: `${siteUrl}/blogs/${post.id}`,
      guid: post.id,
      date: new Date(post.date),
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
  console.log('Generated rss.xml');
}

generateRss();
