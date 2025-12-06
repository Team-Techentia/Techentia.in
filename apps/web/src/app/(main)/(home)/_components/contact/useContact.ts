"use client";

import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import { ChangeEvent, useState } from "react";

interface ContactForm {
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    message: string;
}

export function useContact() {
    const [form, setForm] = useState<ContactForm>({ firstName: "", lastName: "", contact: "", message: "", email: "" });
    const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        setErrors(p => ({ ...p, [name]: "" }));
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Form submitted:", form);
        const number = parsePhoneNumberFromString(form.contact);
        if (number) {
            console.log("Country:", number.country);
            console.log("Country Code:", number.countryCallingCode);
            console.log("National Number:", number.nationalNumber);
        }

        // Reset form
        setForm({ firstName: "", lastName: "", contact: "", message: "", email: "" });
        setIsSubmitting(false);
        alert("Message sent successfully!");
    };

    const validateForm = () => {
        let newErrors: Partial<Record<keyof ContactForm, string>> = {};

        if (!form.firstName.trim())
            newErrors.firstName = "Please enter your First Name";
        if (!form.lastName.trim())
            newErrors.lastName = "Please enter your Last Name";

        const number = detectPhoneNumber(form.contact);

        if (!number) {
            newErrors.contact = "Invalid phone number format";
        } else {
            form.contact = number.number;  // normalized format: +91..., +1..., +44...
        }

        if (!form.email.trim())
            newErrors.email = "Please enter your Email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Please enter a valid email address";

        if (!form.message.trim())
            newErrors.message = "Please enter the message";
        else if (form.message.length > 500)
            newErrors.message = "Message too long (max 500 characters)";

        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;
    };

    // Priority countries AFTER India
    const PRIORITY_COUNTRIES: CountryCode[] = [
        "US",
        "GB", // UK
        "DE", // Germany
        "FR", // France
        "ES", // Spain
        "AU", // Australia
        "SE"  // Sweden
    ];

    function detectPhoneNumber(input: string) {
        const raw = input.replace(/\s+/g, "").trim();

        // If number starts with "0", treat as India (local dialing)
        if (raw.startsWith("0")) {
            const possibleIndian = raw.slice(1); // remove leading 0

            if (/^\d{10}$/.test(possibleIndian)) {
                const number = parsePhoneNumberFromString(`+91${possibleIndian}`);
                if (number?.isValid()) return number;
            }
        }

        if (raw.startsWith("+")) {
            const number = parsePhoneNumberFromString(raw);
            if (number?.isValid()) return number;
        }

        let number = parsePhoneNumberFromString(raw, "US");
        if (number?.isValid()) return number;

        for (const country of PRIORITY_COUNTRIES.slice(1)) {
            number = parsePhoneNumberFromString(raw, { defaultCountry: country });
            if (number?.isValid()) return number;
        }

        return null;
    }

    return { form, handleChange, handleSubmit, errors, isSubmitting };
}