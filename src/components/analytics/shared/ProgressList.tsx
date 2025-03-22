import { DivideIcon as LucideIcon } from 'lucide-react';

export interface ProgressItem {
  icon: LucideIcon;
  label: string;
  count: number;
  total: number;
}

interface ProgressListProps {
  items: ProgressItem[];
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function ProgressList({ items }: ProgressListProps) {
  return (
    <div className="space-y-6">
      {[...items].sort((a, b) => b.count - a.count).map((item) => (
        <div key={item.label} className="group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{formatNumber(item.count)}</span>
              <span className="text-sm text-muted-foreground">
                ({((item.count / item.total) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
              style={{ width: `${(item.count / item.total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}