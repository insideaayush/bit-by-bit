'use client';

import React, { useState, useEffect } from 'react';
import styles from '../app/contact/contact.module.css';

interface ContactData {
  email: string;
  linkedin?: string;
  github?: string | { [key: string]: string };
  telegram?: string;
}

interface TerminalContactProps {
  contact: ContactData;
}

const TerminalContact: React.FC<TerminalContactProps> = ({ contact }) => {
  const [typedCommand, setTypedCommand] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const command = 'neofetch';
  const typingSpeed = 100; // milliseconds per character
  const delayBeforeOutput = 500; // milliseconds

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < command.length) {
        setTypedCommand((prev) => prev + command.charAt(i));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowOutput(true), delayBeforeOutput);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, []);

  const neofetchAsciiArt = `
+---+
|   |
| > |
+---+
  `;

  const contactInfo = {
    Email: contact.email,
    LinkedIn: contact.linkedin,
    Telegram: contact.telegram,
  };

  return (
    <div className={styles.terminalWindow}>
      <div className={styles.terminalContent}>
        <p className={styles.terminalLine}>
          <span className={styles.terminalPrompt}>user@bit-by-bit:~$</span>
          <span className={styles.typedCommand}>{typedCommand}</span>
          {!showOutput && <span className={styles.cursor}>_</span>}
        </p>

        {showOutput && (
          <div className={styles.contactOutput}>
            <pre className={styles.asciiArt}>{neofetchAsciiArt}</pre>
            <div className={styles.contactDetails}>
              {Object.entries(contactInfo).map(([key, value]) => (
                value && (
                  <p key={key} className={styles.terminalLine}>
                    <span className={styles.contactKey}>{key}:</span> {' '}
                    {key === 'Email' ? (
                      <a href={`mailto:${value}`} className={styles.contactLink}>
                        {value}
                      </a>
                    ) : key === 'LinkedIn' && typeof value === 'string' ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        {value.split('/').filter(Boolean).pop()} {/* Get last non-empty segment */}
                      </a>
                    ) : key === 'Telegram' && typeof value === 'string' ? (
                      <a href={`https://t.me/${value}`} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        {value}
                      </a>
                    ) : (
                      String(value)
                    )}
                  </p>
                )
              ))}
            </div>
          </div>
        )}
        {showOutput && (
          <p className={styles.terminalLine}>
            <span className={styles.terminalPrompt}>user@bit-by-bit:~$</span> <span className={styles.cursor}>_</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TerminalContact;
