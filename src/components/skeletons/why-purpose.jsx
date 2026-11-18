import {
  CardRow,
  Heading,
  Bone,
  Lines,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function WhyPurposeSkeleton() {
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
        <CardRow className="mt-10" />
      </SkeletonSection>
      <SkeletonSection>
        <Bone className="mx-auto aspect-4/3 w-full max-w-3xl" />
      </SkeletonSection>
    </SkeletonPage>
  );
}
