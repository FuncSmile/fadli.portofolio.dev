"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award } from "lucide-react";
import type { Certificate } from "@/lib/schema";

export default function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group relative h-full"
        >
            {/* Glow effect background */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition duration-500 ease-in-out" />

            <Card className="relative h-full flex flex-col bg-background/80 backdrop-blur-md border-white/10 dark:border-white/5 overflow-hidden rounded-2xl group-hover:border-primary/50 transition-colors">
                <div className="relative w-full h-48 bg-muted/50 overflow-hidden">
                    <Image
                        src={certificate.image_url}
                        alt={certificate.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                </div>
                <CardContent className="flex-grow p-6 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                        {certificate.name}
                    </h3>

                    <div className="space-y-3 mt-auto text-sm text-muted-foreground w-full">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-primary/10">
                                <Award className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground/80 line-clamp-1">{certificate.issuer}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-secondary/10">
                                <Calendar className="w-4 h-4 text-secondary-foreground" />
                            </div>
                            <span>{certificate.date}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
