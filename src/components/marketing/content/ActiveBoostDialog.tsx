import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Check, PauseCircle, PlayCircle, StopCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ActiveBoostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  daysUntilEvent?: number;
  initialBoost?: {
    budgetType: 'total' | 'daily';
    budget: string;
    duration: string;
    untilEvent: boolean;
    spent: number;
    views: number;
    clicks: number;
    ticketsSold: number;
    isPaused: boolean;
  };
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

export function ActiveBoostDialog({ 
  open, 
  onOpenChange, 
  daysUntilEvent = 30,
  initialBoost = {
    budgetType: 'daily',
    budget: '50',
    duration: '30',
    untilEvent: true,
    spent: 450,
    views: 12500,
    clicks: 850,
    ticketsSold: 24,
    isPaused: false
  }
}: ActiveBoostDialogProps) {
  const [budgetType, setBudgetType] = useState<'total' | 'daily'>(initialBoost.budgetType);
  const [budget, setBudget] = useState<string>(initialBoost.budget);
  const [duration, setDuration] = useState<string>(initialBoost.duration);
  const [customDuration, setCustomDuration] = useState<string>('');
  const [untilEvent, setUntilEvent] = useState(initialBoost.untilEvent);
  const [isPaused, setIsPaused] = useState(initialBoost.isPaused);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
    setShowEndConfirm(false);
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
  const remainingBudget = parseFloat(budgetSummary.totalBudget) - initialBoost.spent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Active Boost</DialogTitle>
          <p className="text-muted-foreground">Manage your boost settings</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-1">
              <div className="text-sm text-muted-foreground">Total Views</div>
              <div className="text-xl font-bold">{initialBoost.views.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg space-y-1">
              <div className="text-sm text-muted-foreground">Tickets Sold</div>
              <div className="text-xl font-bold">{initialBoost.ticketsSold}</div>
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
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium text-green-600">
                  ${remainingBudget.toFixed(2)}
                </span>
              </div>
              {budgetType === 'daily' && <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{budgetSummary.duration}</span>
              </div>}
            </div>
          )}
        </div>
        
        <div className="flex justify-between gap-2">
          {!showEndConfirm ? (
            <>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? (
                    <PlayCircle className="h-5 w-5" />
                  ) : (
                    <PauseCircle className="h-5 w-5" />
                  )}
                </button>
                <button
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowEndConfirm(true)}
                >
                  <StopCircle className="h-5 w-5" />
                </button>
                <Button
                  className="bg-[#FF0000] hover:bg-red-600"
                  disabled={!budget || parseFloat(budget) < 20}
                  onClick={handleClose}
                >
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">Are you sure you want to end this boost? This action cannot be undone.</p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowEndConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleClose}
                >
                  End Boost
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}