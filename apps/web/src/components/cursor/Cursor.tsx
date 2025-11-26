"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add data-cursor-hover attribute to elements you want to trigger the effect
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');
    
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className={`fixed w-10 h-10 border-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out ${
          isHovering 
            ? 'border-background bg-black scale-150' 
            : 'border-foreground bg-transparent scale-100'
        }`}
      />
      
      {/* Dot */}
      <div
        ref={dotRef}
        className={`fixed w-1.5 h-1.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-100 ease-out ${
          isHovering ? 'bg-foreground scale-150' : 'bg-foreground scale-100'
        }`}
      />
    </>
  );
}