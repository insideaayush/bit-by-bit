'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/home.module.css';
import LightboxWrapper from '@/components/Lightbox';

interface HomePageContentProps {
  allPostsData: Array<{
    id: string;
    date: string;
    title?: string;
    type: string;
    excerpt?: string;
    url?: string;
  }>;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ allPostsData }) => {
  const imagePosts = allPostsData.filter((post) => post.url);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const slides = imagePosts.map((post) => ({
    src: post.url!,
    alt: post.title!,
  }));

  return (
    <section>
      <h2>Posts</h2>
      <div className={styles.timeline}>
        {allPostsData.map(({ id, date, title, type, excerpt, url }, index) => (
          <div key={id} className={styles.timelineItem}>
            <div className={styles.timelineLeft}>
              <div className={styles.timelineDate}>{date}</div>
            </div>
            <div className={styles.timelineRight}>
              <div className={styles.card}>
                {type === 'blog' ? (
                  <Link href={`/blogs/${id}`}>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                  </Link>
                ) : (
                  <div onClick={() => setSelectedIndex(index)}>
                    {url && title && <Image src={url} alt={title} width={600} height={400} style={{ width: '100%', height: 'auto' }} />}
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
