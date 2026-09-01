export const templates = [
  {
    id: 'hello-world',
    name: 'Hello World Playground',
    description: 'Classic Hello World card with interactive click counter.',
    icon: '👋',
    tag: 'Starter',
    html: `<div class="container">
  <h1>Hello, World!</h1>
  <p>Welcome to the playground. Start coding!</p>
  <button id="clickBtn">Click Me</button>
  <div id="output"></div>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

h1 {
  color: #1a202c;
  margin-bottom: 8px;
  font-size: 28px;
}

p {
  color: #4a5568;
  margin-bottom: 24px;
  font-size: 14px;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

#output {
  margin-top: 20px;
  padding: 12px;
  background: #f7fafc;
  border-radius: 8px;
  color: #2d3748;
  font-size: 14px;
}`,
    js: `const clickBtn = document.getElementById('clickBtn');
const output = document.getElementById('output');
let count = 0;

console.log('Playground loaded successfully!');

clickBtn.addEventListener('click', () => {
  count++;
  output.textContent = \`Button clicked \${count} time\${count === 1 ? '' : 's'}!\`;
  console.log(\`Click count: \${count}\`);
});`
  },

  {
    id: 'blank',
    name: 'Blank Playground',
    description: 'Clean blank workspace to write custom HTML, CSS, and JavaScript from scratch.',
    icon: '📄',
    tag: 'Blank',
    html: '',
    css: '',
    js: ''
  },

  {
    id: 'digital-clock',
    name: 'Digital Clock',
    description: 'Live real-time digital clock with custom styling.',
    icon: '⏰',
    tag: 'Utility',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Clock</title>
</head>
<body>
  <div class="clock-card">
    <h2>REAL-TIME CLOCK</h2>
    <div id="clock" class="clock-time">00:00:00</div>
    <div id="date" class="clock-date">Date Loading...</div>
  </div>
</body>
</html>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: monospace;
  background: #090d16;
  color: #38bdf8;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clock-card {
  background: #111726;
  border: 1px solid #1e293b;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 0 40px rgba(56, 189, 248, 0.2);
}
h2 { font-size: 14px; color: #64748b; letter-spacing: 2px; margin-bottom: 16px; }
.clock-time { font-size: 48px; font-weight: 700; color: #38bdf8; margin-bottom: 8px; }
.clock-date { font-size: 14px; color: #94a3b8; }`,
    js: `function tick() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(tick, 1000);
tick();`
  },

  {
    id: 'color-generator',
    name: 'Random Color Generator',
    description: 'Generates random background colors and hex codes on click.',
    icon: '🎨',
    tag: 'Design',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Generator</title>
</head>
<body>
  <div class="color-card">
    <h2>HEX Color Generator</h2>
    <div id="hexCode" class="hex-box">#38BDF8</div>
    <button id="genBtn" class="btn">Generate New Color</button>
  </div>
</body>
</html>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: sans-serif;
  background: #38bdf8;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.4s ease;
}
.color-card {
  background: white;
  padding: 36px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
h2 { color: #1e293b; font-size: 18px; margin-bottom: 16px; }
.hex-box {
  font-size: 32px; font-weight: 800; color: #0f172a;
  font-family: monospace; margin-bottom: 20px;
}
.btn {
  background: #0f172a; color: white; border: none;
  padding: 12px 24px; font-size: 14px; font-weight: 600;
  border-radius: 8px; cursor: pointer;
}
.btn:hover { opacity: 0.9; }`,
    js: `const btn = document.getElementById('genBtn');
const hexBox = document.getElementById('hexCode');

btn.addEventListener('click', () => {
  const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  document.body.style.background = randomHex;
  hexBox.textContent = randomHex.toUpperCase();
  console.log('New hex color: ' + randomHex);
});`
  },

  {
    id: 'calculator',
    name: 'Calculator App',
    description: 'Grid layout calculator for arithmetic calculations.',
    icon: '🧮',
    tag: 'Tool',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
</head>
<body>
  <div class="calc">
    <div id="display" class="display">0</div>
    <div class="buttons">
      <button class="btn clear">C</button>
      <button class="btn op">/</button>
      <button class="btn op">*</button>
      <button class="btn op">-</button>
      <button class="btn num">7</button>
      <button class="btn num">8</button>
      <button class="btn num">9</button>
      <button class="btn op">+</button>
      <button class="btn num">4</button>
      <button class="btn num">5</button>
      <button class="btn num">6</button>
      <button class="btn equal">=</button>
      <button class="btn num">1</button>
      <button class="btn num">2</button>
      <button class="btn num">3</button>
      <button class="btn num zero">0</button>
    </div>
  </div>
</body>
</html>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: sans-serif;
  background: #0f172a;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calc {
  background: #1e293b;
  padding: 24px;
  border-radius: 16px;
  width: 280px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.display {
  background: #0f172a; color: #38bdf8; font-size: 28px;
  font-family: monospace; text-align: right; padding: 16px;
  border-radius: 8px; margin-bottom: 16px; word-break: break-all;
}
.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.btn {
  background: #334155; color: white; border: none;
  padding: 16px; font-size: 16px; font-weight: 600;
  border-radius: 8px; cursor: pointer;
}
.btn:hover { opacity: 0.9; }
.clear { background: #ef4444; }
.op { background: #3b82f6; }
.equal { background: #10b981; grid-row: span 2; }
.zero { grid-column: span 2; }`,
    js: `const display = document.getElementById('display');
let currentInput = '';

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const text = button.textContent;
    if (text === 'C') {
      currentInput = '';
      display.textContent = '0';
    } else if (text === '=') {
      try {
        currentInput = String(eval(currentInput));
        display.textContent = currentInput;
      } catch (e) {
        display.textContent = 'Error';
      }
    } else {
      if (display.textContent === '0') currentInput = '';
      currentInput += text;
      display.textContent = currentInput;
    }
  });
});`
  }
];
