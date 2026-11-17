"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/common/heading";
import Recaptcha, {
  RECAPTCHA_SITE_KEY,
  getRecaptchaToken,
} from "@/components/common/recaptcha";
import Reveal from "@/components/common/reveal";
import { apiPost } from "@/lib/api-calls";
import { fieldErrors } from "@/lib/contact-schema";
import { newsletter } from "@/lib/blog-data";
import { newsletterSchema } from "@/lib/newsletter-schema";

const errors = {
  captcha: "We couldn’t verify you are human. Please try again.",
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please try again.",
};

// field error first, then the API message, then the generic fallback
function apiMessage(apiError, fallback) {
  const field = apiError.errors?.email;
  return (
    (Array.isArray(field) ? field[0] : field) || apiError.message || fallback
  );
}

// the note carries the privacy link label; split it so the label can be a link
function splitNote(note = "", label) {
  return label ? note.split(label) : [note];
}

export default function Newsletter({ data }) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const payload = { email: new FormData(e.currentTarget).get("email") ?? "" };
    const parsed = newsletterSchema.safeParse(payload);
    if (!parsed.success) {
      setError(fieldErrors(parsed.error).email);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const token = await getRecaptchaToken("newsletter");
      if (RECAPTCHA_SITE_KEY && !token) {
        setError(errors.captcha);
        return;
      }
      const body = { email: parsed.data.email };
      if (token) body["g-recaptcha-response"] = token;

      const { error: apiError } = await apiPost("email-subscription", body);
      if (!apiError) {
        setDone(true);
        return;
      }
      setError(apiMessage(apiError, errors.generic));
    } catch {
      setError(errors.network);
    } finally {
      setSubmitting(false);
    }
  }

  const [before, after] = splitNote(data?.note, newsletter.privacy.label);

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="bg-basecolor14 py-16 text-white sm:py-20 lg:py-[calc(63*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1160fr_560fr] lg:items-center lg:gap-0">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="newsletter-title"
              size="displayMd"
              className="text-white lg:max-w-[686px] lg:text-wrap lg:text-[clamp(32px,calc(62*var(--u)),62px)]/[1.03] lg:tracking-[-0.02em] lg:text-[40px]! 2xl:text-[50px]! 3xl:text-[62px]!"
            >
              {data?.title}
            </Heading>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="lg:max-w-[520px]">
            <p className="text-sm 2xl:text-base 3xl:text-lg">{data?.text}</p>
            {done ? (
              <p
                role="status"
                className="mt-6 text-lg font-semibold lg:mt-[calc(22*var(--u))]"
              >
                {newsletter.form.done}
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-6 flex items-center gap-2 rounded-full bg-white p-2 pl-5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white lg:mt-[calc(22*var(--u))] lg:pl-[calc(22*var(--u))]"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  {newsletter.form.label}
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  placeholder={newsletter.form.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-base text-basecolor7 outline-none placeholder:text-basecolor9 lg:text-[clamp(14px,calc(18*var(--u)),18px)]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex shrink-0 items-center gap-2.5 rounded-full bg-basecolor7 px-5 py-3 text-xs font-semibold text-white transition-colors duration-300 hover:bg-basecolor2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 disabled:opacity-70 motion-reduce:transition-none lg:px-[calc(20*var(--u))] lg:py-[calc(13*var(--u))] lg:text-[clamp(12px,calc(13*var(--u)),13px)]"
                >
                  {newsletter.form.submit}
                  <Image
                    src="/images/blog/subscribe-arrow.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="size-[15px]"
                  />
                </button>
              </form>
            )}
            {error ? (
              <p
                id="newsletter-error"
                role="alert"
                className="mt-3 text-sm font-semibold"
              >
                {error}
              </p>
            ) : null}
            <Recaptcha className="mt-4 text-xs text-white opacity-70 2xl:text-sm" />
            <p className="mt-5 text-sm/[1.4] text-white lg:mt-[calc(22*var(--u))] lg:text-[clamp(13px,calc(18*var(--u)),18px)] 3xl:text-lg opacity-70">
              {before}
              {after !== undefined ? (
                <Link
                  href={newsletter.privacy.href}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {newsletter.privacy.label}
                </Link>
              ) : null}
              {after}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
