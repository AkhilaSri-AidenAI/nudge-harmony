
import React from 'react';
import { BellIcon, SearchIcon, MenuIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="h-16 border-b border-border flex items-center px-4 justify-between bg-background/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-2 lg:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center gap-2 w-72">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none text-sm w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative animate-pulse-subtle">
          <BellIcon className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-purple-500"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 ml-2">
          <span className="text-xs font-medium">JD</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
