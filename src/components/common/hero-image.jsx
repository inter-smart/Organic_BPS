import { getImageProps } from "next/image";

export default function HeroImage({
  src,
  mobileSrc,
  alt = "",
  priority = true,
  className,
}) {
  const common = { alt, title: alt, fill: true, priority, sizes: "100vw" };
  const { props } = getImageProps({ ...common, src });
  if (!mobileSrc) {
    return <img {...props} alt={alt} className={className} />;
  }
  const { props: mobile } = getImageProps({ ...common, src: mobileSrc });
  return (
    <picture>
      <source media="(max-width: 959px)" srcSet={mobile.srcSet} />
      <img {...props} alt={alt} className={className} />
    </picture>
  );
}
