"use client";
import { useContact } from "./useContact";
import { Button, Input, P, TextArea } from "@/components";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
    const { form, handleChange, handleSubmit, errors, isSubmitting } = useContact();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    return (
        <form className="col-span-3 xl:col-span-4 flex flex-col gap-6 bg-yellow-60 py-2" onKeyDown={handleKeyPress}>
            <div className="grid xxs:grid-cols-2 gap-4">
                <Input name="firstName" label="First Name" value={form.firstName} handleChange={handleChange} error={errors.firstName} />
                <Input name="lastName" label="Last Name" value={form.lastName} handleChange={handleChange} error={errors.lastName} />
            </div>
            <Input name="contact" label="Contact Number" placeholder="(555) 555-5555" type="tel" value={form.contact} handleChange={handleChange} error={errors.contact} />
            <Input name="email" label="Email Address" type="email" value={form.email} handleChange={handleChange} error={errors.email} />
            <TextArea name="message" label="Your Message" value={form.message} handleChange={handleChange} error={errors.message} rows={6} />
            <Button type="button" onClick={handleSubmit} variant="primary" size="sm" className="w-max" icon={<ArrowRight className="w-4 self-end" />} loading={isSubmitting} loadingText="Sending">Send Message</Button>
        </form>
    );
}