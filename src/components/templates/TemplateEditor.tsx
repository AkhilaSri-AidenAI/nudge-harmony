
import React, { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from 'sonner';

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
      content: "Hello {{name}},\n\nWelcome to our platform! We're excited to have you on board.\n\nHere are some quick tips to get started:\n- Complete your profile\n- Explore features\n- Reach out if you need help\n\nBest regards,\nThe Team"
    },
    { 
      name: "Task Reminder", 
      subject: "Reminder: Task Due Soon",
      content: "Hello {{name}},\n\nThis is a friendly reminder that your task \"{{task}}\" is due on {{date}}.\n\nPlease make sure to complete it on time.\n\nThanks,\nProject Management Team"
    }
  ],
  sms: [
    { 
      name: "Login OTP", 
      content: "Your verification code is {{code}}. Valid for 10 minutes. Do not share this code with anyone."
    },
    { 
      name: "Appointment Reminder", 
      content: "Reminder: You have an appointment scheduled for {{date}} at {{time}}. Reply YES to confirm or NO to reschedule."
    }
  ],
  whatsapp: [
    { 
      name: "Support Ticket Update", 
      content: "Hello {{name}},\n\nYour support ticket #{{ticketId}} has been updated. Status: {{status}}.\n\nClick here to view details: {{link}}"
    }
  ],
  "in-app": [
    { 
      name: "New Feature Announcement", 
      content: "We've just launched {{feature}}! Check it out now to improve your workflow."
    },
    { 
      name: "Document Review Request", 
      content: "{{sender}} has requested your review on document \"{{document}}\"."
    }
  ]
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
  
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: existingTemplate?.name || "",
      type: existingTemplate?.type || "email",
      subject: existingTemplate?.subject || "",
      content: existingTemplate?.content || "",
    },
  });
  
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
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Predefined Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {predefinedTemplates[selectedTemplateType]?.map((template, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => applyPredefinedTemplate(template)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">{template.name}</CardTitle>
                {template.subject && <CardDescription>{template.subject}</CardDescription>}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            
            {form.getValues("type") === "email" && (
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
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
                    <Textarea placeholder="Template Content" {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/templates')}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Template"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TemplateEditor;
