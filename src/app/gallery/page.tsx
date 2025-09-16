
import { getSortedPostsData, ImagePost } from '@/lib/posts';
import GalleryContent from '@/components/GalleryContent';

export default function Gallery() {
  const allPostsData = getSortedPostsData();
  const imagePosts = allPostsData.filter(
  (p): p is ImagePost => p.type === 'image'
);

  // const imagePosts = allPostsData.filter((post) => post.url);

  return (
    <div>
      <h1>Gallery</h1>
      <GalleryContent imagePosts={imagePosts} />
    </div>
  );
}
