import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import Image from "next/image";

const local_data = {
  items: [
    {
      title: "Item 1",
      media: {
        url: "/images/insight-1.png",
        alt: "Designer working at a desk with two monitors",
      },
    },
    {
      title: "Item 1",
      media: {
        url: "/images/insight-2.png",
        alt: "Designer working at a desk with two monitors",
      },
    },
    {
      title: "Item 1",
    },
    {
      title: "Item 1",
    },
    {
      title: "Item 1",
    },
  ],
};

export default function About({ data = local_data }) {
  return (
    <div>
      <Header data={local_data.header} />
      <h1 className="text-[40px] text-black">About</h1>
      <ul>
        {data?.items.map((item, index) => (
          <li key={index} className="border p-3 rounded-md">
            <div className="text-blue-600 hover:underline">{item.title}</div>
            <div>
              <Image
                src={item.media?.url || "/images/globe-poster.png"}
                alt={
                  item.media?.alt ||
                  "Designer working at a desk with two monitors"
                } title={
                  item.media?.alt ||
                  "Designer working at a desk with two monitors"
                }
                width={100}
                height={100}
              />
            </div>
          </li>
        ))}
      </ul>
      <Footer data={local_data.footer} />
    </div>
  );
}
