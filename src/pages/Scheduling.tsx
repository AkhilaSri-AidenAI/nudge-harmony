import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Filter, Plus, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import ScheduleNudgeModal, { ScheduleNudgeData } from '@/components/scheduling/ScheduleNudgeModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface NudgeEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  priority: 'low' | 'medium' | 'high';
  channel: 'email' | 'sms' | 'whatsapp' | 'in-app';
  targetGroup: string;
}

const priorityColorMap = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 hover:bg-green-200',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 hover:bg-red-200',
};

const channelIconMap = {
  email: '📧',
  sms: '📱',
  whatsapp: '💬',
  'in-app': '🔔',
};

const targetGroupMap: Record<string, string> = {
  'all-employees': 'All Employees',
  'managers': 'Managers Only',
  'dev-team': 'Development Team',
  'marketing': 'Marketing Team',
  'inactive-users': 'Inactive Users',
};

const getEventsFromStorage = (): NudgeEvent[] => {
  try {
    const storedEvents = JSON.parse(localStorage.getItem('nudgeEvents') || '[]');
    return storedEvents.map((event: any) => ({
      ...event,
      date: new Date(event.date)
    }));
  } catch (error) {
    console.error('Error retrieving events:', error);
    return [];
  }
};

const saveEventsToStorage = (events: NudgeEvent[]) => {
  try {
    localStorage.setItem('nudgeEvents', JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events:', error);
  }
};

const initialEvents: NudgeEvent[] = [
  {
    id: '1',
    title: 'Weekly Status Update',
    date: new Date(),
    time: '09:00',
    priority: 'medium',
    channel: 'email',
    targetGroup: 'all-employees'
  },
  {
    id: '2',
    title: 'Overdue Task Reminder',
    date: new Date(),
    time: '11:00',
    priority: 'high',
    channel: 'in-app',
    targetGroup: 'dev-team'
  }
];

const Scheduling: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [nudgeEvents, setNudgeEvents] = useState<NudgeEvent[]>([]);
  const [allEvents, setAllEvents] = useState<NudgeEvent[]>([]);
  const [filters, setFilters] = useState({
    priority: '',
    channel: '',
    targetGroup: '',
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  useEffect(() => {
    const storedEvents = getEventsFromStorage();
    const events = storedEvents.length > 0 ? storedEvents : initialEvents;
    setAllEvents(events);
    
    filterEventsByDate(date, events);
    
    if (storedEvents.length === 0) {
      saveEventsToStorage(initialEvents);
    }
  }, []);
  
  const filterEventsByDate = (selectedDate: Date | undefined, eventsToFilter = allEvents) => {
    if (!selectedDate) {
      setNudgeEvents(eventsToFilter);
      return;
    }
    
    const filteredByDate = eventsToFilter.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() && 
      event.date.getFullYear() === selectedDate.getFullYear()
    );
    
    setNudgeEvents(filteredByDate);
  };
  
  useEffect(() => {
    filterEventsByDate(date);
  }, [date, allEvents]);
  
  useEffect(() => {
    const newActiveFilters: string[] = [];
    if (filters.priority) newActiveFilters.push(`Priority: ${filters.priority}`);
    if (filters.channel) newActiveFilters.push(`Channel: ${filters.channel}`);
    if (filters.targetGroup) newActiveFilters.push(`Group: ${targetGroupMap[filters.targetGroup] || filters.targetGroup}`);
    setActiveFilters(newActiveFilters);
    
    let filteredEvents = [...allEvents];
    
    if (filters.priority) {
      filteredEvents = filteredEvents.filter(event => event.priority === filters.priority);
    }
    
    if (filters.channel) {
      filteredEvents = filteredEvents.filter(event => event.channel === filters.channel);
    }
    
    if (filters.targetGroup) {
      filteredEvents = filteredEvents.filter(event => event.targetGroup === filters.targetGroup);
    }
    
    filterEventsByDate(date, filteredEvents);
  }, [filters, allEvents]);
  
  const handleSchedule = (data: ScheduleNudgeData) => {
    const newEvent: NudgeEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      date: data.date,
      time: data.time,
      priority: data.priority as 'low' | 'medium' | 'high',
      channel: data.channel as 'email' | 'sms' | 'whatsapp' | 'in-app',
      targetGroup: data.targetGroup
    };
    
    const updatedEvents = [...allEvents, newEvent];
    setAllEvents(updatedEvents);
    
    if (date && 
        newEvent.date.getDate() === date.getDate() && 
        newEvent.date.getMonth() === date.getMonth() && 
        newEvent.date.getFullYear() === date.getFullYear()) {
      setNudgeEvents([...nudgeEvents, newEvent]);
    }
    
    saveEventsToStorage(updatedEvents);
    
    toast.success('Nudge scheduled successfully!');
  };
  
  const removeNudge = (id: string) => {
    const updatedAllEvents = allEvents.filter(event => event.id !== id);
    setAllEvents(updatedAllEvents);
    setNudgeEvents(nudgeEvents.filter(event => event.id !== id));
    
    saveEventsToStorage(updatedAllEvents);
    
    toast.success('Nudge removed from schedule');
  };
  
  const resetFilters = () => {
    setFilters({
      priority: '',
      channel: '',
      targetGroup: '',
    });
    setFiltersOpen(false);
    
    filterEventsByDate(date);
  };
  
  const removeFilter = (filterType: 'priority' | 'channel' | 'targetGroup') => {
    setFilters(prev => ({
      ...prev,
      [filterType]: ''
    }));
  };
  
  const eventDates = allEvents.map(event => event.date);
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Scheduling</h1>
          <p className="page-description">Schedule one-time urgent nudges</p>
        </div>
        
        <div className="flex gap-2">
          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h3 className="font-medium">Filter Nudges</h3>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Priority</label>
                  <Select 
                    value={filters.priority} 
                    onValueChange={(value) => setFilters({...filters, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Channel</label>
                  <Select 
                    value={filters.channel} 
                    onValueChange={(value) => setFilters({...filters, channel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any channel</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="in-app">In-App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Target Group</label>
                  <Select 
                    value={filters.targetGroup} 
                    onValueChange={(value) => setFilters({...filters, targetGroup: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any group</SelectItem>
                      <SelectItem value="all-employees">All Employees</SelectItem>
                      <SelectItem value="managers">Managers Only</SelectItem>
                      <SelectItem value="dev-team">Development Team</SelectItem>
                      <SelectItem value="marketing">Marketing Team</SelectItem>
                      <SelectItem value="inactive-users">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <Button size="sm" onClick={() => setFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Schedule Nudge
          </Button>
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => {
            const filterType = filter.split(':')[0].trim().toLowerCase();
            const filterKey = filterType === 'priority' ? 'priority' : 
                              filterType === 'channel' ? 'channel' : 'targetGroup';
            
            return (
              <Badge 
                key={filter} 
                variant="outline" 
                className="px-3 py-1 flex items-center gap-1"
              >
                {filter}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeFilter(filterKey as any)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={resetFilters}
          >
            Clear all
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" /> 
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: (date) => 
                  eventDates.some(eventDate => 
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  )
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                  backgroundColor: 'var(--primary-50)',
                }
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                <>Scheduled Nudges for {format(date, 'MMMM d, yyyy')}</>
              ) : (
                <>All Scheduled Nudges</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nudgeEvents.length > 0 ? (
              <div className="space-y-3">
                {nudgeEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="mr-3 text-xl" aria-hidden="true">
                          {channelIconMap[event.channel]}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline" className={priorityColorMap[event.priority]}>
                              {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
                            </Badge>
                            <Badge variant="outline">
                              {event.time}
                            </Badge>
                            <Badge variant="outline">
                              {targetGroupMap[event.targetGroup] || event.targetGroup}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeNudge(event.id)}>
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 text-muted-foreground">
                {activeFilters.length > 0 ? (
                  <p>No nudges match the selected filters</p>
                ) : (
                  <p>No nudges scheduled for this date</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <ScheduleNudgeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </PageContainer>
  );
};

export default Scheduling;
