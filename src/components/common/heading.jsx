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
      display: "text-4xl/[1.12] sm:text-5xl/[1.12] md:text-6xl/[1.12] lg:text-7xl/[1.12] xl:text-display",
      displayMd: "text-3xl/[1.15] sm:text-4xl/[1.15] md:text-5xl/[1.15] lg:text-6xl/[1.15] xl:text-display-md",
      // 115px footer headline has no scale equivalent in the design
      footer: "text-5xl/[1.12] sm:text-6xl/[1.12] md:text-7xl/[1.12] xl:text-[clamp(72px,6vw,115px)]/[1.12]",
      title: "text-2xl/[1.4] sm:text-3xl/[1.4] xl:text-title font-semibold tracking-normal",
      card: "text-xl/[1.48] sm:text-2xl/[1.48] xl:text-card font-medium tracking-normal",
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
