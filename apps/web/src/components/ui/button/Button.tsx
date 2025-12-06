import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "glass";
    size?: "sm" | "md" | "lg";
    icon?: ReactNode;
    loadingText?: string;
    loading?: boolean;
    className?: string;
}

export function Button({ children, variant = "primary", size = "sm", icon, loadingText = "Submitting", loading = false, className = "", disabled, ...props }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    const base = "group relative flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.98]";

    const variants = {
        primary: "bg-accent text-accent-foreground hover:bg-accent shadow-lg hover:shadow-xl",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border-2 border-gray-400 text-gray-700 hover:bg-gray-100",
        glass: "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const Loader = () => (
        <span className="w-5 h-5 border-2 border-t-transparent border-white animate-spin rounded-full"></span>
    );

    return (
        <button
            disabled={disabled || loading}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading && loadingText !== "" ? loadingText : children}

            {loading ?
                <Loader />
                :
                icon &&
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {icon}
                </span>
            }
        </button>
    );
}