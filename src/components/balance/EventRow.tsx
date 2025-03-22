import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BalanceEvent } from './types';

interface EventRowProps {
  event: BalanceEvent;
  isExpanded: boolean;
  onToggle: () => void;
}

export function EventRow({ event, isExpanded, onToggle }: EventRowProps) {
  const netAmount = event.sales + event.serviceFees + event.marketing;

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "grid grid-cols-[2fr,1fr,1fr,auto] gap-4 px-4 py-3 hover:bg-gray-50 rounded-lg items-center cursor-pointer",
          isExpanded && "bg-gray-50"
        )}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={event.image} />
            <AvatarFallback>{event.title[0]}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-bold line-clamp-1">{event.title}</div>
        </div>
        <div>
          <Badge variant="outline" className={cn(
            event.status === 'active' 
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          )}>
            {event.status === 'active' ? 'Active' : 'Ended'}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">{event.date}</div>
        <div className="flex items-center gap-2">
          <span className="font-medium">${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <ChevronRight className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-90"
          )} />
        </div>
      </div>
      {isExpanded && (
        <div className="ml-16 px-4 py-3 bg-gray-50 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sales</span>
            <span className="font-medium text-green-600">+${event.sales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Service Fees</span>
            <span className="font-medium text-amber-600">${Math.abs(event.serviceFees).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Marketing</span>
            <span className="font-medium text-red-600">${Math.abs(event.marketing).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center justify-between pt-2 mt-2 border-t">
            <span className="font-medium">Net Amount</span>
            <div className="flex items-center gap-4 text-right">
              <div className="relative group">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2" 
                  disabled={event.status !== 'ended'}
                >
                  <Download className="h-4 w-4" />
                  Statement
                </Button>
                {event.status !== 'ended' && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    Statement available when event ends
                  </div>
                )}
              </div>
              <span className="font-medium">${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}