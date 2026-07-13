type ProjectVisualProps = {
  title: string;
  subtitle: string;
  accent: string;
  index: number;
};

export function ProjectVisual({
  title,
  subtitle,
  accent,
  index,
}: ProjectVisualProps) {
  const shift = (index % 4) * 18;

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden border border-line md:aspect-[16/11]"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at ${22 + shift}% ${28 + (index % 3) * 12}%, ${accent}33, transparent 58%),
          radial-gradient(ellipse 55% 50% at ${78 - shift}% ${72 - (index % 2) * 10}%, rgba(106,123,255,0.22), transparent 55%),
          linear-gradient(155deg, #12182a 0%, #0a0f1c 55%, #070b16 100%)
        `,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,232,240,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,232,240,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          Surface {String(index + 1).padStart(2, "0")}
        </p>
        <div>
          <p
            className="display text-[clamp(1.75rem,4vw,2.75rem)] text-ink transition-transform duration-700 group-hover:translate-x-1"
            style={{ textShadow: "0 0 40px rgba(7,11,22,0.65)" }}
          >
            {title}
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">{subtitle}</p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-[2px] w-1/3 transition-all duration-700 group-hover:w-2/3"
        style={{ background: accent }}
      />
    </div>
  );
}
