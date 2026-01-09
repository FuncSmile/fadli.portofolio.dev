"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
      {["en", "id"].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code as "en" | "id")}
          className={`rounded-full px-2 py-1 transition ${
            lang === code ? "bg-accent text-white shadow-glow" : "hover:text-white"
          }`}
          type="button"
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
