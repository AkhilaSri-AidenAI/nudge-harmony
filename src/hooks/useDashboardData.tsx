
import { useState, useEffect } from 'react';

interface DashboardStats {
  totalNudges: number;
  pendingNudges: number;
  activeUsers: number;
  inactiveUsers: number;
  completionRate: number;
  activityData: {
    name: string;
    value: number;
  }[];
  recentActivity: {
    id: string;
    action: string;
    target: string;
    time: string;
  }[];
}

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockData: DashboardStats = {
          totalNudges: 1457,
          pendingNudges: 23,
          activeUsers: 782,
          inactiveUsers: 31,
          completionRate: 89,
          activityData: [
            { name: 'Mon', value: 32 },
            { name: 'Tue', value: 45 },
            { name: 'Wed', value: 37 },
            { name: 'Thu', value: 53 },
            { name: 'Fri', value: 61 },
            { name: 'Sat', value: 48 },
            { name: 'Sun', value: 39 },
          ],
          recentActivity: [
            {
              id: '1',
              action: 'Nudge Sent',
              target: 'Weekly Status Update',
              time: '12 min ago',
            },
            {
              id: '2',
              action: 'Rule Modified',
              target: 'Inactive User Alert',
              time: '2 hours ago',
            },
            {
              id: '3',
              action: 'Template Created',
              target: 'Welcome Message',
              time: '5 hours ago',
            },
            {
              id: '4',
              action: 'Nudge Completed',
              target: 'Document Review Reminder',
              time: 'Yesterday',
            },
          ],
        };
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { data, loading, error };
};
