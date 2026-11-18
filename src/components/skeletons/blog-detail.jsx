import {
  Lines,
  Bone,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function BlogDetailSkeleton() {
  return (
    <SkeletonPage>
      <SkeletonHero />
      <SkeletonSection>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <Lines count={4} />
          <Bone className="aspect-video w-full" />
          <Lines count={6} />
        </div>
      </SkeletonSection>
    </SkeletonPage>
  );
}
