"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const BlogFilterContext = createContext(null);

/** Shared topic + search state so the banner topics and the listing filters drive the same list. */
export function BlogFilterProvider({ children }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const selectTopic = useCallback((value) => {
    setCategory(value);
    setQuery("");
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("latest-thinking")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }, []);

  const value = useMemo(() => ({ category, setCategory, query, setQuery, selectTopic }), [category, query, selectTopic]);
  return <BlogFilterContext.Provider value={value}>{children}</BlogFilterContext.Provider>;
}

export function useBlogFilter() {
  return useContext(BlogFilterContext);
}
