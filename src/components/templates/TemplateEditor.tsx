
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Save, ArrowLeft, Eye, Code, FileText, Mail, MessageSquare, Bell, Tag, User, Clock, Calendar } from 'lucide-react';

const TemplateEditor: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('edit');
  const [formData, setFormData] = useState({
    name: '',
    type: 'email',
    subject: '',
    content: 'Hi {firstName},\n\nWe noticed that you have {taskCount} incomplete tasks that are waiting for your attention.\n\nPlease log in to your dashboard to check them out.\n\nBest regards,\n{companyName} Team',
  });
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  
  const handleSelectChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleSave = () => {
    console.log('Template saved:', formData);
    toast.success('Template saved successfully!');
    navigate('/templates');
  };
  
  const insertVariable = (variable: string) => {
    setFormData({
      ...formData,
      content: formData.content + ` {${variable}}`,
    });
  };
  
  const variables = [
    { name: 'firstName', icon: <User className="h-4 w-4" /> },
    { name: 'lastName', icon: <User className="h-4 w-4" /> },
    { name: 'email', icon: <Mail className="h-4 w-4" /> },
    { name: 'taskName', icon: <FileText className="h-4 w-4" /> },
    { name: 'taskCount', icon: <FileText className="h-4 w-4" /> },
    { name: 'companyName', icon: <Tag className="h-4 w-4" /> },
    { name: 'dueDate', icon: <Calendar className="h-4 w-4" /> },
    { name: 'lastActivity', icon: <Clock className="h-4 w-4" /> },
  ];
  
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/templates')} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Create Template</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
              <CardDescription>
                Create a new message template that can be used in nudge rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Template Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Task Reminder" 
                          value={formData.name}
                          onChange={handleInputChange('name')}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Template Type</FormLabel>
                      <Select 
                        value={formData.type} 
                        onValueChange={handleSelectChange('type')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              <span>Email</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="sms">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>SMS</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="whatsapp">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>WhatsApp</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="in-app">
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 mr-2" />
                              <span>In-App Notification</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </div>
                  
                  {formData.type === 'email' && (
                    <FormItem>
                      <FormLabel>Subject Line</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Your tasks need attention" 
                          value={formData.subject}
                          onChange={handleInputChange('subject')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <div className="mb-2">
                      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                          <TabsTrigger value="edit">
                            <Code className="h-4 w-4 mr-2" />
                            Edit
                          </TabsTrigger>
                          <TabsTrigger value="preview">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <TabsContent value="edit" className="m-0">
                      <FormControl>
                        <Textarea 
                          rows={12}
                          value={formData.content}
                          onChange={handleInputChange('content')}
                          className="font-mono"
                        />
                      </FormControl>
                    </TabsContent>
                    
                    <TabsContent value="preview" className="m-0">
                      <div className="border border-border rounded-md p-4 min-h-[240px] bg-white dark:bg-gray-950">
                        {formData.type === 'email' && (
                          <div className="mb-3 pb-2 border-b">
                            <div className="font-semibold">Subject: {formData.subject || 'No subject'}</div>
                          </div>
                        )}
                        <div className="whitespace-pre-line">
                          {formData.content
                            .replace(/{firstName}/g, 'John')
                            .replace(/{lastName}/g, 'Doe')
                            .replace(/{email}/g, 'john.doe@example.com')
                            .replace(/{taskName}/g, 'Quarterly Report')
                            .replace(/{taskCount}/g, '3')
                            .replace(/{companyName}/g, 'NudgeHarmony')
                            .replace(/{dueDate}/g, 'June 30, 2023')
                            .replace(/{lastActivity}/g, '5 days ago')
                          }
                        </div>
                      </div>
                    </TabsContent>
                  </FormItem>
                </div>
              </Form>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => navigate('/templates')}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Template
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card sticky top-20">
            <CardHeader>
              <CardTitle>Template Variables</CardTitle>
              <CardDescription>
                Insert dynamic content into your template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {variables.map((variable) => (
                  <Button 
                    key={variable.name}
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => insertVariable(variable.name)}
                  >
                    {variable.icon}
                    <span className="ml-2">{variable.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800">
                <h4 className="text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  Tip
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Use variables like {'{firstName}'} to personalize your messages.
                  They will be automatically replaced with actual user data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
