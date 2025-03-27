
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const data = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 27 },
  { name: 'Fri', value: 32 },
  { name: 'Sat', value: 24 },
  { name: 'Sun', value: 18 },
];

interface ActivityChartProps {
  title: string;
  subtitle?: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ title, subtitle }) => {
  return (
    <div className="glass-card rounded-xl p-5 h-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Select defaultValue="week">
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
