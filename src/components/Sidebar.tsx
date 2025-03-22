import { Logo } from '@/components/Logo';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

interface SidebarProps {
  navItems: NavItem[];
}

export function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 border-b">
        <Logo />
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3 mb-1 h-11',
              item.active && 'bg-red-50 text-[#FF0000] hover:bg-red-100 hover:text-[#FF0000]',
              'focus:ring-0 focus-visible:ring-0 focus:outline-none'
            )}
          >
            <item.icon className={cn('h-5 w-5', item.active && 'text-[#FF0000]')} />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t bg-gray-50">
        <UserProfile
          name="John Doe"
          role="Admin"
          avatarUrl="https://github.com/shadcn.png"
        />
      </div>
    </aside>
  );
}