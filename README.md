# 💻 CodeLab — Online Code Playground

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![CodeMirror](https://img.shields.io/badge/CodeMirror-6.0-41B883?style=flat-square)](https://codemirror.net/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**CodeLab** is a modern, fast, browser-based web development playground built with React 19, Vite 8, and CodeMirror 6. It allows students, developers, and creators to write, test, and preview **HTML5**, **CSS3**, and **JavaScript (ES6+)** code in real-time with zero setup required.

---

## 🌟 Key Features

- ⚡ **Real-Time Live Preview**: Instant rendering of your HTML, CSS, and JS code inside a secure sandboxed iframe environment.
- ✍️ **CodeMirror 6 Editor Engine**: Supports line numbers, syntax highlighting, active line indicators, bracket matching, and auto-indentation.
- 💡 **Instant Auto-Suggestions & Boilerplate**:
  - Typing `!` or `!` + `Tab` / `Enter` expands into a full standard HTML5 boilerplate document.
  - Active-on-typing autocompletion popups for HTML tags/attributes, CSS properties/values, and JavaScript DOM & keyword APIs.
- 🚨 **Compiler & Runtime Error Location Reporting**:
  - Intercepts JavaScript syntax & runtime errors and parses exact **Line** and **Column** numbers (e.g. `JS Error at Line 14, Col 5`).
  - Displays a red error banner at the top of the editor for instant debugging.
- 📟 **Live Intercepted Console Drawer**: Intercepts `console.log`, `console.info`, `console.warn`, `console.error`, and uncaught stack traces.
- 📐 **Flexible Layout Views**:
  - **Stacked View**: 3 collapsible section cards for HTML, CSS, and JS.
  - **Full-Page View**: Expands any active editor section (`HTML`, `CSS`, or `JS`) to **100% full height**.
- 📁 **Starter Templates Gallery**: Includes pre-built templates for:
  - 👋 **Hello World Playground**
  - 📄 **Blank Playground**
  - ⏰ **Digital Clock**
  - 🎨 **Random Color Generator**
  - 🧮 **Calculator App**
- 💾 **Save & Export Project Options**:
  - 📄 **Single Webpage (`.html`)**: Bundles HTML, CSS (`<style>`), and JS (`<script>`) into a single file.
  - 📦 **ZIP Project Archive (`.zip`)**: Packages separate `index.html`, `style.css`, and `script.js` files ready for deployment.
- 🌓 **Dark & Light Mode Themes**: Full theme switcher with persistent local storage preferences.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component framework & state management |
| **Vite 8** | High-performance ES module build tool |
| **CodeMirror 6** | Extensible code editor framework |
| **Lucide React** | Sleek SVG icon suite |
| **JSZip** | Client-side `.zip` archive generation |
| **HTML5 / CSS3** | Flexbox, Grid, Glassmorphism UI, & Sandboxed Iframe execution |

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have **Node.js** (v18+) installed on your machine.

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AshishSah7464/Codelab.git
   cd Codelab
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build

To build the project for production deployment:

```bash
npm run build
```

The optimized static production files will be generated in the `dist` directory.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Enter` | Run code manually |
| `Ctrl + S` | Open Save & Project Manager modal |
| `Ctrl + L` | Clear console logs |
| `Ctrl + Shift + F` | Toggle Fullscreen Preview |
| `Ctrl + Shift + D` | Toggle Dark / Light theme |
| `Esc` | Exit fullscreen or close active modal |
| `?` | Open Keyboard Shortcuts cheat sheet |

---

## 📄 License

Distributed under the MIT License.

Created with ❤️ by **[Ashish Sah](https://github.com/AshishSah7464)**.
