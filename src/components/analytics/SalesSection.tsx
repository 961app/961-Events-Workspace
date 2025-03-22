import { Card } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart';

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 3200 },
];

export function SalesSection() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold">$45,231.89</p>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Subscriptions</h3>
          <p className="mt-2 text-3xl font-bold">+2350</p>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Sales</h3>
          <p className="mt-2 text-3xl font-bold">+12,234</p>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Now</h3>
          <p className="mt-2 text-3xl font-bold">+573</p>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Overview</h3>
        <div className="h-[350px]">
          <BarChart
            data={data}
            index="name"
            categories={['total']}
            colors={['#FF0000']}
            valueFormatter={(value) => `$${value.toLocaleString()}`}
          />
        </div>
      </Card>
    </div>
  );
}