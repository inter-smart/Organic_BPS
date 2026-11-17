import { apiGet } from "@/lib/api-calls";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

// "13 Nov 2026" -> "2026-11-13"
function isoDate(value) {
  const m = /^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})$/.exec(value ?? "");
  const month = m ? MONTHS.indexOf(m[2].toLowerCase()) + 1 : 0;
  if (!month) return "";
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

// One API blog row in the shape the article card and slider read.
export function mapBlog(blog) {
  return {
    id: blog.id,
    slug: blog.slug,
    href: `/blog/${blog.slug}`,
    category: blog.category_name,
    date: isoDate(blog.published_on),
    readTime: parseInt(blog.duration, 10) || null,
    title: blog.title,
    summary: blog.small_description,
    image: {
      src: blog.image,
      alt: blog.image_alt_text ?? "",
      width: 1104,
      height: 673,
    },
    author: blog.author
      ? {
          name: blog.author,
          role: blog.author_designation,
          image: { src: blog.author_image, alt: "" },
        }
      : null,
  };
}

export function mapPage(paginator) {
  return {
    articles: (paginator?.data ?? []).map(mapBlog),
    page: paginator?.current_page ?? 1,
    lastPage: paginator?.last_page ?? 1,
    total: paginator?.total ?? 0,
  };
}

// One page of the filter endpoint; null when the request fails.
export async function fetchBlogPage({ category, search, page, signal }) {
  const params = {};
  if (category) params.category = category;
  if (search) params.search = search;
  if (page > 1) params.page = page;
  const { data, error } = await apiGet("blogs/filter", { params, signal });
  return error ? null : mapPage(data);
}
