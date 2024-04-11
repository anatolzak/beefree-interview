import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { FormControl } from './ui/form';
import type { ControllerRenderProps } from 'react-hook-form';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';

const CalendarPopover: React.FC<ControllerRenderProps> = ({ value, onChange }) => (
  <Popover>
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant={'outline'}
          className={cn('w-[240px] pl-3 text-left font-normal', !value && 'text-muted-foreground')}
        >
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent
      className='w-auto p-0'
      align='start'
    >
      <Calendar
        mode='single'
        selected={value}
        onSelect={onChange}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

export { CalendarPopover };
