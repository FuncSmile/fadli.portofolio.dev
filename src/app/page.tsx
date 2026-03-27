import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Certificates } from "@/components/sections/Certificates";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { getProjects as getDbProjects, getExperiences, getCertificates } from "@/app/actions";
import { fetchGithubRepos } from "@/lib/github";
import type { Project, Experience as ExperienceType, Certificate } from "@/lib/schema";

export default async function HomePage() {
  const [rawProjects, rawExperiences, rawCertificates] = await Promise.all([
    getDbProjects(),
    getExperiences(),
    getCertificates()
  ]);
  
  const dbProjects = rawProjects as unknown as Project[];
  const experiences = rawExperiences as unknown as ExperienceType[];
  const certificates = rawCertificates as unknown as Certificate[];
  const githubRepos = await fetchGithubRepos().catch(() => []);

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects featured={dbProjects} github={githubRepos} />
      <Certificates certificates={certificates} />
      <Experience experiences={experiences} />
      <Contact />
      <Footer />
    </div>
  );
}
