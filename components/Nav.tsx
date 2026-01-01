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
  const navRef = useRef<HTMLDivElement>(null);

  // Entrance animation on mount
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        {
          opacity: 0,
          y: -80,
          scaleY: 0.3,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 1,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }
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
      <div ref={navRef} className="fixed top-0 left-0 right-0 z-50 h-auto flex justify-center items-center w-full px-5 md:px-8 pt-4 transition-all duration-500 bg-transparent">
        <div className="w-full flex justify-between items-center px-2 py-3 rounded-2xl transition-all duration-500 bg-transparent">
          {/* JOC Logo - Footer logo on mobile, regular logo on desktop */}
          <Image
            src={footerLogo}
            alt='joc logo'
            priority
            className="h-20 sm:h-30 md:h-28 lg:hidden w-auto"
          />
          <Image
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
                <Link href={link.link} key={index} className='text-white font-clash text-[18px] hover:opacity-50 transition-all'>{link.title}</Link>
              ))}
            </div>

            {/* Book Appointment Button - White background */}
            <button className="font-clash text-black text-[16px] px-6 py-2.5 rounded-lg bg-white hover:bg-white/90 transition-all shadow-lg">
              Book Appointment
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <HamburgerButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
