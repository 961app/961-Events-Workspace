import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface EventBasicInfoProps {
  eventType: 'free' | 'paid';
  onEventTypeChange: (type: 'free' | 'paid') => void;
}

export function EventBasicInfo({ eventType, onEventTypeChange }: EventBasicInfoProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Event Info</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name *</Label>
          <Input id="eventName" placeholder="Give your event a clear, descriptive name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea 
            id="description" 
            placeholder="Describe your event, highlight what makes it special"
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Event Type *</Label>
          <p> Note to devs: If free is selected, hiding pricing section in the createticketspage, skip addonspage, show "Free" in the ticketconfirmation page.</p>
          <div className="flex gap-2">
            <Button
              variant={eventType === 'paid' ? 'default' : 'outline'}
              onClick={() => onEventTypeChange('paid')}
            >
              Paid
            </Button>
            <Button
              variant={eventType === 'free' ? 'default' : 'outline'}
              onClick={() => onEventTypeChange('free')}
            >
              Free
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}