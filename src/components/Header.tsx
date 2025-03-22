import { UserProfile } from './UserProfile';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign } from 'lucide-react';
import type { NavItem } from '@/types';

interface HeaderProps {
  navItems: NavItem[];
  onBalanceClick?: () => void;
  totalBalance: number;
}

export function Header({ navItems, onBalanceClick, totalBalance }: HeaderProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Workspace</span>
          <div className="h-4 w-[1px] bg-gray-200 ml-1.5" />
        </div>
        <Logo />
        <NavigationMenu items={navItems} />
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={onBalanceClick}
        >
          <DollarSign className="h-4 w-4" />
          <span>{totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
        </Button>
      <UserProfile
        name="Beirut House Community"
        avatarUrl="https://github.com/shadcn.png"
      />
      </div>
    </header>
  )
}