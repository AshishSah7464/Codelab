import React, { useState } from 'react';
import { useCodeLab } from '../../context/CodeLabContext';
import { CodeEditor } from './CodeEditor';
import { downloadSingleHtml, downloadZipArchive } from '../../utils/exportUtils';
import { ChevronUp, ChevronDown, AlertCircle, X, Code2, Hash, Braces, Maximize2, Layers, Columns, Download, FileCode, Archive, FolderOpen } from 'lucide-react';

export const EditorContainer = () => {
  const {
    html, setHtml,
    css, setCss,
    js, setJs,
    activeTab, setActiveTab,
    autoRun, runCode, clearConsole,
    activeError, setActiveError,
    projectName, saveProject,
    setIsTemplatesModalOpen
  } = useCodeLab();

  // Layout mode: 'stacked' (3 cards) or 'full' (single section 100% full page)
  const [viewMode, setViewMode] = useState('stacked');
  const [showSaveDropdown, setShowSaveDropdown] = useState(false);

  // Collapsible section states for stacked mode
  const [isHtmlOpen, setIsHtmlOpen] = useState(true);
  const [isCssOpen, setIsCssOpen] = useState(true);
  const [isJsOpen, setIsJsOpen] = useState(true);

  const handleClearAll = () => {
    setHtml('');
    setCss('');
    setJs('');
    clearConsole();
    if (autoRun) runCode();
  };

  const expandToFullPage = (mode) => {
    setActiveTab(mode);
    setViewMode('full');
  };

  const handleDownloadHtml = () => {
    saveProject(projectName || 'my-codelab-project');
    downloadSingleHtml(projectName || 'my-codelab-project', html, css, js);
    setShowSaveDropdown(false);
  };

  const handleDownloadZip = () => {
    saveProject(projectName || 'my-codelab-project');
    downloadZipArchive(projectName || 'my-codelab-project', html, css, js);
    setShowSaveDropdown(false);
  };

  return (
    <div className="editor-side" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#090d16',
      borderRight: '1px solid #1a2234',
      padding: '0.75rem',
      gap: '0.75rem',
      overflow: 'hidden'
    }}>
      {/* Playground Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.2rem 0.25rem',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            {projectName || 'Playground'}
          </h2>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#121824', padding: '2px', borderRadius: '6px' }}>
            <button
              className={`mode-switch-btn ${viewMode === 'stacked' ? 'active' : ''}`}
              onClick={() => setViewMode('stacked')}
              title="Stacked 3-Section View"
            >
              <Layers size={13} />
              <span>Stacked</span>
            </button>
            <button
              className={`mode-switch-btn ${viewMode === 'full' ? 'active' : ''}`}
              onClick={() => setViewMode('full')}
              title="Full Page Single Section View"
            >
              <Columns size={13} />
              <span>Full Page</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {/* Templates Gallery Button */}
          <button
            className="playground-action-btn"
            onClick={() => setIsTemplatesModalOpen(true)}
            title="Browse project templates"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FolderOpen size={13} color="#38bdf8" />
            <span>Templates</span>
          </button>

          {/* Run Button */}
          <button className="playground-action-btn btn-run" onClick={runCode} title="Run code (Ctrl+Enter)">
            Run
          </button>

          {/* Clear Button */}
          <button className="playground-action-btn" onClick={handleClearAll} title="Clear code">
            Clear
          </button>

          {/* Save / Download Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="playground-action-btn btn-save"
              onClick={() => setShowSaveDropdown(!showSaveDropdown)}
              title="Save & Download project"
            >
              <Download size={13} />
              <span>Save / Download</span>
              <ChevronDown size={12} />
            </button>

            {showSaveDropdown && (
              <div className="save-dropdown-menu">
                <button className="save-dropdown-item" onClick={handleDownloadHtml}>
                  <FileCode size={16} color="#e34c26" style={{ flexShrink: 0 }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#f8fafc' }}>Download Single Webpage (.html)</div>
                    <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>HTML + CSS + JS in one file</div>
                  </div>
                </button>

                <button className="save-dropdown-item" onClick={handleDownloadZip}>
                  <Archive size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#f8fafc' }}>Download Project ZIP (.zip)</div>
                    <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>Separate index.html, style.css, script.js</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prominent Error Banner */}
      {activeError && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#ef4444',
          padding: '8px 12px',
          fontSize: '0.825rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 600,
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
            <span>
              <strong>{(activeError.file || 'JS').toUpperCase()} Error</strong>
              {activeError.line ? ` at Line ${activeError.line}${activeError.column ? `, Col ${activeError.column}` : ''}` : ''}: {activeError.message}
            </span>
          </div>

          <button
            onClick={() => setActiveError(null)}
            style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Mode 1: Full Page View (100% height single editor section) */}
      {viewMode === 'full' ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: 0 }}>
          {/* Sub Tab selector for Full Page mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <button
              className={`full-tab-btn ${activeTab === 'html' ? 'active' : ''}`}
              onClick={() => setActiveTab('html')}
              style={{ color: activeTab === 'html' ? '#e34c26' : '#94a3b8' }}
            >
              <Code2 size={15} />
              <span>HTML</span>
            </button>

            <button
              className={`full-tab-btn ${activeTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveTab('css')}
              style={{ color: activeTab === 'css' ? '#38bdf8' : '#94a3b8' }}
            >
              <Hash size={15} />
              <span>CSS</span>
            </button>

            <button
              className={`full-tab-btn ${activeTab === 'js' ? 'active' : ''}`}
              onClick={() => setActiveTab('js')}
              style={{ color: activeTab === 'js' ? '#f7df1e' : '#94a3b8' }}
            >
              <Braces size={15} />
              <span>JavaScript</span>
            </button>
          </div>

          {/* 100% Height Code Editor */}
          <div className="editor-card" style={{ flex: 1, height: '100%', minHeight: 0 }}>
            <div className="editor-card-body" style={{ height: '100%' }}>
              {activeTab === 'html' && (
                <CodeEditor mode="html" value={html} onChange={(val) => { setHtml(val); if (autoRun) runCode(); }} />
              )}
              {activeTab === 'css' && (
                <CodeEditor mode="css" value={css} onChange={(val) => { setCss(val); if (autoRun) runCode(); }} />
              )}
              {activeTab === 'js' && (
                <CodeEditor mode="js" value={js} onChange={(val) => { setJs(val); if (autoRun) runCode(); }} />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Stacked Collapsible 3 Sections */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', minHeight: 0 }}>
          {/* Section 1: HTML Card */}
          <div className="editor-card" style={{ flex: isHtmlOpen ? 1 : 'none', minHeight: isHtmlOpen ? '180px' : 'auto' }}>
            <div className="editor-card-header" onClick={() => setIsHtmlOpen(!isHtmlOpen)}>
              <div className="editor-card-title" style={{ color: '#e34c26' }}>
                <Code2 size={16} />
                <span>HTML</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  className="collapse-btn"
                  onClick={(e) => { e.stopPropagation(); expandToFullPage('html'); }}
                  title="Expand to Full Page"
                >
                  <Maximize2 size={13} />
                </button>
                <button className="collapse-btn">
                  {isHtmlOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {isHtmlOpen && (
              <div className="editor-card-body">
                <CodeEditor mode="html" value={html} onChange={(val) => { setHtml(val); if (autoRun) runCode(); }} />
              </div>
            )}
          </div>

          {/* Section 2: CSS Card */}
          <div className="editor-card" style={{ flex: isCssOpen ? 1 : 'none', minHeight: isCssOpen ? '180px' : 'auto' }}>
            <div className="editor-card-header" onClick={() => setIsCssOpen(!isCssOpen)}>
              <div className="editor-card-title" style={{ color: '#38bdf8' }}>
                <Hash size={16} />
                <span>CSS</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  className="collapse-btn"
                  onClick={(e) => { e.stopPropagation(); expandToFullPage('css'); }}
                  title="Expand to Full Page"
                >
                  <Maximize2 size={13} />
                </button>
                <button className="collapse-btn">
                  {isCssOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {isCssOpen && (
              <div className="editor-card-body">
                <CodeEditor mode="css" value={css} onChange={(val) => { setCss(val); if (autoRun) runCode(); }} />
              </div>
            )}
          </div>

          {/* Section 3: JS Card */}
          <div className="editor-card" style={{ flex: isJsOpen ? 1 : 'none', minHeight: isJsOpen ? '180px' : 'auto' }}>
            <div className="editor-card-header" onClick={() => setIsJsOpen(!isJsOpen)}>
              <div className="editor-card-title" style={{ color: '#f7df1e' }}>
                <Braces size={16} />
                <span>JS</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  className="collapse-btn"
                  onClick={(e) => { e.stopPropagation(); expandToFullPage('js'); }}
                  title="Expand to Full Page"
                >
                  <Maximize2 size={13} />
                </button>
                <button className="collapse-btn">
                  {isJsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {isJsOpen && (
              <div className="editor-card-body">
                <CodeEditor mode="js" value={js} onChange={(val) => { setJs(val); if (autoRun) runCode(); }} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
