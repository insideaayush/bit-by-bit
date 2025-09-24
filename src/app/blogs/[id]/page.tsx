import { getPostData, getAllPostIds } from '@/lib/posts';
import BackButton from '@/components/BackButton';
import { Metadata } from 'next';

export const dynamicParams = false; // For static export

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);
  const siteUrl = 'https://aayushgautam.xyz';
  const fallbackImage = `${siteUrl}/images/fallback-image.svg`;
  const postImage = postData.image ? `${siteUrl}${postData.image}` : fallbackImage;

  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt || '',
      url: `${siteUrl}/blogs/${postData.id}`,
      siteName: 'Aayush Gautam',
      images: [postImage],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt || '',
      creator: '@aayush_gautam',
      images: [postImage],
    },
  };
}

export default async function Post({ params }: PageProps) {
  const { id } = await params;
  const postData = await getPostData(id);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    image: postData.image ? `https://aayushgautam.xyz${postData.image}` : 'https://aayushgautam.xyz/images/fallback-image.svg',
    author: {
      '@type': 'Person',
      name: 'Aayush Gautam',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aayush Gautam',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aayushgautam.xyz/icons/icon-512x512.png',
      },
    },
    datePublished: postData.date,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackButton />
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