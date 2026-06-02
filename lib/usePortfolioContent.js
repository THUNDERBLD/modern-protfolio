"use client";

import { useEffect, useState } from "react";
import { fallbackContent, normalizeContent } from "./fallbackContent";

export const usePortfolioContent = () => {
  const [content, setContent] = useState(() => normalizeContent(fallbackContent));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load portfolio content");
        }
        const data = await response.json();
        if (active) {
          setContent(normalizeContent(data.content));
        }
      } catch (error) {
        if (active) {
          setContent(normalizeContent(fallbackContent));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      active = false;
    };
  }, []);

  return { content, loading };
};
