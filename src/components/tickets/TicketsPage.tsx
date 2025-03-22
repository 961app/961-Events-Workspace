import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Plus, Pencil, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Ticket {
  id: string;
  name: string;
  status: 'ON SALE' | 'SOLD OUT' | 'STOPPED';
  price: number;
  sold: number;
  total: number;
  isPrivate?: boolean;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  quantity: number;
  availableForTickets: string[];
}

const tickets: Ticket[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    status: 'SOLD OUT',
    price: 25,
    sold: 100,
    total: 100
  },
  {
    id: 'regular',
    name: 'Regular',
    status: 'ON SALE',
    price: 35,
    sold: 150,
    total: 200
  },
  {
    id: 'vip',
    name: 'VIP',
    status: 'ON SALE',
    price: 50,
    sold: 25,
    total: 50
  },
  {
    id: 'backstage',
    name: 'Backstage Pass',
    status: 'STOPPED',
    price: 100,
    sold: 0,
    total: 10,
    isPrivate: true
  }
];

function StatsCard({ title, value, total }: { title: string; value: number; total?: number }) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {total && <p className="text-lg text-muted-foreground">/ {total}</p>}
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: Ticket['status'] }) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "w-fit",
        status === 'ON SALE' && "bg-green-50 text-green-700 border-green-200",
        status === 'SOLD OUT' && "bg-amber-50 text-amber-700 border-amber-200",
        status === 'STOPPED' && "bg-gray-50 text-gray-700 border-gray-200"
      )}
    >
      {status}
    </Badge>
  );
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <div className="grid grid-cols-[auto,2fr,1fr,1fr,1fr,auto] gap-4 items-center p-4 rounded-lg hover:bg-gray-50 cursor-move group">
      <GripVertical className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100" />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{ticket.name}</span>
          {ticket.isPrivate && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Private link only
            </Badge>
          )}
        </div>
      </div>
      <StatusBadge status={ticket.status} />
      <div className="text-right font-medium">${ticket.price}</div>
      <div className="text-right">
        <span className="font-medium">{ticket.sold}</span>
        <span className="text-muted-foreground"> / {ticket.total}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}

function TicketList({ tickets }: { tickets: Ticket[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-2">
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </Card>
  );
}

export function TicketsPage() {
  const [showAddAddonDialog, setShowAddAddonDialog] = useState(false);
  const [newAddon, setNewAddon] = useState<Addon>({
    id: '',
    name: '',
    price: 0,
    quantity: 1,
    availableForTickets: []
  });
  const [addons, setAddons] = useState<Addon[]>([]);

  const totalSold = tickets.reduce((sum, ticket) => sum + ticket.sold, 0);
  const totalCapacity = tickets.reduce((sum, ticket) => sum + ticket.total, 0);
  const onSaleTickets = tickets.filter(ticket => ticket.status === 'ON SALE');
  const onSaleCount = onSaleTickets.length;
  const totalTicketTypes = tickets.length;

  const handleAddAddon = () => {
    if (newAddon.name && newAddon.price >= 0 && newAddon.quantity > 0) {
      setAddons([...addons, { ...newAddon, id: Date.now().toString() }]);
      setShowAddAddonDialog(false);
      setNewAddon({
        id: '',
        name: '',
        price: 0,
        quantity: 1,
        availableForTickets: []
      });
    }
  };

  const toggleTicketForAddon = (addonId: string, ticketId: string) => {
    setAddons(addons.map(addon => {
      if (addon.id === addonId) {
        const tickets = [...addon.availableForTickets];
        const index = tickets.indexOf(ticketId);
        
        if (index === -1) {
          tickets.push(ticketId);
        } else {
          tickets.splice(index, 1);
        }
        
        return { ...addon, availableForTickets: tickets };
      }
      return addon;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Ticket
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatsCard 
          title="Event Capacity" 
          value={totalSold} 
          total={totalCapacity} 
        />
        <StatsCard 
          title="Currently on sale" 
          value={onSaleCount} 
          total={totalTicketTypes} 
        />
      </div>

      <TicketList tickets={tickets} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add-ons</h2>
          <Button 
            className="gap-2"
            onClick={() => setShowAddAddonDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Add Add-on
          </Button>
        </div>

        {addons.length > 0 ? (
          <Card className="p-6">
            <div className="space-y-4">
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{addon.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>${addon.price}</span>
                      <span>·</span>
                      <span>Quantity: {addon.quantity}</span>
                      <span>·</span>
                      <span>Available for {addon.availableForTickets.length} ticket types</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setAddons(addons.filter(a => a.id !== addon.id))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              <p>No add-ons yet</p>
              <p className="text-sm">Add extras like VIP upgrades, merchandise, or special experiences</p>
            </div>
          </Card>
        )}
      </div>

      <Dialog open={showAddAddonDialog} onOpenChange={setShowAddAddonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Add-on</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Add-on Name</Label>
              <Input
                placeholder="e.g., VIP Upgrade, Meet & Greet"
                value={newAddon.name}
                onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-7"
                  placeholder="0.00"
                  value={newAddon.price || ''}
                  onChange={(e) => setNewAddon({ ...newAddon, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Quantity Available</Label>
              <Input
                type="number"
                min="1"
                value={newAddon.quantity}
                onChange={(e) => setNewAddon({ ...newAddon, quantity: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Available for Tickets</Label>
              <div className="space-y-2">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                      newAddon.availableForTickets.includes(ticket.id)
                        ? "bg-red-50 border-red-200 hover:bg-red-100"
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => toggleTicketForAddon(newAddon.id, ticket.id)}
                  >
                    <div className="font-medium">{ticket.name}</div>
                    {newAddon.availableForTickets.includes(ticket.id) && (
                      <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        Selected
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddAddonDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddAddon}
              disabled={!newAddon.name || newAddon.price < 0 || newAddon.quantity < 1}
            >
              Add Add-on
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}