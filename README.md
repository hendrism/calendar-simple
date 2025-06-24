# Simple PWA Calendar

A minimal, installable web-based calendar app for quick week/day/month views and simple recurring events, all stored locally in your browser. Perfect for personal scheduling without cluttering your main calendar.

---

## 🚀 Features

- **Week / Day / Month views** toggle  
- **One-off** and **simple recurring** events (daily/weekly/monthly)  
- **LocalStorage** persistence—no external backend or phone-calendar syncing  
- **Start time and duration** for each event
- **PWA installable** (“Add to Home Screen”)  
- **Offline support** via Service Worker  

---

## 📂 File Structure

```
/
├── index.html         # App shell & UI
├── style.css          # Basic styles
├── app.js             # Core logic & rendering
├── manifest.json      # PWA manifest
├── service-worker.js  # Caching for offline
└── icons/
    ├── icon-192.png   # PWA icon (192×192)
    └── icon-512.png   # PWA icon (512×512)
```

---

## 🔧 Installation

### 1. Clone or download

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

> **Public repo only hosts code**, not your events—those stay in your browser’s LocalStorage.

### 2a. Local development

Serve over HTTP (required for Service Worker):

- With Python:
  ```bash
  python3 -m http.server 8000
  ```
- Or with VS Code Live Server extension.

Then visit:  
```
http://localhost:8000
```

### 2b. GitHub Pages

1. Push code to a **public** GitHub repo.  
2. In your repo settings, enable **GitHub Pages** from the `main` branch (root folder).  
3. Visit `https://<your-username>.github.io/<your-repo>/`.

---

## 🏃‍♂️ Usage

1. **Open** the app URL in your phone’s browser.  
2. Tap the browser’s menu ► **Add to Home Screen** for a native-like experience.  
3. Use the top controls to:
   - Navigate `<` / `>` through dates  
   - Switch views (month, week, day)  
   - Tap **+ Event** to add a new event  
4. In the **Add Event** modal:
   - Enter **Title**  
   - Pick a **Date**  
   - Set a **Start Time**
   - Specify **Duration** in minutes
   - Choose a **Recurrence** (None/Daily/Weekly/Monthly)  
   - **Save**  

All entries save automatically to your device.

---

## 🎨 Customization

- **Styling**: Edit `style.css`—feel free to adjust colors, fonts, or cell dimensions.  
- **Time slots**: Extend `app.js` to include start/end times and render them in your cells.  
- **Complex recurrence**: Add more logic in `getEventsForDate()` for bi-weekly or end-of-month rules.  

---

## 🔒 Privacy

- **Your events stay on your device**.  
- The repo is public **only** for hosting code; no event data is ever pushed to GitHub.  
- If you clear your browser data, events will be lost—consider backing up `localStorage` if needed.

---

## 🤝 Contributing

This is a personal project, but feel free to fork and submit PRs for improvements (UI tweaks, features, 
