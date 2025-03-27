
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserNudgeSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    enableEmailNudges: true,
    enableSmsNudges: false,
    enableWhatsAppNudges: false,
    enableInAppNudges: true,
    reminderTime: '15min',
    nudgePriority: 'all',
  });
  
  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-500" />
          <p className="font-medium text-sm">Email Nudges</p>
        </div>
        <Switch 
          checked={settings.enableEmailNudges}
          onCheckedChange={(checked) => handleChange('enableEmailNudges', checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-green-500" />
          <p className="font-medium text-sm">SMS Nudges</p>
        </div>
        <Switch 
          checked={settings.enableSmsNudges}
          onCheckedChange={(checked) => handleChange('enableSmsNudges', checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-purple-500" />
          <p className="font-medium text-sm">WhatsApp Nudges</p>
        </div>
        <Switch 
          checked={settings.enableWhatsAppNudges}
          onCheckedChange={(checked) => handleChange('enableWhatsAppNudges', checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-red-500" />
          <p className="font-medium text-sm">In-App Nudges</p>
        </div>
        <Switch 
          checked={settings.enableInAppNudges}
          onCheckedChange={(checked) => handleChange('enableInAppNudges', checked)}
        />
      </div>
      
      <div className="border-t my-4 pt-4">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm mb-2">Reminder Time</p>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Select
                value={settings.reminderTime}
                onValueChange={(value) => handleChange('reminderTime', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5min">5 minutes before</SelectItem>
                  <SelectItem value="15min">15 minutes before</SelectItem>
                  <SelectItem value="30min">30 minutes before</SelectItem>
                  <SelectItem value="1hour">1 hour before</SelectItem>
                  <SelectItem value="1day">1 day before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <p className="font-medium text-sm mb-2">Nudge Priority</p>
            <Select
              value={settings.nudgePriority}
              onValueChange={(value) => handleChange('nudgePriority', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All nudges</SelectItem>
                <SelectItem value="high">High priority only</SelectItem>
                <SelectItem value="meetings">Meetings only</SelectItem>
                <SelectItem value="tasks">Tasks only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Button className="w-full" onClick={handleSave}>
        Save Preferences
      </Button>
    </div>
  );
};

export default UserNudgeSettings;
