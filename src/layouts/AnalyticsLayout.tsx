import { BarChart3, Users, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AnalyticsSidebarItem {
  icon: typeof BarChart3;
  label: string;
  active?: boolean;
}

interface AnalyticsLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems: AnalyticsSidebarItem[] = [
  { icon: BarChart3, label: 'Sales' },
  { icon: Activity, label: 'Traffic' },
  { icon: Users, label: 'People' }
];

export function AnalyticsLayout({ children, activeSection, onSectionChange }: AnalyticsLayoutProps) {
  return (
    <div className="flex gap-8 h-full">
      <aside className="w-48 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 h-11',
              activeSection === item.label && 'bg-red-50 text-[#FF0000] hover:bg-red-100 hover:text-[#FF0000]',
              'focus:ring-0 focus-visible:ring-0 focus:outline-none'
            )}
            onClick={() => onSectionChange(item.label)}
          >
            <item.icon className={cn('h-5 w-5', activeSection === item.label && 'text-[#FF0000]')} />
            {item.label}
          </Button>
        ))}
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}