
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="px-4 py-8 md:px-8 max-w-7xl mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
