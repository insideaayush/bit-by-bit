'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/home.module.css';
import LightboxWrapper from '@/components/Lightbox';

import { Post, BlogPost, ImagePost } from '@/lib/posts';

interface HomePageContentProps {
  allPostsData: Post[];
}

const HomePageContent: React.FC<HomePageContentProps> = ({ allPostsData }) => {
  const imagePosts = allPostsData.filter((p): p is ImagePost => p.type === 'image');

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const slides = imagePosts.map((post) => ({
    src: post.url!,
    alt: post.title!,
  }));

  return (
    <section>
      <h2>Posts</h2>
      <div className={styles.timeline}>
        {allPostsData.map((post, index) => (
          <div key={post.id} className={styles.timelineItem}>
            <div className={styles.timelineLeft}>
              <div className={styles.timelineDate}>{post.date}</div>
            </div>
            <div className={styles.timelineRight}>
              <div className={styles.card}>
                {post.type === 'blog' ? (
                  <Link href={`/blogs/${post.id}`}>
                    <h3>{post.title}</h3>
                    <p>{(post as BlogPost).excerpt}</p>
                  </Link>
                ) : (
                  <div onClick={() => setSelectedIndex(index)}>
                    {(post as ImagePost).url && post.title && <Image src={(post as ImagePost).url} alt={post.title} width={600} height={400} style={{ width: '100%', height: 'auto' }} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <LightboxWrapper
        images={slides}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(-1)}
      />
    </section>
  );
};

export default HomePageContent;
