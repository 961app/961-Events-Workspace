import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface StaffMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  type: 'general' | 'door';
}

const staffMembers: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: 'https://i.pravatar.cc/150?u=staff1',
    type: 'door'
  },
  {
    id: 'staff-2',
    name: 'Mike Thompson',
    username: '@miket',
    avatar: 'https://i.pravatar.cc/150?u=staff2',
    type: 'general'
  },
  {
    id: 'staff-3',
    name: 'Emma Davis',
    username: '@emmad',
    avatar: 'https://i.pravatar.cc/150?u=staff3',
    type: 'door'
  }
];

export function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStaffUsername, setNewStaffUsername] = useState('');
  const [newStaffType, setNewStaffType] = useState<'general' | 'door'>('general');
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  const filteredStaff = staffMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (member: StaffMember) => {
    setSelectedMember(member);
    setShowRemoveDialog(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team</h1>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-[1fr,auto] gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium">
            <div>Name</div>
            <div className="w-8" />
          </div>

          {filteredStaff.map((member) => (
            <div
              key={member.id}
              className="grid grid-cols-[1fr,auto] gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{member.name}</p>
                  <Badge variant="outline" className={cn(
                    member.type === 'door' 
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-purple-50 text-purple-700 border-purple-200"
                  )}>
                    {member.type === 'door' ? 'Door' : 'General'}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{member.username}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleRemove(member)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add to Team</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Staff Type</Label>
              <div className="flex gap-2">
                <Button
                  variant={newStaffType === 'general' ? 'default' : 'outline'}
                  onClick={() => setNewStaffType('general')}
                  className="flex-1"
                >
                  General
                </Button>
                <Button
                  variant={newStaffType === 'door' ? 'default' : 'outline'}
                  onClick={() => setNewStaffType('door')}
                  className="flex-1"
                >
                  Door
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Enter username"
                value={newStaffUsername}
                onChange={(e) => setNewStaffUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!newStaffUsername}
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewStaffUsername('');
                setNewStaffType('general');
              }}
            >
              Add Staff
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Door Staff</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to remove {selectedMember?.name} from your team?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowRemoveDialog(false);
                setSelectedMember(null);
              }}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}