"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const BlogFilterContext = createContext(null);

const subscribeHash = (cb) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const getHash = () => window.location.hash;
const getServerHash = () => "";

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
export function BlogFilterProvider({ children }) {
  const hashTopic = topicFromHash(
    useSyncExternalStore(subscribeHash, getHash, getServerHash),
  );
  const [picked, setPicked] = useState(null);
  const [query, setQuery] = useState("");
  const category = picked ?? hashTopic ?? "all";

  useEffect(() => {
    if (hashTopic) scrollToList();
  }, [hashTopic]);

  const setCategory = useCallback((value) => setPicked(value), []);

  const selectTopic = useCallback((value) => {
    setPicked(value);
    setQuery("");
    requestAnimationFrame(scrollToList);
  }, []);

  const value = useMemo(
    () => ({ category, setCategory, query, setQuery, selectTopic }),
    [category, setCategory, query, selectTopic],
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
