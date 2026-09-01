import React, { useEffect, useMemo } from 'react';
import { useCodeLab } from '../../context/CodeLabContext';
import { Play, Maximize2, Minimize2, RefreshCw, Terminal, Eye } from 'lucide-react';

export const PreviewPanel = () => {
  const {
    html, css, js,
    runKey, runCode,
    addConsoleLog,
    clearConsole,
    isFullscreenPreview, setIsFullscreenPreview
  } = useCodeLab();

  // Listen to postMessage logs from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.source === 'codelab-preview') {
        const { type, message, timestamp, line, column, file } = event.data;
        addConsoleLog({
          type: type || 'log',
          message: message || '',
          timestamp: timestamp || new Date().toLocaleTimeString(),
          line,
          column,
          file
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addConsoleLog]);

  // Construct iframe document source string
  const iframeSrcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* User CSS */
    ${css}
  </style>
  <script>
    // Console Interceptor Bridge
    (function() {
      function serialize(arg) {
        try {
          if (typeof arg === 'undefined') return 'undefined';
          if (arg === null) return 'null';
          if (typeof arg === 'function') return '[Function: ' + (arg.name || 'anonymous') + ']';
          if (arg instanceof Error) return arg.name + ': ' + arg.message + (arg.stack ? '\\n' + arg.stack : '');
          if (typeof arg === 'object') {
            return JSON.stringify(arg, function(key, value) {
              if (typeof value === 'function') return '[Function]';
              if (value instanceof HTMLElement) return '<' + value.tagName.toLowerCase() + (value.id ? '#' + value.id : '') + '>';
              return value;
            }, 2);
          }
          return String(arg);
        } catch (e) {
          return String(arg);
        }
      }

      function sendLog(type, args, extra) {
        try {
          var formatted = Array.prototype.slice.call(args).map(serialize).join(' ');
          window.parent.postMessage({
            source: 'codelab-preview',
            type: type,
            message: formatted,
            line: extra ? extra.line : null,
            column: extra ? extra.column : null,
            file: extra ? extra.file : 'js',
            timestamp: new Date().toLocaleTimeString()
          }, '*');
        } catch (err) {}
      }

      var origLog = console.log;
      var origWarn = console.warn;
      var origError = console.error;
      var origInfo = console.info;

      console.log = function() { sendLog('log', arguments); if (origLog) origLog.apply(console, arguments); };
      console.warn = function() { sendLog('warn', arguments); if (origWarn) origWarn.apply(console, arguments); };
      console.error = function() { sendLog('error', arguments); if (origError) origError.apply(console, arguments); };
      console.info = function() { sendLog('info', arguments); if (origInfo) origInfo.apply(console, arguments); };

      window.onerror = function(msg, url, lineNo, columnNo, error) {
        var line = lineNo;
        var col = columnNo;
        if (error && error.stack) {
          var match = error.stack.match(/<anonymous>:(\d+):(\d+)/) || error.stack.match(/:(\d+):(\d+)/);
          if (match) {
            line = parseInt(match[1], 10);
            col = parseInt(match[2], 10);
          }
        }
        sendLog('error', ['Runtime Error: ' + msg], { line: line, column: col, file: 'js' });
        return false;
      };

      window.addEventListener('unhandledrejection', function(event) {
        sendLog('error', ['Unhandled Rejection: ' + (event.reason ? event.reason.message || event.reason : 'Unknown')], { file: 'js' });
      });
    })();
  </script>
</head>
<body>
  ${html}

  <script>
    try {
      ${js}
    } catch (err) {
      var line = null;
      var col = null;
      if (err.stack) {
        var match = err.stack.match(/<anonymous>:(\d+):(\d+)/) || err.stack.match(/:(\d+):(\d+)/);
        if (match) {
          line = parseInt(match[1], 10);
          col = parseInt(match[2], 10);
        }
      }
      window.parent.postMessage({
        source: 'codelab-preview',
        type: 'error',
        message: err.name + ': ' + err.message,
        line: line,
        column: col,
        file: 'js',
        timestamp: new Date().toLocaleTimeString()
      }, '*');
    }
  </script>
</body>
</html>`;
  }, [html, css, js, runKey]);

  return (
    <div className={`preview-side ${isFullscreenPreview ? 'fullscreen-preview-mode' : ''}`} style={isFullscreenPreview ? {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff'
    } : {}}>
      {/* Preview Header Bar */}
      <div className="preview-bar">
        <div className="preview-title">
          <Eye size={15} color="var(--accent-color)" />
          <span>Live Preview</span>
        </div>

        <div className="preview-actions">
          <button className="btn btn-icon" onClick={() => { clearConsole(); runCode(); }} title="Refresh Preview">
            <RefreshCw size={14} />
          </button>

          <button
            className="btn btn-icon"
            onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
            title={isFullscreenPreview ? "Exit Fullscreen (Esc)" : "Fullscreen Preview (Ctrl+Shift+F)"}
          >
            {isFullscreenPreview ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Preview Iframe Container */}
      <div className="preview-container">
        <iframe
          key={runKey}
          title="Live Preview"
          srcDoc={iframeSrcDoc}
          className="preview-iframe"
          sandbox="allow-scripts allow-modals allow-forms allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};
