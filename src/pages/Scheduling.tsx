
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, Clock, ArrowRight, Settings, Filter, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ScheduleNudgeModal, { ScheduleNudgeData } from '@/components/scheduling/ScheduleNudgeModal';
import { format, addDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface ScheduledNudge {
  id: string;
  title: string;
  time: string;
  date: string;
  rawDate: Date;
  type: 'recurring' | 'one-time' | 'conditional';
  target: string;
  channel: string;
}

const mockScheduledNudges: ScheduledNudge[] = [
  {
    id: '1',
    title: 'Weekly Update Reminder',
    time: '9:00 AM',
    date: 'Monday, June 26, 2023',
    rawDate: new Date(2023, 5, 26),
    type: 'recurring',
    target: 'All Team Leaders',
    channel: 'email',
  },
  {
    id: '2',
    title: 'Project Status Check',
    time: '4:00 PM',
    date: 'Friday, June 30, 2023',
    rawDate: new Date(2023, 5, 30),
    type: 'one-time',
    target: 'Development Team',
    channel: 'in-app',
  },
  {
    id: '3',
    title: 'Quarterly Review Preparation',
    time: '10:00 AM',
    date: 'Monday, July 3, 2023',
    rawDate: new Date(2023, 6, 3),
    type: 'one-time',
    target: 'Sales Department',
    channel: 'email',
  },
  {
    id: '4',
    title: 'Inactive User Follow-up',
    time: '12:00 PM',
    date: 'Tuesday, July 4, 2023',
    rawDate: new Date(2023, 6, 4),
    type: 'conditional',
    target: 'Inactive Users (15+ days)',
    channel: 'sms',
  },
  {
    id: '5',
    title: 'Team Meeting Reminder',
    time: '9:30 AM',
    date: 'Wednesday, July 5, 2023',
    rawDate: new Date(2023, 6, 5),
    type: 'recurring',
    target: 'Marketing Team',
    channel: 'whatsapp',
  },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timesOfDay = Array.from({ length: 10 }, (_, i) => ({
  hour: i + 8,
  period: 'AM',
})).concat(Array.from({ length: 8 }, (_, i) => ({
  hour: i === 0 ? 12 : i,
  period: 'PM',
})));

const Scheduling: React.FC = () => {
  const [scheduledNudges, setScheduledNudges] = useState<ScheduledNudge[]>(mockScheduledNudges);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleScheduleNudge = (data: ScheduleNudgeData) => {
    const newNudge: ScheduledNudge = {
      id: Date.now().toString(),
      title: data.title,
      time: format(new Date(`2000-01-01T${data.time}`), 'h:mm a'),
      date: format(data.date, 'EEEE, MMMM d, yyyy'),
      rawDate: data.date,
      type: 'one-time',
      target: data.targetGroup === 'all-employees' 
        ? 'All Employees'
        : data.targetGroup === 'managers'
          ? 'Managers Only'
          : data.targetGroup === 'dev-team'
            ? 'Development Team'
            : data.targetGroup === 'marketing'
              ? 'Marketing Team'
              : 'Inactive Users',
      channel: data.channel,
    };
    
    setScheduledNudges([newNudge, ...scheduledNudges]);
    
    toast({
      title: "One-Time Nudge Scheduled",
      description: `"${data.title}" scheduled for ${format(data.date, 'PP')} at ${format(new Date(`2000-01-01T${data.time}`), 'h:mm a')}`,
    });
  };
  
  const deleteNudge = (id: string) => {
    const nudgeToDelete = scheduledNudges.find(nudge => nudge.id === id);
    setScheduledNudges(scheduledNudges.filter(nudge => nudge.id !== id));
    
    toast({
      title: "Nudge Deleted",
      description: `"${nudgeToDelete?.title}" has been removed from the schedule.`,
    });
  };
  
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Get days in the month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month) === 0 ? 6 : getFirstDayOfMonth(year, month) - 1; // Adjust for Monday start
  
  // Get day-specific nudges
  const getDayNudges = (day: number) => {
    return scheduledNudges.filter(nudge => {
      const nudgeDate = nudge.rawDate;
      return nudgeDate.getFullYear() === year && 
             nudgeDate.getMonth() === month && 
             nudgeDate.getDate() === day;
    });
  };
  
  // Filter nudges for selected day
  const selectedDayNudges = scheduledNudges.filter(nudge => {
    const nudgeDate = nudge.rawDate;
    return nudgeDate.getFullYear() === selectedDate.getFullYear() && 
           nudgeDate.getMonth() === selectedDate.getMonth() && 
           nudgeDate.getDate() === selectedDate.getDate();
  });
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Scheduling</h1>
          <p className="page-description">View and manage scheduled nudges</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Schedule One-Time Nudge
        </Button>
      </div>
      
      <Alert variant="default" className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> One-time scheduling is for urgent or special cases only. For regular or recurring nudges, please use the <a href="/rules" className="underline font-medium">Nudge Rules</a> tab to create automated rules.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>All scheduled nudges for {format(currentMonth, 'MMMM yyyy')}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span>{format(currentMonth, 'MMMM yyyy')}</span>
                  <Button variant="outline" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center py-2 text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first day of the month */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="border rounded-md p-1 min-h-[80px] border-border/50 bg-muted/10"></div>
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const dayNudges = getDayNudges(i + 1);
                  const isSelected = 
                    selectedDate.getFullYear() === year && 
                    selectedDate.getMonth() === month && 
                    selectedDate.getDate() === i + 1;
                  
                  return (
                    <div
                      key={i}
                      className={`border rounded-md p-1 min-h-[80px] cursor-pointer ${
                        isSelected
                          ? 'bg-primary/10 border-primary'
                          : dayNudges.length > 0 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                            : 'border-border hover:bg-muted/20'
                      }`}
                      onClick={() => handleDateSelect(new Date(year, month, i + 1))}
                    >
                      <div className="text-right text-sm mb-1">{i + 1}</div>
                      <div className="space-y-1">
                        {dayNudges.slice(0, 2).map(nudge => (
                          <div 
                            key={nudge.id} 
                            className={`p-1 rounded-md text-xs truncate ${
                              nudge.type === 'recurring'
                                ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
                                : nudge.type === 'one-time'
                                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
                                  : 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100'
                            }`}
                          >
                            {nudge.title}
                          </div>
                        ))}
                        {dayNudges.length > 2 && (
                          <div className="text-xs text-center text-muted-foreground">
                            {dayNudges.length - 2} more...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Day Planner: {format(selectedDate, 'EEEE, MMMM d, yyyy')}</CardTitle>
                <Select 
                  defaultValue="today" 
                  onValueChange={(value) => {
                    if (value === 'today') setSelectedDate(new Date());
                    else if (value === 'tomorrow') setSelectedDate(addDays(new Date(), 1));
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timesOfDay.map((time, index) => {
                  const timeNudges = selectedDayNudges.filter(nudge => {
                    const [hour, period] = nudge.time.split(' ');
                    const nudgeHour = parseInt(hour);
                    return nudgeHour === time.hour && period === time.period;
                  });
                  
                  return (
                    <div 
                      key={index}
                      className={`flex border-l-2 ${
                        timeNudges.length > 0 
                          ? 'border-blue-500'
                          : 'border-transparent'
                      } pl-3 py-2`}
                    >
                      <div className="w-16 text-sm text-muted-foreground">
                        {time.hour}:00 {time.period}
                      </div>
                      <div className="flex-1 space-y-2">
                        {timeNudges.map(nudge => (
                          <div 
                            key={nudge.id} 
                            className={`p-2 rounded-md border ${
                              nudge.type === 'recurring'
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800'
                                : nudge.type === 'one-time'
                                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'
                                  : 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">{nudge.title}</h4>
                                <p className="text-xs text-muted-foreground">{nudge.target}</p>
                              </div>
                              <Badge variant="outline" className={`text-xs ${
                                nudge.channel === 'email'
                                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
                                  : nudge.channel === 'in-app'
                                    ? 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100'
                                    : 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
                              } border-none`}>
                                {nudge.channel}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {selectedDayNudges.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No nudges scheduled for this day
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="order-1 lg:order-2">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Nudges</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledNudges.length > 0 ? (
                  scheduledNudges.map((nudge) => (
                    <div
                      key={nudge.id}
                      className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm">{nudge.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${
                            nudge.type === 'recurring' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-none' 
                              : nudge.type === 'one-time'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-none'
                                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-none'
                          }`}
                        >
                          {nudge.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{nudge.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{nudge.time}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {nudge.target}
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <Badge variant="secondary" className="text-xs capitalize">
                            {nudge.channel}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => deleteNudge(nudge.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center h-24 flex flex-col items-center justify-center text-muted-foreground">
                    <Calendar className="h-8 w-8 mb-2 opacity-40" />
                    <p>No nudges scheduled</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Schedule New Nudge
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ScheduleNudgeModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSchedule={handleScheduleNudge} 
      />
    </PageContainer>
  );
};

export default Scheduling;
