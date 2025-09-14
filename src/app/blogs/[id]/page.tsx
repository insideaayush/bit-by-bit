import { getPostData } from '@/lib/posts';

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