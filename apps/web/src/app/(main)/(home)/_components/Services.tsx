// app/(main)/(home)/_components/Services.tsx
import Image from "next/image";
import { servicesList } from "@/lib/consts";

export default function Services() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="mx-auto px-6">

        {/* Heading with badge */}
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-5xl font-bold text-center mb-4 text-foreground">
            Services We Provide
          </h2>
          <p className="text-center text-foreground/60 max-w-2xl text-lg">
            Turning ideas into digital experiences that connect, engage, and convert.
          </p>
        </div>

        <div className="relative">
          {/* Central vertical line with dots */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative h-full">
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-linear-to-b from-accent/20 via-accent/40 to-accent/20 -translate-x-1/2" />
              {servicesList.map((_, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 shrink-0 rounded-full bg-accent border-2 border-background shadow-lg"
                  style={{ top: `${(index + 0.5) * (100 / servicesList.length)}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className={`w-full lg:w-[48%] py-12 ${idx % 2 === 1 ? 'lg:self-end' : ''}`}
              >
                <div className={`w-full flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-6 md:gap-8 rounded-2xl shadow-[0_8px_30px_rgba(90,57,202,0.12)] hover:shadow-[0_12px_40px_rgba(90,57,202,0.18)] transition-all duration-300 p-8 md:p-10 border border-accent/10 bg-background`}>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 text-[15px] leading-relaxed">
                      {service.desc}
                    </p>
                    <button className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark hover:shadow-lg hover:scale-105 transition-all duration-200">
                      Get Started
                    </button>
                  </div>

                  <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 relative">
                    <div className="absolute inset-0 bg-accent/5 rounded-full blur-2xl" />
                    <div className="relative w-full h-full">
                      <Image src={service.img} alt={service.title} fill className="object-contain drop-shadow-xl" />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}