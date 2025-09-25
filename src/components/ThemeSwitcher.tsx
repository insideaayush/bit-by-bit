'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const [scheme, setScheme] = useState('default'); // 'default', 'github'
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const storedScheme = localStorage.getItem('scheme');

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemPrefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }

    if (storedScheme) {
      setScheme(storedScheme);
      document.documentElement.setAttribute('data-scheme', storedScheme);
    } else {
      document.documentElement.setAttribute('data-scheme', 'default');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const selectScheme = (selectedScheme: string) => {
    setScheme(selectedScheme);
    document.documentElement.setAttribute('data-scheme', selectedScheme);
    localStorage.setItem('scheme', selectedScheme);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      position: 'relative', /* Needed for absolute positioning of the card */
    }}>
      <button
        onClick={() => setShowCard(!showCard)}
        style={{
          padding: '0.5rem',
          borderRadius: '50%',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.73-1.71-.97l-.35-2.5c-.05-.24-.27-.42-.51-.42h-4c-.25 0-.46.18-.5.42l-.36 2.5c-.62.24-1.19.57-1.71.97l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.73 1.71.97l.35 2.5c.05.24.27.42.51.42h4c.25 0 .46-.18.5-.42l.36-2.5c.62-.24 1.19-.57 1.71-.97l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-4.43 2.52c-.76.76-1.76 1.17-2.83 1.17s-2.07-.41-2.83-1.17c-.76-.76-1.17-1.76-1.17-2.83s.41-2.07 1.17-2.83c.76-.76 1.76-1.17 2.83-1.17s2.07.41 2.83 1.17c.76.76 1.17 1.76 1.17 2.83s-.41 2.07-1.17 2.83z"/>
        </svg>
      </button>

      {showCard && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          zIndex: 100,
          backgroundColor: 'var(--color-background)',
          border: 'var(--border-width-base) solid var(--color-border)',
          borderRadius: 'var(--border-radius-base)',
          padding: 'var(--spacing-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)',
          minWidth: '150px',
        }}>
          <h3>Mode</h3>
          <button
            onClick={toggleTheme}
            style={{
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius-base)',
              border: '1px solid var(--color-link)',
              backgroundColor: theme === 'dark' ? 'var(--color-link)' : 'transparent',
              color: theme === 'dark' ? 'var(--color-link-hover-text)' : 'var(--color-link)',
              cursor: 'pointer',
            }}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>

          <h3>Color Scheme</h3>
          <button
            onClick={() => selectScheme('default')}
            style={{
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius-base)',
              border: '1px solid var(--color-link)',
              backgroundColor: scheme === 'default' ? 'var(--color-link)' : 'transparent',
              color: scheme === 'default' ? 'var(--color-link-hover-text)' : 'var(--color-link)',
              cursor: 'pointer',
            }}
          >
            Default
          </button>
          <button
            onClick={() => selectScheme('github')}
            style={{
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius-base)',
              border: '1px solid var(--color-link)',
              backgroundColor: scheme === 'github' ? 'var(--color-link)' : 'transparent',
              color: scheme === 'github' ? 'var(--color-link-hover-text)' : 'var(--color-link)',
              cursor: 'pointer',
            }}
          >
            GitHub Terminal
          </button>
        </div>
      )}
    </div>
  );
};
