'use client';
import Link from "next/link";
import Image from "next/image";
import logo from '../public/logo.svg';
import footerLogo from '../public/footer-logo.svg';
import { navLinks } from "@/utils/constants";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HamburgerButton } from "./HamburgerButton";
import { MobileMenu } from "./MobileMenu";
import { gsap } from "gsap";

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Refs for animations
  const logoDesktopRef = useRef<HTMLImageElement>(null);
  const logoMobileRef = useRef<HTMLImageElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop logo fade in
      if (logoDesktopRef.current) {
        gsap.fromTo(
          logoDesktopRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
      }

      // Mobile logo fade in
      if (logoMobileRef.current) {
        gsap.fromTo(
          logoMobileRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
      }

      // Desktop nav links staggered fade
      const validLinks = navLinksRef.current.filter(Boolean);
      if (validLinks.length > 0) {
        gsap.fromTo(
          validLinks,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      // Desktop button fade in
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.8 }
        );
      }

      // Mobile hamburger fade in
      if (hamburgerRef.current) {
        gsap.fromTo(
          hamburgerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Add scroll listener to detect when to show background
  useEffect(() => {
    const handleScroll = () => {
      // Show background after scrolling past 10px for better visibility
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to detect background color - optimized for top-fixed element
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter entries that are actually visible in the top portion of viewport
        const topEntries = entries.filter(entry => {
          const rect = entry.boundingClientRect;
          // Check if section is in the top 100px of viewport where hamburger sits
          return rect.top < 100 && rect.bottom > 0;
        });

        // Find the most prominent section at the top
        if (topEntries.length > 0) {
          // Sort by how much of the section is visible at the top
          const mostVisible = topEntries.reduce((prev, current) => {
            const prevVisible = Math.min(prev.boundingClientRect.bottom, 100) - Math.max(prev.boundingClientRect.top, 0);
            const currentVisible = Math.min(current.boundingClientRect.bottom, 100) - Math.max(current.boundingClientRect.top, 0);
            return currentVisible > prevVisible ? current : prev;
          });

          const theme = mostVisible.target.getAttribute('data-theme');
          setIsLightBackground(theme === 'light');
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-50px 0px -50% 0px' // Focus on top portion of viewport
      }
    );

    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Hide hero CTA button when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [mobileMenuOpen]);

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const targetId = link.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement && window.lenis) {
      window.lenis.scrollTo(targetElement, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  // Dynamic icon color based on background
  const iconColor = isLightBackground ? '#000000' : '#ffffff';

  return (
    <>
      {/* Main Nav - Absolute positioning, scrolls with page */}
      <div className="absolute top-0 left-0 right-0 z-50 h-auto flex justify-center items-center w-full px-5 md:px-8 pt-4 bg-transparent">
        <div className="w-full flex justify-between items-center px-2 py-3 rounded-2xl bg-transparent">
          {/* JOC Logo - Footer logo on mobile, regular logo on desktop */}
          <Image
            ref={logoMobileRef}
            src={footerLogo}
            alt='joc logo'
            priority
            className={`h-20 sm:h-30 md:h-28 lg:hidden w-auto ${isScrolled ? 'invisible' : 'visible'}`}
          />
          <Image
            ref={logoDesktopRef}
            src={logo}
            alt='joc logo'
            priority
            className={`hidden lg:block h-25 w-auto ${isScrolled ? 'invisible' : 'visible'}`}
          />

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className={`hidden lg:flex space-x-6 items-center ${isScrolled ? 'invisible' : 'visible'}`}>
            {/* Nav links */}
            <div className="flex space-x-10 items-center">
              {navLinks.map((link, index) => (
                <Link
                  href={link.link}
                  key={index}
                  ref={(el) => { navLinksRef.current[index] = el; }}
                  onClick={(e) => handleNavClick(e, link.link)}
                  className='text-white font-clash text-[18px] hover:opacity-50 transition-all'
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Book Appointment Button - White background */}
            <button
              ref={buttonRef}
              className="font-clash text-black text-[16px] px-6 py-2.5 rounded-lg bg-white hover:bg-white/90 transition-all shadow-lg"
            >
              Book Appointment
            </button>
          </div>

          {/* Hamburger Menu Button - Mobile only, completely hidden when scrolled */}
          <div ref={hamburgerRef} className={`lg:hidden ${isScrolled ? 'invisible' : 'visible'}`}>
            <HamburgerButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              color="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Fixed Hamburger Menu - Only visible when scrolled */}
      <div
        ref={navContainerRef}
        className={`fixed top-0 right-0 z-50 px-5 md:px-8 pt-4 transition-all duration-700 ease-out ${
          isScrolled
            ? 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0'
            : 'opacity-0 -translate-y-8 translate-x-8 scale-50 rotate-12 pointer-events-none'
        }`}
      >
        <div
          className="liquid-glass rounded-[40%] px-2.5 py-2 transition-all duration-700"
        >
          <HamburgerButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            color={iconColor}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
