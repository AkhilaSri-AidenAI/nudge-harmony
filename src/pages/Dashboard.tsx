
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import StatsCard from '@/components/dashboard/StatsCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import QuickActions from '@/components/dashboard/QuickActions';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Bell, Activity, Users, ListFilter, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { data, loading, error } = useDashboardData();
  
  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-red-500">Error loading dashboard data</h3>
          <p className="text-muted-foreground mt-1">{error.message}</p>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Overview of your nudge management system</p>
      </div>
      
      <div className="stats-grid mb-6 animate-fade-in">
        <StatsCard 
          title="Total Nudges Sent" 
          value={data?.totalNudges.toLocaleString() || '0'} 
          description="Across all channels and targets"
          icon={Bell}
          trend={{ value: 12.5, isPositive: true }}
          iconColor="text-purple-500"
        />
        <StatsCard 
          title="Pending Nudges" 
          value={data?.pendingNudges.toString() || '0'} 
          description="Scheduled or waiting for trigger"
          icon={ListFilter}
          iconColor="text-blue-500"
        />
        <StatsCard 
          title="Active Users" 
          value={data?.activeUsers.toString() || '0'} 
          description="Users engaged in last 7 days"
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
          iconColor="text-green-500"
        />
        <StatsCard 
          title="Completion Rate" 
          value={`${data?.completionRate || 0}%`} 
          description="Tasks completed after nudge"
          icon={Activity}
          trend={{ value: 1.8, isPositive: false }}
          iconColor="text-amber-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ActivityChart title="Nudge Activity" subtitle="Nudges sent over time" />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
      
      <div className="mb-6">
        <Card className="glass-card animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your nudge system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 flex-shrink-0 mt-0.5">
                      {activity.action.includes('Nudge') && <Bell className="h-4 w-4" />}
                      {activity.action.includes('Rule') && <ListFilter className="h-4 w-4" />}
                      {activity.action.includes('Template') && <Activity className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-muted-foreground text-sm">{activity.target}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
