
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Check, 
  Clock, 
  Mail, 
  MessageSquare, 
  Activity,
  Users,
  Bell,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RuleWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    triggerType: '',
    triggerDetails: '',
    targetGroup: '',
    channel: '',
    schedule: '',
    priority: 'medium',
  });
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  
  const handleSelectChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally save the data to your backend
    navigate('/rules');
  };
  
  const triggerTypes = [
    { value: 'inactivity', label: 'Inactivity', icon: <Clock className="h-4 w-4" /> },
    { value: 'time-based', label: 'Time-based', icon: <Calendar className="h-4 w-4" /> },
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
    { value: 'delayed', label: 'Delayed' },
    { value: 'recurring', label: 'Recurring' },
  ];
  
  const targetGroups = [
    { value: 'all-employees', label: 'All Employees' },
    { value: 'managers', label: 'Managers Only' },
    { value: 'dev-team', label: 'Development Team' },
    { value: 'marketing', label: 'Marketing Team' },
    { value: 'inactive-users', label: 'Inactive Users' },
  ];
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="glass-card">
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
                    className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                      step === i 
                        ? 'bg-blue-500 text-white' 
                        : step > i 
                          ? 'bg-green-500 text-white' 
                          : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {i === 1 ? 'Basics' : i === 2 ? 'Trigger' : i === 3 ? 'Target & Channel' : 'Schedule'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary">
                <div 
                  className="h-1 bg-blue-500 transition-all" 
                  style={{ width: `${(step - 1) * 33.33}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Nudge Rule Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter rule name..." 
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    Give your nudge rule a clear, descriptive name
                  </FormDescription>
                </FormItem>
                
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter rule description..." 
                      value={formData.description}
                      onChange={handleInputChange('description')}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Add details about when and why this nudge will be sent
                  </FormDescription>
                </FormItem>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Trigger Type</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {triggerTypes.map((type) => (
                      <div 
                        key={type.value}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.triggerType === type.value 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-border hover:border-blue-200 dark:hover:border-blue-800'
                        }`}
                        onClick={() => handleSelectChange('triggerType')(type.value)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {type.icon}
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
                
                {formData.triggerType && (
                  <FormItem>
                    <FormLabel>Trigger Details</FormLabel>
                    {formData.triggerType === 'inactivity' && (
                      <div className="flex gap-2 items-center">
                        <span>After</span>
                        <Input 
                          type="number" 
                          min="1" 
                          className="w-20" 
                          value={formData.triggerDetails || '3'}
                          onChange={handleInputChange('triggerDetails')}
                        />
                        <span>days of inactivity</span>
                      </div>
                    )}
                    
                    {formData.triggerType === 'time-based' && (
                      <Select 
                        value={formData.triggerDetails} 
                        onValueChange={handleSelectChange('triggerDetails')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily-9am">Daily at 9:00 AM</SelectItem>
                          <SelectItem value="monday-9am">Every Monday at 9:00 AM</SelectItem>
                          <SelectItem value="friday-4pm">Every Friday at 4:00 PM</SelectItem>
                          <SelectItem value="month-first">First day of each month</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    
                    {formData.triggerType === 'event-based' && (
                      <Select 
                        value={formData.triggerDetails} 
                        onValueChange={handleSelectChange('triggerDetails')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="task-assigned">Task Assigned</SelectItem>
                          <SelectItem value="task-completed">Task Completed</SelectItem>
                          <SelectItem value="document-uploaded">Document Uploaded</SelectItem>
                          <SelectItem value="form-submitted">Form Submitted</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </FormItem>
                )}
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Target User Group</FormLabel>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Who should receive this nudge?</span>
                  </div>
                  <Select 
                    value={formData.targetGroup} 
                    onValueChange={handleSelectChange('targetGroup')}
                  >
                    <SelectTrigger>
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
                </FormItem>
                
                <FormItem>
                  <FormLabel>Notification Channel</FormLabel>
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">How should this nudge be delivered?</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {channelTypes.map((channel) => (
                      <Button
                        key={channel.value}
                        type="button"
                        variant={formData.channel === channel.value ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleSelectChange('channel')(channel.value)}
                      >
                        {channel.icon}
                        <span className="ml-2">{channel.label}</span>
                      </Button>
                    ))}
                  </div>
                </FormItem>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Schedule Type</FormLabel>
                  <RadioGroup value={formData.schedule} onValueChange={handleSelectChange('schedule')}>
                    {scheduleTypes.map((type) => (
                      <div 
                        key={type.value}
                        className={`flex items-start space-x-2 p-3 rounded-md border ${
                          formData.schedule === type.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-border'
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
                          <p className="text-sm text-muted-foreground">
                            {type.value === 'immediate' && 'Send as soon as the trigger condition is met'}
                            {type.value === 'delayed' && 'Send after a specified delay from the trigger event'}
                            {type.value === 'recurring' && 'Send repeatedly on a defined schedule'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
                
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <RadioGroup 
                    className="flex space-x-4" 
                    value={formData.priority} 
                    onValueChange={handleSelectChange('priority')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="priority-low" />
                      <label htmlFor="priority-low">Low</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="priority-medium" />
                      <label htmlFor="priority-medium">Medium</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="priority-high" />
                      <label htmlFor="priority-high">High</label>
                    </div>
                  </RadioGroup>
                </FormItem>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md flex gap-3">
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
        </CardContent>
        <CardFooter className="justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => navigate('/rules')}>
              Cancel
            </Button>
          )}
          
          {step < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Create Rule <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RuleWizard;
