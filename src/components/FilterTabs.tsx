import { Button } from '@/components/ui/button';

export type FilterTab = {
  id: string;
  label: string;
  active?: boolean;
};

interface FilterTabsProps {
  tabs: FilterTab[];
  onTabChange: (tabId: string) => void;
}

export function FilterTabs({ tabs, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={tab.active ? 'secondary' : 'outline'}
          className={`rounded-full ${
            tab.active ? 'bg-[#FF0000] text-white hover:bg-red-600' : ''
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}