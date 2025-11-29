'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: string;
}

interface WorkMetricsProps {
  metrics: Metric[];
}

const MetricItem = ({ metric, index }: { metric: Metric; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || !valueRef.current) return;

    // Animate container
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          end: 'top 30%',
          // scrub: 1,
          // markers: true,
        },
      }
    );

    // Animate number counting
    const text = metric.value;
    const hasNumber = /\d/.test(text);

    if (hasNumber) {
      const match = text.match(/[\d,]+/);
      if (match) {
        const numStr = match[0].replace(/,/g, '');
        const num = parseInt(numStr);

        if (!isNaN(num)) {
          const obj = { val: 0 };

          gsap.to(obj, {
            val: num,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemRef.current,
              start: 'top 85%',
              end: 'top 30%',
              // scrub: 1,
            },
            onUpdate: () => {
              if (valueRef.current) {
                const currentVal = Math.round(obj.val);
                const formatted = currentVal.toLocaleString();
                valueRef.current.textContent = text.replace(/[\d,]+/, formatted);
              }
            },
          });
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === itemRef.current) t.kill();
      });
    };
  }, [metric.value]);

  return (
    <div ref={itemRef} className="text-center">
      <div
        ref={valueRef}
        className="metric-value font-heading text-3xl md:text-4xl lg:text-5xl text-accent mb-2"
      >
        {metric.value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">
        {metric.label}
      </div>
    </div>
  );
};

export default function WorkMetrics({ metrics }: WorkMetricsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 40%',
          // scrub: 1,
          // markers: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12 p-8 bg-card border border-border rounded-xl"
    >
      {metrics.map((metric, index) => (
        <MetricItem key={index} metric={metric} index={index} />
      ))}
    </div>
  );
}