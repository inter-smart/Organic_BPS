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
export function isoDate(value) {
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
  const { data, error } = await apiGet("blogs/filter", {
    params,
    signal,
    cache: false,
  });
  return error ? null : mapPage(data);
}

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Lead line, first half, the author's pull quote, second half, then the boxed questions.
function articleBody(blog) {
  const quote = blog.author_message
    ? `<blockquote><p>${escapeHtml(blog.author_message)}</p><footer>${escapeHtml(
        [blog.author, blog.author_designation].filter(Boolean).join(" · "),
      )}</footer></blockquote>`
    : "";
  return [
    blog.main_title && `<p class="lead">${escapeHtml(blog.main_title)}</p>`,
    blog.content,
    quote,
    blog.content2,
    blog.box_content && `<aside>${blog.box_content}</aside>`,
  ]
    .filter(Boolean)
    .join("\n");
}

// The detail response in the shape the blog-detail sections read.
export function mapDetail(blog, related) {
  const author = {
    name: blog.author,
    role: blog.author_designation,
    bio: blog.about_author,
    imageLarge: { src: blog.author_image, alt: "" },
  };
  return {
    hero: {
      date: isoDate(blog.published_on),
      readTime: parseInt(blog.duration, 10),
      title: blog.title,
      summary: blog.small_description,
      image: { src: blog.detail_page_image, alt: blog.image_alt_text ?? "" },
      badge: blog.category_name,
      caption: blog.author_message,
      topics: [blog.category_name],
      author,
    },
    body: articleBody(blog),
    author,
    related: related.map(mapBlog),
  };
}
