
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  iconColor = 'text-blue-500',
}) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-5 h-full animate-scale-in", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          {trend && (
            <div className="flex items-center mt-2 text-xs">
              <span className={cn(
                "inline-flex items-center gap-0.5",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          iconColor
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
