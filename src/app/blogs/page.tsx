
import { getSortedPostsData, BlogPost } from '@/lib/posts';
import BlogContent from '@/components/BlogContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs - Aayush Gautam',
  description: 'A collection of blog posts by Aayush Gautam.',
};

export default function Blogs() {
  const allPostsData = getSortedPostsData();
  const blogPosts = allPostsData.filter((post): post is BlogPost => post.type === 'blog');

  return (
    <div>
      <h1>Blogs</h1>
      <BlogContent blogPosts={blogPosts} />
    </div>
  );
}
