'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

const BackButton = () => {
  const router = useRouter();

  return (
    <button className={styles.backButton} onClick={() => router.back()}>
      &larr; Back
    </button>
  );
};

export default BackButton;
