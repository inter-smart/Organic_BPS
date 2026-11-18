import {
  Bone,
  Lines,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function PolicySkeleton() {
  return (
    <SkeletonPage>
      <SkeletonHero />
      <SkeletonSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Bone className="hidden h-96 w-full lg:block" />
          <div className="flex flex-col gap-10">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Bone className="h-6 w-1/3" />
                <Lines count={4} />
              </div>
            ))}
          </div>
        </div>
      </SkeletonSection>
    </SkeletonPage>
  );
}
