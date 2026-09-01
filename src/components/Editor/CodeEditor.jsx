import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { css, cssLanguage } from '@codemirror/lang-css';
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { EditorView, keymap } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { useCodeLab } from '../../context/CodeLabContext';
import { htmlAutoSuggestions, cssAutoSuggestions, jsAutoSuggestions } from '../../utils/autoSuggestions';

const HTML_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>`;

// Keymap for typing '!' and pressing Tab or Enter
const htmlBoilerplateKeymap = keymap.of([
  {
    key: 'Tab',
    run: (view) => {
      const { state } = view;
      const { head } = state.selection.main;
      const line = state.doc.lineAt(head);
      const lineText = line.text.trim();
      if (lineText === '!') {
        view.dispatch({
          changes: { from: line.from, to: line.to, insert: HTML_BOILERPLATE },
          selection: { anchor: line.from + HTML_BOILERPLATE.indexOf('</body>') - 2 }
        });
        return true;
      }
      return false;
    }
  }
]);

export const CodeEditor = ({ mode = 'html', value, onChange }) => {
  const { theme } = useCodeLab();

  const extensions = useMemo(() => {
    const baseExtensions = [
      EditorView.lineWrapping,
      autocompletion({ activateOnTyping: true, maxRenderedOptions: 50 })
    ];

    switch (mode) {
      case 'html':
        return [
          ...baseExtensions,
          html(),
          htmlLanguage.data.of({ autocomplete: htmlAutoSuggestions }),
          htmlBoilerplateKeymap
        ];
      case 'css':
        return [
          ...baseExtensions,
          css(),
          cssLanguage.data.of({ autocomplete: cssAutoSuggestions })
        ];
      case 'js':
        return [
          ...baseExtensions,
          javascript({ jsx: true }),
          javascriptLanguage.data.of({ autocomplete: jsAutoSuggestions })
        ];
      default:
        return [...baseExtensions, html()];
    }
  }, [mode]);

  return (
    <div className="cm-theme-container">
      <CodeMirror
        value={value}
        height="100%"
        style={{ height: '100%', width: '100%' }}
        theme={theme === 'dark' ? 'dark' : 'light'}
        extensions={extensions}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};
