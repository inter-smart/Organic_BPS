import {
  Heading,
  Bone,
  Lines,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function WhatWeDoSkeleton() {
  return (
    <SkeletonPage>
      <SkeletonHero />
      <div className="border-b border-basecolor11 py-4">
        <div className="container mx-auto flex gap-4 overflow-hidden px-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Bone key={i} className="h-10 w-36 shrink-0 rounded-full" />
          ))}
        </div>
      </div>
      {Array.from({ length: 2 }, (_, i) => (
        <SkeletonSection key={i}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <Heading />
              <Lines count={4} />
            </div>
            <Bone className="aspect-4/3 w-full" />
          </div>
        </SkeletonSection>
      ))}
    </SkeletonPage>
  );
}
