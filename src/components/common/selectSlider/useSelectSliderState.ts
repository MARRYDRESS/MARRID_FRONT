"use client";

import { useMemo, useState } from "react";
import type { SelectMockItem } from "@/src/mock/mock";

export function useSelectSliderState<T extends SelectMockItem>(
  items: T[],
  visibleCount: number,
) {

  if (!Number.isInteger(visibleCount) || visibleCount <= 0) {
     throw new Error("visibleCount must be a positive integer");
      }

  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const pages = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(items.length / visibleCount);

    return Array.from({ length: pageCount }, (_, pageIndex) => {
      const start = pageIndex * visibleCount;
      return Array.from({ length: visibleCount }, (_, offset) => {
        const index = (start + offset) % items.length;
        return items[index];
      });
    });
  }, [items, visibleCount]);

  const loopedPages = useMemo(() => {
    if (pages.length === 0) {
      return [];
    }
    if (pages.length === 1) {
      return [pages[0], pages[0], pages[0]];
    }
    return [pages[pages.length - 1], ...pages, pages[0]];
  }, [pages]);

  const handlePrev = () => {
    if (pages.length === 0 || isAnimating) {
      return;
    }
    setIsTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pages.length === 0 || isAnimating) {
      return;
    }
    setIsTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((prev) => prev + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (pages.length === 0) {
      setIsAnimating(false);
      return;
    }

    if (pages.length === 1) {
      setIsTransitionEnabled(false);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
      setIsAnimating(false);
      return;
    }

    if (trackIndex === 0) {
      setIsTransitionEnabled(false);
      setTrackIndex(pages.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
      setIsAnimating(false);
      return;
    }

    if (trackIndex === pages.length + 1) {
      setIsTransitionEnabled(false);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false);
  };

  const activeDotIndex = useMemo(() => {
    const n = pages.length;
    if (n <= 1) {
      return 0;
    }
    if (trackIndex === 0) {
      return n - 1;
    }
    if (trackIndex === n + 1) {
      return 0;
    }
    return trackIndex - 1;
  }, [pages.length, trackIndex]);

  return {
    pages,
    loopedPages,
    trackIndex,
    isAnimating,
    isTransitionEnabled,
    handlePrev,
    handleNext,
    handleTrackTransitionEnd,
    activeDotIndex,
  };
}
