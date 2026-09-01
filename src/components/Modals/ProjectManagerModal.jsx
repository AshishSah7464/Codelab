import React, { useState } from 'react';
import { useCodeLab } from '../../context/CodeLabContext';
import { FolderOpen, Save, Trash2, Search, X, Calendar, Tag, FileCode, Check } from 'lucide-react';

export const ProjectManagerModal = () => {
  const {
    isProjectModalOpen, setIsProjectModalOpen,
    savedProjects,
    saveProject, loadProject, deleteProject,
    projectName, projectDescription, projectTags,
    currentProjectId
  } = useCodeLab();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'save_new'
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [titleInput, setTitleInput] = useState(projectName);
  const [descInput, setDescInput] = useState(projectDescription);
  const [tagsInput, setTagsInput] = useState(projectTags.join(', '));
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isProjectModalOpen) return null;

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    saveProject(titleInput, descInput, tagsArray);
    setSaveSuccessMsg('Project saved successfully to localStorage!');
    setTimeout(() => {
      setSaveSuccessMsg('');
      setActiveTab('saved');
    }, 1200);
  };

  const filteredProjects = savedProjects.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesName = p.name.toLowerCase().includes(term);
    const matchesDesc = (p.description || '').toLowerCase().includes(term);
    const matchesTags = (p.tags || []).some(t => t.toLowerCase().includes(term));
    return matchesName || matchesDesc || matchesTags;
  });

  return (
    <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <FolderOpen size={18} color="var(--accent-color)" />
            <span>Project Manager</span>
          </div>
          <button className="btn btn-icon" onClick={() => setIsProjectModalOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Manager Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '0 1rem', background: 'var(--bg-tertiary)' }}>
          <button
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <span>Saved Projects ({savedProjects.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'save_new' ? 'active' : ''}`}
            onClick={() => {
              setTitleInput(projectName);
              setDescInput(projectDescription);
              setTagsInput(projectTags.join(', '));
              setActiveTab('save_new');
            }}
          >
            <Save size={14} />
            <span>{currentProjectId ? 'Update Current Project' : 'Save As New Project'}</span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'save_new' ? (
            <form onSubmit={handleSaveSubmit}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. Interactive Dashboard"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  placeholder="Describe what this project does..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. css, flexbox, animation"
                />
              </div>

              {saveSuccessMsg && (
                <div style={{ color: 'var(--success-color)', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={16} /> {saveSuccessMsg}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Save size={15} /> Save Project to LocalStorage
              </button>
            </form>
          ) : (
            <div>
              {/* Search input */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '32px' }}
                  placeholder="Search saved projects by title, tag, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>

              {filteredProjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                  {savedProjects.length === 0
                    ? 'No saved projects found in LocalStorage yet. Save your current project to get started!'
                    : 'No projects match your search query.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: p.id === currentProjectId ? 'rgba(56, 189, 248, 0.08)' : 'var(--bg-primary)',
                        border: `1px solid ${p.id === currentProjectId ? 'var(--accent-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.name}</span>
                          {p.id === currentProjectId && (
                            <span className="template-tag" style={{ margin: 0, padding: '1px 6px' }}>Active</span>
                          )}
                        </div>

                        {p.description && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                            {p.description}
                          </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Calendar size={12} /> {new Date(p.updatedAt).toLocaleDateString()}
                          </span>

                          {p.tags && p.tags.length > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Tag size={12} /> {p.tags.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            loadProject(p.id);
                            setIsProjectModalOpen(false);
                          }}
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        >
                          Load
                        </button>

                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => deleteProject(p.id)}
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
