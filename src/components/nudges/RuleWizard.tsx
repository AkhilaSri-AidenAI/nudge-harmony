
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Check, 
  Clock, 
  Mail, 
  MessageSquare, 
  Activity,
  Users,
  Bell,
  CheckCircle,
  Database,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type FormValues = {
  name: string;
  description: string;
  triggerType: string;
  triggerDetails: string;
  targetGroup: string;
  channel: string;
  schedule: string;
  priority: string;
  scheduleDate: Date | undefined;
  scheduleTime: string;
}

const saveRuleToDatabase = (rule: FormValues) => {
  console.log('Saving rule to database:', rule);
  return new Promise<void>(resolve => {
    setTimeout(() => {
      try {
        const existingRules = JSON.parse(localStorage.getItem('nudgeRules') || '[]');
        const newRule = {
          id: Date.now().toString(),
          ...rule,
          createdAt: new Date().toISOString(),
          status: 'active'
        };
        localStorage.setItem('nudgeRules', JSON.stringify([...existingRules, newRule]));
        
        // Also update the calendar events if this is a scheduled nudge
        if (rule.triggerType === 'time-based' || rule.schedule === 'recurring') {
          const events = JSON.parse(localStorage.getItem('nudgeEvents') || '[]');
          const eventDate = rule.scheduleDate || new Date();
          const eventTime = rule.scheduleTime || '09:00';
          
          const newEvent = {
            id: newRule.id,
            title: rule.name,
            date: eventDate,
            time: eventTime,
            priority: rule.priority as 'low' | 'medium' | 'high',
            channel: rule.channel as 'email' | 'sms' | 'whatsapp' | 'in-app',
            targetGroup: rule.targetGroup
          };
          localStorage.setItem('nudgeEvents', JSON.stringify([...events, newEvent]));
        }
        
        resolve();
      } catch (error) {
        console.error('Error saving rule:', error);
        throw new Error('Failed to save rule to database');
      }
    }, 1000);
  });
};

const RuleWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      triggerType: '',
      triggerDetails: '',
      targetGroup: '',
      channel: '',
      schedule: '',
      priority: 'medium',
      scheduleDate: undefined,
      scheduleTime: '09:00',
    }
  });
  
  const nextStep = () => {
    setStep(step + 1);
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    setStep(step - 1);
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);
      await saveRuleToDatabase(data);
      
      setIsSuccess(true);
      toast.success('Nudge rule created successfully!', {
        description: 'Your rule has been saved and is now active.'
      });
      
      // Add a slight delay for better UX
      setTimeout(() => {
        navigate('/rules');
      }, 1500);
    } catch (error) {
      console.error('Error creating rule:', error);
      toast.error('Failed to create nudge rule', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsSubmitting(false);
    }
  });
  
  const triggerTypes = [
    { value: 'inactivity', label: 'Inactivity', icon: <Clock className="h-4 w-4" /> },
    { value: 'time-based', label: 'Time-based', icon: <CalendarIcon className="h-4 w-4" /> },
    { value: 'event-based', label: 'Event-based', icon: <Activity className="h-4 w-4" /> },
  ];
  
  const channelTypes = [
    { value: 'email', label: 'Email', icon: <Mail className="h-4 w-4" /> },
    { value: 'sms', label: 'SMS', icon: <MessageSquare className="h-4 w-4" /> },
    { value: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="h-4 w-4" /> },
    { value: 'in-app', label: 'In-App Notification', icon: <Bell className="h-4 w-4" /> },
  ];
  
  const scheduleTypes = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'recurring', label: 'Recurring' },
  ];
  
  const targetGroups = [
    { value: 'all-employees', label: 'All Employees' },
    { value: 'managers', label: 'Managers Only' },
    { value: 'dev-team', label: 'Development Team' },
    { value: 'marketing', label: 'Marketing Team' },
    { value: 'inactive-users', label: 'Inactive Users' },
  ];
  
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Nudge Rule Created!</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          Your nudge rule has been successfully saved to the database and is now active.
        </p>
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <Database className="h-4 w-4" />
          <span>Data saved successfully</span>
        </div>
        <Button onClick={() => navigate('/rules')} className="min-w-[200px]">
          View All Rules
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <CardHeader>
        <CardTitle>Create New Nudge Rule</CardTitle>
        <CardDescription>
          Configure a new automated nudge to keep your team engaged
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    step === i 
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' 
                      : step > i 
                        ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                        : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {step > i ? <Check className="h-5 w-5" /> : i}
                </div>
                <span className={`text-xs ${step === i ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {i === 1 ? 'Basics' : i === 2 ? 'Trigger' : i === 3 ? 'Target & Channel' : 'Schedule'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-full">
              <div 
                className="h-1 bg-blue-500 rounded-full transition-all duration-300" 
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nudge Rule Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter rule name..." 
                          {...field}
                          className="border-input/60 focus-visible:ring-blue-500/70 transition-all"
                        />
                      </FormControl>
                      <FormDescription>
                        Give your nudge rule a clear, descriptive name
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter rule description..." 
                          rows={4}
                          {...field}
                          className="border-input/60 focus-visible:ring-blue-500/70 resize-none transition-all"
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Add details about when and why this nudge will be sent
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="triggerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trigger Type</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {triggerTypes.map((type) => (
                          <div 
                            key={type.value}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800 ${
                              field.value === type.value 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                                : 'border-border/60 hover:shadow-sm'
                            }`}
                            onClick={() => field.onChange(type.value)}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`h-8 w-8 rounded-full ${
                                field.value === type.value 
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                                  : 'bg-muted text-muted-foreground'
                              } flex items-center justify-center transition-colors`}>
                                {type.icon}
                              </div>
                              <span className="font-medium">{type.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {type.value === 'inactivity' && 'Trigger based on user inactivity periods'}
                              {type.value === 'time-based' && 'Trigger at specific dates/times'}
                              {type.value === 'event-based' && 'Trigger after specific user actions'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
                
                {form.watch('triggerType') && (
                  <FormField
                    control={form.control}
                    name="triggerDetails"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel>Trigger Details</FormLabel>
                        {form.watch('triggerType') === 'inactivity' && (
                          <div className="flex gap-2 items-center p-3 border border-border/60 rounded-md bg-background/50">
                            <span>After</span>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                className="w-20 text-center" 
                                {...field}
                                value={field.value || '3'}
                              />
                            </FormControl>
                            <span>days of inactivity</span>
                          </div>
                        )}
                        
                        {form.watch('triggerType') === 'time-based' && (
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="border-input/60">
                                <SelectValue placeholder="Select schedule" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily-9am">Daily at 9:00 AM</SelectItem>
                                <SelectItem value="monday-9am">Every Monday at 9:00 AM</SelectItem>
                                <SelectItem value="friday-4pm">Every Friday at 4:00 PM</SelectItem>
                                <SelectItem value="month-first">First day of each month</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                        
                        {form.watch('triggerType') === 'event-based' && (
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="border-input/60">
                                <SelectValue placeholder="Select event" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="task-assigned">Task Assigned</SelectItem>
                                <SelectItem value="task-completed">Task Completed</SelectItem>
                                <SelectItem value="document-uploaded">Document Uploaded</SelectItem>
                                <SelectItem value="form-submitted">Form Submitted</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="targetGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target User Group</FormLabel>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Who should receive this nudge?</span>
                      </div>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="border-input/60">
                            <SelectValue placeholder="Select target group" />
                          </SelectTrigger>
                          <SelectContent>
                            {targetGroups.map((group) => (
                              <SelectItem key={group.value} value={group.value}>
                                {group.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Channel</FormLabel>
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">How should this nudge be delivered?</span>
                      </div>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {channelTypes.map((channel) => (
                            <Button
                              key={channel.value}
                              type="button"
                              variant={field.value === channel.value ? "default" : "outline"}
                              className={`justify-start ${field.value === channel.value ? 'shadow-md' : 'border-input/60'}`}
                              onClick={() => field.onChange(channel.value)}
                            >
                              <div className={`h-6 w-6 rounded-full ${
                                field.value === channel.value 
                                  ? 'bg-primary-foreground' 
                                  : 'bg-muted'
                              } flex items-center justify-center mr-2 transition-colors`}>
                                {channel.icon}
                              </div>
                              <span>{channel.label}</span>
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule Type</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          value={field.value}
                          onValueChange={field.onChange}
                          className="space-y-3"
                        >
                          {scheduleTypes.map((type) => (
                            <div 
                              key={type.value}
                              className={`flex items-start space-x-2 p-4 rounded-md border transition-all ${
                                field.value === type.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' : 'border-border/60'
                              }`}
                            >
                              <RadioGroupItem value={type.value} id={type.value} />
                              <div>
                                <label 
                                  htmlFor={type.value} 
                                  className="font-medium cursor-pointer block"
                                >
                                  {type.label}
                                </label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {type.value === 'immediate' && 'Send as soon as the trigger condition is met'}
                                  {type.value === 'recurring' && 'Send repeatedly on a defined schedule'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {(form.watch('schedule') === 'recurring' || form.watch('triggerType') === 'time-based') && (
                  <div className="space-y-4 border border-blue-200 dark:border-blue-800/60 p-4 rounded-md bg-blue-50/50 dark:bg-blue-900/10 animate-fade-in">
                    <h3 className="text-base font-medium">Schedule Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="scheduleDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal flex justify-between items-center ${!field.value && "text-muted-foreground"}`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 z-50" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select when the nudge should be sent
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="scheduleTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="time"
                                    {...field}
                                    className="pl-9"
                                  />
                                  <Clock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                                </div>
                              </FormControl>
                            </div>
                            <FormDescription>
                              Select the time for sending the nudge
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="border border-border/60 p-4 rounded-md">
                      <FormLabel className="text-base">Priority</FormLabel>
                      <FormDescription className="mt-1 mb-3">
                        Set the importance level of this nudge
                      </FormDescription>
                      <FormControl>
                        <RadioGroup 
                          className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0" 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/10 p-2 rounded-md">
                            <RadioGroupItem value="low" id="priority-low" />
                            <label htmlFor="priority-low" className="text-green-700 dark:text-green-400 font-medium">Low</label>
                          </div>
                          <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/10 p-2 rounded-md">
                            <RadioGroupItem value="medium" id="priority-medium" />
                            <label htmlFor="priority-medium" className="text-blue-700 dark:text-blue-400 font-medium">Medium</label>
                          </div>
                          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/10 p-2 rounded-md">
                            <RadioGroupItem value="high" id="priority-high" />
                            <label htmlFor="priority-high" className="text-red-700 dark:text-red-400 font-medium">High</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md flex gap-3 animate-fade-in">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Important Note</h4>
                    <p className="text-sm text-muted-foreground">
                      High priority nudges will bypass user notification preferences and may be delivered
                      through multiple channels. Use sparingly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/20 p-4">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep} className="border-input/60">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={() => navigate('/rules')} className="border-input/60">
            Cancel
          </Button>
        )}
        
        {step < 4 ? (
          <Button 
            type="button" 
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white min-w-[120px] shadow-md shadow-green-500/20"
          >
            {isSubmitting ? (
              <>
                <span className="spinner mr-2"></span>
                Saving...
              </>
            ) : (
              <>
                Create Rule <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </div>
  );
};

export default RuleWizard;
