import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Content (including photographs, images, blog posts, essays, and other original literary and artistic works) &copy; {new Date().getFullYear()} Aayush Gautam &mdash; All rights reserved.</p>
      <p>Site code &copy; {new Date().getFullYear()} Aayush Gautam &mdash; MIT License.</p>
      <p>Permissions: <a href="mailto:aayush.gautam924@gmail.com" className={styles.footerLink}>aayush.gautam924@gmail.com</a></p>
      <p>Third-party trademarks are the property of their respective owners.</p>
    </footer>
  );
};

export default Footer;
