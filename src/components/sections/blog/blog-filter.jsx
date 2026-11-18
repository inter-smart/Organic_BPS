"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

const BlogFilterContext = createContext(null);

const subscribeHash = (cb) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const getHash = () => window.location.hash;
const getServerHash = () => "";

const URL_EVENT = "blog-filter-url";

const subscribeSearch = (cb) => {
  window.addEventListener("popstate", cb);
  window.addEventListener(URL_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(URL_EVENT, cb);
  };
};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

/** Keeps the topic and search in the address bar as ?category=…&search=… */
const writeUrl = (next, mode) => {
  const params = new URLSearchParams(window.location.search);
  if ("category" in next) {
    if (next.category && next.category !== "all") {
      params.set("category", next.category);
    } else {
      params.delete("category");
    }
  }
  if ("search" in next) {
    if (next.search) params.set("search", next.search);
    else params.delete("search");
  }
  const qs = params.toString();
  const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
  window.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
  window.dispatchEvent(new Event(URL_EVENT));
};

/** Links from other pages use /blog#topic=Culture to open the list on one topic. */
const topicFromHash = (hash) => {
  const m = /^#topic=(.+)$/.exec(hash);
  return m ? decodeURIComponent(m[1]) : null;
};

const scrollToList = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("latest-thinking")
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

/** Shared topic + search state so the banner topics and the listing filters drive the same list. */
export function BlogFilterProvider({ categories = [], children }) {
  const hashLabel = topicFromHash(
    useSyncExternalStore(subscribeHash, getHash, getServerHash),
  )?.toLowerCase();
  const search = useSyncExternalStore(
    subscribeSearch,
    getSearch,
    getServerSearch,
  );
  const params = new URLSearchParams(search);
  // the hash carries the topic name; an unknown one falls back to All
  const hashTopic = hashLabel
    ? (categories.find(
        (c) => c.name.toLowerCase() === hashLabel || c.slug === hashLabel,
      )?.slug ?? null)
    : null;
  const paramTopic = categories.find(
    (c) => c.slug === params.get("category"),
  )?.slug;
  const category = paramTopic ?? hashTopic ?? "all";
  const query = params.get("search") ?? "";

  useEffect(() => {
    if (hashTopic) scrollToList();
  }, [hashTopic]);

  // arriving from an article's topic link (/blog?category=…) opens on the list
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("category")) {
      requestAnimationFrame(scrollToList);
    }
  }, []);

  const setCategory = useCallback(
    (value) => writeUrl({ category: value }, "push"),
    [],
  );

  const setQuery = useCallback(
    (value) => writeUrl({ search: value }, "replace"),
    [],
  );

  const selectTopic = useCallback((value) => {
    writeUrl({ category: value, search: "" }, "push");
    requestAnimationFrame(scrollToList);
  }, []);

  const value = useMemo(
    () => ({ category, setCategory, query, setQuery, selectTopic }),
    [category, setCategory, query, setQuery, selectTopic],
  );
  return (
    <BlogFilterContext.Provider value={value}>
      {children}
    </BlogFilterContext.Provider>
  );
}

export function useBlogFilter() {
  return useContext(BlogFilterContext);
}
