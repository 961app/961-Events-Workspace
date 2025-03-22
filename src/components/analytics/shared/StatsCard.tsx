interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <div className="p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}