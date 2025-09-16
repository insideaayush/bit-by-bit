'use client';

import { useState } from 'react';
import styles from '@/app/contact/contact.module.css'; // Use absolute path for styles
import TerminalContact from '@/components/TerminalContact';
import Image from 'next/image';

interface ContactClientContentProps {
  data: any; // Use a more specific type if available, e.g., ResumeData from contact-data.ts
}

const ContactClientContent: React.FC<ContactClientContentProps> = ({ data }) => {
  const [showTerminal, setShowTerminal] = useState(true);

  if (!data) {
    return <div>No contact data found.</div>;
  }

  return (
    <div className={styles.contactPageContainer}>
      <h1>Contact Me</h1>
      <p>I&apos;m always open to new opportunities and collaborations. Feel free to reach out!</p>

      <button
        className={styles.iconToggleButton}
        onClick={() => setShowTerminal(!showTerminal)}
        title={showTerminal ? "Switch to Share Info" : "Switch to Terminal View"}
      >
        {showTerminal ? (
          // Share Icon (simple SVG) - shown when currently in Terminal View, clicking switches to Share
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${styles.toggleIcon} ${!showTerminal ? styles.rotated : ''}`}>
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.52.48 1.2.78 1.96.78 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.05 11.9c-.52-.48-1.2-.78-1.96-.78-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77L15.09 16.7c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        ) : (
          // Terminal Icon (simple SVG) - shown when currently in Share Info, clicking switches to Terminal
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${styles.toggleIcon} ${showTerminal ? styles.rotated : ''}`}>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2z"/>
          </svg>
        )}
      </button>

      {showTerminal ? (
        <TerminalContact contact={data.contact} />
      ) : (
        <div className={styles.contactShareSection}>
          <h2>Share My Contact Info</h2>
          <p>Scan the QR code or download my vCard to easily add me to your contacts.</p>
          <a href="/contact.vcf" download="Aayush_Gautam_Contact.vcf" className={styles.vcardDownloadLink}>
            Download vCard
          </a>
          <Image src="/contact-qr.png" alt="QR Code for Contact Info" width={200} height={200} className={styles.qrCodeImage} />
        </div>
      )}
    </div>
  );
};

export default ContactClientContent;
