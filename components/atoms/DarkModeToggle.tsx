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
      className="p-3 rounded-full bg-blue-800 hover:bg-yellow-300"
    >
      {dark ? <Sun className="hover:text-black"/> : <Moon className="text-yellow-50 hover:text-blue-500" />}
    </button>
  );
}
