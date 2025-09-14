import Navigation from './Navigation';
import styles from './Layout.module.css';
import ScrollToTopButton from './ScrollToTopButton';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default Layout;