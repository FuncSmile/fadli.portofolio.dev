"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Language } from "@/i18n/messages";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Language | null) : null;
    if (stored && (stored === "en" || stored === "id")) {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: string) => messages[lang][key] ?? key
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
