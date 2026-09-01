import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { templates } from '../data/templates';

const CodeLabContext = createContext();

const STORAGE_KEY = 'codelab_saved_projects_v1';
const CURRENT_PROJECT_KEY = 'codelab_active_draft_v1';

// Synchronous helper to retrieve active draft before initial render
const getInitialDraft = () => {
  try {
    const stored = localStorage.getItem(CURRENT_PROJECT_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return null;
};

export const CodeLabProvider = ({ children }) => {
  const defaultTemplate = templates[0];
  const initialDraft = getInitialDraft();

  // Initialize state synchronously from draft or default template
  const [html, setHtml] = useState(() => (initialDraft && typeof initialDraft.html === 'string') ? initialDraft.html : defaultTemplate.html);
  const [css, setCss] = useState(() => (initialDraft && typeof initialDraft.css === 'string') ? initialDraft.css : defaultTemplate.css);
  const [js, setJs] = useState(() => (initialDraft && typeof initialDraft.js === 'string') ? initialDraft.js : defaultTemplate.js);

  const [activeTab, setActiveTab] = useState('html'); // 'html' | 'css' | 'js' | 'console'
  const [theme, setTheme] = useState(() => localStorage.getItem('codelab_theme') || 'dark');
  const [autoRun, setAutoRun] = useState(true);
  const [layout, setLayout] = useState('split'); // 'split' | 'tabs' | 'preview'

  const [projectName, setProjectName] = useState(() => (initialDraft && initialDraft.projectName) ? initialDraft.projectName : 'Playground');
  const [projectDescription, setProjectDescription] = useState('My awesome web experiment');
  const [projectTags, setProjectTags] = useState(['web', 'starter']);
  const [currentProjectId, setCurrentProjectId] = useState(() => initialDraft?.currentProjectId || null);

  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [consoleLogs, setConsoleLogs] = useState([]);
  const [activeError, setActiveError] = useState(null); // { file: 'js', message: '', line: 12, column: 5 }
  const [runKey, setRunKey] = useState(0); // Trigger re-render of iframe
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  // Sync theme to document body
  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('codelab_theme', theme);
  }, [theme]);

  // Save active draft instantly on changes so page refresh never loses code
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify({
          html, css, js, projectName, currentProjectId,
          updatedAt: new Date().toISOString()
        }));
      } catch (e) {}
    }, 200);
    return () => clearTimeout(timer);
  }, [html, css, js, projectName, currentProjectId]);

  // Persist saved projects to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProjects));
    } catch (e) {
      console.error('Failed to persist projects:', e);
    }
  }, [savedProjects]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const runCode = useCallback(() => {
    setActiveError(null);
    setRunKey(prev => prev + 1);
  }, []);

  const clearConsole = useCallback(() => {
    setConsoleLogs([]);
    setActiveError(null);
  }, []);

  const addConsoleLog = useCallback((log) => {
    setConsoleLogs(prev => [...prev.slice(-199), { ...log, id: Date.now() + Math.random() }]);
    if (log.type === 'error') {
      setActiveError({
        file: log.file || 'js',
        message: log.message,
        line: log.line || null,
        column: log.column || null
      });
    }
  }, []);

  const resetCode = useCallback(() => {
    setHtml(defaultTemplate.html);
    setCss(defaultTemplate.css);
    setJs(defaultTemplate.js);
    setProjectName('Playground');
    setCurrentProjectId(null);
    clearConsole();
    runCode();
  }, [defaultTemplate, clearConsole, runCode]);

  const loadTemplate = useCallback((templateId) => {
    const tpl = templates.find(t => t.id === templateId);
    if (tpl) {
      setHtml(tpl.html);
      setCss(tpl.css);
      setJs(tpl.js);
      setProjectName(tpl.name);
      setProjectDescription(tpl.description || '');
      setProjectTags([tpl.tag.toLowerCase(), 'template']);
      setCurrentProjectId(null);
      clearConsole();
      runCode();
    }
  }, [clearConsole, runCode]);

  const saveProject = useCallback((name, description, tags) => {
    const titleToSave = name.trim() || projectName || 'Untitled Project';
    const idToSave = currentProjectId || 'proj_' + Date.now();
    const updatedProject = {
      id: idToSave,
      name: titleToSave,
      description: description || projectDescription,
      tags: tags || projectTags,
      html,
      css,
      js,
      createdAt: savedProjects.find(p => p.id === idToSave)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSavedProjects(prev => {
      const exists = prev.some(p => p.id === idToSave);
      if (exists) {
        return prev.map(p => p.id === idToSave ? updatedProject : p);
      } else {
        return [updatedProject, ...prev];
      }
    });

    setProjectName(titleToSave);
    if (description) setProjectDescription(description);
    if (tags) setProjectTags(tags);
    setCurrentProjectId(idToSave);
    return updatedProject;
  }, [currentProjectId, projectName, projectDescription, projectTags, html, css, js, savedProjects]);

  const loadProject = useCallback((projectId) => {
    const proj = savedProjects.find(p => p.id === projectId);
    if (proj) {
      setHtml(proj.html);
      setCss(proj.css);
      setJs(proj.js);
      setProjectName(proj.name);
      setProjectDescription(proj.description || '');
      setProjectTags(proj.tags || []);
      setCurrentProjectId(proj.id);
      clearConsole();
      runCode();
    }
  }, [savedProjects, clearConsole, runCode]);

  const deleteProject = useCallback((projectId) => {
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
    }
  }, [currentProjectId]);

  return (
    <CodeLabContext.Provider
      value={{
        html, setHtml,
        css, setCss,
        js, setJs,
        activeTab, setActiveTab,
        theme, toggleTheme,
        autoRun, setAutoRun,
        layout, setLayout,
        projectName, setProjectName,
        projectDescription, setProjectDescription,
        projectTags, setProjectTags,
        currentProjectId,
        savedProjects,
        consoleLogs, addConsoleLog, clearConsole,
        activeError, setActiveError,
        runKey, runCode, resetCode, loadTemplate,
        saveProject, loadProject, deleteProject,
        isFullscreenPreview, setIsFullscreenPreview,
        isProjectModalOpen, setIsProjectModalOpen,
        isTemplatesModalOpen, setIsTemplatesModalOpen,
        isShortcutsModalOpen, setIsShortcutsModalOpen
      }}
    >
      {children}
    </CodeLabContext.Provider>
  );
};

export const useCodeLab = () => useContext(CodeLabContext);
