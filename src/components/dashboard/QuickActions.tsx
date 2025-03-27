
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Settings, BarChart3, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="glass-card rounded-xl p-5 h-full animate-scale-in">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white w-full justify-start"
          onClick={() => navigate('/rules/new')}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          <span>Create New Nudge Rule</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => navigate('/scheduling')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span>View Schedule</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => navigate('/analytics')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          <span>Analytics Dashboard</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          <span>Configure Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
