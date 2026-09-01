import React from 'react';
import { useCodeLab } from '../../context/CodeLabContext';
import { templates } from '../../data/templates';
import { X, FolderOpen, Code2, ArrowRight } from 'lucide-react';

export const TemplatesModal = () => {
  const {
    isTemplatesModalOpen, setIsTemplatesModalOpen,
    loadTemplate
  } = useCodeLab();

  if (!isTemplatesModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsTemplatesModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderOpen size={20} color="var(--accent-color)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Templates Gallery</h2>
          </div>

          <button
            className="btn btn-icon"
            onClick={() => setIsTemplatesModalOpen(false)}
            style={{ background: 'transparent', border: 'none' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', maxHeight: '65vh' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Choose a pre-built web project template to load into your editor:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '14px'
          }}>
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="template-card-item"
                onClick={() => {
                  loadTemplate(tpl.id);
                  setIsTemplatesModalOpen(false);
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{tpl.icon}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--accent-color)'
                    }}>
                      {tpl.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                    {tpl.name}
                  </h3>

                  <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {tpl.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-color)',
                  marginTop: '6px'
                }}>
                  <span>Load Project</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
