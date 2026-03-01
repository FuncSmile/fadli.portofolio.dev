"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    link: "https://aws.amazon.com/certification/"
  },
  {
    title: "Cisco CCNA",
    issuer: "Cisco",
    year: "2022",
    link: "https://www.cisco.com"
  },
  {
    title: "Google Professional Cloud Architect",
    issuer: "Google Cloud",
    year: "2023",
    link: "https://cloud.google.com/certification"
  },
  {
    title: "Scrum Master Certified",
    issuer: "Scrum Study",
    year: "2021",
    link: "https://www.scrumstudy.com"
  }
];

export function Certificates() {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-32 relative overflow-hidden bg-background">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)/0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)/0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl relative z-10">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase border border-primary/30 px-3 py-1 rounded-full">
              04 / Credentials
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <h2
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Certificates &{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              Awards
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Professional certifications demonstrating commitment to continuous learning in cloud and networking.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert, idx) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card/60 backdrop-blur-md border border-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-primary/20 transition-colors">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="font-mono text-sm tracking-widest text-white/50 bg-black/40 px-3 py-1 rounded-full border border-white/10">{cert.year}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-white/60">{cert.issuer}</p>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <span>View credential</span>
                <span className="text-lg">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
