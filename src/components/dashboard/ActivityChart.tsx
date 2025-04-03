
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Generate mock data for different time periods
const generateMockData = (period: string) => {
  switch (period) {
    case 'day':
      return [
        { name: '12 AM', value: Math.floor(Math.random() * 10) },
        { name: '3 AM', value: Math.floor(Math.random() * 10) },
        { name: '6 AM', value: Math.floor(Math.random() * 20) },
        { name: '9 AM', value: Math.floor(Math.random() * 30) },
        { name: '12 PM', value: Math.floor(Math.random() * 40) },
        { name: '3 PM', value: Math.floor(Math.random() * 35) },
        { name: '6 PM', value: Math.floor(Math.random() * 25) },
        { name: '9 PM', value: Math.floor(Math.random() * 15) },
      ];
    case 'week':
      return [
        { name: 'Mon', value: Math.floor(Math.random() * 40) },
        { name: 'Tue', value: Math.floor(Math.random() * 40) },
        { name: 'Wed', value: Math.floor(Math.random() * 40) },
        { name: 'Thu', value: Math.floor(Math.random() * 40) },
        { name: 'Fri', value: Math.floor(Math.random() * 40) },
        { name: 'Sat', value: Math.floor(Math.random() * 40) },
        { name: 'Sun', value: Math.floor(Math.random() * 40) },
      ];
    case 'month':
      return [
        { name: 'Week 1', value: Math.floor(Math.random() * 100) },
        { name: 'Week 2', value: Math.floor(Math.random() * 100) },
        { name: 'Week 3', value: Math.floor(Math.random() * 100) },
        { name: 'Week 4', value: Math.floor(Math.random() * 100) },
      ];
    case 'year':
      return [
        { name: 'Jan', value: Math.floor(Math.random() * 200) },
        { name: 'Feb', value: Math.floor(Math.random() * 200) },
        { name: 'Mar', value: Math.floor(Math.random() * 200) },
        { name: 'Apr', value: Math.floor(Math.random() * 200) },
        { name: 'May', value: Math.floor(Math.random() * 200) },
        { name: 'Jun', value: Math.floor(Math.random() * 200) },
        { name: 'Jul', value: Math.floor(Math.random() * 200) },
        { name: 'Aug', value: Math.floor(Math.random() * 200) },
        { name: 'Sep', value: Math.floor(Math.random() * 200) },
        { name: 'Oct', value: Math.floor(Math.random() * 200) },
        { name: 'Nov', value: Math.floor(Math.random() * 200) },
        { name: 'Dec', value: Math.floor(Math.random() * 200) },
      ];
    default:
      return [];
  }
};

interface ActivityChartProps {
  title: string;
  subtitle?: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ title, subtitle }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [data, setData] = useState(generateMockData('week'));
  
  useEffect(() => {
    setData(generateMockData(timeRange));
  }, [timeRange]);
  
  return (
    <div className="glass-card rounded-xl p-5 h-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Select 
          defaultValue="week" 
          value={timeRange} 
          onValueChange={(value) => setTimeRange(value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
