import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileProps {
  name: string;
  avatarUrl?: string;
}

export function UserProfile({ name, avatarUrl }: UserProfileProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <Button variant="ghost" className="justify-start gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium">{name}</span>
      </div>
    </Button>
  );
}