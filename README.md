# AADI-CARD — Interactive 3D Business Card

A digital business card that behaves like a physical object. Mouse-tracked 3D tilt physics, a click-to-flip animation with realistic easing, and a tasteful glass aesthetic. Built as a single-page interaction study.

[![Live Demo](https://img.shields.io/badge/demo-aadi--card.vercel.app-brightgreen?style=flat-square)](https://aadi-card.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## Highlights

- **Mouse-tracked 3D tilt** — the card rotates based on cursor position with spring physics, returning to center on mouse leave
- **Click-to-flip** — a GSAP timeline drives a realistic card flip with a slight lift, shadow drop, and ease-in-out backside reveal
- **Glass aesthetic** — backdrop blur, gradient borders, and subtle noise texture for a premium feel
- **Responsive** — works on touch devices via deviceorientation events (where permitted) and falls back to a tap-to-flip on iOS

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite |
| Animation | GSAP (timelines, physics) |
| Styling | Tailwind CSS |
| Build | Vite |
| Deployment | Vercel |

## Run locally

```bash
git clone https://github.com/witejackel-eng/AADI-CARD.git
cd AADI-CARD
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Structure

```
src/
  App.jsx          # Card component + interaction logic
  index.css        # Tailwind + custom styles
index.html         # Vite entry point
```

## License

MIT — see [LICENSE](./LICENSE).
