'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowUp01Icon, ArrowDown01Icon } from 'hugeicons-react';
import Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const ScrollButtons = () => {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollUpButtonRef = useRef<HTMLButtonElement>(null);
  const scrollDownButtonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const scrollThreshold = 5; // Very low threshold for instant response to scroll direction changes

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
      const scrollDelta = scrollPosition - lastScrollY.current;

      // Hide when hamburger menu is visible (10px - 300px scroll range)
      if (scrollPosition > 10 && scrollPosition < 300) {
        setShowScrollDown(false);
        setShowScrollUp(false);
      }
      // At very top: Hide everything
      else if (scrollPosition <= 10) {
        setShowScrollDown(false);
        setShowScrollUp(false);
      }
      // At very bottom: Show UP arrow (stay visible)
      else if (distanceFromBottom < 100) {
        setShowScrollDown(false);
        setShowScrollUp(true);
      }
      // Activation zone after hamburger disappears (300px+): Activate DOWN arrow
      else if (scrollPosition >= 300 && scrollPosition < 500) {
        setShowScrollDown(true);
        setShowScrollUp(false);
      }
      // Activation zone near bottom (100-400px from bottom): Activate UP arrow
      else if (distanceFromBottom >= 100 && distanceFromBottom < 400) {
        setShowScrollUp(true);
        setShowScrollDown(false);
      }
      // Middle area: Detect scroll direction and switch button
      else if (Math.abs(scrollDelta) > scrollThreshold) {
        if (scrollDelta > 0) {
          // Scrolling down - show DOWN arrow to continue down
          setShowScrollDown(true);
          setShowScrollUp(false);
        } else {
          // Scrolling up - show UP arrow to continue up
          setShowScrollUp(true);
          setShowScrollDown(false);
        }
      }
      // Keep whatever button is currently showing (persist state)

      lastScrollY.current = scrollPosition;
    };

    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to detect background color
  useEffect(() => {
    if (!buttonRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            setIsLightBackground(theme === 'light');
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToTop = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Scroll to top clicked!');
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      // Fallback for when Lenis isn't loaded
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Scroll to bottom clicked!');
    const maxScroll = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    console.log('Max scroll height:', maxScroll);
    if (window.lenis) {
      window.lenis.scrollTo(maxScroll, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      // Fallback for when Lenis isn't loaded
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    }
  };

  // Dynamic arrow color based on background
  const arrowColor = isLightBackground ? '#000000' : '#ffffff';

  return (
    <div ref={buttonRef} style={{ isolation: 'isolate', position: 'relative', zIndex: 10000 }}>
      {/* Scroll to Bottom Button */}
      <button
        ref={scrollDownButtonRef}
        onClick={scrollToBottom}
        onTouchEnd={scrollToBottom}
        type="button"
        className={`fixed bottom-8 right-8 p-4 rounded-full liquid-glass transition-all duration-500 ease-in-out transform hover:scale-110 cursor-pointer touch-manipulation ${
          showScrollDown ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'
        }`}
        aria-label="Scroll to bottom"
        disabled={!showScrollDown}
        style={{
          width: '56px',
          height: '56px',
          display: showScrollDown ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          zIndex: 10000,
          isolation: 'isolate'
        }}
      >
        <ArrowDown01Icon size={24} color={arrowColor} strokeWidth={2} className="transition-colors duration-500 pointer-events-none" />
      </button>

      {/* Scroll to Top Button */}
      <button
        ref={scrollUpButtonRef}
        onClick={scrollToTop}
        onTouchEnd={scrollToTop}
        type="button"
        className={`fixed bottom-8 right-8 p-4 rounded-full liquid-glass transition-all duration-500 ease-in-out transform hover:scale-110 cursor-pointer touch-manipulation ${
          showScrollUp ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'
        }`}
        aria-label="Scroll to top"
        disabled={!showScrollUp}
        style={{
          width: '56px',
          height: '56px',
          display: showScrollUp ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          zIndex: 10000,
          isolation: 'isolate'
        }}
      >
        <ArrowUp01Icon size={24} color={arrowColor} strokeWidth={2} className="transition-colors duration-500 pointer-events-none" />
      </button>
    </div>
  );
};
