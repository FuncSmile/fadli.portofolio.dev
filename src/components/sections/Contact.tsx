"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { submitContact } from "@/services/contact.service";
import { useState } from "react";
import { Button } from "../ui/Button";

const initialState = { name: "", email: "", message: "" };

export function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await submitContact(form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("contact.tag")}</p>
          <h2 className="font-display text-3xl font-semibold text-white">{t("contact.title")}</h2>
          <p className="mt-4 text-white/70">{t("contact.body")}</p>
          {status === "success" ? <p className="mt-3 text-sm text-neon">{t("contact.success")}</p> : null}
          {status === "error" ? <p className="mt-3 text-sm text-red-400">{error ?? t("contact.error")}</p> : null}
        </div>

        <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6">
          <div>
            <label className="block text-sm text-white/70">{t("contact.name")}</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white focus:border-accent focus:outline-none"
              placeholder={t("contact.placeholder.name")}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70">{t("contact.email")}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white focus:border-accent focus:outline-none"
              placeholder={t("contact.placeholder.email")}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70">{t("contact.message")}</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 h-28 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white focus:border-accent focus:outline-none"
              placeholder={t("contact.placeholder.message")}
            />
          </div>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? t("contact.sending") : t("contact.send")}
          </Button>
        </form>
      </div>
    </section>
  );
}
