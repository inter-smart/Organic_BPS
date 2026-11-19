"use client";
import { useState } from "react";
import Button from "@/components/common/button";
import Recaptcha, {
  RECAPTCHA_SITE_KEY,
  getRecaptchaToken,
} from "@/components/common/recaptcha";
import { apiPost } from "@/lib/api-calls";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputClass =
  "w-full border-b border-[#e4e4e4] bg-transparent pb-3 text-base text-basecolor2 outline-none placeholder:text-[#a8a8a8] placeholder:font-normal focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-transparent lg:pb-[calc(15*var(--u))] 2xl:pb-[15px] 3xl:pb-[20px] text-[14px] 2xl:text-[16px] 3xl:text-[20px] font-normal";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 text-sm text-basecolor14 2xl:text-base"
    >
      {message}
    </p>
  );
}

function Field({ label, name, error, children }) {
  return (
    <div>
      <label className="flex flex-col gap-2 lg:gap-6.25 2xl:gap-8.75">
        <span className="text-sm font-normal text-basecolor2 2xl:text-base 3xl:text-xl">
          {label}
        </span>
        {children}
      </label>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

function aria(name, errors) {
  return errors[name]
    ? { "aria-invalid": true, "aria-describedby": `${name}-error` }
    : {};
}

export default function ContactForm({ topics }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    const result = contactSchema.shape[name].safeParse(value);
    setErrors((prev) => {
      const next = { ...prev };
      if (result.success) delete next[name];
      else next[name] = result.error.issues[0].message;
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: form.get("name") ?? "",
      email: form.get("email") ?? "",
      phone_number: form.get("phone") ?? "",
      explore_together: form.get("topic") ?? "",
      organization: form.get("organisation") ?? "",
      message: form.get("message") ?? "",
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setError("");
      const first = Object.keys(found)[0];
      formEl.querySelector(`[data-field="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    setError("");
    try {
      const token = await getRecaptchaToken("contact");
      if (RECAPTCHA_SITE_KEY && !token) {
        setError("We couldn't verify you are human. Please try again.");
        return;
      }
      if (token) payload["g-recaptcha-response"] = token;

      const body = Object.fromEntries(
        Object.entries({
          ...parsed.data,
          "g-recaptcha-response": payload["g-recaptcha-response"],
        }).filter(([, value]) => value),
      );
      const { error: apiError } = await apiPost("contact-enquiry", body);
      if (!apiError) {
        setSubmitted(true);
        return;
      }
      if (apiError.errors && typeof apiError.errors === "object") {
        const mapped = {};
        for (const [key, value] of Object.entries(apiError.errors)) {
          mapped[key] = Array.isArray(value) ? value[0] : String(value);
        }
        setErrors(mapped);
      }
      setError(apiError.message || "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 lg:gap-[35px]! 2xl:gap-10 3xl:gap-12.5"
    >
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-10 2xl:gap-x-10 3xl:gap-x-12.5">
        <Field label="Your name *" name="name" error={errors.name}>
          <input
            name="name"
            data-field="name"
            maxLength={100}
            autoComplete="name"
            onChange={(e) => validateField("name", e.target.value)}
            {...aria("name", errors)}
            type="text"
            placeholder="Full name"
            className={inputClass}
          />
        </Field>
        <Field label="Work email *" name="email" error={errors.email}>
          <input
            name="email"
            data-field="email"
            maxLength={254}
            autoComplete="email"
            onChange={(e) => validateField("email", e.target.value)}
            {...aria("email", errors)}
            type="email"
            placeholder="you@organisation.com"
            className={inputClass}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-10 2xl:gap-x-10 3xl:gap-x-12.5">
        <Field
          label="Organisation"
          name="organization"
          error={errors.organization}
        >
          <input
            name="organisation"
            data-field="organization"
            maxLength={150}
            autoComplete="organization"
            onChange={(e) => validateField("organization", e.target.value)}
            {...aria("organization", errors)}
            type="text"
            placeholder="Organization name"
            className={inputClass}
          />
        </Field>
        <Field
          label="Phone (optional)"
          name="phone_number"
          error={errors.phone_number}
        >
          <input
            name="phone"
            data-field="phone_number"
            maxLength={20}
            autoComplete="tel"
            inputMode="tel"
            onChange={(e) => validateField("phone_number", e.target.value)}
            {...aria("phone_number", errors)}
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
          <Select
            name="topic"
            onValueChange={(v) => validateField("explore_together", v)}
          >
            <SelectTrigger
              data-field="explore_together"
              aria-labelledby="topic-label"
              {...aria("explore_together", errors)}
              className="pb-3 font-normal text-base lg:pb-[calc(15*var(--u))] lg:text-eyebrow 2xl:text-base 3xl:text-xl [&_svg]:text-black! [&_svg]:opacity-100 lg:[&_svg]:size-6.25"
            >
              <SelectValue placeholder="Let's explore together" />
            </SelectTrigger>
            <SelectContent>
              {topics?.map((t) => (
                <SelectItem key={t.id} value={t.title}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FieldError
          id="explore_together-error"
          message={errors.explore_together}
        />
      </div>
      <div>
        <Field
          label="Tell us about your challenge *"
          name="message"
          error={errors.message}
        >
          <textarea
            name="message"
            data-field="message"
            maxLength={2000}
            onChange={(e) => validateField("message", e.target.value)}
            {...aria("message", errors)}
            rows={3}
            placeholder="What are you working towards?"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      {error ? (
        <p role="alert" className="text-sm text-basecolor14 lg:text-eyebrow">
          {error}
        </p>
      ) : null}

      <Recaptcha />

      <Button
        type="submit"
        disabled={submitting}
        className="self-end disabled:opacity-60 lg:!h-[50px] 2xl:!h-[70px] 3xl:!h-[80px] lg:!px-[calc(36*var(--u))]"
      >
        {submitting ? "Sending…" : "Prepare your enquiry"}
      </Button>
    </form>
  );
}
