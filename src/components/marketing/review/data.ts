import type { Review } from './types';

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Emma W.',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    rating: 5,
    review: 'Amazing event! The atmosphere was electric and the organization was flawless. Will definitely attend future events.',
    event: {
      title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
      date: 'Mar 28, 2025',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100'
    }
  },
  {
    id: '2',
    name: 'Liam J.',
    avatar: 'https://i.pravatar.cc/150?u=liam',
    rating: 4,
    review: 'Great experience overall. The music selection was perfect and the venue was ideal. Only minor issue was the queue at the bar.',
    event: {
      title: 'Beirut House Community - Paris Cruise Edition',
      date: 'Feb 25, 2025',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100'
    },
    replied: true
  },
  {
    id: '3',
    name: 'Sophie G.',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    rating: 5,
    review: "One of the best events I've been to! The DJs were incredible and the crowd was amazing. Can't wait for the next one!",
    event: {
      title: 'Summer Beach Party 2025',
      date: 'Jul 15, 2025',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100&h=100'
    }
  }
];