import type { BalanceEvent } from './types';

export const events: BalanceEvent[] = [
  {
    id: 'event-3',
    title: 'New Year Eve Celebration',
    image: 'https://images.unsplash.com/photo-1521478706270-f2e33c203d95?auto=format&fit=crop&q=80&w=100&h=100',
    date: 'Dec 31, 2024',
    status: 'ended',
    sales: 4500,
    serviceFees: -380.50,
    marketing: -250
  },
  {
    id: 'event-1',
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100',
    date: 'Mar 28, 2025',
    status: 'active',
    sales: 60,
    serviceFees: -12.50,
    marketing: -25
  },
  {
    id: 'event-2',
    title: 'Beirut House Community - Paris Cruise Edition',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100',
    date: 'Feb 25, 2025',
    status: 'active',
    sales: 2870,
    serviceFees: -245.50,
    marketing: -150
  },
  // ... (keep all other events)
];