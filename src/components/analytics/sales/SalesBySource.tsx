import { Card } from '@/components/ui/card';

const sources = [
  { name: '961 Events miniapp', tickets: 845, percentage: 35 },
  { name: '961 Events Web', tickets: 602, percentage: 25 },
  { name: 'Promoters', tickets: 482, percentage: 20 },
  { name: '961 Pulse', tickets: 241, percentage: 10 },
  { name: '961 Creators', tickets: 120, percentage: 5 },
  { name: '961 Search', tickets: 72, percentage: 3 },
  { name: '961 User shares', tickets: 48, percentage: 2 }
];

export function SalesBySource() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Tickets sold by source</h2>
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.name} className="group flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{source.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{source.tickets}</span>
                  <span className="text-sm text-muted-foreground">({source.percentage}%)</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}