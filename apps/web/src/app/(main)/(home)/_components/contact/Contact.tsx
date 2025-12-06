import { Badge, H2, H3, H5, H6, P } from "@/components"
import ContactForm from "./ContactForm";
import { illustrationContact } from "@/assets";
import Image from "next/image";

export default async function Contact() {

    return (
        <section className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-3 text-center">
                <Badge title="Contact Us" />
                <H2 title="Let’s Connect and Collaborate" />
                <H6 text="We’re just a message away; let’s discuss how Techentia can help turn your vision into reality" />
            </div>
            <div className="w-full h-full grid md:grid-cols-6 xl:grid-cols-7 gap-12">
                <div className="col-span-3 bg-linear-to-t from-accent/20 via-accent/80 to-accent/95 rounded-3xl py-12 sm:py-16">
                    <div className="relative">
                        <div className="w-[85%] lg:w-[80%] 3xl:w-[65%]! z-10 relative flex flex-col gap-3 mx-auto bg-linear-to-br from-white/10 via-white/5 to-white/0 shadow-[inset_3px_-3px_12px_rgba(255,255,255,0.35)] border border-white/30 rounded-[20px] backdrop-blur-md p-4 lg:p-8 text-center">
                            <div className="h-[185px] relative bg-fore rounded-xl p-1">
                                <Image src={illustrationContact} alt="Contact Image" className="size-full object-cover" />
                            </div>
                            <H5 title="Transforming Ideas into Digital Reality" />
                            <P text="We specialize in delivering end-to-end technology solutions that empower businesses to scale and innovate" className="font-medium text-xs"></P>
                        </div>
                        <div className="w-24 h-24 rounded-full absolute -top-8 right-12 lg:right-24 bg-pastel-primary blur-[1px]"></div>
                        <div className="w-24 h-24 rounded-full absolute -bottom-5 left-6 xl:left-20 bg-accent blur-[1px]"></div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}