type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  aside?: string;
  className?: string;
};

export function SectionHeader({
  index,
  label,
  title,
  aside,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 ${className}`.trim()}
    >
      <div>
        <p className="mb-2 font-mono text-xs text-accent">
          {index} — {label}
        </p>
        <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-ink">
          {title}
        </h2>
      </div>
      {aside ? (
        <p className="hidden max-w-[14rem] text-right text-sm leading-relaxed text-ink-muted md:block">
          {aside}
        </p>
      ) : null}
    </div>
  );
}
