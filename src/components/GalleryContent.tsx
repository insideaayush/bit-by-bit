'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/gallery/gallery.module.css';
import LightboxWrapper from '@/components/Lightbox';

interface GalleryContentProps {
  imagePosts: Array<{
    id: string;
    date: string;
    title?: string;
    url?: string;
  }>;
}

const GalleryContent: React.FC<GalleryContentProps> = ({ imagePosts }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const slides = imagePosts.map((post) => ({
    src: post.url!,
    alt: post.title!,
  }));

  return (
    <div className={styles.timeline}>
      {imagePosts.map(({ id, url, title, date }, index) => (
        <div key={id} className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineDate}>{date}</div>
          </div>
          <div className={styles.timelineRight}>
            <div className={styles.card} onClick={() => setSelectedIndex(index)}>
              <Image src={url!} alt={title!} width={600} height={400} style={{ width: '100%', height: 'auto' }} />
              <p>{title}</p>
            </div>
          </div>
        </div>
      ))}
      <LightboxWrapper
        images={slides}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(-1)}
      />
    </div>
  );
};

export default GalleryContent;
