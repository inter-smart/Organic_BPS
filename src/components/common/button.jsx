import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const GLOW_CONIC =
  "conic-gradient(from 112deg at 35% 35%, rgba(37,82,170,0) 0%, #2552AA 5%, #2552AA 26%, #DA4D47 41%, #DA4D47 70%, rgba(218,77,71,0) 80%, rgba(37,82,170,0) 100%)";

const buttonVariants = cva(
  "group relative isolate inline-flex w-fit items-center cursor-pointer justify-center gap-4 overflow-hidden rounded-full border-[2.5px] font-medium whitespace-nowrap transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_12px_30px_-12px_rgba(37,82,170,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        light:
          "border-transparent text-[#171717] hover:text-white " +
          "[background-origin:border-box] [background-clip:padding-box,border-box] " +
          "bg-[image:linear-gradient(#fcfcfc,#fcfcfc),radial-gradient(55%_100%_at_0%_0%,#DA4D47_55%,#2552AA_95%)]",
        dark:
          "border-transparent text-white " +
          "[background-origin:border-box] [background-clip:padding-box,border-box] " +
          "bg-[image:linear-gradient(#000,#000),radial-gradient(55%_100%_at_0%_0%,#DA4D47_55%,#2552AA_95%)]",
      },
      size: {
        default:
          "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg lg:h-[calc(84*var(--u))]! lg:px-[calc(48*var(--u))]! lg:text-[clamp(14px,calc(20*var(--u)),20px)]! w-fit",
        sm: "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base lg:h-16 lg:px-9 lg:text-lg",
      },
    },
    defaultVariants: { variant: "light", size: "default" },
  },
);

export default function Button({
  href,
  children,
  variant,
  size,
  arrow = true,
  icon,
  className,
  ...props
}) {
  if (!href && !props.onClick && !props.type) return null;
  const classes = cn(buttonVariants({ variant, size }), className);
  const inner = (
    <>
      {variant !== "dark" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-0.5 -z-20"
        >
          <span
            className="absolute -inset-[0.4em] opacity-[0.32] blur-[0.3em]"
            style={{ backgroundImage: GLOW_CONIC }}
          />
          <span className="absolute -right-[8%] bottom-[9%] left-[8%] top-[8%] rounded-full bg-[#fcfcfc] blur-[0.36em]" />
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className="absolute -inset-px -z-10 -translate-x-[102%] rounded-full bg-linear-to-r from-basecolor to-basecolor3 transition-transform duration-500 ease-out group-hover:translate-x-0 motion-reduce:transition-none"
      />
      {icon ? <span className="relative shrink-0">{icon}</span> : null}
      <span className="relative">{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className={cn(
            "relative aspect-[19/14.35] w-4 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5 lg:w-4.5 motion-reduce:transition-none",
            variant === "dark" ? "" : "group-hover:invert",
          )}
        >
          <Image
            src={
              variant === "dark"
                ? "/images/arrow-right-white.svg"
                : "/images/arrow-right-dark.svg"
            }
            alt="Arrow right"
            title="Arrow right"
            fill
            className="object-contain"
          />
        </span>
      ) : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {inner}
    </button>
  );
}
