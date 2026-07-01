"use client";

import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options?: { meta?: boolean; ctrl?: boolean; shift?: boolean }
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const metaOrCtrl = options?.meta || options?.ctrl;
      if (metaOrCtrl && !(e.metaKey || e.ctrlKey)) return;
      if (options?.shift && !e.shiftKey) return;
      if (e.key !== key) return;

      e.preventDefault();
      callback();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, options?.meta, options?.ctrl, options?.shift]);
}
