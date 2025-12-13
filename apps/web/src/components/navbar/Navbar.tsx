"use client";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/assets";
import { ROUTES } from "@/lib/consts";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Services", href: ROUTES.SERVICES.ROOT },
    { label: "Works", href: ROUTES.WORKS.ROOT },
    { label: "About", href: ROUTES.ABOUT },
    { label: "Contact Us", href: ROUTES.CONTACT },
];

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        let lastScroll = window.scrollY;
        const threshold = 80;

        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: () => {
                const currentScroll = window.scrollY;
                const scrollingDown = currentScroll > lastScroll;

                if (currentScroll < threshold) {
                    gsap.to(nav, {
                        y: 0,
                        opacity: 1,
                        width: "95%",
                        duration: 0.5,
                        ease: "power3.out"
                    });
                    lastScroll = currentScroll;
                    return;
                }

                if (scrollingDown) {
                    // Hide navbar + shrink width
                    gsap.to(nav, {
                        y: -100,        // move out of view
                        opacity: 0,     // fade out
                        width: "60%",   // shrink while hiding
                        duration: 2,
                        ease: "power3.out"
                    });
                } else {
                    // Show navbar + expand width
                    gsap.to(nav, {
                        y: 0,           // bring back in view
                        opacity: 1,     // fade in
                        width: "95%",  // expand to full width
                        duration: 2,
                        ease: "power3.out"
                    });
                }

                lastScroll = currentScroll;
            }
        });
    }, []);


    return (
        <nav className="fixed top-4 z-50 w-full">
            <div ref={navRef} className="w-[95%] xl:max-w-[90%] 4xl:max-w-[1800px]! h-14 mx-auto rounded-[36px] bg-foreground/7.5 backdrop-blur-sm">
                <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center rounded-full focus:outline-none focus-visible:ring-0"
                        aria-label="Techentia Home"
                    >

                    {/* <Link href="/" className="group flex items-center" aria-label="Techentia Home"> */}
                        <div className="w-5 h-5 sm:w-5 sm:h-5 relative overflow-hidden transition-transform group-hover:scale-105">
                            <Logo className="size-full object-fill text-foreground" />
                        </div>
                    {/* </Link> */}
                    </Link>

                    {/* Links */}
                    <div className="hidden items-center gap-1 font-body font-semibold md:flex">
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="group relative px-4 py-2 text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground"
                            >
                                {label}
                                <span className="absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-foreground to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <button className="rounded-lg p-2 transition-colors hover:bg-foreground/5" aria-label="Search">
                            <Search className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
