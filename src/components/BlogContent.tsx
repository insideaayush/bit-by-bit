'use client';

import Link from 'next/link';
import styles from '@/app/blogs/blogs.module.css';

interface BlogContentProps {
  blogPosts: Array<{
    id: string;
    date: string;
    title?: string;
    excerpt?: string;
  }>;
}

const BlogContent: React.FC<BlogContentProps> = ({ blogPosts }) => {
  return (
    <div className={styles.timeline}>
      {blogPosts.map(({ id, date, title, excerpt }) => (
        <div key={id} className={styles.timelineItem}>
          <div className={styles.timelineLeft}>
            <div className={styles.timelineDate}>{date}</div>
          </div>
          <div className={styles.timelineRight}>
            <div className={styles.card}>
              <Link href={`/blogs/${id}`}>
                <h2>{title}</h2>
                <p>{excerpt}</p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogContent;
