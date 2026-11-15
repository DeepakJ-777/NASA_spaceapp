# 🌍 Earth Information Jukebox

> **Hear the Changing Planet** — An interactive experience translating genuine NASA satellite precipitation measurements into sound using the browser-native Web Audio API.

[![Live Demo](https://img.shields.io/badge/Live_Demo-deepakj--777.github.io%2FNASA__spaceapp-brightgreen?style=for-the-badge&logo=github)](https://deepakj-777.github.io/NASA_spaceapp/)

**🔗 Live Web App:** [https://deepakj-777.github.io/NASA_spaceapp/](https://deepakj-777.github.io/NASA_spaceapp/)

[![Built with React](https://img.shields.io/badge/Frontend-React_19-61dafb.svg)](https://react.dev/)
[![Bundled with Vite](https://img.shields.io/badge/Bundler-Vite_8-646cff.svg)](https://vitejs.dev/)
[![NASA GPM IMERG](https://img.shields.io/badge/NASA_Data-GPM_IMERG_V07-0b3d91.svg)](https://gpm.nasa.gov/data)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 🛰️ Project Overview

The **Earth Information Jukebox** bridges planetary science and sensory perception. Instead of relying solely on visual maps or dense numeric tables, it sonifies real satellite observations so users can *listen* to the atmosphere's dynamics.

This demonstration sonifies a 24-hour storm cycle (25 hourly readings) from **Hurricane Ida** as it moved over the Central New Jersey / NYC Metropolitan area ($40.54^\circ\text{N}, 74.65^\circ\text{W}$) on September 1–2, 2021.

### Quick Concept
* **Dry calm ($0.00\text{ mm/hr}$):** Low, mellow $200\text{ Hz}$ baseline tone.
* **Escalating storm:** Pitch rises continuously with rainfall intensity.
* **Torrential peak ($10.22\text{ mm/hr}$):** Bright $800\text{ Hz}$ chime.
* **Synchronized Dashboard:** Audio playback illuminates the 24-hour bar chart, measurements table, and interactive waveform in real time.

---

## 🔬 Scientific Data & Provenance

* **Dataset:** NASA Global Precipitation Measurement (GPM) Integrated Multi-satellitE Retrievals for GPM (IMERG) Version 07
* **Primary Telemetry Product:** `GPM_3IMERGHHE` (Early Half-Hourly / Hourly Run)
* **Planetary Baseline Context:** `GPM_3IMERGM` (Monthly Mean, January 2014)
* **Archive & Provider:** [NASA GES DISC](https://disc.gsfc.nasa.gov/) (Goddard Earth Sciences Data and Information Services Center)
* **Permanent DOI:** [10.5067/GPM/IMERG/3B-HH-E/07](https://doi.org/10.5067/GPM/IMERG/3B-HH-E/07)
* **Measurement Units:** `mm/hr` (instantaneous liquid water accumulation rate over a $0.1^\circ \times 0.1^\circ$ / ~10 km satellite grid cell)
* **Zero Synthetic Data:** All 25 readings are genuine NASA observations retrieved directly from NASA's Earthdata GIS REST endpoints.

---

## 🎵 Sonification Engine (Web Audio API)

Built from scratch without external audio frameworks:
* **Audio Synthesis:** Pure client-side `AudioContext` utilizing sine wave oscillators with exponential attack ($30\text{ ms}$) and decay envelopes to produce pleasant, soft synthesizer notes free of clicks or harsh harmonics.
* **Linear Pitch Normalization:**
  $$\text{Frequency} = 200 + \left(\frac{\text{Rainfall}}{10.22}\right) \times 600\text{ Hz}$$
* **Interactive Seeking:** Click any bar in the waveform or timeline chart to jump directly to that hour and hear its pitch.
* **Autoplay Compliant:** Audio context activates only upon explicit user gesture (Play button or waveform click).

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v20.19+ or v22.12+)
* `npm` (packaged with Node.js)

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/DeepakJ-777/NASA_spaceapp.git
cd NASA_spaceapp

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open the displayed URL (typically `http://localhost:5173/`) in any modern browser.

### Production Build & Preview

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Code Quality & Linting

```bash
npm run lint
```

---

## 🛠️ Tech Stack

* **React 19:** Modern component-driven UI with fluid responsive layout.
* **Vite 8:** Lightning-fast HMR and optimized production bundling.
* **Web Audio API:** Zero-dependency client-side procedural sound synthesis.
* **Oxlint:** High-performance static code analysis.

---

## 📜 Credits & Attributions

* **NASA GPM Mission:** Satellite constellation data, dual-frequency precipitation radar (DPR), and microwave radiometer calibrations.
* **NASA GES DISC:** Goddard Earth Sciences Data and Information Services Center for hosting and open EGIS REST services.
* **NASA Earth Information Center:** Visionary inspiration for making Earth observation multi-sensory and publicly accessible.
* **Author:** Deepak J Mathew ([@DeepakJ-777](https://github.com/DeepakJ-777))
