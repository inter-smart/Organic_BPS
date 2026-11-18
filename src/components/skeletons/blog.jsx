import {
  CardRow,
  Bone,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function BlogSkeleton() {
  return (
    <SkeletonPage>
      <SkeletonHero />
      <SkeletonSection>
        <Bone className="aspect-21/9 w-full" />
      </SkeletonSection>
      <SkeletonSection className="bg-basecolor15">
        <div className="mb-10 flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }, (_, i) => (
            <Bone key={i} className="h-10 w-28 shrink-0 rounded-full" />
          ))}
        </div>
        <CardRow count={6} />
      </SkeletonSection>
    </SkeletonPage>
  );
}
