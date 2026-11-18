import {
  Heading,
  Bone,
  Lines,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function ContactSkeleton() {
  return (
    <SkeletonPage>
      <SkeletonHero />
      <SkeletonSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Heading />
            <Lines count={3} />
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Bone key={i} className="h-12 w-full" />
            ))}
            <Bone className="h-32 w-full" />
            <Bone className="h-12 w-44 rounded-full" />
          </div>
        </div>
      </SkeletonSection>
      <SkeletonSection className="bg-basecolor15">
        <Heading />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Bone key={i} className="h-40 w-full" />
          ))}
        </div>
      </SkeletonSection>
    </SkeletonPage>
  );
}
