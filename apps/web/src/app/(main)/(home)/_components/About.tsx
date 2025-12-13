import { aboutCenter, aboutLeft, aboutRight } from "@/assets";
import Image from "next/image";
import { Badge, H2, H3, H6, P } from "@/components"

export default function About() {
    return (
        <section className="max-xl:hidden flex flex-col gap-12 bg-red-60">
            <div className="flex flex-col items-center gap-3">
                <Badge title="About Us" />
                <H2 title="We are an extension of your creative team" />
            </div>
            <div className="w-full max-h-[540px] 3xl:max-h-[627px] grid grid-cols-3 grid-rows-3 gap-4">
                <div className="flex flex-col justify-between bg-pastel-primary text-secondary-foreground rounded-3xl px-6.5 py-5 3xl:py-7">
                    <H3 title="98% Client Satisfaction" />
                    <P text="Backed by measurable success and proven expertise"></P>
                </div>
                <div className="row-span-3 rounded-3xl overflow-hidden">
                    <Image src={aboutCenter} alt="" className="size-full object-cover" />
                </div>
                <div className="row-span-2 rounded-3xl overflow-hidden">
                    <Image src={aboutRight} alt="" className="size-full object-cover" />
                </div>
                <div className="row-span-2 rounded-3xl overflow-hidden">
                    <Image src={aboutLeft} alt="" className="size-full object-cover" />
                </div>
                <div className="flex flex-col justify-between bg-pastel-secondary text-secondary-foreground rounded-3xl px-6.5 py-5 3xl:py-7">
                    <H3 title="Trusted by 20+ Clients Worldwide" />
                    <P text="Our dedication to quality ensures long‑lasting partnerships and impactful outcomes"></P>
                </div>
            </div>
        </section>
    );
}