import React, { useState, useEffect } from 'react';
import { X, Bell, Calendar, Clock, ArrowRight, Check, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const NudgePopupManager: React.FC = () => {
  const { user } = useAuth();
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [meetingVisible, setMeetingVisible] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);
  
  const nextMeeting = {
    id: '1',
    title: 'Team Standup',
    time: '10:00 AM',
    date: 'Today'
  };
  
  const taskData = {
    id: '2',
    title: 'Complete project documentation',
    dueDate: 'Today',
    priority: 'High'
  };
  
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setWelcomeVisible(true);
    }, 1000);
    
    return () => clearTimeout(welcomeTimer);
  }, []);
  
  useEffect(() => {
    if (!welcomeVisible && user) {
      const meetingTimer = setTimeout(() => {
        const showMeeting = Math.random() > 0.5;
        if (showMeeting) {
          setMeetingVisible(true);
        } else {
          setTaskVisible(true);
        }
      }, 1000);
      
      return () => clearTimeout(meetingTimer);
    }
  }, [welcomeVisible, user]);
  
  const handleCloseWelcome = () => setWelcomeVisible(false);
  const handleCloseMeeting = () => setMeetingVisible(false);
  const handleCloseTask = () => setTaskVisible(false);
  
  const handleSnooze = () => {
    toast({
      title: "Notification snoozed", 
      description: "We'll remind you again in 30 minutes"
    });
    setMeetingVisible(false);
    setTaskVisible(false);
  };
  
  const handleRemindLater = () => {
    toast({
      title: "Reminder scheduled", 
      description: "We'll remind you again in 2 hours"
    });
    setMeetingVisible(false);
    setTaskVisible(false);
  };
  
  const handleReschedule = () => {
    toast({
      title: "Reschedule option selected", 
      description: "Opening scheduling dialog..."
    });
    setMeetingVisible(false);
  };
  
  const handleMarkAsFinished = () => {
    toast({
      title: "Task marked as completed", 
      description: "Great job! Task has been marked complete."
    });
    setTaskVisible(false);
  };
  
  if (!welcomeVisible && !meetingVisible && !taskVisible) return null;
  
  return (
    <>
      {welcomeVisible && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-fade-in">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold">Welcome back!</h3>
                </div>
                <button
                  onClick={handleCloseWelcome}
                  className="text-white/80 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm mb-4">
                Hi {user?.name}, welcome back to NudgeHarmony. We've got your day all organized!
              </p>
              
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white"
                  onClick={handleCloseWelcome}
                >
                  <span>Got it</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {meetingVisible && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-fade-in">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-semibold">Upcoming Meeting</h3>
                </div>
                <button
                  onClick={handleCloseMeeting}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="font-medium text-sm">{nextMeeting.title}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{nextMeeting.time}, {nextMeeting.date}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSnooze}
                  className="flex-1"
                >
                  <Clock3 className="h-4 w-4 mr-1" />
                  Snooze
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemindLater}
                  className="flex-1"
                >
                  <Clock3 className="h-4 w-4 mr-1" />
                  Remind Later
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleReschedule}
                  className="flex-1"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Reschedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {taskVisible && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-fade-in">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-red-500"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M9 16l2 2 4-4"></path>
                  </svg>
                  <h3 className="font-semibold">Pending Task</h3>
                </div>
                <button
                  onClick={handleCloseTask}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="font-medium text-sm">{taskData.title}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Due: {taskData.dueDate}</span>
                  <span className="mx-2">•</span>
                  <span className="text-red-500 font-medium">{taskData.priority} Priority</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSnooze}
                  className="flex-1"
                >
                  <Clock3 className="h-4 w-4 mr-1" />
                  Snooze
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemindLater}
                  className="flex-1"
                >
                  <Clock3 className="h-4 w-4 mr-1" />
                  Remind Later
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleMarkAsFinished}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default NudgePopupManager;
