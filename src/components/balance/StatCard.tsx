import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { StatCardProps } from './types';

const colorClasses = {
  green: { bg: 'bg-green-50', text: 'text-green-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
  red: { bg: 'bg-red-50', text: 'text-red-600' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' }
};

export function StatCard({ icon, label, amount, color }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", colorClasses[color].bg)}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={cn("text-2xl font-bold", colorClasses[color].text)}>
            ${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </Card>
  );
}