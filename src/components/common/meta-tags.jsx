import { rawMetaTags } from "@/lib/meta-tags";

const REACT_PROPS = { "http-equiv": "httpEquiv", itemprop: "itemProp" };

export default function MetaTags({ html }) {
  return rawMetaTags(html).map((attrs, i) => (
    <meta
      key={i}
      {...Object.fromEntries(
        Object.entries(attrs).map(([k, v]) => [REACT_PROPS[k] ?? k, v]),
      )}
    />
  ));
}
