"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      infinite: false,
    });

    // Make lenis instance available globally
    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      if (typeof window !== "undefined") {
        window.lenis = undefined;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
