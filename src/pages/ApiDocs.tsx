
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from 'sonner';

interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  category: string;
  request?: {
    headers?: Record<string, string>;
    body?: any;
    queryParams?: Record<string, string>;
  };
  response?: {
    success?: any;
    error?: any;
  };
  authentication?: boolean;
  notes?: string;
}

const ApiDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const apiEndpoints: ApiEndpoint[] = [
    {
      id: 'get-templates',
      name: 'Get Templates',
      description: 'Retrieve all message templates',
      method: 'GET',
      endpoint: '/api/templates',
      category: 'templates',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        }
      },
      response: {
        success: [
          {
            id: '123',
            name: 'Welcome Email',
            type: 'email',
            subject: 'Welcome to Our Platform!',
            content: 'Hello {{name}}, Welcome to our platform!',
            createdAt: '2025-01-15',
            lastUpdated: '2025-03-20'
          }
        ],
        error: {
          status: 401,
          message: 'Unauthorized access'
        }
      },
      authentication: true
    },
    {
      id: 'create-template',
      name: 'Create Template',
      description: 'Create a new message template',
      method: 'POST',
      endpoint: '/api/templates',
      category: 'templates',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        },
        body: {
          name: 'New Template',
          type: 'email',
          subject: 'Template Subject',
          content: 'Template content with {{variable}}'
        }
      },
      response: {
        success: {
          id: '456',
          name: 'New Template',
          type: 'email',
          subject: 'Template Subject',
          content: 'Template content with {{variable}}',
          createdAt: '2025-04-03',
          lastUpdated: '2025-04-03'
        },
        error: {
          status: 400,
          message: 'Invalid template data'
        }
      },
      authentication: true
    },
    {
      id: 'get-nudge-rules',
      name: 'Get Nudge Rules',
      description: 'Retrieve all nudge rules',
      method: 'GET',
      endpoint: '/api/nudge-rules',
      category: 'nudges',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        }
      },
      response: {
        success: [
          {
            id: '789',
            name: 'Onboarding Reminder',
            trigger: 'user_inactivity',
            triggerValue: '3_days',
            templateId: '123',
            targetGroups: ['new-users'],
            enabled: true,
            priority: 'medium',
            createdAt: '2025-02-10'
          }
        ]
      },
      authentication: true
    },
    {
      id: 'create-nudge-rule',
      name: 'Create Nudge Rule',
      description: 'Create a new nudge rule',
      method: 'POST',
      endpoint: '/api/nudge-rules',
      category: 'nudges',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        },
        body: {
          name: 'Weekly Check-in',
          trigger: 'schedule',
          triggerValue: 'weekly_monday',
          templateId: '123',
          targetGroups: ['all-employees'],
          enabled: true,
          priority: 'medium'
        }
      },
      response: {
        success: {
          id: '101',
          name: 'Weekly Check-in',
          trigger: 'schedule',
          triggerValue: 'weekly_monday',
          templateId: '123',
          targetGroups: ['all-employees'],
          enabled: true,
          priority: 'medium',
          createdAt: '2025-04-03'
        }
      },
      authentication: true
    },
    {
      id: 'schedule-nudge',
      name: 'Schedule One-time Nudge',
      description: 'Schedule a one-time nudge to be sent at a specific time',
      method: 'POST',
      endpoint: '/api/nudges/schedule',
      category: 'scheduling',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        },
        body: {
          title: 'Important Announcement',
          date: '2025-04-15',
          time: '09:00',
          templateId: '123',
          targetGroup: 'all-employees',
          channel: 'email',
          priority: 'high'
        }
      },
      response: {
        success: {
          id: '202',
          title: 'Important Announcement',
          scheduledFor: '2025-04-15T09:00:00Z',
          templateId: '123',
          targetGroup: 'all-employees',
          channel: 'email',
          priority: 'high',
          status: 'scheduled'
        }
      },
      authentication: true
    },
    {
      id: 'get-user-groups',
      name: 'Get User Groups',
      description: 'Retrieve all user groups',
      method: 'GET',
      endpoint: '/api/user-groups',
      category: 'users',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        }
      },
      response: {
        success: [
          {
            id: '303',
            name: 'Marketing Team',
            description: 'Marketing department members',
            memberCount: 12,
            createdAt: '2025-01-05'
          },
          {
            id: '304',
            name: 'Development Team',
            description: 'Software developers',
            memberCount: 8,
            createdAt: '2025-01-05'
          }
        ]
      },
      authentication: true
    },
    {
      id: 'create-user-group',
      name: 'Create User Group',
      description: 'Create a new user group',
      method: 'POST',
      endpoint: '/api/user-groups',
      category: 'users',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        },
        body: {
          name: 'Finance Team',
          description: 'Finance department members',
          members: ['user123', 'user456']
        }
      },
      response: {
        success: {
          id: '305',
          name: 'Finance Team',
          description: 'Finance department members',
          memberCount: 2,
          createdAt: '2025-04-03'
        }
      },
      authentication: true
    },
    {
      id: 'get-analytics',
      name: 'Get Nudge Analytics',
      description: 'Retrieve analytics about nudge performance',
      method: 'GET',
      endpoint: '/api/analytics/nudges',
      category: 'analytics',
      request: {
        headers: {
          'Authorization': 'Bearer {{API_TOKEN}}',
          'Content-Type': 'application/json'
        },
        queryParams: {
          'startDate': '2025-03-01',
          'endDate': '2025-04-01',
          'channel': 'email'
        }
      },
      response: {
        success: {
          totalSent: 1250,
          opened: 865,
          clicked: 432,
          openRate: 69.2,
          clickRate: 34.56,
          byChannel: {
            email: {
              sent: 1250,
              opened: 865,
              clicked: 432
            }
          },
          byPriority: {
            high: {
              sent: 125,
              opened: 112,
              clicked: 98
            },
            medium: {
              sent: 875,
              opened: 613,
              clicked: 274
            },
            low: {
              sent: 250,
              opened: 140,
              clicked: 60
            }
          }
        }
      },
      authentication: true
    }
  ];
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    }).catch(err => {
      toast.error('Failed to copy: ' + err);
    });
  };
  
  const renderJsonSyntaxHighlighting = (json: any) => {
    const jsonString = JSON.stringify(json, null, 2);
    return (
      <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[300px] text-sm">
        <code>
          {jsonString.split('\n').map((line, i) => {
            // Key handling
            if (line.includes(':')) {
              const [key, ...rest] = line.split(':');
              return (
                <div key={i}>
                  <span className="text-blue-500">{key}</span>
                  <span>:</span>
                  <span className="text-amber-500">{rest.join(':')}</span>
                </div>
              );
            } else if (line.includes('"')) {
              return (
                <div key={i}>
                  <span className="text-green-500">{line}</span>
                </div>
              );
            } else {
              return <div key={i}>{line}</div>;
            }
          })}
        </code>
      </pre>
    );
  };
  
  const endpointsByCategory = apiEndpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {} as Record<string, ApiEndpoint[]>);
  
  const categories = Object.keys(endpointsByCategory);
  
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">API Documentation</h1>
        <p className="page-description">Reference documentation for the Nudge Platform API</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-4 sticky top-20">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Contents</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === 'overview' ? "secondary" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === 'authentication' ? "secondary" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('authentication')}
                  >
                    Authentication
                  </Button>
                  <div className="pt-2">
                    <h3 className="text-sm font-medium px-3 py-2">Endpoints</h3>
                    <div className="space-y-1">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={activeTab === category ? "secondary" : "ghost"}
                          className="w-full justify-start capitalize"
                          onClick={() => setActiveTab(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview" className="space-y-6 mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>API Overview</CardTitle>
                  <CardDescription>
                    The Nudge Platform API provides programmatic access to create and manage templates, nudge rules, scheduling, and user groups.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Base URL</h3>
                    <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
                      <code className="text-sm">https://api.nudgeplatform.com/v1</code>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard('https://api.nudgeplatform.com/v1')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Available APIs</h3>
                    <ul className="space-y-2">
                      {categories.map(category => (
                        <li key={category}>
                          <Button 
                            variant="link" 
                            className="p-0 capitalize text-primary"
                            onClick={() => setActiveTab(category)}
                          >
                            {category} API
                          </Button>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({endpointsByCategory[category].length} endpoints)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Getting Started</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      To start using the Nudge Platform API:
                    </p>
                    <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      <li>Register for an API key in the Settings page</li>
                      <li>Authenticate your requests using the API key</li>
                      <li>Make requests to the desired endpoints</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Response Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>All API responses are returned in JSON format and include a status code.</p>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">Success Response</h3>
                      {renderJsonSyntaxHighlighting({
                        "success": true,
                        "data": {
                          // Example data would be here
                        }
                      })}
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">Error Response</h3>
                      {renderJsonSyntaxHighlighting({
                        "success": false,
                        "error": {
                          "code": "UNAUTHORIZED",
                          "message": "API key is invalid or expired"
                        }
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="authentication" className="space-y-6 mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    The Nudge Platform API uses API keys for authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">API Keys</h3>
                    <p className="mb-4">
                      All API requests must include an API key in the Authorization header.
                    </p>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Example Request Header</h4>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm overflow-auto">Authorization: Bearer your-api-key-here</code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => copyToClipboard('Authorization: Bearer your-api-key-here')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                    <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2">Security Best Practices</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-amber-700 dark:text-amber-300">
                      <li>Never share your API key or expose it in client-side code</li>
                      <li>Implement proper key rotation procedures</li>
                      <li>Use environment variables to store API keys</li>
                      <li>Set appropriate access controls for your API keys</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-6 mt-0 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold capitalize">{category} API</h2>
                  <Badge variant="outline" className="capitalize">{endpointsByCategory[category].length} Endpoints</Badge>
                </div>
                
                <div className="space-y-4">
                  {endpointsByCategory[category].map(endpoint => (
                    <Accordion key={endpoint.id} type="single" collapsible className="border rounded-lg overflow-hidden">
                      <AccordionItem value={endpoint.id} className="border-0">
                        <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180">
                          <div className="flex items-center space-x-3 text-left">
                            <Badge 
                              className={
                                endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                                endpoint.method === 'PUT' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300' :
                                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              }
                            >
                              {endpoint.method}
                            </Badge>
                            <span className="font-medium">{endpoint.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-muted-foreground">{endpoint.description}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-1">Endpoint URL</h3>
                              <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
                                <code className="text-sm text-muted-foreground">{endpoint.endpoint}</code>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => copyToClipboard(endpoint.endpoint)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {endpoint.request && (
                              <div>
                                <h3 className="text-sm font-medium mb-2">Request</h3>
                                <div className="rounded-md border overflow-hidden">
                                  {endpoint.request.headers && (
                                    <div className="p-3 border-b">
                                      <h4 className="text-xs font-medium mb-2">Headers</h4>
                                      {renderJsonSyntaxHighlighting(endpoint.request.headers)}
                                    </div>
                                  )}
                                  
                                  {endpoint.request.queryParams && (
                                    <div className="p-3 border-b">
                                      <h4 className="text-xs font-medium mb-2">Query Parameters</h4>
                                      {renderJsonSyntaxHighlighting(endpoint.request.queryParams)}
                                    </div>
                                  )}
                                  
                                  {endpoint.request.body && (
                                    <div className="p-3">
                                      <h4 className="text-xs font-medium mb-2">Request Body</h4>
                                      {renderJsonSyntaxHighlighting(endpoint.request.body)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {endpoint.response && (
                              <div>
                                <h3 className="text-sm font-medium mb-2">Response</h3>
                                <Tabs defaultValue="success" className="w-full">
                                  <TabsList className="w-full grid grid-cols-2">
                                    <TabsTrigger value="success">Success</TabsTrigger>
                                    <TabsTrigger value="error">Error</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="success" className="mt-2">
                                    {endpoint.response.success && (
                                      renderJsonSyntaxHighlighting(endpoint.response.success)
                                    )}
                                  </TabsContent>
                                  <TabsContent value="error" className="mt-2">
                                    {endpoint.response.error && (
                                      renderJsonSyntaxHighlighting(endpoint.response.error)
                                    )}
                                  </TabsContent>
                                </Tabs>
                              </div>
                            )}
                            
                            {endpoint.notes && (
                              <div className="bg-muted/50 p-3 rounded-md">
                                <h3 className="text-sm font-medium mb-1">Notes</h3>
                                <p className="text-sm text-muted-foreground">{endpoint.notes}</p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default ApiDocs;
