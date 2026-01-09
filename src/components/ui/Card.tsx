type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function Card({ title, description, children }: Props) {
  return (
    <div className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="mb-2 text-lg font-semibold text-white">{title}</div>
      {description ? <p className="mb-4 text-sm text-white/70">{description}</p> : null}
      {children}
    </div>
  );
}
