// app/(main)/(home)/_components/Hero.tsx

export default function HeroContent() {
    return (
        <div className="flex max-lg:flex-col lg:justify-between gap-4">
            <div className="space-y-8 font-body">
                <h1 className="font-heading text-4xl lg:text-6xl 3xl:text-7xl! leading-tight">
                    EXPERT SERVICES THAT DRIVE{" "}
                    <br className="max-xxs:hidden" />
                    <span className="relative inline-block">
                        REAL GROWTH
                        <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-accent" />
                    </span>
                </h1>
                <p className="max-w-xl max-sm:text-sm leading-relaxed text-foreground/70">
                    Lorem ipsum dolor sit amet consectetur. Id massa ac convallis magna ut eget et id
                    quisque. Nisi imperdiet ipsum tellus quis a diam. Turpis duis purus ut sapien.
                    Lorem ipsum dolor sit amet consectetur.
                </p>
                <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-4 sm:px-8 py-2 sm:py-4 font-medium max-sm:text-xs text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30">
                    <span className="relative z-10">GET IN TOUCH</span>
                    <div className="absolute inset-0 bg-linear-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
            <div className="h-full lg:self-end flex justify-center items-center">
                <div className="w-70 h-70 xxs:w-100 xxs:h-100 sm:w-80 sm:h-80 xl:w-120 xl:h-120 relative flex items-center justify-center">
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