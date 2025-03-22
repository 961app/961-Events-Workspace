import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Attendee {
  id: string;
  name: string;
  username: string;
  avatar: string;
  purchaseDate: string;
  checkedInBy?: {
    name: string;
    username: string;
    avatar: string;
    method: 'FACE' | 'TICKET' | 'MANUAL';
    timestamp: string;
  };
  tickets: {
    name: string;
    quantity: number;
    price: number;
    assignedTo?: string;
  }[];
  status: 'SCANNED' | 'NOT_SCANNED';
  type: 'TICKET' | 'PRIVATE' | 'INVITE' | 'CREATOR' | 'TRANSFER' | 'RESELL';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  dateObj: Date;
  status?: 'ON SALE' | 'PAST' | 'CANCELLED' | 'DRAFT' | 'LIVE';
  revenue: number;
  tickets: number;
  progress: number;
  image?: string;
}

export interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface BaseLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}