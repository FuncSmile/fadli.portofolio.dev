import { socials } from "@/constants/socials";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/80 py-10 text-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">© {new Date().getFullYear()} Fadli. Built with care.</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
