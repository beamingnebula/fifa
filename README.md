# FIFA World Cup 2026™ — Premium Companion App 🏆

A modern, responsive, and interactive Progressive Web App (PWA) companion designed for the FIFA World Cup 2026. Keep track of live scores, national teams, schedules, interactive stadium maps, and post-match highlights with beautiful UI and custom user settings.

---

## 🌟 Key Features

*   ⚽ **Real-Time Scores & Polling:** Seamless integration with official live scoreboard feeds (ESPN API) showing scores, live clock, match stats (possession, shots, corners, fouls), and card counts.
*   🌍 **Interactive World Map:** Fluid SVG-based maps of North American host venues (Canada, Mexico, USA) with custom drag-to-pan and wheel-to-zoom controls.
*   ⭐ **Starred Teams Tracker:** Star your favorite national teams to get a custom countdown dashboard tracking their upcoming games and days remaining.
*   🕒 **Time Zone Customizer:** Instantly convert all fixture kickoff times to your local timezone offset (with preset abbreviations like UTC, BST, EST, PST, etc.).
*   🎥 **Match Highlights:** Watch post-match highlights immediately after the final whistle blows. Matches in progress or upcoming hide highlight indicators to prevent spoilers.
*   📱 **PWA Installable:** Install the application directly to your home screen with a mobile-friendly PWA banner, working offline via service workers.
*   🎨 **Premium Aesthetic:** Clean modern design system built with custom CSS variables, dark mode support, smooth spring-like micro-animations, and glassmorphism styling.

---

## 🛠️ Technology Stack

*   **Framework:** React (18+)
*   **Build Tool:** Vite
*   **Icons:** Lucide React
*   **Styling:** Vanilla CSS (Aesthetics configured with custom properties inside `index.css`)
*   **Deployment:** Optimized production build with Service Worker caching

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v16.0.0 or higher is recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/beamingnebula/fifa.git
   cd fifa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

4. Build the application for production:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## 📂 Project Structure

```text
fifa/
├── public/                # Static assets (icons, manifest.json, service-worker.js)
├── src/
│   ├── components/        # Reusable components (Countdown, FlagIcon, TopBar, etc.)
│   ├── context/           # React context for global state management (FixturesContext)
│   ├── data/              # Static tournament data (fixtures, teams)
│   ├── hooks/             # Custom state hooks
│   ├── pages/             # App pages (Home, Fixtures, Highlights, WorldMap, Settings)
│   ├── utils/             # Helper utilities (time calculations, match operations)
│   ├── App.jsx            # Core layout wrapper, routing, and PWA logic
│   ├── index.css          # Design system CSS tokens, typography, and page styles
│   └── main.jsx           # App entry point
├── package.json
└── vite.config.js
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/beamingnebula/fifa/issues) or submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE). Developed with ❤️ by [beamingnebula](https://github.com/beamingnebula).
