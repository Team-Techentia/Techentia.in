'use client';

import { useEffect, useRef, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { WorkMetadata } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface WorkContentProps {
  content: string;
  metadata: WorkMetadata;
}

// Animated wrapper components with proper refs
const AnimatedH2 = ({ children, ...props }: any) => {
  const ref = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  return (
    <h2 
      ref={ref}
      className="font-heading text-3xl md:text-4xl mt-12 mb-6 scroll-mt-24 opacity-0 -translate-x-8" 
      {...props}
    >
      {children}
    </h2>
  );
};

const AnimatedH3 = ({ children, ...props }: any) => {
  const ref = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  return (
    <h3 
      ref={ref}
      className="font-heading text-2xl md:text-3xl mt-8 mb-4 scroll-mt-24 opacity-0 -translate-x-6" 
      {...props}
    >
      {children}
    </h3>
  );
};

const AnimatedP = ({ children, ...props }: any) => {
  const ref = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  return (
    <p 
      ref={ref}
      className="text-muted-foreground leading-relaxed mb-4 opacity-0 translate-y-5" 
      {...props}
    >
      {children}
    </p>
  );
};

const AnimatedList = ({ ordered, children, ...props }: any) => {
  const ref = useRef<HTMLUListElement | HTMLOListElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  const Component = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';
  
  return (
    <Component 
      ref={ref as any}
      className={`${listClass} list-inside space-y-2 mb-4 text-muted-foreground opacity-0 translate-y-5`}
      {...props}
    >
      {children}
    </Component>
  );
};

const AnimatedBlockquote = ({ children, ...props }: any) => {
  const ref = useRef<HTMLQuoteElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  return (
    <blockquote 
      ref={ref}
      className="border-l-4 border-accent pl-4 py-2 my-6 italic bg-accent/5 rounded-r opacity-0 scale-95" 
      {...props}
    >
      {children}
    </blockquote>
  );
};

const AnimatedPre = ({ children, ...props }: any) => {
  const ref = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  return (
    <pre 
      ref={ref}
      className="bg-muted p-4 rounded-lg overflow-x-auto my-6 border border-border opacity-0 translate-y-8" 
      {...props}
    >
      {children}
    </pre>
  );
};

const AnimatedImage = ({ src, alt, ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        });
      },
    });
    
    return () => trigger.kill();
  }, []);
  
  return (
    <div ref={ref} className="my-8 opacity-0 scale-95">
      <Image
        src={src}
        alt={alt || ''}
        width={1200}
        height={675}
        className="rounded-lg border border-border w-full h-auto"
        {...props}
      />
      {alt && (
        <p className="text-sm text-muted-foreground text-center mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  );
};

const components = {
  h2: AnimatedH2,
  h3: AnimatedH3,
  p: AnimatedP,
  ul: (props: any) => <AnimatedList ordered={false} {...props} />,
  ol: (props: any) => <AnimatedList ordered={true} {...props} />,
  blockquote: AnimatedBlockquote,
  code: ({ children, ...props }: any) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: AnimatedPre,
  img: AnimatedImage,
};

export default function WorkContent({ content, metadata }: WorkContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    serialize(content).then(setMdxSource);
  }, [content]);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.from(contentRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power2.out',
    });

    // Cleanup all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mdxSource]);

  if (!mdxSource) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div 
      ref={contentRef}
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-heading
        prose-h2:text-3xl prose-h2:md:text-4xl
        prose-h3:text-2xl prose-h3:md:text-3xl
        prose-p:text-muted-foreground
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-muted prose-pre:border prose-pre:border-border
        prose-img:rounded-lg prose-img:border prose-img:border-border"
    >
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}