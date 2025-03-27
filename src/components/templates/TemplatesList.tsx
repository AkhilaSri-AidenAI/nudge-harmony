
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Mail, MessageSquare, Bell, Search, FileText, MoreVertical, Edit, Copy, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp' | 'in-app';
  preview: string;
  createdAt: string;
  lastUpdated: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Weekly Status Update',
    type: 'email',
    preview: 'Hi {firstName}, it\'s time for your weekly status update...',
    createdAt: '2023-05-15',
    lastUpdated: '2023-06-10',
  },
  {
    id: '2',
    name: 'Task Reminder',
    type: 'email',
    preview: 'Don\'t forget to complete {taskName} by {dueDate}...',
    createdAt: '2023-04-22',
    lastUpdated: '2023-06-12',
  },
  {
    id: '3',
    name: 'SMS Verification',
    type: 'sms',
    preview: 'Your verification code is {code}. Valid for 10 minutes.',
    createdAt: '2023-05-03',
    lastUpdated: '2023-05-03',
  },
  {
    id: '4',
    name: 'WhatsApp Welcome',
    type: 'whatsapp',
    preview: 'Welcome to {companyName}! We\'re excited to have you join us.',
    createdAt: '2023-06-01',
    lastUpdated: '2023-06-05',
  },
  {
    id: '5',
    name: 'Inactivity Alert',
    type: 'in-app',
    preview: 'You haven\'t logged in for {days} days. Click here to resume.',
    createdAt: '2023-03-17',
    lastUpdated: '2023-05-22',
  },
];

const typeIcons = {
  'email': <Mail className="h-5 w-5" />,
  'sms': <MessageSquare className="h-5 w-5" />,
  'whatsapp': <MessageSquare className="h-5 w-5" />,
  'in-app': <Bell className="h-5 w-5" />,
};

const TemplatesList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTemplates = mockTemplates.filter(template => 
    (activeTab === 'all' || template.type === activeTab) &&
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="relative max-w-sm w-full">
          <Input 
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <Button onClick={() => navigate('/templates/new')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="in-app">In-App</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="glass-card rounded-xl overflow-hidden border border-border animate-scale-in hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300">
                        {typeIcons[template.type]}
                      </div>
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant="outline" className="text-xs capitalize mt-1">
                          {template.type}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/templates/edit/${template.id}`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="bg-secondary rounded-md p-3 text-sm text-muted-foreground">
                      <div className="flex items-center mb-2">
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">Preview</span>
                      </div>
                      <p className="truncate">{template.preview}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-3 flex justify-between">
                      <span>Created: {template.createdAt}</span>
                      <span>Last updated: {template.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No templates found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm ? 'Try adjusting your search criteria' : 'Create your first template to get started'}
              </p>
              <Button className="mt-4" onClick={() => navigate('/templates/new')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Template
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesList;
