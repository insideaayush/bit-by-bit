'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const [scheme, setScheme] = useState('github'); // 'default', 'github'
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
      document.documentElement.setAttribute('data-scheme', 'github'); // Set GitHub as default scheme
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
        {theme === 'light' ? (
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dark-mode</title> <g id="Layer_2" data-name="Layer 2"> <g id="Icons"> <g> <rect width="48" height="48" fill="none"></rect> <g> <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"></path> <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"></path> </g> </g> </g> </g> </g></svg>
          // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          //   <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.44 6.69a.75.75 0 0 1 1.06-1.06l1.59 1.59a.75.75 0 0 1-1.06 1.06L7.44 6.69ZM13.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM16.19 7.44a.75.75 0 0 1 1.06-1.06l1.59 1.59a.75.75 0 0 1-1.06 1.06l-1.59-1.59ZM18.75 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H19.5a.75.75 0 0 1-.75-.75ZM16.19 16.56a.75.75 0 0 1 1.06 1.06l-1.59 1.59a.75.75 0 0 1-1.06-1.06l1.59-1.59ZM12 18.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75ZM7.44 17.31a.75.75 0 0 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 1.06-1.06l1.59 1.59ZM3 12a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5H2.25a.75.75 0 0 1 .75.75ZM6.69 7.44a.75.75 0 0 1-1.06-1.06l-1.59 1.59a.75.75 0 0 1 1.06 1.06l1.59-1.59Z" clip-rule="evenodd" fill-rule="evenodd" />
          // </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="#ffffff"></path> </g></svg>
          // <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dark-mode</title> <g id="Layer_2" data-name="Layer 2"> <g id="Icons"> <g> <rect width="48" height="48" fill="none"></rect> <g> <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"></path> <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"></path> </g> </g> </g> </g> </g></svg>
          // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          //   <path d="M9.525 2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3.75h-3v.75a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM12 6a6 6 0 0 0-6 6c0 1.61.593 3.093 1.567 4.243a.75.75 0 0 1-.97 1.154A7.488 7.488 0 0 1 4.5 12a7.5 7.5 0 0 1 15 0c0 1.82-.597 3.5-1.603 4.83a.75.75 0 0 1-.97-1.154C17.407 15.093 18 13.61 18 12a6 6 0 0 0-6-6Z" clip-rule="evenodd" fill-rule="evenodd" />
          // </svg>
        )}
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
