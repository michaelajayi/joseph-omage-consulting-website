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
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Refs for animations
  const logoDesktopRef = useRef<HTMLImageElement>(null);
  const logoMobileRef = useRef<HTMLImageElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop logo from left
      if (logoDesktopRef.current) {
        gsap.fromTo(
          logoDesktopRef.current,
          { opacity: 0, x: -80 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }

      // Mobile logo from left
      if (logoMobileRef.current) {
        gsap.fromTo(
          logoMobileRef.current,
          { opacity: 0, x: -80 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }

      // Desktop nav links from right (staggered)
      const validLinks = navLinksRef.current.filter(Boolean);
      if (validLinks.length > 0) {
        gsap.fromTo(
          validLinks,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // Desktop button from right
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 0.6 }
        );
      }

      // Mobile hamburger from right
      if (hamburgerRef.current) {
        gsap.fromTo(
          hamburgerRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
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

  // Hide hero CTA button when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-auto flex justify-center items-center w-full px-5 md:px-8 pt-4 transition-all duration-500 bg-transparent">
        <div className="w-full flex justify-between items-center px-2 py-3 rounded-2xl transition-all duration-500 bg-transparent">
          {/* JOC Logo - Footer logo on mobile, regular logo on desktop */}
          <Image
            ref={logoMobileRef}
            src={footerLogo}
            alt='joc logo'
            priority
            className="h-20 sm:h-30 md:h-28 lg:hidden w-auto"
          />
          <Image
            ref={logoDesktopRef}
            src={logo}
            alt='joc logo'
            priority
            className="hidden lg:block h-25 w-auto"
          />

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden lg:flex space-x-6 items-center">
            {/* Nav links */}
            <div className="flex space-x-10 items-center">
              {navLinks.map((link, index) => (
                <Link
                  href={link.link}
                  key={index}
                  ref={(el) => { navLinksRef.current[index] = el; }}
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

          {/* Mobile Hamburger Menu Button */}
          <div ref={hamburgerRef} className="lg:hidden">
            <HamburgerButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
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
