import React, { useEffect } from 'react';
import { CodeLabProvider, useCodeLab } from './context/CodeLabContext';
import { Navbar } from './components/Navbar';
import { SplitPane } from './components/UI/SplitPane';
import { ProjectManagerModal } from './components/Modals/ProjectManagerModal';
import { ShortcutsModal } from './components/Modals/ShortcutsModal';
import { TemplatesModal } from './components/Modals/TemplatesModal';

const CodeLabApp = () => {
  const {
    runCode, clearConsole, toggleTheme,
    isFullscreenPreview, setIsFullscreenPreview,
    setIsProjectModalOpen, setIsShortcutsModalOpen, setIsTemplatesModalOpen,
    isProjectModalOpen, isShortcutsModalOpen, isTemplatesModalOpen
  } = useCodeLab();

  // Keyboard Shortcuts Global Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl + Enter -> Run Code
      if (isCtrlOrCmd && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }

      // Ctrl + S -> Save Project
      if (isCtrlOrCmd && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsProjectModalOpen(true);
      }

      // Ctrl + L -> Clear Console
      if (isCtrlOrCmd && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        clearConsole();
      }

      // Ctrl + Shift + F -> Toggle Fullscreen Preview
      if (isCtrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFullscreenPreview(prev => !prev);
      }

      // Ctrl + Shift + D -> Toggle Theme
      if (isCtrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleTheme();
      }

      // Esc -> Exit Fullscreen or Close Modals
      if (e.key === 'Escape') {
        if (isFullscreenPreview) setIsFullscreenPreview(false);
        if (isProjectModalOpen) setIsProjectModalOpen(false);
        if (isShortcutsModalOpen) setIsShortcutsModalOpen(false);
        if (isTemplatesModalOpen) setIsTemplatesModalOpen(false);
      }

      // '?' key -> Open Shortcuts Modal (when not typing in input/textarea)
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    runCode, clearConsole, toggleTheme, isFullscreenPreview, setIsFullscreenPreview,
    isProjectModalOpen, isShortcutsModalOpen, isTemplatesModalOpen,
    setIsProjectModalOpen, setIsShortcutsModalOpen, setIsTemplatesModalOpen
  ]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <SplitPane />

      {/* Global Modals */}
      <ProjectManagerModal />
      <ShortcutsModal />
      <TemplatesModal />
    </div>
  );
};

export default function App() {
  return (
    <CodeLabProvider>
      <CodeLabApp />
    </CodeLabProvider>
  );
}
