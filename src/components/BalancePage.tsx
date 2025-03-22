import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DollarSign, Receipt, CreditCard, TrendingUp, Search } from 'lucide-react';
import { BalanceHeader } from './balance/BalanceHeader';
import { StatCard } from './balance/StatCard';
import { EventRow } from './balance/EventRow';
import { events } from './balance/data';

const ITEMS_PER_PAGE = 10;
const ON_HOLD_AMOUNT = 1200;

interface BalancePageProps {
  onBalanceUpdate: (balance: number) => void;
}

export function BalancePage({ onBalanceUpdate }: BalancePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalSales = events.reduce((sum, event) => sum + event.sales, 0);
  const totalServiceFees = events.reduce((sum, event) => sum + event.serviceFees, 0);
  const totalMarketing = events.reduce((sum, event) => sum + event.marketing, 0);
  const netBalance = totalSales + totalServiceFees + totalMarketing;
  const [availableAmount, setAvailableAmount] = useState(netBalance - ON_HOLD_AMOUNT);

  useEffect(() => {
    onBalanceUpdate(netBalance);
  }, [netBalance, onBalanceUpdate]);

  const handleTransfer = () => {
    setAvailableAmount(0);
  };

  return (
    <div className="max-w-[1088px] mx-auto space-y-8">
      <BalanceHeader
        netBalance={netBalance}
        onHoldAmount={ON_HOLD_AMOUNT}
        availableAmount={availableAmount}
        onTransfer={handleTransfer}
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Total Sales"
          amount={totalSales}
          color="green"
        />
        <StatCard
          icon={<Receipt className="h-6 w-6" />}
          label="Service Fees"
          amount={totalServiceFees}
          color="amber"
        />
        <StatCard
          icon={<CreditCard className="h-6 w-6" />}
          label="Expenses"
          amount={totalMarketing}
          color="red"
        />
        <StatCard
          icon={<DollarSign className="h-6 w-6" />}
          label="Net Balance"
          amount={netBalance}
          color="blue"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Events</h2>
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-[2fr,1fr,1fr,auto] gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium">
            <div>Event</div>
            <div>Status</div>
            <div>Date</div>
            <div className="text-right">Net Amount</div>
          </div>

          {paginatedEvents.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              isExpanded={expandedEvent === event.id}
              onToggle={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
            />
          ))}

          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <span className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredEvents.length)} of {filteredEvents.length} events
            </span>
            <div className="flex items-center gap-2">
              <button
                className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground disabled:opacity-50"
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}