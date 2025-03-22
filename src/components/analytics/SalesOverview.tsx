import { AnalyticsHeader } from './shared/AnalyticsHeader';
import { DataTable, type Column } from './shared/DataTable';
import { formatViews } from '@/lib/utils';
import { SalesStats } from './sales/SalesStats';
import { SalesBreakdown } from './sales/SalesBreakdown';
import { SalesChart } from './sales/SalesChart';
import { SalesPeriod } from './sales/SalesPeriod';
import { SalesBySource } from './sales/SalesBySource';

interface Event {
  id: string;
  title: string;
  date: string;
  status: 'ON SALE' | 'PAST' | 'CANCELLED';
  image: string;
}

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    date: 'Mar 28, 2025 8:00 PM',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-2',
    title: 'Beirut House Community - Paris Cruise Edition',
    date: 'Feb 25, 2025 8:00 PM',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-3',
    title: 'BATEAU MOVE x CIAO HABIBI MILAN',
    date: 'Feb 22, 2025 1:00 PM',
    status: 'CANCELLED',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-4',
    title: 'Summer Beach Party 2025',
    date: 'Jul 15, 2025 2:00 PM',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-5',
    title: 'New Year Eve Celebration',
    date: 'Dec 31, 2024 10:00 PM',
    status: 'PAST',
    image: 'https://images.unsplash.com/photo-1521478706270-f2e33c203d95?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

export interface TicketType {
  name: string;
  emoji: string;
  price: number;
  sold: number;
  total: number;
  status: 'on sale';
}

export interface Promoter {
  id: string;
  name: string;
  username: string;
  avatar: string;
  revenue: number;
  tickets: number;
  commission: number;
  status: 'active' | 'inactive';
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  revenue: number;
  views: number;
  posts: number;
  commission: number;
}

export const promoters: Promoter[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    username: '@emmaw',
    avatar: 'https://i.pravatar.cc/150?u=emma1',
    revenue: 3240,
    tickets: 108,
    commission: 324,
    status: 'active'
  },
  {
    id: '2',
    name: 'Liam Johnson',
    username: '@liamj',
    avatar: 'https://i.pravatar.cc/150?u=liam2',
    revenue: 2880,
    tickets: 96,
    commission: 288,
    status: 'active'
  },
  {
    id: '3',
    name: 'Sophia Garcia',
    username: '@sophiag',
    avatar: 'https://i.pravatar.cc/150?u=sophia3',
    revenue: 2160,
    tickets: 72,
    commission: 216,
    status: 'active'
  },
  {
    id: '4',
    name: 'Oliver Brown',
    username: '@oliverb',
    avatar: 'https://i.pravatar.cc/150?u=oliver4',
    revenue: 1950,
    tickets: 65,
    commission: 195,
    status: 'active'
  },
  {
    id: '5',
    name: 'Ava Martinez',
    username: '@avam',
    avatar: 'https://i.pravatar.cc/150?u=ava5',
    revenue: 1800,
    tickets: 60,
    commission: 180,
    status: 'active'
  },
  {
    id: '6',
    name: 'Noah Taylor',
    username: '@noaht',
    avatar: 'https://i.pravatar.cc/150?u=noah6',
    revenue: 1650,
    tickets: 55,
    commission: 165,
    status: 'active'
  },
  {
    id: '7',
    name: 'Isabella Lee',
    username: '@isabellal',
    avatar: 'https://i.pravatar.cc/150?u=isabella7',
    revenue: 1500,
    tickets: 50,
    commission: 150,
    status: 'active'
  },
  {
    id: '8',
    name: 'Mason Clark',
    username: '@masonc',
    avatar: 'https://i.pravatar.cc/150?u=mason8',
    revenue: 1350,
    tickets: 45,
    commission: 135,
    status: 'inactive'
  },
  {
    id: '9',
    name: 'Charlotte Wong',
    username: '@charlottew',
    avatar: 'https://i.pravatar.cc/150?u=charlotte9',
    revenue: 1200,
    tickets: 40,
    commission: 120,
    status: 'active'
  },
  {
    id: '10',
    name: 'Ethan Rodriguez',
    username: '@ethanr',
    avatar: 'https://i.pravatar.cc/150?u=ethan10',
    revenue: 1050,
    tickets: 35,
    commission: 105,
    status: 'active'
  },
  {
    id: '11',
    name: 'Amelia Patel',
    username: '@ameliap',
    avatar: 'https://i.pravatar.cc/150?u=amelia11',
    revenue: 900,
    tickets: 30,
    commission: 90,
    status: 'active'
  },
  {
    id: '12',
    name: 'Lucas Kim',
    username: '@lucask',
    avatar: 'https://i.pravatar.cc/150?u=lucas12',
    revenue: 750,
    tickets: 25,
    commission: 75,
    status: 'inactive'
  }
];

export const promoterColumns: Column[] = [
  { key: 'name', label: 'Promoter' },
  { key: 'revenue', label: 'Revenue', align: 'right', format: (value) => `$${value.toLocaleString()}` },
  { key: 'tickets', label: 'Tickets', align: 'right' },
  { key: 'commission', label: 'Commission', align: 'right', format: (value) => `$${value.toLocaleString()}` }
];

export const creatorColumns: Column[] = [
  { key: 'name', label: 'Creator' },
  { key: 'revenue', label: 'Revenue', align: 'right', format: (value) => `$${value.toLocaleString()}` },
  { key: 'views', label: 'Views', align: 'right', format: (value) => formatViews(value) },
  { key: 'posts', label: 'Posts', align: 'right' },
  { key: 'commission', label: 'Commission', align: 'right', format: (value) => `$${value.toLocaleString()}` }
];

export const creators: Creator[] = [
  {
    id: '1',
    name: 'Olivia Davis',
    username: '@oliviad',
    avatar: 'https://i.pravatar.cc/150?u=olivia1',
    revenue: 5240,
    views: 12500,
    posts: 24,
    commission: 524
  },
  {
    id: '2',
    name: 'William Chen',
    username: '@williamc',
    avatar: 'https://i.pravatar.cc/150?u=william2',
    revenue: 4880,
    views: 10200,
    posts: 18,
    commission: 488
  },
  {
    id: '3',
    name: 'Mia Thompson',
    username: '@miat',
    avatar: 'https://i.pravatar.cc/150?u=mia3',
    revenue: 4160,
    views: 8900,
    posts: 15,
    commission: 416
  },
  {
    id: '4',
    name: 'James Wilson',
    username: '@jamesw',
    avatar: 'https://i.pravatar.cc/150?u=james4',
    revenue: 3840,
    views: 8200,
    posts: 14,
    commission: 384
  },
  {
    id: '5',
    name: 'Harper Anderson',
    username: '@harpera',
    avatar: 'https://i.pravatar.cc/150?u=harper5',
    revenue: 3520,
    views: 7500,
    posts: 13,
    commission: 352
  },
  {
    id: '6',
    name: 'Benjamin Lee',
    username: '@benjaminl',
    avatar: 'https://i.pravatar.cc/150?u=benjamin6',
    revenue: 3200,
    views: 6800,
    posts: 12,
    commission: 320
  },
  {
    id: '7',
    name: 'Evelyn Martinez',
    username: '@evelynm',
    avatar: 'https://i.pravatar.cc/150?u=evelyn7',
    revenue: 2880,
    views: 6100,
    posts: 11,
    commission: 288
  },
  {
    id: '8',
    name: 'Alexander Kim',
    username: '@alexk',
    avatar: 'https://i.pravatar.cc/150?u=alexander8',
    revenue: 2560,
    views: 5400,
    posts: 10,
    commission: 256
  },
  {
    id: '9',
    name: 'Victoria Wang',
    username: '@victoriaw',
    avatar: 'https://i.pravatar.cc/150?u=victoria9',
    revenue: 2240,
    views: 4700,
    posts: 9,
    commission: 224
  },
  {
    id: '10',
    name: 'Henry Garcia',
    username: '@henryg',
    avatar: 'https://i.pravatar.cc/150?u=henry10',
    revenue: 1920,
    views: 4000,
    posts: 8,
    commission: 192
  },
  {
    id: '11',
    name: 'Scarlett Brown',
    username: '@scarlettb',
    avatar: 'https://i.pravatar.cc/150?u=scarlett11',
    revenue: 1600,
    views: 3300,
    posts: 7,
    commission: 160
  },
  {
    id: '12',
    name: 'Sebastian Taylor',
    username: '@sebastiant',
    avatar: 'https://i.pravatar.cc/150?u=sebastian12',
    revenue: 1280,
    views: 2600,
    posts: 6,
    commission: 128
  }
];

export const ticketTypes: TicketType[] = [
  {
    name: 'Early Bird Special – Party Cruise + Cocktail',
    emoji: '🎫 🍸',
    price: 30.00,
    sold: 2,
    total: 20,
    status: 'on sale'
  },
  {
    name: 'Regular Ticket – All Aboard the Party Cruise!',
    emoji: '🎫 🚢',
    price: 32.00,
    sold: 0,
    total: 40,
    status: 'on sale'
  },
  {
    name: 'Advanced Ticket – Cruise + 2 Cocktails!',
    emoji: '🚀 🍸 🍸',
    price: 42.00,
    sold: 0,
    total: 20,
    status: 'on sale'
  }
];

export const salesData = [
  { date: '02/12', day: 'D-44', tickets: 0 },
  { date: '02/15', day: 'D-41', tickets: 1 },
  { date: '02/18', day: 'D-38', tickets: 1 },
  { date: '02/21', day: 'D-35', tickets: 2 },
  { date: '02/24', day: 'D-32', tickets: 2 },
  { date: '02/27', day: 'D-29', tickets: 2 },
  { date: '03/02', day: 'D-26', tickets: 2 },
  { date: '03/05', day: 'D-23', tickets: 2 },
  { date: '03/08', day: 'D-20', tickets: 2 },
  { date: '03/11', day: 'D-17', tickets: 2 },
  { date: '03/14', day: 'D-14', tickets: 2 },
];

export function SalesOverview() {
  const totalRevenue = ticketTypes.reduce((sum, ticket) => sum + (ticket.sold * ticket.price), 0);
  const totalTicketsSold = ticketTypes.reduce((sum, ticket) => sum + ticket.sold, 0);
  
  return (
    <div className="space-y-8">
      <AnalyticsHeader title="Sales Overview" events={events} />
      <SalesStats totalTicketsSold={totalTicketsSold} totalRevenue={totalRevenue} />
      <SalesBreakdown ticketTypes={ticketTypes} />
      <SalesChart salesData={salesData} />
      <SalesPeriod salesData={salesData} />
      <SalesBySource />
      <div className="space-y-8">
        <DataTable
          title="Top Promoters"
          columns={promoterColumns}
          data={promoters}
          avatarKey="avatar"
          nameKey="name"
          usernameKey="username"
        />
        <DataTable
          title="Top Creators"
          columns={creatorColumns}
          data={creators}
          avatarKey="avatar"
          nameKey="name"
          usernameKey="username"
        />
      </div>
    </div>
  );
}