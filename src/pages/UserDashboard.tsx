
import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Calendar, CheckCircle, Clock, Coffee, Edit, Info, ListCheck, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NudgePopupManager from '@/components/nudges/NudgePopupManager';
import UserNudgeSettings from '@/components/user/UserNudgeSettings';

// Mock data for upcoming meetings
const upcomingMeetings = [
  { id: '1', title: 'Team Standup', time: '10:00 AM', date: 'Today', participants: 5 },
  { id: '2', title: 'Project Review', time: '02:30 PM', date: 'Today', participants: 3 },
  { id: '3', title: 'Client Meeting', time: '11:00 AM', date: 'Tomorrow', participants: 4 },
];

// Mock data for pending tasks
const pendingTasks = [
  { id: '1', title: 'Complete project documentation', dueDate: 'Today', priority: 'High', status: 'In Progress' },
  { id: '2', title: 'Review pull requests', dueDate: 'Tomorrow', priority: 'Medium', status: 'Not Started' },
  { id: '3', title: 'Prepare presentation slides', dueDate: '2 days left', priority: 'High', status: 'In Progress' },
  { id: '4', title: 'Submit expense report', dueDate: '3 days left', priority: 'Low', status: 'Not Started' },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [firstVisit, setFirstVisit] = useState(true);
  
  // Mark first visit false after component mount
  useEffect(() => {
    if (firstVisit) {
      // Set a small timeout to make the animation flow better
      const timer = setTimeout(() => {
        setFirstVisit(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [firstVisit]);
  
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">My Dashboard</h1>
        <p className="page-description">
          Welcome, {user?.name}! Here's an overview of your upcoming meetings and tasks.
        </p>
      </div>
      
      {/* Show nudge popups on first visit */}
      {firstVisit && <NudgePopupManager />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <ListCheck className="h-4 w-4" />
                <span>Tasks</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingMeetings
                        .filter(meeting => meeting.date === 'Today')
                        .map(meeting => (
                        <div key={meeting.id} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                          <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-3">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{meeting.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{meeting.time}</span>
                              <span className="mx-2">•</span>
                              <Users className="h-3 w-3 mr-1" />
                              <span>{meeting.participants} participants</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Join
                          </Button>
                        </div>
                      ))}
                      
                      {upcomingMeetings.filter(m => m.date === 'Today').length === 0 && (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <Coffee className="h-12 w-12 text-muted-foreground mb-3" />
                          <p>No meetings scheduled for today</p>
                          <p className="text-sm text-muted-foreground">Enjoy your free time!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingMeetings
                        .filter(meeting => meeting.date !== 'Today')
                        .map(meeting => (
                        <div key={meeting.id} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                          <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-700 dark:text-purple-300 mr-3">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{meeting.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <span>{meeting.date}, {meeting.time}</span>
                              <span className="mx-2">•</span>
                              <Users className="h-3 w-3 mr-1" />
                              <span>{meeting.participants} participants</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      ))}
                      
                      {upcomingMeetings.filter(m => m.date !== 'Today').length === 0 && (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                          <p>No upcoming meetings</p>
                          <p className="text-sm text-muted-foreground">Your schedule is clear!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Pending Tasks</CardTitle>
                    <Button size="sm" variant="outline">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingTasks.map(task => (
                      <div key={task.id} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                        <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3
                          ${task.priority === 'High' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : 
                           task.priority === 'Medium' ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' : 
                           'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'}`}>
                          <ListCheck className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{task.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Due: {task.dueDate}</span>
                            <span className="mx-2">•</span>
                            <span>Priority: {task.priority}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Complete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Create New Task</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Activity</CardTitle>
              <CardDescription>Login history and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-300">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current login</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Previous login</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Login activity is monitored for security purposes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notification Settings</CardTitle>
              <CardDescription>Manage your nudges and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <UserNudgeSettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserDashboard;
