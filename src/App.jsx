import BusinessCard3D from "./components/BusinessCard3D.jsx";

export default function App() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#08080a] text-white select-none">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_rgba(8,8,10,0)_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(80,80,255,0.08),_transparent_55%)]" />

      {/* Corner frame labels */}
      <div className="pointer-events-none absolute left-5 top-5 z-20 flex flex-col gap-1 sm:left-8 sm:top-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
          Web-Card
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/30">
          // Specimen 01
        </span>
      </div>

      <div className="pointer-events-none absolute right-5 top-5 z-20 flex flex-col items-end gap-1 text-right sm:right-8 sm:top-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
          Tech: GSAP 3D
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/30">
          React // Tailwind
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
          [ Click to Flip / Move Mouse ]
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 z-20 hidden flex-col gap-1 sm:flex sm:left-8 sm:bottom-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/30">
          N 40.7128&deg; / W 74.0060&deg;
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 z-20 hidden flex-col items-end gap-1 sm:flex sm:right-8 sm:bottom-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/30">
          Ed. 2026
        </span>
      </div>

      {/* Centered interactive card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <BusinessCard3D />
      </div>
    </main>
  );
}
