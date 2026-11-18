import {
  CardRow,
  Heading,
  Bone,
  Lines,
  SkeletonHero,
  SkeletonPage,
  SkeletonSection,
} from "@/components/common/page-skeleton";

export default function HomeSkeleton() {
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
        <Bone className="mt-10 aspect-video w-full" />
      </SkeletonSection>
      <SkeletonSection>
        <Heading />
        <CardRow className="mt-10" />
      </SkeletonSection>
    </SkeletonPage>
  );
}
