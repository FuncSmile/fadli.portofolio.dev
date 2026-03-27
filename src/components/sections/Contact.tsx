"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { submitContact } from "@/services/contact.service";
import { useState } from "react";
import { Button } from "../ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Header */}
          <div className="lg:pr-10">
            <SectionHeader
              tag="Contact Me"
              tagNumber="06"
              title="Let's"
              highlight="Talk"
              description={t("contact.body")}
              align="left"
            />

            <div className="space-y-4">
              {/* Added contact info as aesthetic blocks */}
              <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:user.fadli3001@gmail.com" className="text-lg">user.fadli3001@gmail.com</a>
              </div>
            </div>

            {status === "success" && (
              <div className="mt-8 p-4 rounded-xl bg-neon/10 border border-neon/20 text-neon flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>{t("contact.success")}</p>
              </div>
            )}

            {status === "error" && (
              <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{error ?? t("contact.error")}</p>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <form onSubmit={handleSubmit} className="relative bg-card/40 backdrop-blur-xl border border-white/5 hover:border-white/10 rounded-3xl p-8 space-y-6 transition-all shadow-2xl">

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/70 tracking-wide uppercase">{t("contact.name")}</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all placeholder:text-white/20 hover:border-white/20 focus:border-accent focus:bg-black/60 focus:ring-1 focus:ring-accent focus:outline-none"
                  placeholder={t("contact.placeholder.name")}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/70 tracking-wide uppercase">{t("contact.email")}</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all placeholder:text-white/20 hover:border-white/20 focus:border-accent focus:bg-black/60 focus:ring-1 focus:ring-accent focus:outline-none"
                  placeholder={t("contact.placeholder.email")}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/70 tracking-wide uppercase">{t("contact.message")}</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full h-32 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all placeholder:text-white/20 hover:border-white/20 focus:border-accent focus:bg-black/60 focus:ring-1 focus:ring-accent focus:outline-none resize-none"
                  placeholder={t("contact.placeholder.message")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300
                  ${status === "loading"
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.5)] active:scale-[0.98]"
                  }
                `}
              >
                {status === "loading" ? t("contact.sending") : t("contact.send")}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
