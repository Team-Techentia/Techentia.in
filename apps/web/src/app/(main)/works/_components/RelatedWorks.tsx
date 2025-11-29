'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkMetadata } from '@/lib/types';
import { ROUTES } from '@/lib/consts';

gsap.registerPlugin(ScrollTrigger);

interface RelatedWorksProps {
  works: WorkMetadata[];
}

export default function RelatedWorks({ works }: RelatedWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || works.length === 0) return;

    const cards = Array.from(containerRef.current.querySelectorAll('.work-card'));
    if (cards.length === 0) return;

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 60 });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, [works]);

  if (works.length === 0) return null;

  return (
    <section ref={containerRef} className="mt-20 pt-12 border-t border-border">
      <h2 className="font-heading text-3xl md:text-4xl mb-8">Related Work</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {works.map((work) => (
          <Link
            key={work.slug}
            href={ROUTES.WORKS.DETAIL(work.slug)}
            className="work-card group block"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border mb-4">
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <h3 className="font-heading text-xl mb-2 group-hover:text-accent transition-colors">
              {work.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {work.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {work.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent-foreground rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}