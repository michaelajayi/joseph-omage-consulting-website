# Scroll Animations Guide

This project includes a comprehensive scroll animation system using GSAP ScrollTrigger integrated with Lenis smooth scrolling.

## Components

### ScrollAnimatedElement

A wrapper component that adds scroll-triggered animations to any element.

## Basic Usage

```tsx
import ScrollAnimatedElement from "@/components/ScrollAnimatedElement";

export default function MyComponent() {
  return (
    <ScrollAnimatedElement type="fadeInUp">
      <h1>This will fade in from below as you scroll</h1>
    </ScrollAnimatedElement>
  );
}
```

## Animation Types

The following pre-built animation types are available:

- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in from below (default)
- `fadeInDown` - Fade in from above
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale up while fading in
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `slideInUp` - Slide in from below
- `slideInDown` - Slide in from above
- `rotateIn` - Rotate and scale while fading in
- `flipIn` - 3D flip effect
- `none` - No animation

## Props

All props are optional and have sensible defaults:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `AnimationType` | `"fadeInUp"` | The animation type to use |
| `duration` | `number` | `1` | Animation duration in seconds |
| `delay` | `number` | `0` | Delay before animation starts |
| `ease` | `string` | `"power3.out"` | GSAP easing function |
| `start` | `string` | `"top bottom"` | ScrollTrigger start position |
| `end` | `string` | `"bottom top"` | ScrollTrigger end position |
| `scrub` | `boolean \| number` | `false` | Link animation to scroll position |
| `markers` | `boolean` | `false` | Show ScrollTrigger markers (debug) |
| `once` | `boolean` | `false` | Only animate once |
| `toggleActions` | `string` | `"play none none none"` | ScrollTrigger toggle actions |
| `tag` | `keyof JSX.IntrinsicElements` | `"div"` | HTML tag to render |
| `customAnimation` | `gsap.TweenVars` | `undefined` | Custom GSAP animation properties |

## Examples

### Simple Fade In

```tsx
<ScrollAnimatedElement type="fadeIn">
  <div>Content</div>
</ScrollAnimatedElement>
```

### Staggered Animations

```tsx
<div>
  <ScrollAnimatedElement type="fadeInUp" delay={0}>
    <h1>First</h1>
  </ScrollAnimatedElement>

  <ScrollAnimatedElement type="fadeInUp" delay={0.2}>
    <p>Second</p>
  </ScrollAnimatedElement>

  <ScrollAnimatedElement type="fadeInUp" delay={0.4}>
    <button>Third</button>
  </ScrollAnimatedElement>
</div>
```

### Scroll-Linked Animation (Scrub)

```tsx
<ScrollAnimatedElement
  type="fadeInUp"
  scrub={true}
  start="top bottom"
  end="center center"
>
  <div>This animation follows your scroll position</div>
</ScrollAnimatedElement>
```

### Custom Animation

```tsx
<ScrollAnimatedElement
  customAnimation={{
    opacity: 0,
    scale: 0.5,
    rotation: 180,
    x: -100,
  }}
  duration={1.5}
  ease="elastic.out(1, 0.5)"
>
  <div>Custom animation</div>
</ScrollAnimatedElement>
```

### Different HTML Tags

```tsx
<ScrollAnimatedElement tag="section" type="fadeInLeft">
  <h2>This renders as a section tag</h2>
</ScrollAnimatedElement>

<ScrollAnimatedElement tag="article" type="scaleIn">
  <p>This renders as an article tag</p>
</ScrollAnimatedElement>
```

### One-Time Animation

```tsx
<ScrollAnimatedElement type="fadeInUp" once={true}>
  <div>This will only animate once, won't reverse on scroll up</div>
</ScrollAnimatedElement>
```

### Slower, Dramatic Entrance

```tsx
<ScrollAnimatedElement
  type="fadeInUp"
  duration={2}
  ease="power4.out"
  start="top 80%"
>
  <div>Slow and smooth entrance</div>
</ScrollAnimatedElement>
```

### Debug with Markers

```tsx
<ScrollAnimatedElement type="fadeInUp" markers={true}>
  <div>Shows ScrollTrigger markers for debugging</div>
</ScrollAnimatedElement>
```

## Using the Hook Directly

For more control, you can use the `useScrollAnimation` hook directly:

```tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function MyComponent() {
  const { ref } = useScrollAnimation({
    type: "fadeInUp",
    duration: 1.5,
    once: true,
  });

  return (
    <div ref={ref}>
      <h1>Custom component with animation</h1>
    </div>
  );
}
```

## Advanced: Multiple Animations

```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ComplexAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".item", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  );
}
```

## GSAP Easing Options

Common easing options you can use:

- `"none"` - Linear
- `"power1.out"`, `"power2.out"`, `"power3.out"`, `"power4.out"` - Ease out (smooth end)
- `"power1.in"`, `"power2.in"`, `"power3.in"`, `"power4.in"` - Ease in (smooth start)
- `"power1.inOut"`, `"power2.inOut"`, `"power3.inOut"`, `"power4.inOut"` - Ease both ends
- `"back.out(1.7)"` - Overshoot effect
- `"elastic.out(1, 0.5)"` - Elastic bounce
- `"bounce.out"` - Bouncing effect

## ScrollTrigger Start/End Values

Format: `"[trigger position] [scroller position]"`

Common values:
- `"top top"` - When trigger's top hits viewport's top
- `"top center"` - When trigger's top hits viewport's center
- `"top bottom"` - When trigger's top hits viewport's bottom
- `"center center"` - When trigger's center hits viewport's center
- `"bottom top"` - When trigger's bottom hits viewport's top

You can also use pixel offsets:
- `"top top+=100"` - 100px after top
- `"center bottom-=50"` - 50px before bottom

## Toggle Actions

Format: `"onEnter onLeave onEnterBack onLeaveBack"`

Options: `play`, `pause`, `resume`, `reset`, `restart`, `complete`, `reverse`, `none`

Examples:
- `"play none none none"` - Play once on enter (default)
- `"play none none reverse"` - Play on enter, reverse on scroll back
- `"play reverse play reverse"` - Toggle animation on scroll
- `"restart pause reverse pause"` - Restart on enter, reverse on leave

## Integration with Lenis

The animation system is already integrated with Lenis smooth scrolling. All scroll animations will work seamlessly with the smooth scroll behavior.

## Tips

1. Use `once={true}` for hero sections and above-the-fold content
2. Use staggered delays for lists and grids
3. Keep animations subtle for better UX (duration: 0.6-1.2s is usually good)
4. Use `markers={true}` during development to debug timing
5. The `scrub` prop creates parallax-like effects when set to `true` or a number
6. For performance, avoid animating too many elements simultaneously

## Performance Considerations

- GSAP and ScrollTrigger are already optimized and performant
- Animations use GPU-accelerated transforms (x, y, scale, rotation)
- Lenis integration ensures smooth scrolling won't conflict with animations
- ScrollTrigger automatically handles cleanup and memory management
