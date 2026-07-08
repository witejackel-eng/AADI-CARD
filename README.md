# AADI-CARD — Interactive 3D Business Card

A digital business card that behaves like a physical object. Mouse-tracked 3D tilt physics, a click-to-flip animation with realistic easing, and a tasteful glass aesthetic. Built as a single-page interaction study.

[![Live Demo](https://img.shields.io/badge/demo-aadi--card.vercel.app-brightgreen?style=flat-square)](https://aadi-card.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## Features

- **Mouse-tracked 3D tilt** — card rotates based on cursor position with spring physics, returning to center on mouse leave
- **Click-to-flip** — a GSAP timeline drives a realistic card flip with a slight lift, shadow drop, and ease-in-out backside reveal
- **Glass aesthetic** — backdrop blur, gradient borders, and subtle noise texture for a premium feel
- **Responsive** — works on touch devices via deviceorientation events (where permitted) and falls back to tap-to-flip on iOS

## Architecture

The app is intentionally minimal — two components, no routing, no global state.

- **`BusinessCard3D.jsx`** — the single core component. Owns all interaction logic: GSAP mouse-tracked tilt, a click-to-flip timeline with glare/shadow effects, and deviceorientation fallback for mobile. All state is local (`useState` / `useRef`).
- **`App.jsx`** — thin wrapper that renders the card over an ambient gradient background. No shared state, no context, no props drilling.

There is no state management library, no API layer, and no build-time rendering. It's a client-side SPA that ships as a static bundle.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite |
| Animation | GSAP (timelines, physics) |
| Styling | Tailwind CSS |
| Build | Vite |
| Deployment | Vercel |

## Run Locally

```bash
git clone https://github.com/witejackel-eng/AADI-CARD.git
cd AADI-CARD
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Outputs a production bundle to `dist/`. Serve it with any static file server.

## Deployment

A `vercel.json` is included — push to a Vercel-linked branch and it deploys automatically. Alternatively, serve the `dist/` folder from any static host (Netlify, GitHub Pages, Cloudflare Pages, S3, etc.).

## Project Structure

```
src/
  App.jsx              # Wrapper with ambient background
  BusinessCard3D.jsx   # Core card component + all interaction logic
  index.css            # Tailwind + custom styles
index.html             # Vite entry point
vercel.json            # Vercel deployment config
```

## Known Limitations

- **JavaScript only** — no TypeScript; types are not enforced
- **No SSR / SSG** — purely client-rendered; not ideal for SEO-heavy use cases (though irrelevant for a single card)
- **No state management** — all state lives in component locals; won't scale to multi-page flows
- **No routing** — single view by design
- **Limited touch on iOS** — `deviceorientation` requires HTTPS and user permission; falls back to a basic tap-to-flip without tilt
- **No analytics** — no telemetry, tracking, or error reporting built in

## Future Improvements

- Migrate to TypeScript for type safety
- Add a QR code on the card back linking to a vCard or contact page
- Support multiple card themes (color schemes, layouts) via props or a config object
- Integrate a lightweight contact form on the reverse side

## License

MIT — see [LICENSE](./LICENSE).