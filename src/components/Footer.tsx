import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-3 py-8 text-sm text-dim lg:flex-row lg:items-center lg:justify-between lg:py-12">
      <span className="display text-lg text-paper">{site.domain}</span>
      <div className="flex flex-wrap gap-5">
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber">GitHub</a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber">LinkedIn</a>
        <a href={`mailto:${site.email}`} className="hover:text-amber">{site.email}</a>
      </div>
      <span>© {new Date().getFullYear()} Gustavo Clemente</span>
    </footer>
  );
}
