'use client';
import { useState, useEffect } from 'react';
import { ArrowUp01Icon, ArrowDown01Icon } from 'hugeicons-react';

declare global {
  interface Window {
    lenis?: any;
  }
}

export const ScrollButtons = () => {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);

      // Don't show anything at very top (within 50px from top)
      if (scrollPosition < 50) {
        setShowScrollDown(false);
        setShowScrollUp(false);
      }
      // Don't show anything at very bottom (within 50px from bottom)
      else if (distanceFromBottom < 50) {
        setShowScrollDown(false);
        setShowScrollUp(false);
      }
      // Near bottom (50-300px from bottom): Show down arrow to scroll back to bottom
      else if (distanceFromBottom >= 50 && distanceFromBottom < 300) {
        setShowScrollDown(true);
        setShowScrollUp(false);
      }
      // Near top (50-200px from top): Show down arrow to scroll down
      else if (scrollPosition >= 50 && scrollPosition < 200) {
        setShowScrollDown(true);
        setShowScrollUp(false);
      }
      // In the middle: Show up arrow to scroll to top
      else if (scrollPosition >= 200 && distanceFromBottom >= 300) {
        setShowScrollUp(true);
        setShowScrollDown(false);
      }
    };

    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
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

  const scrollToBottom = () => {
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

  return (
    <>
      {/* Scroll to Bottom Button */}
      <button
        onClick={scrollToBottom}
        type="button"
        className={`fixed bottom-8 right-8 z-[9999] p-4 rounded-full liquid-glass transition-all duration-500 ease-in-out transform hover:scale-110 cursor-pointer ${
          showScrollDown ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180 pointer-events-none'
        }`}
        aria-label="Scroll to bottom"
        style={{
          pointerEvents: showScrollDown ? 'auto' : 'none',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ArrowDown01Icon size={24} color="#ffffff" strokeWidth={2} />
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        type="button"
        className={`fixed bottom-8 right-8 z-[9999] p-4 rounded-full liquid-glass transition-all duration-500 ease-in-out transform hover:scale-110 cursor-pointer ${
          showScrollUp ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        style={{
          pointerEvents: showScrollUp ? 'auto' : 'none',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ArrowUp01Icon size={24} color="#ffffff" strokeWidth={2} />
      </button>
    </>
  );
};
