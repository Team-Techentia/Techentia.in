import { Search, User } from "lucide-react";
import { ThemeToggle } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/assets";

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-background backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg shadow-black/5">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                        {/* Logo */}
                        <Link href="/" className="flex items-center group" aria-label="Techentia Home">
                            <div className="relative w-8 h-8 rounded-xl overflow-hidden transition-transform group-hover:scale-105">
                                <Image
                                    src={logo}
                                    alt="Techentia Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Link>

                        {/* Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {["Home", "Services", "Works", "About", "Contact Us"].map((txt) => (
                                <a
                                    key={txt}
                                    href={`#${txt.toLowerCase().replace(" ", "")}`}
                                    className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
                                >
                                    {txt}
                                    <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-foreground to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                                aria-label="User account"
                            >
                                <User className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}