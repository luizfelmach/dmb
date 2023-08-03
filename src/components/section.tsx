interface SectionProps {
  title: string;
  description: string;
}

export function Section({
  children,
  title,
  description,
}: SectionProps & { children: React.ReactNode }) {
  return (
    <section>
      <h1 className="font-bold text-3xl mb-1">{title}</h1>
      <p className="text-sm text-foreground/50 mb-4">{description}</p>
      <div>{children}</div>
    </section>
  );
}
