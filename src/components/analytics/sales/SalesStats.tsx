import { Card } from '@/components/ui/card';

interface SalesStatsProps {
  totalTicketsSold: number;
  totalRevenue: number;
}

export function SalesStats({ totalTicketsSold, totalRevenue }: SalesStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-2">Tickets Sold</h2>
        <p className="text-4xl font-bold">{totalTicketsSold}</p>
      </Card>
      <Card className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</h2>
        <p className="text-4xl font-bold">${totalRevenue.toFixed(2)}</p>
      </Card>
    </div>
  );
}