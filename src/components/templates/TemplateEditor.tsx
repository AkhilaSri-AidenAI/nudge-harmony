
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Gift, MessageSquare, PartyPopper, Rocket, Star, Trophy, Zap } from "lucide-react";
import { cn } from '@/lib/utils';

const templateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Template name must be at least 2 characters.",
  }),
  type: z.enum(['email', 'sms', 'whatsapp', 'in-app']),
  subject: z.string().optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

type TemplateFormValues = z.infer<typeof templateFormSchema>;

interface TemplateEditorProps {
  existingTemplate?: any;
}

// Predefined templates for different channel types
const predefinedTemplates = {
  email: [
    { 
      name: "Welcome Email", 
      subject: "Welcome to Our Platform!",
      content: "Hello {{name}},\n\nWelcome to our platform! We're excited to have you on board.\n\nHere are some quick tips to get started:\n- Complete your profile\n- Explore features\n- Reach out if you need help\n\nBest regards,\nThe Team",
      icon: <Rocket className="h-10 w-10 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      description: "The perfect warm welcome for new users"
    },
    { 
      name: "Task Reminder", 
      subject: "Reminder: Task Due Soon",
      content: "Hello {{name}},\n\nThis is a friendly reminder that your task \"{{task}}\" is due on {{date}}.\n\nPlease make sure to complete it on time.\n\nThanks,\nProject Management Team",
      icon: <Calendar className="h-10 w-10 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      description: "Keep users on track with their tasks"
    },
    { 
      name: "Achievement Unlocked", 
      subject: "Congratulations on Your Achievement!",
      content: "Hello {{name}},\n\nCongratulations! You've just unlocked the \"{{achievement}}\" badge.\n\nKeep up the great work and continue exploring our platform to unlock more achievements.\n\nCheers,\nThe Team",
      icon: <Trophy className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
      description: "Celebrate user achievements and milestones"
    }
  ],
  sms: [
    { 
      name: "Login OTP", 
      content: "Your verification code is {{code}}. Valid for 10 minutes. Do not share this code with anyone.",
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      description: "Secure account access with verification codes"
    },
    { 
      name: "Appointment Reminder", 
      content: "Reminder: You have an appointment scheduled for {{date}} at {{time}}. Reply YES to confirm or NO to reschedule.",
      icon: <Calendar className="h-10 w-10 text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      description: "Keep clients informed about upcoming appointments"
    },
    { 
      name: "Special Offer", 
      content: "🎉 Special offer just for you! Use code {{code}} to get {{discount}}% off your next purchase. Valid until {{date}}.",
      icon: <Gift className="h-10 w-10 text-red-500" />,
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      description: "Drive conversions with limited-time offers"
    }
  ],
  whatsapp: [
    { 
      name: "Support Ticket Update", 
      content: "Hello {{name}},\n\nYour support ticket #{{ticketId}} has been updated. Status: {{status}}.\n\nClick here to view details: {{link}}",
      icon: <MessageSquare className="h-10 w-10 text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      description: "Keep users updated on their support requests"
    },
    { 
      name: "Order Confirmation", 
      content: "Thank you for your order #{{orderId}}!\n\nYour order is being processed and will be shipped soon.\n\nOrder details:\n- Items: {{items}}\n- Total: {{total}}\n- Delivery: {{deliveryDate}}\n\nTrack your order: {{trackingLink}}",
      icon: <PartyPopper className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
      description: "Confirm orders and share tracking information"
    }
  ],
  "in-app": [
    { 
      name: "New Feature Announcement", 
      content: "We've just launched {{feature}}! Check it out now to improve your workflow.",
      icon: <Rocket className="h-10 w-10 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      description: "Announce new features and drive adoption"
    },
    { 
      name: "Document Review Request", 
      content: "{{sender}} has requested your review on document \"{{document}}\".",
      icon: <MessageSquare className="h-10 w-10 text-violet-500" />,
      color: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
      description: "Streamline document review workflows"
    },
    { 
      name: "Milestone Celebration", 
      content: "🎉 Amazing! You've reached {{milestone}}. That's a big achievement!",
      icon: <Star className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
      description: "Celebrate user milestones and progress"
    }
  ]
};

// Add inspiration templates for creative content ideas
const inspirationTemplates = {
  email: [
    "🎉 Congrats {{name}}! Your {{achievement}} deserves a celebration!",
    "🚀 Ready for a productivity boost? Here's a tip: {{tip}}",
    "💡 Did you know? {{fact}} Try it out today!"
  ],
  sms: [
    "🎁 Surprise! We've added {{bonus}} to your account. Enjoy!",
    "⚡ Quick update: {{update}}. Check your account now.",
    "🔔 Just a heads up: {{reminder}} Don't miss out!"
  ],
  whatsapp: [
    "✨ Custom recommendation just for you: {{recommendation}}",
    "📊 Your weekly summary: {{summary}}. Great progress!",
    "🎯 Goal alert: You're {{percentage}}% toward {{goal}}. Keep going!"
  ],
  "in-app": [
    "🏆 Achievement unlocked! {{achievement}} +{{points}} points",
    "👋 {{name}} just {{action}}. Want to connect?",
    "📈 Trending now: {{trend}}. Explore it?"
  ]
};

// Variable suggestion helper
const variableSuggestions = {
  email: ["name", "date", "company", "product", "link", "unsubscribe_link"],
  sms: ["name", "code", "date", "time", "amount"],
  whatsapp: ["name", "order_id", "status", "link", "amount"],
  "in-app": ["name", "action", "date", "points", "milestone"]
};

// Add a function to save template to localStorage
const saveTemplateToStorage = (template: any) => {
  try {
    const existingTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
    const newTemplate = {
      id: Date.now().toString(),
      ...template,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('templates', JSON.stringify([...existingTemplates, newTemplate]));
    return newTemplate;
  } catch (error) {
    console.error('Error saving template:', error);
    throw error;
  }
};

const TemplateEditor: React.FC<TemplateEditorProps> = ({ existingTemplate }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplateType, setSelectedTemplateType] = useState(existingTemplate?.type || 'email');
  const [activeTab, setActiveTab] = useState('templates');
  const [inspirationText, setInspirationText] = useState('');
  
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: existingTemplate?.name || "",
      type: existingTemplate?.type || "email",
      subject: existingTemplate?.subject || "",
      content: existingTemplate?.content || "",
    },
  });
  
  useEffect(() => {
    // Update inspiration text randomly every 10 seconds
    const inspirationArray = inspirationTemplates[selectedTemplateType];
    if (inspirationArray) {
      setInspirationText(inspirationArray[Math.floor(Math.random() * inspirationArray.length)]);
      
      const interval = setInterval(() => {
        setInspirationText(inspirationArray[Math.floor(Math.random() * inspirationArray.length)]);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [selectedTemplateType]);
  
  const onSubmit = async (data: TemplateFormValues) => {
    try {
      setIsSubmitting(true);
      console.log('Form data submitted:', data);
      
      // Save the template to storage (in a real app, this would be an API call)
      const savedTemplate = saveTemplateToStorage(data);
      
      toast.success('Template saved successfully!');
      navigate('/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyPredefinedTemplate = (template: any) => {
    form.setValue('name', template.name);
    if (template.subject) {
      form.setValue('subject', template.subject);
    }
    form.setValue('content', template.content);
  };
  
  const handleTemplateTypeChange = (value: string) => {
    setSelectedTemplateType(value as 'email' | 'sms' | 'whatsapp' | 'in-app');
    form.setValue('type', value as any);
    
    // Clear subject if not email
    if (value !== 'email') {
      form.setValue('subject', '');
    }
  };
  
  const insertVariable = (variable: string) => {
    const content = form.getValues('content');
    form.setValue('content', `${content}{{${variable}}}`);
  };
  
  const generateRandomInspiration = () => {
    const inspirationArray = inspirationTemplates[selectedTemplateType];
    if (inspirationArray) {
      setInspirationText(inspirationArray[Math.floor(Math.random() * inspirationArray.length)]);
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Template Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Template Editor</span>
            </TabsTrigger>
            <TabsTrigger value="inspiration" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Inspiration</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Template Gallery</h2>
              <Select 
                value={selectedTemplateType} 
                onValueChange={handleTemplateTypeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predefinedTemplates[selectedTemplateType]?.map((template, index) => (
                <Card 
                  key={index} 
                  className={cn(
                    "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border", 
                    template.color
                  )}
                  onClick={() => {
                    applyPredefinedTemplate(template);
                    setActiveTab('editor');
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.subject && <CardDescription>{template.subject}</CardDescription>}
                      </div>
                      <div>{template.icon}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground">
                    {template.description}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => setActiveTab('editor')} 
                className="gap-2"
                size="lg"
              >
                <Zap className="h-4 w-4" /> Create Custom Template
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="editor">
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Template Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Type</FormLabel>
                          <Select 
                            onValueChange={(value) => handleTemplateTypeChange(value)} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="in-app">In-App</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.getValues("type") === "email" && (
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Email Subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Template Content" 
                            {...field} 
                            rows={8}
                            className="font-mono"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-2">Add Variables:</h3>
                    <div className="flex flex-wrap gap-2">
                      {variableSuggestions[selectedTemplateType].map((variable) => (
                        <Button
                          key={variable}
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => insertVariable(variable)}
                          className="text-xs"
                        >
                          {`{{${variable}}}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate('/templates')}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2">
                      {isSubmitting ? "Saving..." : "Save Template"}
                      <Rocket className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
          
          <TabsContent value="inspiration">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Need Inspiration?</h2>
              
              <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-0">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Template Ideas</h3>
                    <Button variant="ghost" size="sm" onClick={generateRandomInspiration} className="gap-2">
                      <Zap className="h-4 w-4" /> New Idea
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-black/20 p-6 rounded-lg shadow-sm border text-center">
                    <p className="text-xl italic">"{inspirationText}"</p>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-500" /> Effective Techniques
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>• Use personalization to increase engagement</p>
                        <p>• Keep SMS messages under 160 characters</p>
                        <p>• Include clear call-to-action in emails</p>
                        <p>• Test different subject lines for best results</p>
                        <p>• Use emojis strategically to grab attention</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Rocket className="h-5 w-5 text-blue-500" /> Quick Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>• Address users by their name</p>
                        <p>• Keep language simple and friendly</p>
                        <p>• Preview on mobile for best results</p>
                        <p>• Include dynamic content with variables</p>
                        <p>• Test all links before sending</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => setActiveTab('editor')} 
                  className="gap-2"
                  size="lg"
                >
                  <MessageSquare className="h-4 w-4" /> Create Your Template
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemplateEditor;
