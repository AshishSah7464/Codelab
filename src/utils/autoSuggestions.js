// Comprehensive Auto-Suggestions for HTML, CSS, and JavaScript in CodeMirror 6

import { htmlLanguage } from '@codemirror/lang-html';
import { cssLanguage } from '@codemirror/lang-css';
import { javascriptLanguage } from '@codemirror/lang-javascript';

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

// HTML Suggestions
export function htmlAutoSuggestions(context) {
  const word = context.matchBefore(/[\w!-]+/);
  if (!word && !context.explicit) return null;

  const htmlOptions = [
    { label: '!', type: 'snippet', detail: 'HTML5 Boilerplate', apply: HTML_BOILERPLATE },
    { label: 'div', type: 'type', detail: 'HTML Block Container', apply: '<div>\n  \n</div>' },
    { label: 'button', type: 'type', detail: 'HTML Button', apply: '<button>\n  \n</button>' },
    { label: 'h1', type: 'type', detail: 'Heading 1', apply: '<h1></h1>' },
    { label: 'h2', type: 'type', detail: 'Heading 2', apply: '<h2></h2>' },
    { label: 'p', type: 'type', detail: 'Paragraph', apply: '<p></p>' },
    { label: 'span', type: 'type', detail: 'Inline Span', apply: '<span></span>' },
    { label: 'a', type: 'type', detail: 'Anchor Link', apply: '<a href=""></a>' },
    { label: 'img', type: 'type', detail: 'Image Tag', apply: '<img src="" alt="" />' },
    { label: 'input', type: 'type', detail: 'Input Field', apply: '<input type="text" placeholder="" />' },
    { label: 'form', type: 'type', detail: 'Form Container', apply: '<form>\n  \n</form>' },
    { label: 'ul', type: 'type', detail: 'Unordered List', apply: '<ul>\n  <li></li>\n</ul>' },
    { label: 'ol', type: 'type', detail: 'Ordered List', apply: '<ol>\n  <li></li>\n</ol>' },
    { label: 'li', type: 'type', detail: 'List Item', apply: '<li></li>' },
    { label: 'table', type: 'type', detail: 'HTML Table', apply: '<table>\n  <tr>\n    <td></td>\n  </tr>\n</table>' },
    { label: 'canvas', type: 'type', detail: 'HTML5 Canvas', apply: '<canvas id="canvas"></canvas>' },
    { label: 'header', type: 'type', detail: 'Header Container', apply: '<header></header>' },
    { label: 'footer', type: 'type', detail: 'Footer Container', apply: '<footer></footer>' },
    { label: 'section', type: 'type', detail: 'Section Container', apply: '<section></section>' },
    { label: 'script', type: 'type', detail: 'Script Tag', apply: '<script>\n  \n</script>' },
    { label: 'style', type: 'type', detail: 'Style Tag', apply: '<style>\n  \n</style>' },
    { label: 'class', type: 'keyword', detail: 'Class attribute', apply: 'class=""' },
    { label: 'id', type: 'keyword', detail: 'ID attribute', apply: 'id=""' },
    { label: 'src', type: 'keyword', detail: 'Source attribute', apply: 'src=""' },
    { label: 'href', type: 'keyword', detail: 'Href link attribute', apply: 'href=""' },
    { label: 'placeholder', type: 'keyword', detail: 'Placeholder text', apply: 'placeholder=""' },
    { label: 'onclick', type: 'keyword', detail: 'Click event handler', apply: 'onclick=""' }
  ];

  return {
    from: word ? word.from : context.pos,
    options: htmlOptions,
    validFor: /^[\w!-]*$/
  };
}

// CSS Suggestions
export function cssAutoSuggestions(context) {
  const word = context.matchBefore(/[\w-]+/);
  if (!word && !context.explicit) return null;

  const cssOptions = [
    { label: 'background', type: 'property', detail: 'CSS background property', apply: 'background: ' },
    { label: 'background-color', type: 'property', detail: 'Background color', apply: 'background-color: ' },
    { label: 'color', type: 'property', detail: 'Text color', apply: 'color: ' },
    { label: 'font-family', type: 'property', detail: 'Font family', apply: "font-family: 'Inter', sans-serif;" },
    { label: 'font-size', type: 'property', detail: 'Font size', apply: 'font-size: 16px;' },
    { label: 'font-weight', type: 'property', detail: 'Font weight', apply: 'font-weight: 600;' },
    { label: 'margin', type: 'property', detail: 'Outer margin', apply: 'margin: 0;' },
    { label: 'padding', type: 'property', detail: 'Inner padding', apply: 'padding: 16px;' },
    { label: 'border', type: 'property', detail: 'Border property', apply: 'border: 1px solid #e2e8f0;' },
    { label: 'border-radius', type: 'property', detail: 'Border radius', apply: 'border-radius: 8px;' },
    { label: 'display', type: 'property', detail: 'Display mode', apply: 'display: flex;' },
    { label: 'flex-direction', type: 'property', detail: 'Flex direction', apply: 'flex-direction: column;' },
    { label: 'justify-content', type: 'property', detail: 'Justify content', apply: 'justify-content: center;' },
    { label: 'align-items', type: 'property', detail: 'Align items', apply: 'align-items: center;' },
    { label: 'gap', type: 'property', detail: 'Flex/Grid gap', apply: 'gap: 12px;' },
    { label: 'position', type: 'property', detail: 'Positioning', apply: 'position: relative;' },
    { label: 'width', type: 'property', detail: 'Width dimension', apply: 'width: 100%;' },
    { label: 'height', type: 'property', detail: 'Height dimension', apply: 'height: 100%;' },
    { label: 'min-height', type: 'property', detail: 'Minimum height', apply: 'min-height: 100vh;' },
    { label: 'max-width', type: 'property', detail: 'Maximum width', apply: 'max-width: 400px;' },
    { label: 'box-shadow', type: 'property', detail: 'Box shadow glow', apply: 'box-shadow: 0 10px 25px rgba(0,0,0,0.2);' },
    { label: 'cursor', type: 'property', detail: 'Cursor type', apply: 'cursor: pointer;' },
    { label: 'transition', type: 'property', detail: 'CSS transition', apply: 'transition: all 0.3s ease;' },
    { label: 'transform', type: 'property', detail: 'CSS transform', apply: 'transform: translateY(-2px);' },
    { label: 'opacity', type: 'property', detail: 'Opacity level', apply: 'opacity: 0.9;' },
    { label: 'overflow', type: 'property', detail: 'Overflow scroll/hidden', apply: 'overflow: hidden;' },
    { label: 'z-index', type: 'property', detail: 'Z-Index depth', apply: 'z-index: 10;' },
    { label: 'center', type: 'value', detail: 'Center alignment' },
    { label: 'flex', type: 'value', detail: 'Flex layout' },
    { label: 'grid', type: 'value', detail: 'Grid layout' },
    { label: 'pointer', type: 'value', detail: 'Pointer cursor' },
    { label: 'absolute', type: 'value', detail: 'Absolute position' },
    { label: 'relative', type: 'value', detail: 'Relative position' }
  ];

  return {
    from: word ? word.from : context.pos,
    options: cssOptions,
    validFor: /^[\w-]*$/
  };
}

// JS Suggestions
export function jsAutoSuggestions(context) {
  const word = context.matchBefore(/[\w$]+/);
  if (!word && !context.explicit) return null;

  const jsOptions = [
    { label: 'const', type: 'keyword', detail: 'Constant variable declaration', apply: 'const ' },
    { label: 'let', type: 'keyword', detail: 'Block-scoped variable declaration', apply: 'let ' },
    { label: 'var', type: 'keyword', detail: 'Variable declaration', apply: 'var ' },
    { label: 'function', type: 'keyword', detail: 'Function declaration', apply: 'function () {\n  \n}' },
    { label: 'document.getElementById', type: 'function', detail: 'Get element by ID', apply: "document.getElementById('')" },
    { label: 'document.querySelector', type: 'function', detail: 'Query single element', apply: "document.querySelector('')" },
    { label: 'document.querySelectorAll', type: 'function', detail: 'Query all elements', apply: "document.querySelectorAll('')" },
    { label: 'addEventListener', type: 'function', detail: 'Attach event listener', apply: "addEventListener('click', (e) => {\n  \n})" },
    { label: 'console.log', type: 'function', detail: 'Log message to console', apply: 'console.log();' },
    { label: 'console.warn', type: 'function', detail: 'Log warning to console', apply: 'console.warn();' },
    { label: 'console.error', type: 'function', detail: 'Log error to console', apply: 'console.error();' },
    { label: 'textContent', type: 'property', detail: 'Set text content', apply: "textContent = ''" },
    { label: 'innerHTML', type: 'property', detail: 'Set HTML content', apply: "innerHTML = ''" },
    { label: 'classList.add', type: 'function', detail: 'Add CSS class', apply: "classList.add('')" },
    { label: 'classList.remove', type: 'function', detail: 'Remove CSS class', apply: "classList.remove('')" },
    { label: 'classList.toggle', type: 'function', detail: 'Toggle CSS class', apply: "classList.toggle('')" },
    { label: 'setTimeout', type: 'function', detail: 'Set timer delay', apply: 'setTimeout(() => {\n  \n}, 1000);' },
    { label: 'setInterval', type: 'function', detail: 'Set recurring timer', apply: 'setInterval(() => {\n  \n}, 1000);' },
    { label: 'fetch', type: 'function', detail: 'Fetch API HTTP request', apply: "fetch('')\n  .then(res => res.json())\n  .then(data => console.log(data));" },
    { label: 'JSON.stringify', type: 'function', detail: 'Stringify object', apply: 'JSON.stringify()' },
    { label: 'JSON.parse', type: 'function', detail: 'Parse JSON string', apply: 'JSON.parse()' }
  ];

  return {
    from: word ? word.from : context.pos,
    options: jsOptions,
    validFor: /^[\w$]*$/
  };
}
