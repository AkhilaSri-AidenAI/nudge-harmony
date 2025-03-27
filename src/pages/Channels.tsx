import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailIcon, MessageSquare, Bell, AlertTriangle, Save, Settings, InfoIcon } from 'lucide-react';
import { toast } from 'sonner';

const Channels: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(true);
  
  const handleSave = () => {
    toast.success('Channel settings saved successfully!');
  };
  
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Notification Channels</h1>
        <p className="page-description">Configure how your nudges are delivered</p>
      </div>
      
      <Tabs defaultValue="email" className="space-y-6 animate-fade-in">
        <TabsList className="grid grid-cols-4 gap-4 w-full max-w-2xl">
          <TabsTrigger value="email" className="flex gap-2 items-center">
            <MailIcon className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex gap-2 items-center">
            <MessageSquare className="h-4 w-4" />
            <span>SMS</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex gap-2 items-center">
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="in-app" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span>In-App</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>
                  Configure your email delivery settings
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="email-active" 
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
                <Label htmlFor="email-active">
                  {emailEnabled ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input 
                  id="smtp-host" 
                  placeholder="smtp.example.com" 
                  disabled={!emailEnabled}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input 
                    id="smtp-port" 
                    placeholder="587" 
                    disabled={!emailEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-security">Security</Label>
                  <select 
                    id="smtp-security"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!emailEnabled}
                  >
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-username">Username</Label>
                <Input 
                  id="smtp-username" 
                  placeholder="notifications@yourcompany.com" 
                  disabled={!emailEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Password</Label>
                <Input 
                  id="smtp-password" 
                  type="password" 
                  placeholder="••••••••" 
                  disabled={!emailEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input 
                  id="sender-name" 
                  placeholder="Your Company Name" 
                  disabled={!emailEnabled}
                />
              </div>
              
              <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle>Best Practice</AlertTitle>
                <AlertDescription>
                  For production environments, we recommend using a dedicated email service like SendGrid, Mailgun, or Amazon SES rather than direct SMTP settings.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Test Connection
              </Button>
              <Button onClick={handleSave} disabled={!emailEnabled}>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sms">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>SMS Configuration</CardTitle>
                <CardDescription>
                  Configure your SMS delivery provider
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sms-active" 
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
                <Label htmlFor="sms-active">
                  {smsEnabled ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sms-provider">SMS Provider</Label>
                <select 
                  id="sms-provider"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!smsEnabled}
                >
                  <option value="twilio">Twilio</option>
                  <option value="nexmo">Nexmo (Vonage)</option>
                  <option value="aws-sns">AWS SNS</option>
                  <option value="custom">Custom API</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sms-api-key">API Key / Account SID</Label>
                <Input 
                  id="sms-api-key" 
                  placeholder="Enter your API Key" 
                  disabled={!smsEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sms-api-secret">API Secret / Auth Token</Label>
                <Input 
                  id="sms-api-secret" 
                  type="password" 
                  placeholder="Enter your API Secret" 
                  disabled={!smsEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sms-from">From Number</Label>
                <Input 
                  id="sms-from" 
                  placeholder="+1234567890" 
                  disabled={!smsEnabled}
                />
              </div>
              
              <Alert variant="default" className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle>Cost Consideration</AlertTitle>
                <AlertDescription>
                  SMS messages incur costs per message. Set up usage limits and monitor costs regularly to avoid unexpected charges.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Test SMS
              </Button>
              <Button onClick={handleSave} disabled={!smsEnabled}>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="whatsapp">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>WhatsApp Configuration</CardTitle>
                <CardDescription>
                  Configure WhatsApp Business API
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="whatsapp-active" 
                  checked={whatsappEnabled}
                  onCheckedChange={setWhatsappEnabled}
                />
                <Label htmlFor="whatsapp-active">
                  {whatsappEnabled ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>WhatsApp Business API Required</AlertTitle>
                <AlertDescription>
                  You need to have a WhatsApp Business account and approved templates before using this channel.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-phone-id">Phone Number ID</Label>
                <Input 
                  id="whatsapp-phone-id" 
                  placeholder="Enter WhatsApp Phone ID" 
                  disabled={!whatsappEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-business-id">WhatsApp Business Account ID</Label>
                <Input 
                  id="whatsapp-business-id" 
                  placeholder="Enter Business Account ID" 
                  disabled={!whatsappEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-access-token">Access Token</Label>
                <Input 
                  id="whatsapp-access-token" 
                  type="password" 
                  placeholder="Enter your access token" 
                  disabled={!whatsappEnabled}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Verify Setup
              </Button>
              <Button onClick={handleSave} disabled={!whatsappEnabled}>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-app">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>In-App Notification Settings</CardTitle>
                <CardDescription>
                  Configure how in-app notifications appear
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="in-app-active" 
                  checked={inAppEnabled}
                  onCheckedChange={setInAppEnabled}
                />
                <Label htmlFor="in-app-active">
                  {inAppEnabled ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notification-position">Notification Position</Label>
                <select 
                  id="notification-position"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!inAppEnabled}
                >
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="bottom-center">Bottom Center</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-style">Notification Style</Label>
                <select 
                  id="notification-style"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!inAppEnabled}
                >
                  <option value="toast">Toast Notification</option>
                  <option value="banner">Top Banner</option>
                  <option value="modal">Modal Dialog</option>
                  <option value="sidebar">Sidebar Notification</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="display-duration">Display Duration (seconds)</Label>
                <Input 
                  id="display-duration" 
                  type="number" 
                  min="1" 
                  placeholder="5" 
                  disabled={!inAppEnabled}
                />
              </div>
              <div className="space-y-4">
                <Label>Notification Settings</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="sound-enabled" disabled={!inAppEnabled} />
                    <Label htmlFor="sound-enabled">Enable sound</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-dismiss" checked={true} disabled={!inAppEnabled} />
                    <Label htmlFor="auto-dismiss">Auto-dismiss notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="require-interaction" disabled={!inAppEnabled} />
                    <Label htmlFor="require-interaction">Require user interaction</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Test Notification
              </Button>
              <Button onClick={handleSave} disabled={!inAppEnabled}>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Channels;
