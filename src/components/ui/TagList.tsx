type TagListProps = {
  tags: string[];
  className?: string;
};

export function TagList({ tags, className = "" }: TagListProps) {
  return (
    <ul className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`.trim()}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
