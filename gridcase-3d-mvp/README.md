# AfterThought — Utility Grid Planning Interface

An offline, browser-based tool for simulating and stress-testing power grid investment decisions across an Austin-like city. You pick a role, allocate projects within a budget, run a disaster scenario, and get scored on stability, equity, and cost efficiency.

---

## Layout Overview

```
┌──────────────────────────────────────────────────────────┐
│  TOP BAR  — role badge · budget · scores (after a run)   │
├─────────────────────────────────────┬────────────────────┤
│                                     │                    │
│   3D VIEWPORT                       │   RIGHT PANEL      │
│   [Layer toggles — top left]        │   (controls)       │
│   [Event log — bottom left]         │                    │
│                       [Legend — bottom right]            │
├─────────────────────────────────────┴────────────────────┤
│  TIMELINE BAR — scrub / replay simulation hour by hour   │
└──────────────────────────────────────────────────────────┘
```

---

## The 3D Viewport

The map shows **Austin-like neighborhoods** as flat colored tiles, **14 substations** as spheres, and **20 transmission lines** connecting them.

### Layer Toggles (top-left buttons)

Switch what the tile colors mean:

| Layer | What the color encodes |
|---|---|
| **Outage** *(default)* | How badly each zone lost power during the simulation run. Dark blue = no outage. Bright red = heavily affected. |
| **Income** | Median household income. Pink = low income. Cyan = high income. Useful for spotting equity problems. |
| **Vulnerability** | How fragile the zone's grid infrastructure is. Green = resilient. Red = likely to fail under stress. |
| **Infra Age** | How old the physical infrastructure is. Green = modern. Red = end-of-life equipment. |

### Node (sphere) colors

| Color | Meaning |
|---|---|
| Blue | Substation — operational |
| Yellow/Amber | Substation — **critical node** (failure here cascades hard) |
| Red (pulsing) | Substation — **failed** during simulation |

### Edge (line) colors

| Color | Meaning |
|---|---|
| Blue | Transmission line — fully active |
| Orange | One endpoint has failed — line is stressed |
| Red | Both endpoints failed — line is down |

### Legend (bottom-right)

Always shows the color key for whichever layer is active, plus the node and edge color meanings.

---

## Right Panel — Every Section Explained

### 1. Role

Your role determines **which default assumptions are loaded** when you start and changes your starting budget. It is a perspective switch — it does not lock you out of anything, but it does pre-configure the sliders below to reflect realistic priorities for that stakeholder.

| Role | Who you are | Default EV Rate | Default Budget |
|---|---|---|---|
| **Utility Planner** | The power company deciding where to spend capital | 15% | $150M |
| **Regulator** | A state agency reviewing the utility's plan | 35% | $200M |
| **Community Advocate** | A policy advocate pushing for equity and renewables | 25% | $250M |

**Why does the role matter to the simulation?**

The Assumptions sliders (section 4) control how the simulation loads the grid. Different roles start with different slider values:
- The **Regulator** assumes higher EV adoption, which increases evening demand and stresses the grid more than the Utility Planner's baseline assumes.
- The **Advocate** pushes a higher renewable target and population growth, driving different stress patterns in eastern/low-income zones.

Switching roles mid-session resets the plan (clears projects and reloads that role's assumptions).

---

### 2. Budget

Shows how much of your cap you have spent across all added projects.

- The bar fills as you add projects
- Turns **orange** at 80% of budget
- Turns **red** and shows an over-budget warning if you exceed the cap
- You can still run simulations over budget — the warning is advisory, not a hard block

---

### 3. Scenario

Pick the disaster event you want to stress-test against:

| Scenario | Duration | What happens |
|---|---|---|
| **Six-Month Outlook** | 4320 hours (180 days) | Long-horizon planning mode with weekday demand cycles, seasonal summer ramp, and intermittent storm-stress pulses. Best for policy-level planning over months instead of days. |
| **Winter Freeze** | 96 hours | Sustained 1.7× demand surge (heating) plus ice accumulation that degrades node capacity. Analogue of the Feb 2021 Texas disaster. |
| **Summer Heat Dome** | 120 hours | Afternoon demand spikes (A/C load) up to 1.9×. Thermal stress on equipment during the 12–18h window each day. |
| **EV Adoption Surge** | 72 hours | Evening demand spikes when EVs plug in (17–21h each day). Low weather stress — purely a demand-side load growth problem. |

---

### 4. Assumptions

These four sliders change how the simulation interprets the base data. They represent **policy and forecast inputs** that a planner or regulator would disagree about.

| Slider | What it does |
|---|---|
| **EV Adoption Rate** | Scales up residential evening load in proportion. At 60%, eastern/suburban zones see significantly higher demand than the physical substations were built for. This is the main variable that separates the Regulator role from the Utility Planner. |
| **Population Growth** | Multiplies every zone's base load. A 4% annual rate means all substations are closer to their limits before the disaster even starts. |
| **Renewable Target** | Recorded in the export snapshot for policy documentation. Does not directly change simulation load today (v1 simplification), but will affect generation-side modeling in future versions. |
| **Budget Cap** | Changes the ceiling shown in the Budget meter. Does not automatically remove projects you've already added. |

**Key insight:** If you switch to the Regulator role and keep the high EV adoption rate (35%), then run the EV Spike scenario, you will see notably worse scores than the Utility Planner's conservative 15% assumption — because the model predicts more load per zone.

---

### 5. Run

| Control | What it does |
|---|---|
| **Seed** | Any integer. The simulation is fully deterministic: same seed + same plan + same scenario = identical results every time. Change the seed to see a different random outcome (different cascade paths, slightly different failure timings). |
| **▶ Run Simulation** | Executes the sim engine. Runs instantly in memory — no server needed. |
| **📌 Lock Baseline** | Freezes the current result as a reference point. Use this before making changes so you can compare before vs. after. |
| **⚖️ Compare** | Opens the counterfactual panel (see below). Only available after at least one run. |
| **📄 Export** | Opens the filing snapshot modal — a JSON document with the full plan, scenario, metrics, and a deterministic run ID for auditing. |
| **📋 Events** | Toggles the event log drawer in the bottom-left of the viewport. |
| **Run History** | Every run you execute is saved in memory for the session. Click any past run ID to reload it and scrub through its timeline. |

---

### 6. Project Catalog

The infrastructure investments you can fund. Each card shows:

- **Icon + Name** — type of project
- **Description** — what it physically does
- **Effect tags** — the specific simulation parameters it changes:

| Tag | Effect in simulation |
|---|---|
| `+X MW` | Adds capacity to the target substation — directly reduces overload risk |
| `−X% vuln` | Reduces the zone's vulnerability score — makes failures less likely under stress |
| `+X% cascade resist` | Makes neighboring nodes less likely to fail when this node fails |
| `−X% demand` | Reduces the zone's load (demand response, smart meters) |
| `+X% recovery` | Increases the chance that a failed node comes back online each hour |

- **CapEx** — deducted from your budget cap when added

Filter by zone using the chips at the top to narrow down to specific neighborhoods.

---

## The Timeline Bar (bottom)

After a run, the full scenario plays out over the bar.

| Control | What it does |
|---|---|
| **▶ / ⏸** | Play or pause the replay |
| **⏮** | Jump back to hour 0 |
| **1× / 2× / 4×** | Playback speed |
| **Red tick marks** | Each tick is a critical event (node failure or cascade). Click any tick to jump to that hour. |
| **Scrubber drag** | Drag to any hour — the 3D viewport updates node colors in real time to that moment's state |

---

## Event Log (bottom-left overlay)

Click **📋 Events** to open. Shows every simulation event up to the current scrubber position, newest first.

| Color | Severity |
|---|---|
| 🔴 Red | **Critical** — node failure or cascade |
| 🟡 Yellow | **Warning** — node approaching overload (85%+ capacity) |
| ℹ️ Grey | **Info** — node recovery |

---

## Compare Mode (⚖️)

Use this to compare two different plans side by side.

**How to use:**
1. Run a simulation with your baseline plan → click **📌 Lock Baseline**
2. Add or remove projects, or change an assumption slider
3. Run again
4. Click **⚖️ Compare**

The panel shows:
- **Metric deltas** — how stability, equity, cost efficiency, and total outage hours changed (green = improved, red = worsened)
- **Zone outage bars** — which specific neighborhoods got better or worse

---

## Scores Explained (Top Bar, after a run)

| Score | What 100% means | What drives it down |
|---|---|---|
| **Stability** | Every substation stayed on for the full scenario | Node failures, cascades, long recovery times |
| **Equity** | Outage burden was spread evenly across income levels | Low-income zones (Montopolis, Rundberg, Manor) losing power while wealthy zones (Westlake, Bee Cave) stay lit |
| **Cost Efficiency** | High stability relative to CapEx spent | Spending heavily with little improvement in outcomes |

**Equity** specifically measures the Pearson correlation between each zone's outage hours and its inverse income level. If poor neighborhoods disproportionately lose power, the score drops toward 0.

---

## Export / Audit

The **📄 Export Filing Snapshot** button produces a self-contained JSON that includes:

- Full plan version (role, all projects, all assumption values)
- Scenario definition
- Complete simulation result (all metrics, zone outage hours, event log)
- An `auditTrail` block with a deterministic `runId` derived from the plan + scenario + seed

The `runId` is a hash — anyone who re-runs with identical inputs will produce the same ID, making results independently verifiable.

---

## File Structure

```
gridcase-3d-mvp/
├── src/
│   ├── types/grid.ts          — all TypeScript interfaces (Zone, GridNode, Project, etc.)
│   ├── data/mockAustin.ts     — 15 zones, 14 nodes, 20 edges, 12 projects, 3 scenarios
│   ├── sim/engine.ts          — simulation engine (deterministic, seeded PRNG)
│   ├── stores/
│   │   ├── planStore.ts       — role, projects, assumptions, budget
│   │   └── simulationStore.ts — run state, timeline, history, compare
│   ├── utils/math.ts          — PRNG, Pearson correlation, hash
│   └── components/
│       ├── Viewport3D.tsx     — R3F canvas (zones, nodes, edges, layer colors)
│       ├── LayerLegend.tsx    — color key overlay
│       ├── RightPanel.tsx     — all controls
│       ├── TopMetrics.tsx     — scores + budget header
│       ├── TimelineBar.tsx    — scrubber + playback
│       ├── EventLogDrawer.tsx — scrollable event list
│       ├── ComparePanel.tsx   — counterfactual comparison
│       └── ExportModal.tsx    — JSON snapshot preview + download
└── tests/engine.test.ts       — 20 unit tests
```
