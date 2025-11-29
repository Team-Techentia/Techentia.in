'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { WorkMetadata } from '@/lib/types';

interface WorkHeroProps {
  metadata: WorkMetadata;
}

export default function WorkHero({ metadata }: WorkHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate hero elements in sequence
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      })
      .from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, '-=0.6')
      .from(tagsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.4')
      .from(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
      }, '-=0.8');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full mb-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 
          ref={titleRef}
          className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4"
        >
          {metadata.title}
        </h1>
        
        <p 
          ref={descRef}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          {metadata.description}
        </p>
        
        <div 
          ref={tagsRef}
          className="flex flex-wrap gap-2 mt-6"
        >
          {metadata.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 text-sm bg-accent/10 text-accent-foreground rounded-full border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      <div 
        ref={imageRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-2xl"
      >
        <Image
          src={metadata.heroImage}
          alt={metadata.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
      </div>
    </div>
  );
}