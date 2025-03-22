import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  salesData: Array<{
    date: string;
    day: string;
    tickets: number;
  }>;
}

export function SalesChart({ salesData }: SalesChartProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">How are sales evolving over time?</h2>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground">Cumulated tickets sold</h3>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-gray-100 border-0">
              <SelectValue>All tickets</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tickets</SelectItem>
              <SelectItem value="early">Early Bird</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-lg overflow-hidden">
            <button className="px-4 py-2 bg-gray-100 text-sm font-medium hover:bg-gray-200">Total</button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100">By ticket</button>
          </div>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              stroke="#E5E7EB"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              stroke="#E5E7EB"
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
            />
            <Line
              type="stepAfter"
              dataKey="tickets"
              stroke="#FF0000"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#FF0000' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}