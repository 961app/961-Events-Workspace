import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface DailyVisits {
  date: string;
  visits: number;
}

interface VisitsChartProps {
  data: DailyVisits[];
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function VisitsChart({ data }: VisitsChartProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">How are visits evolving over time?</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="14d">
            <SelectTrigger className="w-[180px] bg-gray-100 border-0">
              <SelectValue>Last 14 days</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="date"
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
              tickFormatter={formatNumber}
            />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
              formatter={(value: number) => [formatNumber(value), 'Visits']}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#FF0000"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#FF0000' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}