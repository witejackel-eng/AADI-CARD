# Architecture — AADI Card

## Overview

A 3D interactive business card web application built with Vite and React. Renders an animated business card with 3D flip and hover effects using GSAP and CSS transforms.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 5 |
| UI | React 19 |
| Animation | GSAP |
| Styling | Tailwind CSS (PostCSS plugin) |

## Directory Structure

```
src/
└── BusinessCard3D.jsx      # Single-component app — 3D business card with GSAP animations
public/
└── assets/                 # Card front/back images
```

## Data Flow

Fully client-side. Card data and images are static assets. No API calls, no database, no server-side rendering.

## Key Design Decisions

- **Single component** — The entire app is one React component, appropriate for a focused interactive demo
- **GSAP for animation** — Chosen for precise control over 3D card flip and hover transform animations
- **Vite over Next.js** — No SSR or routing needed; Vite provides faster development and smaller bundle for a single-page interactive demo