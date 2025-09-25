
import Link from 'next/link';
import styles from './Navigation.module.css';
import ThemeSwitcher from './ThemeSwitcher';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navigation;
