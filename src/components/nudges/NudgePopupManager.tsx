
import React, { useState, useEffect } from 'react';
import { X, Bell, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const NudgePopupManager: React.FC = () => {
  const { user } = useAuth();
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [meetingVisible, setMeetingVisible] = useState(false);
  
  // Simulated next meeting data
  const nextMeeting = {
    title: 'Team Standup',
    time: '10:00 AM',
    date: 'Today'
  };
  
  // Show welcome message first
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setWelcomeVisible(true);
    }, 1000);
    
    return () => clearTimeout(welcomeTimer);
  }, []);
  
  // Show meeting reminder after welcome message is closed
  useEffect(() => {
    if (!welcomeVisible && user) {
      const meetingTimer = setTimeout(() => {
        setMeetingVisible(true);
      }, 1000);
      
      return () => clearTimeout(meetingTimer);
    }
  }, [welcomeVisible, user]);
  
  // Handles for different actions
  const handleCloseWelcome = () => setWelcomeVisible(false);
  const handleCloseMeeting = () => setMeetingVisible(false);
  
  const handleSnooze = () => {
    setMeetingVisible(false);
    // In a real app, this would reschedule the notification
  };
  
  const handleRemindLater = () => {
    setMeetingVisible(false);
    // In a real app, this would reschedule the notification
  };
  
  if (!welcomeVisible && !meetingVisible) return null;
  
  return (
    <>
      {/* Welcome nudge */}
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
      
      {/* Meeting reminder nudge */}
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
              
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSnooze}
                >
                  Snooze
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemindLater}
                >
                  Remind me later
                </Button>
                <Button
                  size="sm"
                  onClick={handleCloseMeeting}
                >
                  View Details
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
