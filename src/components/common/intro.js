"use client";

import { useSyncExternalStore } from "react";

export const INTRO_EVENT = "intro:done";

const subscribe = (cb) => {
  window.addEventListener(INTRO_EVENT, cb);
  return () => window.removeEventListener(INTRO_EVENT, cb);
};

/** true once the preloader has finished (always false on the server, so hero reveals wait for the curtain). */
export const useIntroDone = () => useSyncExternalStore(subscribe, () => document.documentElement.dataset.intro === "done", () => false);
