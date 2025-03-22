import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TicketFormData } from './types';

interface Addon {
  id: string;
  name: string;
  price: string;
  description: string;
  isVisible: boolean;
  availableForTickets: string[];
}

const initialAddon: Addon = {
  id: '1',
  name: '',
  price: '',
  description: '',
  isVisible: true,
  availableForTickets: []
};

interface AddonsPageProps {
  onBack: () => void;
  onNext: () => void;
  tickets: TicketFormData[];
}

function AddonsPage({ onBack, onNext, tickets }: AddonsPageProps) {
  const [addons, setAddons] = useState<Addon[]>([initialAddon]);

  const addAddon = () => {
    setAddons([...addons, { ...initialAddon, id: String(addons.length + 1) }]);
  };

  const removeAddon = (id: string) => {
    if (addons.length > 1) {
      setAddons(addons.filter(addon => addon.id !== id));
    }
  };

  const updateAddon = (id: string, field: keyof Addon, value: any) => {
    setAddons(addons.map(addon =>
      addon.id === id ? { ...addon, [field]: value } : addon
    ));
  };

  const toggleTicketForAddon = (addonId: string, ticketName: string) => {
    setAddons(addons.map(addon => {
      if (addon.id === addonId) {
        const availableForTickets = [...addon.availableForTickets];
        const index = availableForTickets.indexOf(ticketName);
        
        if (index === -1) {
          availableForTickets.push(ticketName);
        } else {
          availableForTickets.splice(index, 1);
        }
        
        return { ...addon, availableForTickets };
      }
      return addon;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Add-ons</h1>
          </div>
        </div>
        <Button 
          className="gap-2 bg-[#FF0000] hover:bg-red-600"
          onClick={onNext}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {addons.map((addon) => (
          <Card key={addon.id} className="p-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Add-on {addon.id}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {addons.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                      onClick={() => removeAddon(addon.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Add-on Name *</Label>
                  <Input
                    placeholder="e.g., VIP Parking, Meet & Greet"
                    value={addon.name}
                    onChange={(e) => updateAddon(addon.id, 'name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-7"
                      placeholder="0.00"
                      value={addon.price}
                      onChange={(e) => updateAddon(addon.id, 'price', e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Describe what this add-on includes"
                    value={addon.description}
                    onChange={(e) => updateAddon(addon.id, 'description', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Available for Tickets *</Label>
                  <div className="space-y-2">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.name}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                          addon.availableForTickets.includes(ticket.name)
                            ? "bg-red-50 border-red-200 hover:bg-red-100"
                            : "hover:bg-gray-50"
                        )}
                        onClick={() => toggleTicketForAddon(addon.id, ticket.name)}
                      >
                        <div className="font-medium">{ticket.name}</div>
                        {addon.availableForTickets.includes(ticket.name) && (
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                            Selected
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full gap-2 border-dashed"
          onClick={addAddon}
        >
          <Plus className="h-4 w-4" />
          Add Another Add-on
        </Button>
      </div>
    </div>
  );
}

export { AddonsPage }