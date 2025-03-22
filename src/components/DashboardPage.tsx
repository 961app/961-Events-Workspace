import { Card } from '@/components/ui/card';
import { LineChart, BarChart } from '@/components/ui/chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentEvents = [
  {
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    date: 'Mar 28, 2025',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100',
    revenue: 60,
    tickets: 2
  },
  {
    title: 'Beirut House Community - Paris Cruise Edition',
    date: 'Feb 25, 2025',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100',
    revenue: 2028,
    tickets: 82
  }
];

const recentUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Carol White', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/150?u=3' }
];

const salesData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 3200 }
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold">$45,231.89</p>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Events</h3>
          <p className="mt-2 text-3xl font-bold">24</p>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <p className="mt-2 text-3xl font-bold">10,483</p>
          <p className="text-xs text-muted-foreground">+8.2% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Now</h3>
          <p className="mt-2 text-3xl font-bold">573</p>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
          <div className="space-y-6">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">${event.revenue}</span>
                    <span className="text-muted-foreground">{event.tickets} tickets</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

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

      <div className="grid gap-4 grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-[350px]">
            <BarChart
              data={salesData}
              index="name"
              categories={['total']}
              colors={['#FF0000']}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ticket Sales</h3>
          <div className="h-[350px]">
            <LineChart
              data={salesData}
              index="name"
              categories={['total']}
              colors={['#FF0000']}
              valueFormatter={(value) => value.toLocaleString()}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}