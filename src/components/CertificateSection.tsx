import { getCertificates } from "@/app/actions";
import CertificateCard from "./CertificateCard";
import type { Certificate } from "@/lib/schema";

export default async function CertificateSection() {
    const rawCertificates = await getCertificates();
    const certificates = rawCertificates as unknown as Certificate[];

    return (
        <section id="certificates" className="py-24 relative overflow-hidden">
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 flex flex-col items-center">

                    {/* Gradient Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 pb-2">
                        Certifications
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A log of my continuous learning journey and professional recognitions.
                    </p>
                </div>

                {certificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {certificates.map((cert, index) => (
                            <CertificateCard key={cert.id} certificate={cert} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border rounded-2xl bg-background/50">
                        <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
                        <p className="text-muted-foreground">
                            Certificates will appear here once added.
                        </p>
                    </div>
                )}
            </div>

            {/* Subtle background flair */}
            <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </section>
    );
}
