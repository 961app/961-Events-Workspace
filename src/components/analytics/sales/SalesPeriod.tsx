import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download } from 'lucide-react';

interface SalesPeriodProps {
  salesData: Array<{
    date: string;
    day: string;
    tickets: number;
  }>;
}

export function SalesPeriod({ salesData }: SalesPeriodProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Sales per period</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Download className="h-5 w-5" />
          </button>
          <div className="flex rounded-lg border">
            <button className="px-4 py-2 bg-gray-100 text-sm font-medium border-r">Day</button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-50">Week</button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-[1fr,auto,auto] gap-4 px-2 text-sm text-muted-foreground">
          <div>Date</div>
          <div className="text-right pr-12">Tickets</div>
          <div className="text-right w-20">Revenue</div>
        </div>
        <ScrollArea className="h-[300px] -mx-6 px-6">
          <div className="space-y-1">
            {salesData.slice().reverse().map((day) => (
              <div key={day.day} className="grid grid-cols-[1fr,auto,auto] gap-4 py-2 border-b border-gray-100 last:border-0 group hover:bg-gray-50">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-900">{day.day}</span>
                  <span className="text-muted-foreground">{day.date}</span>
                </div>
                <div className="flex items-center gap-12">
                  <span className="font-medium text-right pr-12">{day.tickets}</span>
                  <span className="font-medium text-right w-20">${(day.tickets * 30)}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-between pt-2 text-sm">
          <div className="flex items-center gap-2">
            <span>Showing 1-10 of 44 days</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}