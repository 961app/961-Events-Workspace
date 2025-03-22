import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/ui/chart';

const data = [
  { date: '2024-01-01', visitors: 200, pageviews: 400 },
  { date: '2024-01-02', visitors: 300, pageviews: 600 },
  { date: '2024-01-03', visitors: 250, pageviews: 500 },
  { date: '2024-01-04', visitors: 400, pageviews: 800 },
  { date: '2024-01-05', visitors: 350, pageviews: 700 },
  { date: '2024-01-06', visitors: 450, pageviews: 900 },
];

export function TrafficSection() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Page Views</h3>
          <p className="mt-2 text-3xl font-bold">2,450</p>
          <p className="text-xs text-muted-foreground">+10.1% from last week</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Bounce Rate</h3>
          <p className="mt-2 text-3xl font-bold">42.5%</p>
          <p className="text-xs text-muted-foreground">-2.4% from last week</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Average Session</h3>
          <p className="mt-2 text-3xl font-bold">2m 13s</p>
          <p className="text-xs text-muted-foreground">+12.3% from last week</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
        <div className="h-[350px]">
          <LineChart
            data={data}
            index="date"
            categories={['visitors', 'pageviews']}
            colors={['#FF0000', '#666666']}
            valueFormatter={(value) => value.toLocaleString()}
          />
        </div>
      </Card>
    </div>
  );
}