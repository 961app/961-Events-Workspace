import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { format } from "date-fns";

interface TimePickerProps {
  date?: Date;
  setDate: (date: Date) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteOptions = Array.from({ length: 4 }, (_, i) => i * 15)
    .map(minute => minute.toString().padStart(2, '0'));

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const selectedHour = date ? date.getHours() : undefined;
  const selectedMinute = date ? Math.floor(date.getMinutes() / 15) * 15 : undefined;

  return (
    <div className="flex gap-2">
      <Select
        value={selectedHour?.toString()}
        onValueChange={(value) => {
          const newDate = date ? new Date(date) : new Date();
          newDate.setHours(parseInt(value));
          setDate(newDate);
        }}
      >
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour.toString()}>
              {format(new Date().setHours(hour, 0), 'h:00 a')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedMinute?.toString()}
        onValueChange={(value) => {
          const newDate = date ? new Date(date) : new Date();
          newDate.setMinutes(parseInt(value));
          setDate(newDate);
        }}
      >
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent>
          {minuteOptions.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {`:${minute}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}