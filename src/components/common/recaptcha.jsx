"use client";
import Script from "next/script";

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function whenReady(timeout = 8000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (window.grecaptcha?.ready) return window.grecaptcha.ready(resolve);
      if (Date.now() - start > timeout) return resolve(false);
      setTimeout(tick, 100);
    };
    tick();
  });
}

// Resolves to a token, or null when reCAPTCHA is unavailable.
export async function getRecaptchaToken(action) {
  if (!RECAPTCHA_SITE_KEY) return null;
  if ((await whenReady()) === false) return null;
  try {
    return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch {
    return null;
  }
}

export default function Recaptcha({
  className = "text-xs text-basecolor9 2xl:text-sm",
}) {
  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
      <p className={className}>
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </>
  );
}
