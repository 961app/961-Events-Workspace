import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BoostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  daysUntilEvent?: number;
}

interface BudgetSummary {
  totalBudget: string;
  duration: string;
}

function calculateBudgetSummary(
  budgetType: 'total' | 'daily',
  budget: string,
  duration: string,
  untilEvent: boolean,
  daysUntilEvent?: number
): BudgetSummary {
  if (!budget) return { totalBudget: '0.00', duration: '0' };

  const budgetAmount = parseFloat(budget);
  const durationValue = untilEvent ? String(daysUntilEvent || 0) : duration;

  return {
    totalBudget: budgetType === 'daily'
      ? (budgetAmount * parseInt(duration)).toFixed(2)
      : budgetAmount.toFixed(2),
    duration: untilEvent ? 'Until event' : `${duration} days`
  };
}

export function BoostDialog({ open, onOpenChange, daysUntilEvent = 30 }: BoostDialogProps) {
  const [budgetType, setBudgetType] = useState<'total' | 'daily'>('total');
  const [budget, setBudget] = useState<string>('');
  const [duration, setDuration] = useState<string>('7');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [untilEvent, setUntilEvent] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
    setBudget('');
    setBudgetType('total');
    setDuration('7');
    setCustomDuration('');
    setUntilEvent(false);
  };

  const handleDurationChange = (value: string) => {
    setCustomDuration(value);
    setUntilEvent(false);
    setDuration(value);
  };

  const handleUntilEventToggle = () => {
    const newUntilEvent = !untilEvent;
    setUntilEvent(newUntilEvent);
    if (newUntilEvent) {
      setCustomDuration('');
      setDuration(String(daysUntilEvent));
    } else {
      setDuration('7');
    }
  };

  const budgetSummary = calculateBudgetSummary(budgetType, budget, duration, untilEvent, daysUntilEvent);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Boost</DialogTitle>
          <p className="text-muted-foreground">Get more exposure and ticket sales</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <Label className="font-medium">Budget Type</Label>
            <div className="flex items-center gap-2">
              {['total', 'daily'].map((type) => (
                <Button
                  key={type}
                  variant={budgetType === type ? 'default' : 'outline'}
                  className={cn(
                    'h-9',
                    budgetType === type && 'bg-[#FF0000] hover:bg-red-600'
                  )}
                  onClick={() => setBudgetType(type as 'total' | 'daily')}
                >
                  {type === 'total' ? 'Total' : 'Daily'}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Budget</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="20"
                className="pl-9"
                placeholder="Enter amount"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          
          {budgetType === 'daily' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    placeholder="# of days"
                    value={untilEvent ? '' : customDuration}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    disabled={untilEvent}
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">days</span>
                </div>
                
                <span className="text-sm text-muted-foreground">or</span>
                
                <div 
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 whitespace-nowrap",
                    untilEvent && "bg-red-50 border-red-200 hover:bg-red-100"
                  )}
                  onClick={handleUntilEventToggle}
                >
                  <div className="h-4 w-4 border rounded-sm flex items-center justify-center">
                    {untilEvent && <Check className="h-3 w-3 text-[#FF0000]" />}
                  </div>
                  <span className="text-sm font-medium">Until Event</span>
                </div>
              </div>
            </div>
          )}
          
          {budget && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-2 mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="font-medium">
                  ${budgetSummary.totalBudget}
                </span>
              </div>
              {budgetType === 'daily' && <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{budgetSummary.duration}</span>
              </div>}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#FF0000] hover:bg-red-600"
            disabled={!budget || parseFloat(budget) < 20}
            onClick={handleClose}
          >
            Start Boost
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}