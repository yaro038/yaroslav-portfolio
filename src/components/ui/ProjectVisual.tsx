import Image from "next/image";

type ProjectVisualProps = {
  title: string;
  subtitle: string;
  accent: string;
  index: number;
  image: string;
};

export function ProjectVisual({
  title,
  subtitle,
  accent,
  index,
  image,
}: ProjectVisualProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border border-line bg-bg-elevated md:aspect-[16/11]">
      <Image
        src={image}
        alt={`${title} — ${subtitle}`}
        fill
        sizes="(max-width: 768px) 82vw, 520px"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        priority={index < 2}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            Surface {String(index + 1).padStart(2, "0")}
          </p>
          <p className="display mt-1 text-xl text-ink md:text-2xl">{title}</p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-[2px] w-1/3 transition-all duration-700 group-hover:w-2/3"
        style={{ background: accent }}
      />
    </div>
  );
}
