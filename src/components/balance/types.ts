export interface BalanceEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  status: 'active' | 'ended';
  sales: number;
  serviceFees: number;
  marketing: number;
}

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  amount: number;
  color: 'green' | 'amber' | 'red' | 'blue';
}