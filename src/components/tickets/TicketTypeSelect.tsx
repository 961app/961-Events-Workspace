import { Calendar, Ticket, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketTypeSelectProps {
  value: string;
  onValueChange: (value: 'single' | 'pass' | 'group') => void;
}

export function TicketTypeSelect({ value, onValueChange }: TicketTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="single">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <span>Single Ticket</span>
          </div>
        </SelectItem>
        <SelectItem value="pass">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Event Pass</span>
          </div>
        </SelectItem>
        <SelectItem value="group">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Group</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}