import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

export function EventVenue() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Venue</h2>
      <div className="space-y-6">
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <MapPin className="h-6 w-6 text-gray-600" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Search for venue on map</p>
            <p>Click to select location or search by address</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venueName">Venue Name *</Label>
            <Input id="venueName" placeholder="Enter venue name" />
          </div>
        </div>
      </div>
    </Card>
  );
}