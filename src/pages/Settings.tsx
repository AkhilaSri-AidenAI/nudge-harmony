
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Mail, 
  MessageSquare, 
  User, 
  Lock, 
  Clock,
  Sliders,
  Shield,
  Key
} from 'lucide-react';
import { Separator } from '@/components/ui/form';

const Settings: React.FC = () => {
  // General settings form
  const generalForm = useForm({
    defaultValues: {
      systemName: 'NudgeHarmony',
      companyName: 'Acme Corporation',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
    },
  });
  
  // Notification settings form
  const notificationForm = useForm({
    defaultValues: {
      enableEmailNotifications: true,
      enableSmsNotifications: true,
      enableWhatsAppNotifications: false,
      enableInAppNotifications: true,
      notificationDigest: 'daily',
      digestTime: '09:00',
    },
  });
  
  // Security settings form
  const securityForm = useForm({
    defaultValues: {
      passwordPolicy: 'strong',
      sessionTimeout: '30',
      enableTwoFactor: false,
      auditLogging: true,
    },
  });
  
  // API settings form
  const apiForm = useForm({
    defaultValues: {
      emailApiKey: 'sk_live_XXXXXXXXXXXX',
      smsApiKey: 'skYYYYYYYYYYYYYY',
      whatsappApiKey: '',
    },
  });
  
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Configure system and user preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="general" className="flex gap-2 items-center">
            <SettingsIcon className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex gap-2 items-center">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and display preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="systemName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>System Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name of the nudge system displayed to users
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your company or organization name
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                              <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                              <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                              <SelectItem value="UTC+0">UTC</SelectItem>
                              <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            System default timezone for scheduling
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Date display format across the system
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Interface</CardTitle>
              <CardDescription>
                Customize the appearance and behavior of the interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Quick Actions</p>
                    <p className="text-sm text-muted-foreground">
                      Display quick action buttons on the dashboard
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact UI with less whitespace
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Help Tips</p>
                    <p className="text-sm text-muted-foreground">
                      Display contextual help tips throughout the interface
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Send nudges via email
                            </p>
                          </div>
                        </div>
                        <FormField
                          control={notificationForm.control}
                          name="enableEmailNotifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Send nudges via SMS
                            </p>
                          </div>
                        </div>
                        <FormField
                          control={notificationForm.control}
                          name="enableSmsNotifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                          <div>
                            <p className="font-medium">WhatsApp Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Send nudges via WhatsApp
                            </p>
                          </div>
                        </div>
                        <FormField
                          control={notificationForm.control}
                          name="enableWhatsAppNotifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="font-medium">In-App Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Show nudges within the application
                            </p>
                          </div>
                        </div>
                        <FormField
                          control={notificationForm.control}
                          name="enableInAppNotifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={notificationForm.control}
                      name="notificationDigest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Digest</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">Send Immediately</SelectItem>
                              <SelectItem value="hourly">Hourly Digest</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="weekly">Weekly Digest</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often to send notification digests
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="digestTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Digest Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            Time of day to send notification digests
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and account protection settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={securityForm.control}
                      name="passwordPolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Policy</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select policy" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                              <SelectItem value="standard">Standard (8+ chars, 1 uppercase, 1 number)</SelectItem>
                              <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Password strength requirements for all users
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="sessionTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session Timeout (minutes)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min="5" max="480" />
                          </FormControl>
                          <FormDescription>
                            Inactive time before automatic logout
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all admin accounts
                        </p>
                      </div>
                      <FormField
                        control={securityForm.control}
                        name="enableTwoFactor"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Audit Logging</p>
                        <p className="text-sm text-muted-foreground">
                          Log all admin actions for security and compliance
                        </p>
                      </div>
                      <FormField
                        control={securityForm.control}
                        name="auditLogging"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Integration Settings</CardTitle>
              <CardDescription>
                Configure external API integrations for notification channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...apiForm}>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-medium">Email API Configuration</h3>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={apiForm.control}
                        name="emailApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormDescription>
                              Your email provider API key
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        <Button variant="outline" className="mr-2">Test Connection</Button>
                        <Button variant="outline">View Documentation</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-medium">SMS API Configuration</h3>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={apiForm.control}
                        name="smsApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormDescription>
                              Your SMS provider API key
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        <Button variant="outline" className="mr-2">Test Connection</Button>
                        <Button variant="outline">View Documentation</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <h3 className="text-lg font-medium">WhatsApp API Configuration</h3>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={apiForm.control}
                        name="whatsappApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormDescription>
                              Your WhatsApp Business API key
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        <Button variant="outline" className="mr-2">Test Connection</Button>
                        <Button variant="outline">View Documentation</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Settings;
