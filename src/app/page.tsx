import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Certificates } from "@/components/sections/Certificates";
import ExperienceSection from "@/components/ExperienceSection";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { getProjects } from "@/services/project.service";
import ProjectSection from "@/components/ProjectSection";
import CertificateSection from "@/components/CertificateSection";

export default async function HomePage() {
  const { featured, github } = await getProjects();

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <ProjectSection />

      <CertificateSection />
      <ExperienceSection />
      <Contact />
      <Footer />
    </div>
  );
}
