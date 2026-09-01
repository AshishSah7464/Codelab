import React from 'react';
import { useCodeLab } from '../../context/CodeLabContext';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export const ConsolePanel = ({ height = 180 }) => {
  const { consoleLogs, clearConsole } = useCodeLab();

  return (
    <div className="console-panel" style={{ height: `${height}px`, backgroundColor: '#090d16', borderTop: '1px solid #1a2234' }}>
      {/* Console Header */}
      <div style={{
        height: '36px',
        padding: '0 0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0c1017',
        borderBottom: '1px solid #1a2234',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#cbd5e1'
      }}>
        <div>
          <span>Console ({consoleLogs.length})</span>
        </div>

        <button
          onClick={clearConsole}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
          title="Clear console"
        >
          Clear
        </button>
      </div>

      {/* Console Body */}
      <div className="console-body" style={{ padding: '0.5rem 0.85rem', overflowY: 'auto' }}>
        {consoleLogs.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic', padding: '0.4rem 0' }}>
            Console is empty.
          </div>
        ) : (
          consoleLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.825rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.3rem 0',
                color: log.type === 'error' ? '#ef4444' : log.type === 'warn' ? '#f59e0b' : '#cbd5e1'
              }}
            >
              {log.type === 'error' ? (
                <AlertCircle size={14} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : log.type === 'warn' ? (
                <AlertTriangle size={14} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>📝</span>
              )}

              <div style={{ flex: 1, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                {log.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
