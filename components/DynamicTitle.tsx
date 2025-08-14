"use client";

import { useEffect } from "react";

export default function DynamicTitle() {
  useEffect(() => {
    const originalTitle = "Checkmate";
    const awayTitle = "Come back!";

    const updateTitle = () => {
      document.title = document.hidden ? awayTitle : originalTitle;
    };

    document.addEventListener("visibilitychange", updateTitle);
    window.addEventListener("blur", () => (document.title = awayTitle));
    window.addEventListener("focus", () => (document.title = originalTitle));

    return () => {
      document.removeEventListener("visibilitychange", updateTitle);
      window.removeEventListener("blur", () => (document.title = awayTitle));
      window.removeEventListener("focus", () => (document.title = originalTitle));
    };
  }, []);

  return null;
}
