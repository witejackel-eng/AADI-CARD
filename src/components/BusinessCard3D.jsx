import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_TILT = 20; // degrees, per the spec
const SOCIALS = [
  { label: "GitHub", handle: "@aadi.dev" },
  { label: "LinkedIn", handle: "in/aaditya" },
  { label: "X / Twitter", handle: "@aadi_codes" },
];

export default function BusinessCard3D() {
  const wrapperRef = useRef(null);
  const tiltRef = useRef(null);
  const flipRef = useRef(null);

  const isFlippedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mouse-tracking tilt (GSAP quickTo => zero-lag, spring-like interpolation)
  useEffect(() => {
    gsap.set(tiltRef.current, { transformPerspective: 1200 });
    gsap.set(flipRef.current, { rotationY: 0, transformOrigin: "50% 50%" });

    const rotateX = gsap.quickTo(tiltRef.current, "rotationX", {
      duration: 0.9,
      ease: "power3",
    });
    const rotateY = gsap.quickTo(tiltRef.current, "rotationY", {
      duration: 0.9,
      ease: "power3",
    });
    const shiftX = gsap.quickTo(tiltRef.current, "x", {
      duration: 1.1,
      ease: "power3",
    });
    const shiftY = gsap.quickTo(tiltRef.current, "y", {
      duration: 1.1,
      ease: "power3",
    });

    const handlePointerMove = (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;

      rotateY(xPct * 2 * MAX_TILT);
      rotateX(-yPct * 2 * MAX_TILT);
      shiftX(xPct * 14);
      shiftY(yPct * 10);
    };

    const handlePointerLeave = () => {
      rotateX(0);
      rotateY(0);
      shiftX(0);
      shiftY(0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Click-to-flip: 180deg rotateY with a snappy back-out ease + lift scale
  const handleFlip = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const next = !isFlippedRef.current;
    isFlippedRef.current = next;
    setIsFlipped(next);

    const targetRotation = next ? 180 : 0;

    gsap.timeline({
      defaults: { transformOrigin: "50% 50%" },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    })
      .to(
        flipRef.current,
        { rotationY: targetRotation, duration: 0.9, ease: "back.out(1.7)" },
        0
      )
      .to(flipRef.current, { scale: 1.08, duration: 0.35, ease: "power2.out" }, 0)
      .to(flipRef.current, { scale: 1, duration: 0.55, ease: "power2.inOut" }, 0.35);
  };

  return (
    <div
      ref={wrapperRef}
      className="perspective-wrapper aspect-[7/4] w-[min(86vw,560px)]"
    >
      <div ref={tiltRef} className="preserve-3d h-full w-full">
        <div
          ref={flipRef}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleFlip()}
          className="preserve-3d relative h-full w-full cursor-pointer outline-none"
        >
          {/* FRONT FACE */}
          <div className="card-face backface-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141417] via-[#0d0d10] to-[#08080a] p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-9">
            <CornerTicks />

            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-semibold tracking-widest">
                  A
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  01 / Front
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  AADITYA
                </h1>
                <div className="my-3 h-px w-16 bg-white/25" />
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                  Creative &middot; Design Engineer
                </p>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="card-face card-face--back backface-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#101012] via-[#0c0c0e] to-[#08080a] p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-9">
            <div className="pointer-events-none absolute inset-4 opacity-[0.15] bg-grid rounded-xl sm:inset-6" />
            <CornerTicks />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  02 / Back
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  aadi.dev
                </span>
              </div>

              <ul className="space-y-1.5">
                {SOCIALS.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-baseline justify-between border-b border-white/5 pb-1.5 text-xs"
                  >
                    <span className="uppercase tracking-[0.25em] text-white/35">
                      {s.label}
                    </span>
                    <span className="font-medium text-white/80">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerTicks() {
  const base = "absolute h-2 w-2 border-white/25";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t sm:left-4 sm:top-4`} />
      <span className={`${base} right-3 top-3 border-r border-t sm:right-4 sm:top-4`} />
      <span className={`${base} bottom-3 left-3 border-b border-l sm:bottom-4 sm:left-4`} />
      <span className={`${base} bottom-3 right-3 border-b border-r sm:bottom-4 sm:right-4`} />
    </>
  );
}
