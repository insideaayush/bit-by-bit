import { getPostData, getAllPostIds } from '@/lib/posts';

export const dynamicParams = false; // For static export

export default async function Post(props: PageProps<'/blogs/[id]'>) {
  const { id } = await props.params
  const postData = await getPostData(id);
  return (
    <article>
      <h1>{postData.title}</h1>
      <div>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = getAllPostIds(); // returns string[]
  return slugs.map((id) => ({ id }));
}