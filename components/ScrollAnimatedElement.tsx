"use client";

import React from "react";
import {
  useScrollAnimation,
  AnimationType,
  ScrollAnimationConfig,
} from "@/hooks/useScrollAnimation";

export interface ScrollAnimatedElementProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "ref">,
    ScrollAnimationConfig {
  children: React.ReactNode;
  tag?: React.ElementType;
}

const ScrollAnimatedElement = ({
  children,
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
  className = "",
  tag: Tag = "div",
  customAnimation,
  id,
  style,
  ...rest
}: ScrollAnimatedElementProps) => {
  const { ref } = useScrollAnimation({
    type,
    duration,
    delay,
    ease,
    start,
    end,
    scrub,
    markers,
    once,
    toggleActions,
    customAnimation,
  });

  return (
    <Tag ref={ref as any} className={className} id={id} style={style} {...rest}>
      {children}
    </Tag>
  );
};

export default ScrollAnimatedElement;
