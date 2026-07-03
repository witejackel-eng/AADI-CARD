# AADI-CARD

An interactive 3D business card showcase built with React, Tailwind CSS, and GSAP.

- Mouse-tracked tilt (`rotateX`/`rotateY`, clamped to ±20°) via GSAP `quickTo` for lag-free motion.
- Click-to-flip 180° card rotation with a `back.out` ease and a physical lift/scale effect.
- Front and back faces with `backface-visibility: hidden` for a clean 3D flip.

## Development

```bash
npm install
npm run dev
```

## Deployment

Deploys directly to Vercel (framework auto-detected as Vite):

```bash
vercel
```
