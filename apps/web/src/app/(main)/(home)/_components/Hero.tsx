// app/(main)/(home)/_components/Hero.tsx
import Image from "next/image";

export default function HeroContent() {
    return (
        <div className="grid lg:grid-cols-2">
            <div className="space-y-8 font-body">
                <h1 className="font-heading text-4xl lg:text-6xl xl:text-7xl leading-tight">
                    EXPERT SERVICES THAT DRIVE{" "}
                    <span className="relative inline-block">
                        REAL GROWTH
                        <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-accent" />
                    </span>
                </h1>
                <p className="max-w-xl text-sm sm:text-lg leading-relaxed text-foreground/70">
                    Lorem ipsum dolor sit amet consectetur. Id massa ac convallis magna ut eget et id
                    quisque. Nisi imperdiet ipsum tellus quis a diam. Turpis duis purus ut sapien.
                    Lorem ipsum dolor sit amet consectetur.
                </p>
                <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-4 sm:px-8 py-2 sm:py-4 font-medium max-sm:text-xs text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30">
                    <span className="relative z-10">GET IN TOUCH</span>
                    <div className="absolute inset-0 bg-linear-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                {/* <div className="w-120 h-120 relative flex items-center justify-center"> */}
                    <div className="w-full h-[80vw] sm:w-120 sm:h-120 relative flex items-center justify-center">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/videos/ethereum.webm" type="video/webm" />
                        {/* <source src="/videos/ethereum.mp4" type="video/mp4" /> */}
                    </video>
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse pointer-events-none" />
                </div>
            </div>
        </div>
    );
}