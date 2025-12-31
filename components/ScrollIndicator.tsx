'use client';
import { useEffect, useState } from 'react';

export const ScrollIndicator = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll to top when past hero (100vh)
      setShowScrollTop(scrollPosition > windowHeight * 0.5);

      // Show scroll down when at top and there's more content
      setShowScrollDown(
        scrollPosition < windowHeight * 0.3 &&
        documentHeight > windowHeight * 1.5
      );
    };

    // Small delay to ensure page is fully loaded
    setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({ top: windowHeight, behavior: 'smooth' });
  };

  return (
    <div className="scroll-indicators">
      {/* Scroll to Top - appears when scrolled past hero */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Scroll Down indicator - appears at top */}
      {showScrollDown && (
        <button
          onClick={scrollToNext}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-12 h-16 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:bg-white/25 transition-all duration-300 shadow-lg animate-bounce"
          aria-label="Scroll down"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};
