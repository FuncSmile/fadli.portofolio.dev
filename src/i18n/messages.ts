export type Language = "en" | "id";

export const messages: Record<Language, Record<string, string>> = {
  en: {
    // ── Navbar ──
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.certificates": "Certificates",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.resume": "Resume",

    // ── Hero ──
    "hero.tag": "Network & Web",
    "hero.greeting": "Hi, I'm Fadli",
    "hero.role": "Web Developer",
    "hero.body":
      "I build high-performance web experiences with 3D interactions and secure network foundations. Explore my featured projects and GitHub contributions.",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",
    "hero.stat.network": "Years with networks",
    "hero.stat.projects": "Projects delivered",
    "hero.scroll": "Scroll",
    "hero.sideText": "PORTFOLIO · 2024",

    // ── About ──
    "about.tag": "About",
    "about.sectionLabel": "01 / About",
    "about.title": "Who",
    "about.titleHighlight": "Am I?",
    "about.body":
      "I blend networking fundamentals with modern web development to ship reliable, fast experiences. Currently exploring immersive 3D UI and real-time dashboards.",
    "about.highlight1": "Hands-on with routing, firewalling, and secure network design.",
    "about.highlight2": "Frontend-focused with experience in SPA/SSR and performance tuning.",
    "about.highlight3": "Comfortable with DevOps basics: CI/CD, containerization, observability.",

    // ── Skills ──
    "skills.tag": "Skills",
    "skills.sectionLabel": "03 / Expertise",
    "skills.title": "Core",
    "skills.titleHighlight": "Skills",
    "skills.subtitle":
      "Technologies and concepts I specialize in across frontend, infrastructure, and operations.",

    // ── Projects (Featured Works) ──
    "projects.tag": "Projects",
    "projects.title": "Featured Works",
    "projects.subtitle":
      "A showcase of applications and tools I've built, featuring different tech stacks and responsive designs.",
    "projects.seeAll": "See all",
    "projects.visitProject": "Visit Project",
    "projects.emptyTitle": "No projects found",
    "projects.emptyBody":
      "Projects will appear here once they are added to the database. Check back soon!",

    // ── Certificates ──
    "certificates.tag": "Certificates",
    "certificates.title": "Certifications",
    "certificates.subtitle":
      "A log of my continuous learning journey and professional recognitions.",
    "certificates.emptyTitle": "No certificates found",
    "certificates.emptyBody": "Certificates will appear here once added.",

    // ── Experience ──
    "experience.tag": "Experience",
    "experience.sectionLabel": "05 / Trajectory",
    "experience.title": "My",
    "experience.titleHighlight": "Experience",
    "experience.subtitle":
      "A history of building impact, leading the shift, and delivering scale.",
    "experience.emptyTitle": "No experiences found",
    "experience.emptyBody":
      "Experiences will appear here once they are added via the admin dashboard.",

    // ── Contact ──
    "contact.tag": "Contact",
    "contact.sectionLabel": "Contact Me",
    "contact.title": "Let's",
    "contact.titleHighlight": "Talk",
    "contact.body": "Share your project idea or collaboration request. I respond within 24 hours.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.placeholder.name": "Your name",
    "contact.placeholder.email": "you@example.com",
    "contact.placeholder.message": "Project details, scope, or timeline",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to submit contact form",

    // ── Footer ──
    "footer.copyright": "© {year} Fadli. Built with care.",
  },
  id: {
    // ── Navbar ──
    "nav.about": "Tentang",
    "nav.skills": "Keahlian",
    "nav.projects": "Proyek",
    "nav.certificates": "Sertifikat",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.resume": "Resume",

    // ── Hero ──
    "hero.tag": "Jaringan & Web",
    "hero.greeting": "Halo, saya Fadli",
    "hero.role": "Web Developer",
    "hero.body":
      "Saya membangun pengalaman web berkinerja tinggi dengan interaksi 3D dan fondasi jaringan yang aman. Jelajahi proyek unggulan dan kontribusi GitHub saya.",
    "hero.cta.projects": "Lihat Proyek",
    "hero.cta.contact": "Hubungi Saya",
    "hero.stat.network": "Tahun berkarier di jaringan",
    "hero.stat.projects": "Proyek terselesaikan",
    "hero.scroll": "Gulir",
    "hero.sideText": "PORTOFOLIO · 2024",

    // ── About ──
    "about.tag": "Tentang",
    "about.sectionLabel": "01 / Tentang",
    "about.title": "Siapa",
    "about.titleHighlight": "Saya?",
    "about.body":
      "Saya memadukan dasar rekayasa jaringan dengan pengembangan web modern untuk menghadirkan pengalaman yang andal dan cepat. Saat ini mengeksplorasi UI 3D imersif dan dashboard real-time.",
    "about.highlight1": "Berpengalaman dalam routing, firewall, dan desain jaringan yang aman.",
    "about.highlight2": "Fokus pada frontend dengan pengalaman di SPA/SSR dan optimasi performa.",
    "about.highlight3": "Terbiasa dengan dasar DevOps: CI/CD, containerization, dan observability.",

    // ── Skills ──
    "skills.tag": "Keahlian",
    "skills.sectionLabel": "03 / Keahlian",
    "skills.title": "Keahlian",
    "skills.titleHighlight": "Utama",
    "skills.subtitle":
      "Teknologi dan konsep yang saya kuasai di bidang frontend, infrastruktur, dan operasional.",

    // ── Projects (Featured Works) ──
    "projects.tag": "Proyek",
    "projects.title": "Karya Unggulan",
    "projects.subtitle":
      "Kumpulan aplikasi dan alat yang telah saya bangun, menampilkan berbagai stack teknologi dan desain responsif.",
    "projects.seeAll": "Lihat semua",
    "projects.visitProject": "Kunjungi Proyek",
    "projects.emptyTitle": "Belum ada proyek",
    "projects.emptyBody":
      "Proyek akan muncul di sini setelah ditambahkan ke database. Nantikan segera!",

    // ── Certificates ──
    "certificates.tag": "Sertifikat",
    "certificates.title": "Sertifikasi",
    "certificates.subtitle":
      "Catatan perjalanan belajar berkelanjutan dan pengakuan profesional saya.",
    "certificates.emptyTitle": "Belum ada sertifikat",
    "certificates.emptyBody": "Sertifikat akan muncul di sini setelah ditambahkan.",

    // ── Experience ──
    "experience.tag": "Pengalaman",
    "experience.sectionLabel": "05 / Perjalanan",
    "experience.title": "Pengalaman",
    "experience.titleHighlight": "Saya",
    "experience.subtitle":
      "Riwayat membangun dampak, memimpin perubahan, dan menghadirkan skala.",
    "experience.emptyTitle": "Belum ada pengalaman",
    "experience.emptyBody":
      "Pengalaman akan muncul di sini setelah ditambahkan melalui dashboard admin.",

    // ── Contact ──
    "contact.tag": "Kontak",
    "contact.sectionLabel": "Hubungi Saya",
    "contact.title": "Mari",
    "contact.titleHighlight": "Bicara",
    "contact.body": "Ceritakan ide proyek atau kebutuhan kolaborasi Anda. Saya merespons dalam 24 jam.",
    "contact.name": "Nama",
    "contact.email": "Email",
    "contact.message": "Pesan",
    "contact.placeholder.name": "Nama Anda",
    "contact.placeholder.email": "anda@example.com",
    "contact.placeholder.message": "Detail proyek, cakupan, atau jadwal",
    "contact.send": "Kirim Pesan",
    "contact.sending": "Mengirim...",
    "contact.success": "Pesan berhasil dikirim!",
    "contact.error": "Gagal mengirim pesan",

    // ── Footer ──
    "footer.copyright": "© {year} Fadli. Dibuat dengan sepenuh hati.",
  }
};
