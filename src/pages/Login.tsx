
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Define form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const { login, isLoading } = useAuth();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    await login(values.email, values.password);
  };

  // Demo login handler for admin
  const handleDemoAdminLogin = () => {
    form.setValue('email', 'admin@example.com');
    form.setValue('password', 'password');
    form.handleSubmit(onSubmit)();
  };

  // Demo login handler for regular user
  const handleDemoUserLogin = () => {
    form.setValue('email', 'user@example.com');
    form.setValue('password', 'password');
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">NudgeHarmony</h1>
          <p className="text-sm text-muted-foreground mt-1">Log in to your account to access your dashboard</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm text-muted-foreground"
                        >
                          Remember me
                        </label>
                      </div>
                    )}
                  />
                  
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Log In
                    </span>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full text-sm"
                onClick={() => setShowDemo(!showDemo)}
              >
                Show Demo Accounts
              </Button>
              
              {showDemo && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">Admin Account</p>
                        <p className="text-xs text-muted-foreground">admin@example.com / password</p>
                      </div>
                      <Button size="sm" onClick={handleDemoAdminLogin}>
                        Use
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">User Account</p>
                        <p className="text-xs text-muted-foreground">user@example.com / password</p>
                      </div>
                      <Button size="sm" onClick={handleDemoUserLogin}>
                        Use
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
