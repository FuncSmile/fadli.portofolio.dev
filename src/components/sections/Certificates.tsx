"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Certificate } from "@/lib/schema";
import Image from "next/image";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

type Props = {
  certificates: Certificate[];
};

export function Certificates({ certificates = [] }: Props) {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl relative z-10">
        <SectionHeader
          tag="Credentials"
          tagNumber="04"
          title="Certificates &"
          highlight="Awards"
          description="Professional certifications demonstrating commitment to continuous learning in web development and networking."
        />

        {certificates.length > 0 ? (
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} selector=".lightbox-trigger" elementClassNames="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, idx) => {
              let yearAssumed = "N/A";
              if (cert.date) {
                const parsedDate = new Date(cert.date);
                if (!isNaN(parsedDate.getTime())) {
                  yearAssumed = parsedDate.getFullYear().toString();
                } else {
                  yearAssumed = cert.date; // Use the raw string if it's not a parsable date (like "2023" or "Agustus 2024")
                }
              }
              return (
                <motion.div
                  key={cert.id || cert.name}
                  className="group relative overflow-hidden rounded-3xl bg-card/40 backdrop-blur-md border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-glow flex flex-col h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  {/* Top Image Section (Edge-to-Edge) */}
                  {cert.image_url ? (
                    <a 
                      href={cert.image_url} 
                      className="relative w-full aspect-[4/3] block lightbox-trigger cursor-zoom-in group/img overflow-hidden z-10"
                    >
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity z-20 flex items-center justify-center">
                          <svg className="w-12 h-12 text-white/90 drop-shadow-md transform scale-50 group-hover/img:scale-100 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                      </div>
                      <Image src={cert.image_url} alt={cert.name} fill className="object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    </a>
                  ) : (
                    <div className="relative w-full aspect-[4/3] bg-white/5 flex flex-col items-center justify-center z-10 border-b border-white/5">
                      <svg className="w-12 h-12 text-white/20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-xs font-mono text-white/30 uppercase tracking-widest">No Image</span>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6 md:p-8 relative z-10 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-neon transition-colors leading-snug line-clamp-2 mb-4">
                      {cert.name}
                    </h3>
                    
                    <div className="mt-auto pt-6 flex flex-wrap gap-4 items-center justify-between border-t border-white/10">
                      <span className="text-sm font-medium text-white/60 line-clamp-1">{cert.issuer}</span>
                      <span className="font-mono text-xs tracking-widest text-neon/80 bg-neon/10 px-3 py-1.5 rounded-lg border border-neon/20 shrink-0">
                        {yearAssumed}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </LightGallery>
        ) : (
          <div className="text-center text-muted-foreground mt-10">
            No certificates added yet.
          </div>
        )}
      </div>
    </section>
  );
}
