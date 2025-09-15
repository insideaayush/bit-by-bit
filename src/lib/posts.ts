
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const markdownFiles = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));
  const imageFiles = fs.readdirSync(path.join(process.cwd(), 'public', 'images')).filter(fileName => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(fileName).toLowerCase()));

  const allPostsData = [...markdownFiles, ...imageFiles].map((fileName) => {
    const id = fileName.replace(/\.(md|jpg|png|gif)$/, '');
    const extension = path.extname(fileName).toLowerCase();

    const match = id.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
    const date = match ? match[1] : '';
    const type = match ? match[2] : '';

    let postData: { id: string; date: string; type: string; title?: string; url?: string; excerpt?: string } = { id, date, type };

    if (extension === '.md') {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents, { excerpt: true });
      postData = { ...postData, ...(matterResult.data as { title: string }), excerpt: matterResult.excerpt };
    } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
      postData.url = `${process.env.NEXT_PUBLIC_BASE_PATH}/images/${fileName}`;
      postData.title = type.replace(/-/g, ' '); // Create a title from the filename
    }

    return postData;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
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
