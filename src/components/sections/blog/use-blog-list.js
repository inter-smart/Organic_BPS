"use client";

import { useEffect, useRef, useState } from "react";
import { fetchBlogPage } from "@/lib/blog-api";

const SEARCH_DELAY = 500;

/** Article list for the current topic and search; "more" appends the next page. */
export default function useBlogList({ initial, category, search }) {
  const [list, setList] = useState(initial);
  const [status, setStatus] = useState("idle");
  const loadedKey = useRef("all|");
  const request = useRef(null);

  const filterKey = `${category}|${search}`;

  // aborts the previous request; null when this one was superseded
  async function run(page, busy) {
    request.current?.abort();
    const ctrl = new AbortController();
    request.current = ctrl;
    setStatus(busy);
    const res = await fetchBlogPage({
      category,
      search,
      page,
      signal: ctrl.signal,
    });
    if (ctrl.signal.aborted) return null;
    if (!res) setStatus("error");
    return res;
  }

  // a new topic or search starts again from the first page; typing waits for the pause
  useEffect(() => {
    if (filterKey === loadedKey.current) return;
    const timer = setTimeout(
      async () => {
        const res = await run(1, "loading");
        if (!res) return;
        loadedKey.current = filterKey;
        setList(res);
        setStatus("idle");
      },
      search ? SEARCH_DELAY : 0,
    );
    return () => {
      clearTimeout(timer);
      request.current?.abort();
    };
    // run only reads the same category/search that filterKey already tracks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  async function loadMore() {
    const res = await run(list.page + 1, "more");
    if (!res) return;
    setList((prev) => ({
      ...res,
      articles: [
        ...prev.articles,
        ...res.articles.filter(
          (a) => !prev.articles.some((p) => p.id === a.id),
        ),
      ],
    }));
    setStatus("idle");
  }

  return { list, status, loadMore };
}
