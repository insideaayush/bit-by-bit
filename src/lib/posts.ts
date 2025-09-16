import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicImagesDirectory = path.join(process.cwd(), 'public', 'images');

export function getSortedPostsData() {
  // --- Process Blog Posts --- //
  let markdownFiles = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));

  // Filter out draft posts in production
  if (process.env.APP_ENV === 'production') {
    markdownFiles = markdownFiles.filter(fileName => !fileName.endsWith('-draft.md'));
  }

  const blogPosts = markdownFiles.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents, { excerpt: true });

    const match = id.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
    const date = match ? match[1] : '';

    const postData: { id: string; date: string; type: string; title?: string; excerpt?: string } = {
      id,
      type: 'blog',
      date: date,
      title: matterResult.data.title as string,
      excerpt: matterResult.excerpt,
    };
    return postData;
  });

  // --- Process Image Posts --- //
  const imageFiles = fs.readdirSync(publicImagesDirectory).filter(fileName => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(fileName).toLowerCase()));

  const imagePosts = imageFiles.map((fileName) => {
    const id = fileName.replace(/\.(md|jpg|png|gif)$/, '');
    const match = id.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
    const date = match ? match[1] : '';
    const title = match ? match[2].replace(/-/g, ' ') : '';

    const postData: { id: string; date: string; type: string; title?: string; url?: string; } = {
      id,
      date,
      title,
      type: 'image',
      url: `/images/${fileName}`,
    };
    return postData;
  });

  // --- Combine and Sort --- //
  const allPostsData = [...blogPosts, ...imagePosts];

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(): string[] {
  let fileNames = fs.readdirSync(postsDirectory);

  // Filter out draft posts in production
  if (process.env.APP_ENV === 'production') {
    fileNames = fileNames.filter(fileName => !fileName.endsWith('-draft.md'));
  }

  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}