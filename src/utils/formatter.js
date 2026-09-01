// Lightweight HTML, CSS, and JS Code Formatter Utility

export function formatHtml(html = '') {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  // Normalize tags
  const tokens = html.replace(/>\s*</g, '>\n<').split('\n');

  tokens.forEach(token => {
    let line = token.trim();
    if (!line) return;

    if (line.match(/^<\//)) {
      // Closing tag -> decrease indent
      indent = Math.max(0, indent - 1);
    }

    formatted += tab.repeat(indent) + line + '\n';

    if (line.match(/^<[^\/!\?]/) && !line.match(/\/>$/) && !line.match(/^<(input|img|br|hr|meta|link)/i) && !line.includes('</')) {
      // Opening tag -> increase indent
      indent++;
    }
  });

  return formatted.trim();
}

export function formatCss(css = '') {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  // Format CSS rules
  const clean = css.replace(/\s*\{\s*/g, ' {\n').replace(/\s*;\s*/g, ';\n').replace(/\s*\}\s*/g, '\n}\n');
  const lines = clean.split('\n');

  lines.forEach(line => {
    let trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('}')) {
      indent = Math.max(0, indent - 1);
    }

    formatted += tab.repeat(indent) + trimmed + '\n';

    if (trimmed.endsWith('{')) {
      indent++;
    }
  });

  return formatted.trim();
}

export function formatJs(js = '') {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  const lines = js.split('\n');

  lines.forEach(line => {
    let trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      indent = Math.max(0, indent - 1);
    }

    formatted += tab.repeat(indent) + trimmed + '\n';

    if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
      indent++;
    }
  });

  return formatted.trim();
}
