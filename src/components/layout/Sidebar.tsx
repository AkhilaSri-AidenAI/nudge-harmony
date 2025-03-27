
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ListFilter,
  FileEdit,
  Share2,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/' },
    { label: 'Nudge Rules', icon: <ListFilter size={18} />, href: '/rules' },
    { label: 'Templates', icon: <FileEdit size={18} />, href: '/templates' },
    { label: 'Channels', icon: <Share2 size={18} />, href: '/channels' },
    { label: 'Scheduling', icon: <Calendar size={18} />, href: '/scheduling' },
    { label: 'User Groups', icon: <Users size={18} />, href: '/user-groups' },
    { label: 'Analytics', icon: <BarChart3 size={18} />, href: '/analytics' },
    { label: 'Settings', icon: <Settings size={18} />, href: '/settings' },
  ];
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-16 border-b border-sidebar-border flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg">NudgeHarmony</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "sidebar-item",
              location.pathname === item.href && "active"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Pro Tips</h4>
              <p className="text-xs text-muted-foreground">Get more from Nudge</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Create your first nudge rule in just 2 minutes.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
