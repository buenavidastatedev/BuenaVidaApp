"use client";

import { useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setDark(false);
    } else {
      html.classList.add("dark");
      setDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-end items-center px-6 py-3 bg-white">
      <button
        onClick={toggleDarkMode}
        className="material-symbols-outlined text-slate-500 hover:bg-slate-50 p-2 rounded-full transition-all"
      >
        {dark ? "dark_mode" : "light_mode"}
      </button>
    </header>
  );
}
