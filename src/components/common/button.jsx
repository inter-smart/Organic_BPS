// import Image from "next/image";
// import Link from "next/link";
// import { cva } from "class-variance-authority";
// import { cn } from "@/lib/utils";

// /*
//  * Pill CTA used across the site. `light` sits on white sections, `dark` on black/photo ones.
//  * Premium hover: a brand-colour fill sweeps in from the left, the label flips colour and the arrow slides.
//  * Padding / type steps through base → sm → lg → xl.
//  */
// const buttonVariants = cva(
//   "group relative isolate inline-flex w-fit items-center justify-center gap-4 overflow-hidden rounded-full border-[2.5px] border-basecolor3 font-medium whitespace-nowrap transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_12px_30px_-12px_rgba(37,82,170,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
//     // soft red glow top-left, blue glow bottom-right (matches the Figma button)
//     "bg-[radial-gradient(60%_90%_at_6%_8%,rgba(218,77,71,0.5),transparent_62%),radial-gradient(70%_100%_at_94%_100%,rgba(37,82,170,0.22),transparent_65%)]",
//   {
//     variants: {
//       variant: {
//         light: "bg-white text-[#171717] hover:text-white",
//         dark: "bg-black/40 text-white",
//       },
//       size: {
//         default:
//           "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg lg:h-21 lg:px-12 lg:text-lead",
//         sm: "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base lg:h-16 lg:px-9 lg:text-lg",
//       },
//     },
//     defaultVariants: { variant: "light", size: "default" },
//   },
// );

// export default function Button({
//   href,
//   children,
//   variant,
//   size,
//   arrow = true,
//   className,
//   ...props
// }) {
//   const classes = cn(buttonVariants({ variant, size }), className);
//   const inner = (
//     <>
//       <span
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 -translate-x-full rounded-full bg-linear-to-r from-basecolor to-basecolor3 transition-transform duration-500 ease-out group-hover:translate-x-0 motion-reduce:transition-none"
//       />
//       <span className="relative">{children}</span>
//       {arrow ? (
//         <span
//           aria-hidden="true"
//           className={cn(
//             "relative aspect-[19/14.35] w-4 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5 lg:w-4.5 motion-reduce:transition-none",
//             variant === "dark" ? "" : "group-hover:invert",
//           )}
//         >
//           <Image
//             src={
//               variant === "dark"
//                 ? "/images/arrow-right-white.svg"
//                 : "/images/arrow-right-dark.svg"
//             }
//             alt=""
//             fill
//             className="object-contain"
//           />
//         </span>
//       ) : null}
//     </>
//   );
//   if (href) {
//     return (
//       <Link href={href} className={classes} {...props}>
//         {inner}
//       </Link>
//     );
//   }
//   return (
//     <button type="button" className={classes} {...props}>
//       {inner}
//     </button>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Soft, localised glow: pink on the left (+ faint top-left), blue along the bottom. Right side stays clean.
// Soft, localised glow: pink hugging the left edge, faint top-left haze, thin blue band along the bottom
const LIGHT_GLOW = [
  // pink, left edge
  "radial-gradient(14% 68% at 0% 50%, rgba(218,77,71,0.30) 0%, rgba(218,77,71,0.22) 40%, rgba(218,77,71,0.08) 75%, transparent 100%)",
  // faint pink haze, top-left
  "radial-gradient(20% 16% at 16% 0%, rgba(218,77,71,0.12) 0%, rgba(218,77,71,0.04) 65%, transparent 100%)",
  // blue band, bottom
  "radial-gradient(40% 20% at 20% 100%, rgba(37,82,170,0.26) 0%, rgba(37,82,170,0.14) 45%, rgba(37,82,170,0.04) 80%, transparent 100%)",
  // thin blue tail, bottom-right
  "radial-gradient(18% 9% at 62% 100%, rgba(37,82,170,0.16) 0%, transparent 100%)",
].join(",");

const buttonVariants = cva(
  "group relative isolate inline-flex w-fit items-center justify-center gap-4 overflow-hidden rounded-full border-[2.5px] font-medium whitespace-nowrap transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_12px_30px_-12px_rgba(37,82,170,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        // default: gradient border + clean white fill (glow is a separate layer below)
        light:
          "border-transparent text-[#171717] hover:text-white " +
          "[background-origin:border-box] [background-clip:padding-box,border-box] " +
          "bg-[image:linear-gradient(#fcfcfc,#fcfcfc),radial-gradient(55%_100%_at_0%_0%,#DA4D47_55%,#2552AA_95%)]",
        dark:
          "border-basecolor3 bg-black/40 text-white " +
          "bg-[radial-gradient(60%_90%_at_6%_8%,rgba(218,77,71,0.5),transparent_62%),radial-gradient(70%_100%_at_94%_100%,rgba(37,82,170,0.22),transparent_65%)]",
      },
      size: {
        default:
          "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg lg:h-21 lg:px-12 lg:text-lead",
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
  const classes = cn(buttonVariants({ variant, size }), className);
  const inner = (
    <>
      {/* glow layer (light variant only), sits under the hover fill */}
      {variant !== "dark" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ backgroundImage: LIGHT_GLOW }}
        />
      ) : null}

      {/* hover fill: rounded pill layer sliding in from the left, 1px oversized so it covers every edge */}
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
            alt=""
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
