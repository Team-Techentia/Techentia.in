'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function WorkTableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const indicatorRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  const manualScrolling = useRef(false);

  // --- SLUGIFY UTILITIES ---
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-') // spaces → hyphens
      .replace(/-+/g, '-'); // collapse duplicate -

  const makeUniqueSlug = (slug: string, existing: Set<string>): string => {
    if (!existing.has(slug)) {
      existing.add(slug);
      return slug;
    }
    let counter = 2;
    let newSlug = `${slug}-${counter}`;

    while (existing.has(newSlug)) {
      counter++;
      newSlug = `${slug}-${counter}`;
    }

    existing.add(newSlug);
    return newSlug;
  };

  // --- EXTRACT HEADINGS ---
  const extractHeadings = () => {
    const articleElement = document.querySelector('article');
    if (!articleElement) return [];

    const headingElements = articleElement.querySelectorAll('h2, h3');
    const usedSlugs = new Set<string>();

    return Array.from(headingElements).map((heading) => {
      const raw = heading.textContent || '';
      let slug = slugify(raw) || 'section';

      slug = makeUniqueSlug(slug, usedSlugs);

      heading.id = slug;

      return {
        id: slug,
        text: raw,
        level: parseInt(heading.tagName.substring(1)),
      };
    });
  };

  // --- INTERSECTION OBSERVER ---
  const setupIntersectionObserver = (elements: NodeListOf<Element>) => {
    intersectionObserverRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);

            if (!manualScrolling.current) {
              history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    intersectionObserverRef.current = observer;
  };

  // --- LOAD + WATCH HEADINGS ---
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const initial = extractHeadings();
    setHeadings(initial);

    setupIntersectionObserver(
      article.querySelectorAll('h2, h3')
    );

    const mutationObserver = new MutationObserver(() => {
      const updated = extractHeadings();
      setHeadings(updated);

      setupIntersectionObserver(
        article.querySelectorAll('h2, h3')
      );
    });

    mutationObserver.observe(article, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserverRef.current?.disconnect();
    };
  }, []);

  // --- INDICATOR ANIMATION ---
  useEffect(() => {
    if (!activeId || !indicatorRef.current || !scrollContainerRef.current) return;

    const activeLink = document.querySelector(`a[href="#${activeId}"]`) as HTMLElement;
    if (!activeLink) return;

    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const scrollTop = scrollContainerRef.current.scrollTop;

    const offsetTop = linkRect.top - containerRect.top + scrollTop;

    gsap.to(indicatorRef.current, {
      y: offsetTop,
      height: linkRect.height,
      duration: 0.3,
      ease: 'power2.out',
    });

    const containerHeight = scrollContainerRef.current.clientHeight;
    const isAbove = activeLink.offsetTop < scrollTop;
    const isBelow =
      activeLink.offsetTop + activeLink.offsetHeight >
      scrollTop + containerHeight;

    if (isAbove || isBelow) {
      gsap.to(scrollContainerRef.current, {
        scrollTop: activeLink.offsetTop - containerHeight / 2 + activeLink.offsetHeight / 2,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [activeId]);

  // --- CLICK SCROLL + URL UPDATE ---
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    manualScrolling.current = true;

    history.replaceState(null, '', `#${id}`);

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: `#${id}`, offsetY: 100 },
      ease: 'power2.inOut',
      onComplete: () => {
        manualScrolling.current = false;
      },
    });

    setActiveId(id);
  };

  // --- RENDER ---
  if (headings.length === 0) {
    return (
      <nav className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-heading text-xl mb-4">Table of Contents</h4>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </nav>
    );
  }

  return (
    <nav className="bg-card border border-border rounded-lg p-6 flex flex-col max-h-[70vh]">
      <h4 className="font-heading text-xl mb-4">Table of Contents</h4>

      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-y-auto pr-2 no-scrollbar"
      >
        <div
          ref={indicatorRef}
          className="absolute left-0 w-1 bg-accent rounded-full transition-all"
        />

        <ul className="space-y-2 pl-4 relative">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`block text-sm py-1 px-2 rounded transition-all ${
                  activeId === h.id
                    ? 'text-accent font-medium bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
