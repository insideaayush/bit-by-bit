
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/gallery">Gallery</Link>
      <Link href="/resume">Resume</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
};

export default Navigation;
