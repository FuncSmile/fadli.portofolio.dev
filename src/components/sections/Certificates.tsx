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
import { Award, Search } from "lucide-react";

type Props = {
  certificates: Certificate[];
};

export function Certificates({ certificates = [] }: Props) {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
        <SectionHeader
          tag="Credentials"
          title="Recognition &"
          highlight="Awards"
          description="Validation of my expertise through professional certifications and continuous learning."
        />

        {certificates.length > 0 ? (
          <LightGallery 
            speed={500} 
            plugins={[lgThumbnail, lgZoom]} 
            selector=".lightbox-trigger" 
            elementClassNames="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {certificates.map((cert, idx) => {
              let yearAssumed = "N/A";
              if (cert.date) {
                const parsedDate = new Date(cert.date);
                if (!isNaN(parsedDate.getTime())) {
                  yearAssumed = parsedDate.getFullYear().toString();
                } else {
                  yearAssumed = cert.date;
                }
              }
              return (
                <motion.div
                  key={cert.id || cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {cert.image_url ? (
                      <a 
                        href={cert.image_url} 
                        className="lightbox-trigger block w-full h-full cursor-zoom-in"
                      >
                        <Image 
                          src={cert.image_url} 
                          alt={cert.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform">
                            <Search className="w-6 h-6" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center">
                        <Award className="w-12 h-12 text-white/10 mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-white/30">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-white group-hover:text-accent transition-colors leading-tight mb-4 line-clamp-2">
                      {cert.name}
                    </h3>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{cert.issuer}</span>
                      <span className="px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-[10px] font-mono font-bold text-accent">
                        {yearAssumed}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </LightGallery>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl">
            <p className="text-muted-foreground">No certificates added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
