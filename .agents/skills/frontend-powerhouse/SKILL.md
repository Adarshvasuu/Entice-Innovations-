---
name: frontend-powerhouse
description: >-
  Complete frontend UI/UX toolkit for building stunning, award-winning web interfaces.
  Use when the user asks to create, redesign, or enhance any UI component, page section,
  animation, or visual effect. Covers scroll animations, 3D effects, micro-interactions,
  advanced typography, page transitions, and interactive visualizations using React,
  Framer Motion, and Tailwind CSS v4.
---

# Frontend Powerhouse Skill

This skill makes the agent a world-class frontend developer capable of building
Awwwards-level interfaces. It covers all major UI/UX patterns for premium web experiences.

---

## 1. Scroll-Driven Animations

### Parallax Sections
```jsx
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

function ParallaxSection({ children, speed = 0.5 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -200]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
```

### Reveal on Scroll (Staggered)
```jsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

// Usage:
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Sticky Scroll Progress
```jsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

### Horizontal Scroll Section
```jsx
function HorizontalScroll({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(items.length - 1) * 100}%`]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {items.map((item, i) => (
            <div key={i} className="w-screen flex-shrink-0 px-16">{item}</div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 2. Micro-Interactions

### Magnetic Hover Button
```jsx
function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white font-semibold"
    >
      {children}
    </motion.button>
  );
}
```

### Custom Cursor
```jsx
function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const hoverStart = () => setHovering(true);
    const hoverEnd = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor-hover]").forEach(el => {
      el.addEventListener("mouseenter", hoverStart);
      el.addEventListener("mouseleave", hoverEnd);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-white pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: pos.x - 10, y: pos.y - 10,
        scale: hovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}
```

### Tilt Card on Hover
```jsx
function TiltCard({ children }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setRotateX(-y * 20);
    setRotateY(x * 20);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      {children}
    </motion.div>
  );
}
```

---

## 3. Advanced Typography

### Gradient Text
```jsx
<h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
  Stunning Headline
</h1>
```

### Text Reveal Animation (Word-by-Word)
```jsx
function TextReveal({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
```

### Character Split Animation
```jsx
function CharacterSplit({ text, className = "" }) {
  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12 } }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
```

---

## 4. Page Transitions

### Route Transition Wrapper
```jsx
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

function PageTransition({ children, key }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 5. Glass & Glow Effects (Tailwind Patterns)

### Glass Card
```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl
hover:bg-white/10 hover:border-white/20 hover:shadow-purple-500/10
transition-all duration-300
```

### Glowing Border
```
relative before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
before:bg-gradient-to-r before:from-purple-500 before:to-cyan-500
before:opacity-0 hover:before:opacity-100 before:transition-opacity
```

### Floating Glow Orb (Background)
```jsx
<div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
```

---

## 6. Reusable Animation Variants

```jsx
// Standard fade-up for sections
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

// Scale in for cards and images
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

// Slide in from left/right
export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};
export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

// Stagger container
export const staggerContainer = (stagger = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } }
});
```

---

## 7. Performance Best Practices

- Use `will-change: transform` sparingly on animated elements
- Prefer `transform` and `opacity` for GPU-accelerated animations
- Use `viewport={{ once: true }}` on `whileInView` to avoid re-triggering
- Lazy load heavy components with `React.lazy()` + `Suspense`
- Use `loading="lazy"` on images below the fold
- Debounce/throttle mouse-tracking effects
- Test on mobile — reduce animation complexity for `prefers-reduced-motion`
