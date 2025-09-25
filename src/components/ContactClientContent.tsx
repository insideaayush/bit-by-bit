'use client';

import { useState } from 'react';
import styles from '@/app/contact/contact.module.css'; // Use absolute path for styles
import TerminalContact from '@/components/TerminalContact';
import Image from 'next/image';
import { ResumeData } from '@/lib/contact-data'; // Import ResumeData

interface ContactClientContentProps {
  data: ResumeData; // Use ResumeData type
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 458.624 458.624" fill="currentColor" className={`${styles.toggleIcon} ${!showTerminal ? styles.rotated : ''}`}>
            <g>
              <g>
                <path fill="currentColor" d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871
					c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047
					C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491
					c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047
					c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047
					c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z"/>
              </g>
            </g>
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
          <p>Scan the QR code to easily add me to your contacts.</p>
          <Image src="/contact-qr.png" alt="QR Code for Contact Info" width={200} height={200} className={styles.qrCodeImage} />
        </div>
      )}
    </div>
  );
};

export default ContactClientContent;
