import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

interface NavigationMenuProps {
  items: NavItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  return (
    <nav className="flex items-center gap-2">
      {items.map((item) => (
        <Button
          key={item.label}
          onClick={item.onClick}
          variant={item.active ? 'secondary' : 'ghost'}
          className={cn(
            'gap-2 h-9',
            item.active && 'bg-red-50 text-[#FF0000] hover:bg-red-100 hover:text-[#FF0000]',
            'focus:ring-0 focus-visible:ring-0 focus:outline-none'
          )}
        >
          <item.icon className={cn('h-4 w-4', item.active && 'text-[#FF0000]')} />
          {item.label}
        </Button>
      ))}
    </nav>
  );
}