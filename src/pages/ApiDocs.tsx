
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link } from 'lucide-react';

const apiEndpoints = [
  {
    id: 'auth',
    name: 'Authentication',
    endpoints: [
      {
        path: '/api/auth/login',
        method: 'POST',
        description: 'Authenticate a user and obtain a session token',
        request: {
          email: 'user@example.com',
          password: 'password123'
        },
        response: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: '123',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'admin'
          },
          expires: '2023-12-31T23:59:59Z'
        }
      },
      {
        path: '/api/auth/logout',
        method: 'POST',
        description: 'Invalidate the current user session',
        request: {},
        response: {
          success: true,
          message: 'Logged out successfully'
        }
      }
    ]
  },
  {
    id: 'nudges',
    name: 'Nudges',
    endpoints: [
      {
        path: '/api/nudges',
        method: 'GET',
        description: 'Get all nudges for the current user',
        request: {},
        response: {
          nudges: [
            {
              id: '1',
              title: 'Complete your profile',
              content: 'Your profile is 70% complete. Finish it to unlock premium features.',
              priority: 'medium',
              created_at: '2023-01-15T10:30:00Z'
            }
          ]
        }
      },
      {
        path: '/api/nudges',
        method: 'POST',
        description: 'Create a new nudge',
        request: {
          title: 'Task reminder',
          content: 'Don\'t forget to complete your task by Friday',
          recipient_id: '456',
          priority: 'high',
          channel: 'email',
          scheduled_for: '2023-06-01T14:00:00Z'
        },
        response: {
          id: '789',
          success: true,
          message: 'Nudge scheduled successfully'
        }
      },
      {
        path: '/api/nudges/:id',
        method: 'DELETE',
        description: 'Delete a specific nudge',
        request: {},
        response: {
          success: true,
          message: 'Nudge deleted successfully'
        }
      }
    ]
  },
  {
    id: 'templates',
    name: 'Templates',
    endpoints: [
      {
        path: '/api/templates',
        method: 'GET',
        description: 'Get all templates',
        request: {},
        response: {
          templates: [
            {
              id: '1',
              name: 'Welcome Email',
              type: 'email',
              subject: 'Welcome to our platform!',
              content: 'Hello {{name}}, welcome to our platform...',
              created_at: '2023-01-10T08:45:00Z'
            }
          ]
        }
      },
      {
        path: '/api/templates',
        method: 'POST',
        description: 'Create a new template',
        request: {
          name: 'Task Reminder',
          type: 'email',
          subject: 'Reminder: Task Due Soon',
          content: 'Hello {{name}}, your task "{{task}}" is due on {{date}}...'
        },
        response: {
          id: '2',
          success: true,
          message: 'Template created successfully'
        }
      }
    ]
  },
  {
    id: 'rules',
    name: 'Nudge Rules',
    endpoints: [
      {
        path: '/api/rules',
        method: 'GET',
        description: 'Get all nudge rules',
        request: {},
        response: {
          rules: [
            {
              id: '1',
              name: 'Inactive User Reminder',
              condition: 'last_login > 30 days',
              action: 'send_nudge',
              template_id: '3',
              target_group: 'inactive-users',
              frequency: 'weekly',
              created_at: '2023-02-05T14:30:00Z'
            }
          ]
        }
      },
      {
        path: '/api/rules',
        method: 'POST',
        description: 'Create a new nudge rule',
        request: {
          name: 'New Feature Announcement',
          condition: 'user.role == "premium"',
          action: 'send_nudge',
          template_id: '4',
          target_group: 'premium-users',
          frequency: 'once'
        },
        response: {
          id: '2',
          success: true,
          message: 'Rule created successfully'
        }
      }
    ]
  }
];

const JsonViewer = ({ data }: { data: any }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2" 
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="bg-muted p-4 rounded-md overflow-auto max-h-80 text-sm">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

const EndpointCard = ({ endpoint }: { endpoint: any }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <span className={`inline-block px-2 py-1 text-xs rounded mr-2 font-bold
                ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                endpoint.method === 'POST' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                endpoint.method === 'PUT' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' :
                endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'}`}>
                {endpoint.method}
              </span>
              {endpoint.path}
            </CardTitle>
            <CardDescription className="mt-2">
              {endpoint.description}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Link className="h-3.5 w-3.5" />
            <span className="text-xs">Copy URL</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="request">
          <TabsList className="mb-4">
            <TabsTrigger value="request">Request</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>
          <TabsContent value="request">
            <JsonViewer data={endpoint.request} />
          </TabsContent>
          <TabsContent value="response">
            <JsonViewer data={endpoint.response} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ApiDocs: React.FC = () => {
  return (
    <PageContainer>
      <div className="page-header mb-8">
        <h1 className="page-title">API Documentation</h1>
        <p className="page-description">Reference documentation for all available API endpoints</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Basic information to get started with our API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Base URL</h3>
                <div className="bg-muted p-3 rounded flex justify-between items-center">
                  <code>https://api.nudgeai.com/v1</code>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  All API requests require authentication using a Bearer token in the Authorization header:
                </p>
                <div className="bg-muted p-3 rounded">
                  <code>Authorization: Bearer YOUR_API_TOKEN</code>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Rate Limiting</h3>
                <p className="text-sm text-muted-foreground">
                  API requests are limited to 100 requests per minute per token. If you exceed this limit, 
                  you'll receive a 429 Too Many Requests response.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Accordion type="single" collapsible className="w-full">
          {apiEndpoints.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="text-lg font-semibold">{category.name}</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pl-1">
                  {category.endpoints.map((endpoint, index) => (
                    <EndpointCard key={index} endpoint={endpoint} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageContainer>
  );
};

export default ApiDocs;
