import React, { useState, useRef, useEffect } from 'react';
import { EditorContainer } from '../Editor/EditorContainer';
import { PreviewPanel } from '../Preview/PreviewPanel';
import { ConsolePanel } from '../Console/ConsolePanel';

export const SplitPane = () => {
  const [editorWidthPercent, setEditorWidthPercent] = useState(50);
  const [consoleHeightPx, setConsoleHeightPx] = useState(160);

  const [isDraggingH, setIsDraggingH] = useState(false);
  const [isDraggingV, setIsDraggingV] = useState(false);

  const containerRef = useRef(null);
  const rightSideRef = useRef(null);

  // Handle horizontal resizing (Editors width vs Preview width)
  useEffect(() => {
    const handleMouseMoveH = (e) => {
      if (!isDraggingH || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      let newPercent = (offset / rect.width) * 100;
      if (newPercent < 15) newPercent = 15;
      if (newPercent > 85) newPercent = 85;
      setEditorWidthPercent(newPercent);
    };

    const handleMouseUpH = () => {
      setIsDraggingH(false);
    };

    if (isDraggingH) {
      window.addEventListener('mousemove', handleMouseMoveH);
      window.addEventListener('mouseup', handleMouseUpH);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveH);
      window.removeEventListener('mouseup', handleMouseUpH);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDraggingH]);

  // Handle vertical console panel resizing
  useEffect(() => {
    const handleMouseMoveV = (e) => {
      if (!isDraggingV || !rightSideRef.current) return;
      const rect = rightSideRef.current.getBoundingClientRect();
      let newHeight = rect.bottom - e.clientY;
      if (newHeight < 36) newHeight = 36;
      if (newHeight > rect.height - 80) newHeight = rect.height - 80;
      setConsoleHeightPx(newHeight);
    };

    const handleMouseUpV = () => {
      setIsDraggingV(false);
    };

    if (isDraggingV) {
      window.addEventListener('mousemove', handleMouseMoveV);
      window.addEventListener('mouseup', handleMouseUpV);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'row-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveV);
      window.removeEventListener('mouseup', handleMouseUpV);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDraggingV]);

  const isDragging = isDraggingH || isDraggingV;

  return (
    <main className="main-container" ref={containerRef}>
      {/* Invisible global drag overlay to prevent iframe mouse trapping during splitter drag */}
      {isDragging && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            cursor: isDraggingH ? 'col-resize' : 'row-resize',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        />
      )}

      {/* Left side: Code Editors */}
      <div style={{ width: `${editorWidthPercent}%`, height: '100%', display: 'flex' }}>
        <EditorContainer />
      </div>

      {/* Vertical Splitter Handle */}
      <div
        className={`splitter ${isDraggingH ? 'dragging' : ''}`}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDraggingH(true);
        }}
        title="Drag to resize editors & preview"
      />

      {/* Right side: Preview & Console */}
      <div className="preview-side" ref={rightSideRef} style={{ width: `${100 - editorWidthPercent}%` }}>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', pointerEvents: isDragging ? 'none' : 'auto' }}>
          <PreviewPanel />
        </div>

        {/* Horizontal Splitter for Console */}
        <div
          className={`splitter-h ${isDraggingV ? 'dragging' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingV(true);
          }}
          title="Drag to resize console drawer"
        />

        <div style={{ height: `${consoleHeightPx}px`, pointerEvents: isDragging ? 'none' : 'auto' }}>
          <ConsolePanel height={consoleHeightPx} />
        </div>
      </div>
    </main>
  );
};
