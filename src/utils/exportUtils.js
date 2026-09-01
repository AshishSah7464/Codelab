import JSZip from 'jszip';

export function buildFullHtml(html = '', css = '', js = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeLab Project</title>
  <style>
${css}
  </style>
</head>
<body>
${html}

  <script>
${js}
  </script>
</body>
</html>`;
}

export function downloadSingleHtml(projectName = 'codelab-project', html, css, js) {
  const content = buildFullHtml(html, css, js);
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = (projectName || 'codelab-project').toLowerCase().replace(/[^a-z0-9]/g, '-') + '.html';
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadZipArchive(projectName = 'codelab-project', html, css, js) {
  const zip = new JSZip();
  const folderName = (projectName || 'codelab-project').toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${html}

  <script src="script.js"></script>
</body>
</html>`;

  zip.file("index.html", indexHtml);
  zip.file("style.css", css);
  zip.file("script.js", js);

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${folderName}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
