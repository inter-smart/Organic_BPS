"use client";

import { useState } from "react";
import Button from "@/components/common/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const inputClass = "w-full bg-transparent text-lg text-basecolor2 outline-none placeholder:text-[#757575] focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-basecolor3 lg:text-xl";

const topics = [
  { value: "purpose", label: "Purpose strategy" },
  { value: "brand", label: "Brand communication" },
  { value: "behaviour", label: "Behaviour design" },
  { value: "sustainability", label: "Sustainability" },
  { value: "other", label: "Something else" },
];

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-basecolor2 lg:text-lead">{label}</span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center gap-3 text-center">
        <p className="text-2xl font-semibold text-basecolor2 lg:text-title">Thank you.</p>
        <p className="max-w-80 text-base text-basecolor2 lg:text-body">We&rsquo;ve received your enquiry and will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:gap-[calc(42*var(--u))]">
      <div className="grid gap-6 border-b border-[#ddd] pb-6 sm:grid-cols-2 sm:gap-x-10 lg:pb-[calc(30*var(--u))]">
        <Field label="Your name *">
          <input name="name" type="text" required placeholder="Full name" className={inputClass} />
        </Field>
        <Field label="Work email *">
          <input name="email" type="email" required placeholder="you@organisation.com" className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-6 border-b border-[#ddd] pb-6 sm:grid-cols-2 sm:gap-x-10 lg:pb-[calc(30*var(--u))]">
        <Field label="Organisation">
          <input name="organisation" type="text" placeholder="Organization name" className={inputClass} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="Include country code" className={inputClass} />
        </Field>
      </div>

      <div className="border-b border-[#ddd] pb-6 lg:pb-[calc(30*var(--u))]">
        <div className="flex flex-col gap-2">
          <span id="topic-label" className="text-sm font-medium text-basecolor2 lg:text-lead">What would you like to explore?</span>
          <Select name="topic">
            <SelectTrigger aria-labelledby="topic-label" className="border-b-0 pb-0 text-lg lg:text-xl">
              <SelectValue placeholder="Let's explore together" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-b border-[#ddd] pb-6 lg:pb-[calc(30*var(--u))]">
        <Field label="Tell us about your challenge *">
          <textarea name="message" required rows={3} placeholder="What are you working towards?" className={`${inputClass} resize-none`} />
        </Field>
      </div>

      <Button type="submit" className="self-end">
        Prepare your enquiry
      </Button>
    </form>
  );
}
