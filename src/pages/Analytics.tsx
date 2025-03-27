
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { MessageSquare, Mail, Bell, Users, BarChart3, Activity, CheckSquare } from 'lucide-react';

const Analytics: React.FC = () => {
  // Engagement data
  const engagementData = [
    { name: 'Monday', engagement: 65, completion: 40 },
    { name: 'Tuesday', engagement: 72, completion: 55 },
    { name: 'Wednesday', engagement: 80, completion: 62 },
    { name: 'Thursday', engagement: 78, completion: 58 },
    { name: 'Friday', engagement: 67, completion: 50 },
    { name: 'Saturday', engagement: 42, completion: 32 },
    { name: 'Sunday', engagement: 35, completion: 26 },
  ];

  // Channel effectiveness
  const channelData = [
    { name: 'Email', value: 42, fill: '#3498db' },
    { name: 'SMS', value: 28, fill: '#2ecc71' },
    { name: 'WhatsApp', value: 15, fill: '#9b59b6' },
    { name: 'In-App', value: 15, fill: '#e74c3c' },
  ];

  // Task completion by department
  const departmentData = [
    { name: 'Engineering', completed: 82, pending: 18 },
    { name: 'Marketing', completed: 67, pending: 33 },
    { name: 'Sales', completed: 75, pending: 25 },
    { name: 'Finance', completed: 91, pending: 9 },
    { name: 'HR', completed: 85, pending: 15 },
  ];

  // Nudge response time
  const responseTimeData = [
    { name: 'Morning', immediate: 68, delayed: 32 },
    { name: 'Afternoon', immediate: 52, delayed: 48 },
    { name: 'Evening', immediate: 40, delayed: 60 },
  ];

  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-description">Insights and performance metrics for your nudge system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-500" />
              <span>Total Nudges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,453</div>
            <p className="text-sm text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-green-500" />
              <span>Completion Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76.3%</div>
            <p className="text-sm text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>Active Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">847</div>
            <p className="text-sm text-muted-foreground">+12 new users today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4 text-amber-500" />
              <span>Avg. Response Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.4h</div>
            <p className="text-sm text-muted-foreground">-0.3h from last week</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="engagement" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
          <TabsTrigger value="tasks">Task Completion</TabsTrigger>
          <TabsTrigger value="response">Response Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="engagement" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement & Task Completion</CardTitle>
              <CardDescription>Daily metrics showing user engagement vs. task completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="engagement" stroke="#9b59b6" strokeWidth={2} />
                    <Line type="monotone" dataKey="completion" stroke="#3498db" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="channels" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channel Effectiveness</CardTitle>
              <CardDescription>Breakdown of nudge effectiveness by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-xs text-muted-foreground">42% open rate</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">SMS</div>
                    <div className="text-xs text-muted-foreground">28% response rate</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-sm font-medium">WhatsApp</div>
                    <div className="text-xs text-muted-foreground">15% response rate</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="text-sm font-medium">In-App</div>
                    <div className="text-xs text-muted-foreground">15% engagement</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion by Department</CardTitle>
              <CardDescription>Shows completed vs. pending tasks per department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="#3498db" />
                    <Bar dataKey="pending" stackId="a" fill="#e74c3c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="response" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Nudge Response Time Analysis</CardTitle>
              <CardDescription>Time of day impact on nudge response rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={responseTimeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="immediate" fill="#2ecc71" />
                    <Bar dataKey="delayed" fill="#f39c12" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">
                  <span className="font-medium">Key Insights:</span> Morning nudges show highest immediate response rate at 68%, 
                  while evening nudges are more likely to be delayed.
                </p>
                <p>
                  <span className="font-medium">Recommendation:</span> Schedule important nudges between 8am-11am for optimal 
                  engagement and response rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Nudge Performance</CardTitle>
            <CardDescription>Last 10 nudges and their effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 
                      ${i % 3 === 0 ? 'bg-purple-100 text-purple-600' : 
                      i % 3 === 1 ? 'bg-blue-100 text-blue-600' : 
                      'bg-green-100 text-green-600'}`}>
                      {i % 3 === 0 ? <Bell className="h-4 w-4" /> : 
                       i % 3 === 1 ? <Mail className="h-4 w-4" /> : 
                       <MessageSquare className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {i % 3 === 0 ? 'Task Reminder Nudge' : 
                         i % 3 === 1 ? 'Weekly Update Nudge' : 
                         'Meeting Reminder Nudge'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Sent to {Math.floor(Math.random() * 50) + 10} users • 
                        {Math.floor(Math.random() * 80) + 20}% viewed
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {Math.floor(Math.random() * 90) + 10}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Feedback & Nudge Impact</CardTitle>
            <CardDescription>User ratings and feedback on nudge effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div className="bg-muted rounded-md p-3">
                <p className="text-3xl font-bold text-blue-500">4.2</p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-3xl font-bold text-green-500">76%</p>
                <p className="text-xs text-muted-foreground">Help Completion</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-3xl font-bold text-purple-500">82%</p>
                <p className="text-xs text-muted-foreground">Found Useful</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">User#{Math.floor(Math.random() * 1000) + 100}</p>
                    <div className="flex">
                      {Array(5).fill(0).map((_, index) => (
                        <svg 
                          key={index} 
                          className={`h-4 w-4 ${index < Math.floor(Math.random() * 2) + 3 ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {i === 1 ? "The meeting reminders helped me stay on track during busy days." : 
                      i === 2 ? "Task deadlines are much easier to manage with these nudges." : 
                      "I like that I can customize which notifications I receive."}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Analytics;
