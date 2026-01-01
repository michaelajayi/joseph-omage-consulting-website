"use client";

import Link from "next/link";
import { navLinks } from "@/utils/constants";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const targetId = link.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    // Immediately remove body lock to allow scrolling
    document.body.classList.remove('mobile-menu-open');

    // Close menu animation
    onClose();

    // Scroll after menu starts closing (300ms to match animation)
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Fallback for when Lenis isn't available
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // Animate backdrop in
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Stagger animate the links (simple fade only)
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.1,
        }
      );

      // Animate button
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.35 }
        );
      }
    } else {
      // Animate out - reverse stagger
      gsap.to(linksRef.current.filter(Boolean).reverse(), {
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      });

      if (buttonRef.current) {
        gsap.to(buttonRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
      }

      gsap.to(menuRef.current, { opacity: 0, duration: 0.3, delay: 0.2, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`lg:hidden fixed inset-0 z-40 bg-gradient-to-b from-black/75 via-black/50 to-black/25 backdrop-blur-md ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
        {navLinks.map((link, index) => (
          <Link
            href={link.link}
            key={index}
            ref={(el) => { linksRef.current[index] = el; }}
            className='text-white font-clash text-2xl hover:opacity-70 transition-all drop-shadow-lg'
            onClick={(e) => handleNavClick(e, link.link)}
          >
            {link.title}
          </Link>
        ))}
        <div ref={buttonRef} className="pt-8">
          <button
            className="font-clash text-black text-lg px-8 py-3 rounded-lg bg-white hover:bg-white/90 transition-all shadow-lg"
            onClick={onClose}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
