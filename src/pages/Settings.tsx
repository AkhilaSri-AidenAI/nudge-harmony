
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Bell, Mail, MessageSquare, Globe, Shield, User, Lock, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const form = useForm({
    defaultValues: {
      emailFormat: 'html',
      smsProvider: 'twilio',
      defaultChannel: 'email',
    },
  });

  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Configure your NudgeHarmony system settings</p>
      </div>
      
      <Tabs defaultValue="notifications" className="mt-6">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mb-6">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Channels
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when nudges are delivered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-notifications">Allow Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable all notifications</p>
                </div>
                <Switch id="allow-notifications" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">Don't send notifications during these hours</p>
                </div>
                <Switch id="quiet-hours" defaultChecked />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" defaultValue="22:00" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" defaultValue="07:00" className="mt-1" />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label>Default Notification Priority</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline" className="justify-start">Low</Button>
                  <Button variant="default" className="justify-start">Medium</Button>
                  <Button variant="outline" className="justify-start">High</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nudge Delivery Rules</CardTitle>
              <CardDescription>Configure how nudges are processed and delivered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="batching">Enable Batching</Label>
                  <p className="text-sm text-muted-foreground">Combine multiple notifications into a single digest</p>
                </div>
                <Switch id="batching" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="max-per-day">Maximum Nudges Per Day</Label>
                  <p className="text-sm text-muted-foreground">Limit the number of nudges a user can receive daily</p>
                </div>
                <Input id="max-per-day" type="number" defaultValue="5" className="w-20 text-right" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-dismiss">Auto-dismiss After</Label>
                  <p className="text-sm text-muted-foreground">Automatically dismiss nudges after a set period</p>
                </div>
                <Select defaultValue="3days">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">1 Day</SelectItem>
                    <SelectItem value="3days">3 Days</SelectItem>
                    <SelectItem value="1week">1 Week</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Configuration</CardTitle>
              <CardDescription>Set up and manage notification channels</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Mail className="h-5 w-5" /> Email Settings
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="emailFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Format</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="html">HTML</SelectItem>
                              <SelectItem value="text">Plain Text</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>SMTP Server</FormLabel>
                        <FormControl>
                          <Input placeholder="smtp.example.com" />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormLabel>SMTP Port</FormLabel>
                        <FormControl>
                          <Input placeholder="587" />
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" /> SMS Settings
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="smsProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMS Provider</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="twilio">Twilio</SelectItem>
                              <SelectItem value="sinch">Sinch</SelectItem>
                              <SelectItem value="messagebird">MessageBird</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Provider for SMS delivery
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••••••••••" />
                      </FormControl>
                      <FormDescription>
                        Your SMS provider API key
                      </FormDescription>
                    </FormItem>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Globe className="h-5 w-5" /> Default Settings
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="defaultChannel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Notification Channel</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select default channel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="in-app">In-App</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Channel used when no specific channel is specified
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Channel Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="Admin User" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="admin@example.com" className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="time-zone">Time Zone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">GMT (UTC+0)</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div>
                <Label>Interface Theme</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline" className="justify-start">Light</Button>
                  <Button variant="default" className="justify-start">Dark</Button>
                  <Button variant="outline" className="justify-start">System</Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Account Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Password
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Change your account password</p>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="mt-1" />
                  </div>
                </div>
                
                <Button className="mt-4">Update Password</Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Two-Factor Authentication
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Enhance your account security with 2FA</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require an additional code when logging in</p>
                  </div>
                  <Switch id="enable-2fa" />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Destructive actions for your account</p>
                
                <div className="grid gap-3">
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    Delete All My Data
                  </Button>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Settings;
