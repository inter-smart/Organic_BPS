"use client";

import { useState } from "react";
import Image from "next/image";

const pill =
  "flex items-center gap-2 rounded-full border border-basecolor16 px-3.5 py-2.5 text-xs font-semibold text-basecolor7 transition-colors duration-300 hover:border-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none lg:px-[calc(14*var(--u))] lg:py-[calc(10*var(--u))] lg:text-[clamp(12px,calc(13*var(--u)),13px)]";

/** Share row: opens LinkedIn's share dialog or copies the page address. */
export default function Share() {
  const [copied, setCopied] = useState(false);

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=640,height=640");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy link", window.location.href);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 lg:gap-[calc(10*var(--u))]">
      <p className="text-xs font-bold tracking-[0.12em] text-basecolor9 uppercase lg:text-[clamp(11px,calc(13*var(--u)),13px)]">
        Share
      </p>
      <span
        aria-hidden="true"
        className="h-px w-9 bg-basecolor16 lg:w-[calc(36*var(--u))]"
      />
      <button type="button" onClick={shareLinkedIn} className={pill}>
        <Image
          src="/images/blog/linkedin.svg"
          alt=""
          width={15}
          height={15}
          className="size-[15px]"
        />
        LinkedIn
      </button>
      <button type="button" onClick={copyLink} className={pill}>
        <Image
          src="/images/blog/link.svg"
          alt=""
          width={15}
          height={15}
          className="size-[15px]"
        />
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
