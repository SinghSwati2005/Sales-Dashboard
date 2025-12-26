"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
