
import { getSortedPostsData, BlogPost } from '@/lib/posts';
import BlogContent from '@/components/BlogContent';

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
