import { Search } from "lucide-react";
import { ThemeToggle } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/assets";
import { ROUTES } from "@/lib/consts";

const NAV_LINKS = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Services", href: ROUTES.SERVICES.ROOT },
    { label: "Works", href: ROUTES.WORKS.ROOT },
    { label: "About", href: ROUTES.ABOUT },
    { label: "Contact Us", href: ROUTES.CONTACT },
];

export default function Navbar() {
    return (
        <nav className="fixed top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto h-16 max-w-7xl rounded-[36px] bg-foreground/7.5 backdrop-blur-">
                <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo */}
                    <Link href="/" className="group flex items-center" aria-label="Techentia Home">
                        <div className="relative h-6 w-6 overflow-hidden transition-transform group-hover:scale-105">
                            <Logo className="size-full object-fill text-foreground" />
                        </div>
                    </Link>

                    {/* Links */}
                    <div className="hidden items-center gap-1 font-body font-semibold md:flex">
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="group relative px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
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
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
