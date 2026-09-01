import React from 'react';
import { useCodeLab } from '../context/CodeLabContext';
import { Moon, Sun, Code2 } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = useCodeLab();

  return (
    <header className="navbar" style={{
      height: '48px',
      backgroundColor: '#0c1017',
      borderBottom: '1px solid #1e2638',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.25rem',
      color: '#f8fafc'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem' }}>
        <Code2 size={20} color="#38bdf8" />
        <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          CodeLab
        </span>
      </div>

      <div style={{ fontSize: '0.825rem', color: '#94a3b8', textAlign: 'center' }}>
        Write HTML, CSS, and JavaScript code to build your own web page.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          className="btn"
          onClick={toggleTheme}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#cbd5e1',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? <Moon size={15} color="#94a3b8" /> : <Sun size={15} color="#f59e0b" />}
          <span>Theme</span>
        </button>
      </div>
    </header>
  );
};
