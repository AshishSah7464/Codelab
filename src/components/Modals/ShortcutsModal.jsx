import React from 'react';
import { useCodeLab } from '../../context/CodeLabContext';
import { Keyboard, X } from 'lucide-react';

export const ShortcutsModal = () => {
  const { isShortcutsModalOpen, setIsShortcutsModalOpen } = useCodeLab();

  if (!isShortcutsModalOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Enter / Cmd + Enter', action: 'Run code & refresh live preview' },
    { key: 'Ctrl + S / Cmd + S', action: 'Save current project to LocalStorage' },
    { key: 'Ctrl + L / Cmd + L', action: 'Clear console logs' },
    { key: 'Ctrl + Shift + F', action: 'Toggle full-screen preview mode' },
    { key: 'Ctrl + Shift + D', action: 'Toggle Dark / Light mode theme' },
    { key: 'Esc', action: 'Exit full-screen preview or close modal' },
    { key: '?', action: 'Open keyboard shortcuts cheat sheet' }
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsShortcutsModalOpen(false)}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Keyboard size={18} color="var(--accent-color)" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button className="btn btn-icon" onClick={() => setIsShortcutsModalOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {shortcuts.map((sc, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px'
                }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{sc.action}</span>
                <kbd
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-color)',
                    fontWeight: 600
                  }}
                >
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
