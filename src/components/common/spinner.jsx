import { cn } from "@/lib/utils";

/** Visual only; the loading text is announced by the status line next to it. */
export default function Spinner({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block size-[32px] animate-spin rounded-full border-[3px] border-basecolor16 border-t-basecolor motion-reduce:animate-none",
        className,
      )}
    />
  );
}
