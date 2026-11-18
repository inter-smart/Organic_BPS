import {
  CardRow,
  Heading,
  Bone,
  Lines,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function WhoWeAreSkeleton() {
  return (
    <SkeletonPage>
      <SkeletonHero />
      <SkeletonSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <Heading />
          <Lines count={5} />
        </div>
      </SkeletonSection>
      <SkeletonSection className="bg-basecolor15">
        <Heading />
        <div className="mt-10 flex gap-6 overflow-hidden">
          {Array.from({ length: 4 }, (_, i) => (
            <Bone key={i} className="h-40 w-64 shrink-0" />
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection>
        <Heading />
        <CardRow className="mt-10" />
      </SkeletonSection>
    </SkeletonPage>
  );
}
