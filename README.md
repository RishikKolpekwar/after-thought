# AfterThought

<p align="left">
  <img src="./assets/afterthought-wordmark.svg" alt="AfterThought logo" width="420" />
</p>

## Team

- Rishik Kolpekwar
- Amogh Thodati
- Vishal Rajkumar
- Zeynep Sahin

Make Disaster an Afterthought. Use today's data to prepare for the future.

AfterThought is a multi-app resilience planning workflow:
- A public-facing web experience (`afterthought-website`)
- A simulation engine for infrastructure planning (`gridcase-3d-mvp`)
- A 3D ArcGIS visualizer (`afterthoughtmap`)

## What Each App Does

### `afterthought-website`
Landing experience and narrative layer for the project.  
It presents the problem, platform framing, and routes users into the engine.

### `gridcase-3d-mvp`
Interactive simulation engine for scenario planning:
- Role-based planning context (planner / regulator / advocate)
- Budgeted project selection
- Scenario simulation and timeline replay
- Metrics such as stability, equity, efficiency, outages, and cascades
- Exportable outputs and AI-assisted project ideation

### `afterthoughtmap`
ArcGIS-powered 3D viewer:
- Loads a WebScene in a SceneView
- Supports camera controls, basemap toggles, and layer toggles
- Serves as a visual context layer for infrastructure state and geography

## Product Flow

1. Start in `afterthought-website`
2. Click **Open Engine** to go to `gridcase-3d-mvp`
3. In the engine, click **Open Visualizer** to open `afterthoughtmap`

Current local link targets:
- Open Engine -> `http://localhost:5174/`
- Open Visualizer -> `http://localhost:5175/`

## Local Development

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm

### Run All Three Apps

Use three terminals from repo root:

```bash
cd afterthought-website
npm install
npm run dev -- --port 5173
```

```bash
cd gridcase-3d-mvp
npm install
npm run dev -- --port 5174
```

```bash
cd afterthoughtmap
npm install
npm run dev -- --port 5175
```

Then open:
- Website: `http://localhost:5173/`
- Engine: `http://localhost:5174/`
- Visualizer: `http://localhost:5175/`

## Repository Layout

```text
AfterThought/
├── afterthought-website/   # Landing + product narrative
├── gridcase-3d-mvp/        # Simulation engine MVP
├── afterthoughtmap/        # ArcGIS 3D visualizer
└── assets/                 # Shared media (logo used in this README)
```
