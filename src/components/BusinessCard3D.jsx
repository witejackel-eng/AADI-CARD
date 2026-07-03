import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_TILT_DESKTOP = 20; // degrees, per the spec
const MAX_TILT_MOBILE = 9; // gentler on small/touch viewports so nothing clips

const CONTACTS = [
  { label: "GitHub", handle: "witejackel-eng" },
  { label: "Email", handle: "witejackel@gmail.com" },
  { label: "Phone", handle: "+91 93107 36542" },
];

export default function BusinessCard3D() {
  const wrapperRef = useRef(null);
  const tiltRef = useRef(null);
  const flipRef = useRef(null);
  const shadowRef = useRef(null);

  const isFlippedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mouse-tracking tilt, glare, and shadow (GSAP quickTo => zero-lag interpolation)
  useEffect(() => {
    gsap.set(tiltRef.current, { transformPerspective: 1200 });
    gsap.set(flipRef.current, { rotationY: 0, transformOrigin: "50% 50%" });
    gsap.set(shadowRef.current, {
      y: 22,
      opacity: 0.3,
      scale: 0.94,
      transformOrigin: "50% 50%",
    });
    wrapperRef.current.style.setProperty("--gx", "50%");
    wrapperRef.current.style.setProperty("--gy", "50%");

    let maxTilt = window.innerWidth < 640 ? MAX_TILT_MOBILE : MAX_TILT_DESKTOP;
    let intensity = window.innerWidth < 640 ? 0.55 : 1;

    const handleResize = () => {
      maxTilt = window.innerWidth < 640 ? MAX_TILT_MOBILE : MAX_TILT_DESKTOP;
      intensity = window.innerWidth < 640 ? 0.55 : 1;
    };

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

    // Glare hotspot: smoothed via a plain proxy, applied as a CSS var on the
    // unrotated wrapper so it inherits into both (rotated) card faces.
    const glareState = { x: 50, y: 50 };
    const glareX = gsap.quickTo(glareState, "x", {
      duration: 0.5,
      ease: "power3",
      onUpdate: () => wrapperRef.current.style.setProperty("--gx", `${glareState.x}%`),
    });
    const glareY = gsap.quickTo(glareState, "y", {
      duration: 0.5,
      ease: "power3",
      onUpdate: () => wrapperRef.current.style.setProperty("--gy", `${glareState.y}%`),
    });

    // Contact shadow: falls opposite the light/cursor and deepens with tilt.
    const shadowX = gsap.quickTo(shadowRef.current, "x", {
      duration: 0.9,
      ease: "power3",
    });
    const shadowY = gsap.quickTo(shadowRef.current, "y", {
      duration: 0.9,
      ease: "power3",
    });
    const shadowOpacity = gsap.quickTo(shadowRef.current, "opacity", {
      duration: 0.9,
      ease: "power3",
    });

    const handlePointerMove = (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      const tiltMagnitude = Math.min(1, Math.abs(xPct) + Math.abs(yPct));

      rotateY(xPct * 2 * maxTilt);
      rotateX(-yPct * 2 * maxTilt);
      shiftX(xPct * 14 * intensity);
      shiftY(yPct * 10 * intensity);

      glareX((xPct + 0.5) * 100);
      glareY((yPct + 0.5) * 100);

      shadowX(-xPct * 46 * intensity);
      shadowY(22 - yPct * 30 * intensity);
      shadowOpacity(0.25 + tiltMagnitude * 0.3);
    };

    const handlePointerLeave = () => {
      rotateX(0);
      rotateY(0);
      shiftX(0);
      shiftY(0);
      glareX(50);
      glareY(50);
      shadowX(0);
      shadowY(22);
      shadowOpacity(0.3);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
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
      className="perspective-wrapper relative aspect-[7/4] w-[min(88vw,560px)] min-w-[260px] max-w-[560px]"
    >
      {/* Dynamic contact shadow: shifts and deepens with the tilt angle */}
      <div
        ref={shadowRef}
        className="card-shadow pointer-events-none absolute inset-0 rounded-2xl blur-2xl"
      />

      <div ref={tiltRef} className="preserve-3d relative h-full w-full">
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
          <div className="card-face backface-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white via-[#f6f6f7] to-[#ececee] p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] sm:p-9">
            <CornerTicks />

            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-[11px] font-semibold tracking-widest text-black sm:h-9 sm:w-9 sm:text-xs">
                  A
                </div>
                <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-black/35 sm:text-[10px] sm:tracking-[0.4em]">
                  01 / Front
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-4xl">
                  ADITYA
                </h1>
                <div className="my-2 h-px w-12 bg-black/20 sm:my-3 sm:w-16" />
                <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/55 sm:text-[11px] sm:tracking-[0.45em]">
                  Creative &middot; Design Engineer
                </p>
              </div>
            </div>

            {/* Editorial mark: bold Devanagari graphic in the empty center-right canvas */}
            <div className="pointer-events-none absolute inset-x-5 top-12 bottom-20 flex items-center justify-end sm:inset-x-9 sm:top-20 sm:bottom-24">
              <div className="text-right">
                <p className="font-devanagari leading-none text-black text-4xl sm:text-7xl">
                  &#2325;&#2371;&#2359;&#2381;&#2339;
                </p>
                <p className="mt-1 text-[6px] font-medium uppercase tracking-[0.35em] text-black/60 sm:mt-2.5 sm:text-[10px] sm:tracking-[0.55em]">
                  ( Krishna )
                </p>
              </div>
            </div>

            {/* Glare / glass reflection */}
            <div className="card-glare pointer-events-none absolute inset-0 rounded-2xl" />
          </div>

          {/* BACK FACE */}
          <div className="card-face card-face--back backface-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white via-[#f6f6f7] to-[#ececee] p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] sm:p-9">
            <div className="pointer-events-none absolute inset-3 rounded-xl bg-grid opacity-[0.25] sm:inset-6" />
            <CornerTicks />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-black/35 sm:text-[10px] sm:tracking-[0.4em]">
                  02 / Back
                </span>
                <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-black/35 sm:text-[10px] sm:tracking-[0.4em]">
                  Aadi-Card
                </span>
              </div>

              <ul className="space-y-1 sm:space-y-1.5">
                {CONTACTS.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-baseline justify-between gap-3 border-b border-black/10 pb-1 text-[10px] sm:pb-1.5 sm:text-xs"
                  >
                    <span className="uppercase tracking-[0.15em] text-black/40 sm:tracking-[0.3em]">
                      {c.label}
                    </span>
                    <span className="truncate font-medium text-black/85">
                      {c.handle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Glare / glass reflection */}
            <div className="card-glare pointer-events-none absolute inset-0 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerTicks() {
  const base = "absolute h-2 w-2 border-black/25";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t sm:left-4 sm:top-4`} />
      <span className={`${base} right-3 top-3 border-r border-t sm:right-4 sm:top-4`} />
      <span className={`${base} bottom-3 left-3 border-b border-l sm:bottom-4 sm:left-4`} />
      <span className={`${base} bottom-3 right-3 border-b border-r sm:bottom-4 sm:right-4`} />
    </>
  );
}
