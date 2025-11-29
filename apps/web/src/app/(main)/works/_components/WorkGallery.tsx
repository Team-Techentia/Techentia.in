'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkGalleryProps {
  images: string[];
  videos?: string[];
  gifs?: string[];
  title: string;
}

interface MediaItem {
  src: string;
  type: 'image' | 'video' | 'gif';
}

// Individual Gallery Item Component
const GalleryItem = ({ 
  media, 
  index, 
  title, 
  onOpenLightbox
}: { 
  media: MediaItem; 
  index: number; 
  title: string;
  onOpenLightbox: (src: string, type: 'image' | 'video' | 'gif') => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

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
          // markers: true,
          // id: `gallery-item-${index}`,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === itemRef.current) t.kill();
      });
    };
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="group relative aspect-video rounded-xl overflow-hidden border border-border/70 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={() => onOpenLightbox(media.src, media.type)}
    >
      {/* Media */}
      {media.type === 'video' ? (
        <video
          src={media.src}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          loop
          playsInline
          autoPlay
        />
      ) : media.type === 'gif' || media.src.endsWith('.gif') ? (
        <img
          src={media.src}
          alt={`${title} - ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <Image
          src={media.src}
          alt={`${title} - ${index + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index < 2}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
        <span className="text-white text-lg font-medium tracking-wide">
          {media.type === 'video' ? 'Play Video' : media.type === 'gif' ? 'View GIF' : 'View Full Size'}
        </span>
      </div>

      {/* Badge */}
      {(media.type === 'video' || media.type === 'gif') && (
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-md">
          {media.type}
        </div>
      )}
    </div>
  );
};

export default function WorkGallery({ images, videos = [], gifs = [], title }: WorkGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxType, setLightboxType] = useState<'image' | 'video' | 'gif'>('image');

  const allMedia: MediaItem[] = [
    ...images.map(src => ({ src, type: 'image' as const })),
    ...videos.map(src => ({ src, type: 'video' as const })),
    ...gifs.map(src => ({ src, type: 'gif' as const })),
  ];

  // Title animation with proper observer
  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    let scrollTriggerInstance: ScrollTrigger | null = null;

    // Create MutationObserver to watch for DOM changes
    const mutationObserver = new MutationObserver(() => {
      // Refresh ScrollTrigger when DOM changes
      ScrollTrigger.refresh();
    });

    // Create ResizeObserver to watch for layout shifts
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    // Find the parent content container (where MDX is rendering)
    let observeTarget = sectionRef.current.parentElement;
    while (observeTarget && !observeTarget.classList.contains('lg:col-span-8')) {
      observeTarget = observeTarget.parentElement;
    }

    if (observeTarget) {
      // Observe the content container for changes
      mutationObserver.observe(observeTarget, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      resizeObserver.observe(observeTarget);
    }

    // Create animation
    const animation = gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 30%',
          // markers: true,
          // id: 'gallery-title',
          invalidateOnRefresh: true,
        },
      }
    );

    scrollTriggerInstance = animation.scrollTrigger as ScrollTrigger;

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, []);

  const openLightbox = (src: string, type: 'image' | 'video' | 'gif') => {
    setLightboxSrc(src);
    setLightboxType(type);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc('');
    document.body.style.overflow = '';
  };

  if (allMedia.length === 0) return null;

  return (
    <section ref={sectionRef} className="mt-16 mb-12">
      {/* Title */}
      <h2
        ref={titleRef}
        className="font-heading text-3xl md:text-4xl mb-10"
      >
        Project Gallery
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {allMedia.map((media, index) => (
          <GalleryItem
            key={`${media.type}-${index}`}
            media={media}
            index={index}
            title={title}
            onOpenLightbox={openLightbox}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-accent text-5xl font-light w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition"
            aria-label="Close"
          >
            ×
          </button>

          <div className="relative max-w-7xl max-h-[92vh]" onClick={e => e.stopPropagation()}>
            {lightboxType === 'video' ? (
              <video
                src={lightboxSrc}
                className="max-w-full max-h-[92vh] rounded-xl shadow-2xl"
                controls
                autoPlay
                loop
              />
            ) : lightboxType === 'gif' || lightboxSrc.endsWith('.gif') ? (
              <img
                src={lightboxSrc}
                alt="Enlarged"
                className="max-w-full max-h-[92vh] object-contain rounded-xl"
              />
            ) : (
              <Image
                src={lightboxSrc}
                alt="Enlarged"
                width={1920}
                height={1080}
                className="max-w-full max-h-[92vh] object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}