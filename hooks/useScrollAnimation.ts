"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "slideInDown"
  | "rotateIn"
  | "flipIn"
  | "none";

export interface ScrollAnimationConfig {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
  customAnimation?: gsap.TweenVars;
}

const getAnimationProps = (type: AnimationType): gsap.TweenVars => {
  const animations: Record<AnimationType, gsap.TweenVars> = {
    fadeIn: {
      opacity: 0,
    },
    fadeInUp: {
      opacity: 0,
      y: 60,
    },
    fadeInDown: {
      opacity: 0,
      y: -60,
    },
    fadeInLeft: {
      opacity: 0,
      x: -60,
    },
    fadeInRight: {
      opacity: 0,
      x: 60,
    },
    scaleIn: {
      opacity: 0,
      scale: 0.8,
    },
    slideInLeft: {
      x: -100,
    },
    slideInRight: {
      x: 100,
    },
    slideInUp: {
      y: 100,
    },
    slideInDown: {
      y: -100,
    },
    rotateIn: {
      opacity: 0,
      rotation: -180,
      scale: 0.5,
    },
    flipIn: {
      opacity: 0,
      rotationY: -90,
    },
    none: {},
  };

  return animations[type] || animations.fadeIn;
};

export const useScrollAnimation = ({
  type = "fadeInUp",
  duration = 1,
  delay = 0,
  ease = "power3.out",
  start = "top bottom",
  end = "bottom top",
  scrub = false,
  markers = false,
  once = false,
  toggleActions = "play none none none",
  customAnimation,
}: ScrollAnimationConfig = {}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Get animation properties
    const fromProps = customAnimation || getAnimationProps(type);

    // Create the animation
    const animation = gsap.fromTo(
      element,
      {
        ...fromProps,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        rotationY: 0,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          markers,
          toggleActions: once ? "play none none reverse" : toggleActions,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [type, duration, delay, ease, start, end, scrub, markers, once, toggleActions, customAnimation]);

  return { ref };
};
