import { profile } from "@/data/resume";

const footerLinks = [
  { href: "#intro", label: "Intro" },
  { href: "#craft", label: "Craft" },
  { href: "#projects", label: "Work" },
  { href: "#cases", label: "Cases" },
  { href: "#experience", label: "Path" },
  { href: "#method", label: "Method" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line">
      <div className="section-pad grid gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:items-start md:py-14">
        <div>
          <p className="display text-2xl text-ink">
            {profile.shortName}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            {profile.title} building scalable SaaS and AI-enabled systems from{" "}
            {profile.location}.
          </p>
          <p className="mt-5 text-xs text-ink-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Connect
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
