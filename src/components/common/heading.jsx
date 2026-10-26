import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Single source of truth for every heading.
 * Sizes step through base → sm → md → lg → xl. From xl up (xl / 2xl / 3xl / 4xl)
 * the xl size tokens are fluid px clamps (see globals.css), exact at 1920.
 */
const headingVariants = cva("font-bold tracking-[-0.02em] text-balance", {
  variants: {
    size: {
      display: "text-4xl/[1.12] sm:text-5xl/[1.12] md:text-6xl/[1.12] lg:text-display",
      displayMd: "text-3xl/[1.15] sm:text-4xl/[1.15] md:text-5xl/[1.15] lg:text-display-md",
      // 115px footer headline has no scale equivalent in the design
      footer: "text-5xl/[1.12] sm:text-6xl/[1.12] md:text-7xl/[1.12] lg:text-[clamp(48px,calc(115*var(--u)),115px)]/[1.12]",
      title: "text-2xl/[1.4] sm:text-3xl/[1.4] lg:text-title font-semibold tracking-normal",
      card: "text-xl/[1.48] sm:text-2xl/[1.48] lg:text-card font-medium tracking-normal",
    },
  },
  defaultVariants: { size: "display" },
});

export default function Heading({ as: Tag = "h2", size, className, children, ...props }) {
  return (
    <Tag className={cn(headingVariants({ size }), className)} {...props}>
      {children}
    </Tag>
  );
}
