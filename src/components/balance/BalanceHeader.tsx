import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Wallet } from 'lucide-react';

interface BalanceHeaderProps {
  netBalance: number;
  onHoldAmount: number;
  availableAmount: number;
  onTransfer: () => void;
}

export function BalanceHeader({ netBalance, onHoldAmount, availableAmount, onTransfer }: BalanceHeaderProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Total Balance</h2>
          <p className="text-3xl font-bold">${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">On Hold</span>
              <div className="relative group">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  Funds are held for 7 days after the event for potential refunds and disputes
                </div>
              </div>
            </div>
            <p className="text-lg font-semibold text-amber-600">${onHoldAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="h-12 w-px bg-gray-200" />
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Available</div>
            <p className="text-lg font-semibold text-green-600">${availableAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <Button 
            className="gap-2 bg-[#FF0000] hover:bg-red-600"
            onClick={onTransfer}
            disabled={availableAmount <= 0}
          >
            <Wallet className="h-4 w-4" />
            Send to Wallet
          </Button>
        </div>
      </div>
    </Card>
  );
}