import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Carol White', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/150?u=3' },
  { name: 'David Brown', email: 'david@example.com', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export function PeopleSection() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <p className="mt-2 text-3xl font-bold">10,483</p>
          <p className="text-xs text-muted-foreground">+12.3% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
          <p className="mt-2 text-3xl font-bold">8,234</p>
          <p className="text-xs text-muted-foreground">+8.2% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">New Signups</h3>
          <p className="mt-2 text-3xl font-bold">+573</p>
          <p className="text-xs text-muted-foreground">+48.4% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Online Now</h3>
          <p className="mt-2 text-3xl font-bold">123</p>
          <p className="text-xs text-muted-foreground">+12 since last hour</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
        <div className="space-y-6">
          {recentUsers.map((user) => (
            <div key={user.email} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}