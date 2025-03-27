
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScheduleNudgeModalProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (data: ScheduleNudgeData) => void;
}

export interface ScheduleNudgeData {
  title: string;
  date: Date;
  time: string;
  targetGroup: string;
  channel: string;
  priority: string;
}

const ScheduleNudgeModal: React.FC<ScheduleNudgeModalProps> = ({ open, onClose, onSchedule }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const form = useForm<ScheduleNudgeData>({
    defaultValues: {
      title: '',
      time: '09:00',
      targetGroup: '',
      channel: 'email',
      priority: 'medium',
    },
  });
  
  const handleSubmit = (data: ScheduleNudgeData) => {
    if (!date) return;
    
    const scheduleData = {
      ...data,
      date: date,
    };
    
    onSchedule(scheduleData);
    onClose();
    form.reset();
    setDate(undefined);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule One-Time Nudge</DialogTitle>
        </DialogHeader>
        
        <Alert variant="default" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> One-time nudges are for urgent or special cases only. For recurring nudges, please use the Nudge Rules tab.
          </AlertDescription>
        </Alert>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nudge Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter nudge title" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left ${!date ? 'text-muted-foreground' : ''}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="targetGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Group</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all-employees">All Employees</SelectItem>
                      <SelectItem value="managers">Managers Only</SelectItem>
                      <SelectItem value="dev-team">Development Team</SelectItem>
                      <SelectItem value="marketing">Marketing Team</SelectItem>
                      <SelectItem value="inactive-users">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Channel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="in-app">In-App Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    High priority nudges may bypass user notification preferences
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!date}>
                Schedule One-Time Nudge
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleNudgeModal;
