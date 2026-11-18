import { cn } from "@/lib/utils";

export function Bone({ dark = false, className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton rounded-md",
        dark ? "bg-white/10" : "bg-basecolor11",
        className,
      )}
    />
  );
}

export function Lines({ count = 3, dark = false, className }) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col gap-3", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Bone
          key={i}
          dark={dark}
          className={cn("h-4", i === count - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <section className="bg-basecolor4 py-16 sm:py-20 lg:py-[calc(100*var(--u))]">
      <div className="container mx-auto flex min-h-[70svh] flex-col justify-end gap-6 px-4">
        <Bone dark className="h-4 w-40" />
        <Bone dark className="h-12 w-full max-w-2xl sm:h-16" />
        <Bone dark className="h-12 w-2/3 max-w-xl sm:h-16" />
        <Lines dark count={2} className="max-w-xl" />
        <Bone dark className="h-12 w-44 rounded-full" />
      </div>
    </section>
  );
}

export function SkeletonSection({ children, className }) {
  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-[calc(100*var(--u))]", className)}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export function SkeletonPage({ children }) {
  return (
    <main role="status" aria-label="Loading" className="bg-white">
      {children}
    </main>
  );
}

export function CardRow({ count = 3, className }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Bone className="aspect-4/3 w-full" />
          <Bone className="h-6 w-3/4" />
          <Lines count={2} />
        </div>
      ))}
    </div>
  );
}

export function Heading() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3">
      <Bone className="h-4 w-32" />
      <Bone className="h-10 w-full max-w-xl" />
      <Bone className="h-10 w-2/3 max-w-md" />
    </div>
  );
}
