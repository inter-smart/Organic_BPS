"use client";
import { useState } from "react";
import Button from "@/components/common/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputClass =
  "w-full border-b border-[#e4e4e4] bg-transparent pb-3 text-base text-basecolor2 outline-none placeholder:text-[#a8a8a8] placeholder:font-normal focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-transparent lg:pb-[calc(15*var(--u))] 2xl:pb-[15px] 3xl:pb-[20px] text-[14px] 2xl:text-[16px] 3xl:text-[20px] font-normal";

const topics = [
  { value: "purpose", label: "Purpose strategy" },
  { value: "brand", label: "Brand communication" },
  { value: "behaviour", label: "Behaviour design" },
  { value: "sustainability", label: "Sustainability" },
  { value: "other", label: "Something else" },
];

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2 lg:gap-6.25 2xl:gap-8.75">
      <span className="text-sm font-normal text-basecolor2 2xl:text-base 3xl:text-xl">
        {label}
      </span>
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
        <p className="text-2xl font-semibold text-basecolor2 lg:text-title">
          Thank you.
        </p>
        <p className="max-w-80 text-base text-basecolor2 lg:text-body">
          We&rsquo;ve received your enquiry and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 lg:gap-[35px]! 2xl:gap-10 3xl:gap-12.5"
    >
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-10 2xl:gap-x-10 3xl:gap-x-12.5">
        <Field label="Your name *">
          <input
            name="name"
            type="text"
            required
            placeholder="Full name"
            className={inputClass}
          />
        </Field>
        <Field label="Work email *">
          <input
            name="email"
            type="email"
            required
            placeholder="you@organisation.com"
            className={inputClass}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-10 2xl:gap-x-10 3xl:gap-x-12.5">
        <Field label="Organisation">
          <input
            name="organisation"
            type="text"
            placeholder="Organization name"
            className={inputClass}
          />
        </Field>
        <Field label="Phone (optional)">
          <input
            name="phone"
            type="tel"
            placeholder="Include country code"
            className={inputClass}
          />
        </Field>
      </div>
      <div>
        <div className="flex flex-col gap-2 lg:gap-6.25 2xl:gap-8.75">
          <span
            id="topic-label"
            className="text-sm font-normal text-basecolor2 2xl:text-base 3xl:text-xl"
          >
            What would you like to explore?
          </span>
          <Select name="topic">
            <SelectTrigger
              aria-labelledby="topic-label"
              className="pb-3 font-normal text-base lg:pb-[calc(15*var(--u))] lg:text-eyebrow 2xl:text-base 3xl:text-xl [&_svg]:text-black! [&_svg]:opacity-100 lg:[&_svg]:size-6.25"
            >
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
      <div>
        <Field label="Tell us about your challenge *">
          <textarea
            name="message"
            required
            rows={3}
            placeholder="What are you working towards?"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <Button
        type="submit"
        className="self-end lg:!h-[50px] 2xl:!h-[70px] 3xl:!h-[80px] lg:!px-[calc(36*var(--u))]"
      >
        Prepare your enquiry
      </Button>
    </form>
  );
}
