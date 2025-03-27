
import React from 'react';
import { Calendar, Check, Clock3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface NudgeActionsProps {
  nudgeId: string;
  onComplete?: () => void;
  onDismiss?: () => void;
  onSnooze?: () => void;
  onReschedule?: () => void;
}

const UserNudgeActions: React.FC<NudgeActionsProps> = ({
  nudgeId,
  onComplete,
  onDismiss,
  onSnooze,
  onReschedule
}) => {
  const handleComplete = () => {
    if (onComplete) onComplete();
    
    toast({
      title: "Task marked as completed",
      description: "Great job! The task has been marked as completed."
    });
  };
  
  const handleDismiss = () => {
    if (onDismiss) onDismiss();
    
    toast({
      title: "Nudge dismissed",
      description: "The nudge has been removed from your list."
    });
  };
  
  const handleSnooze = () => {
    if (onSnooze) onSnooze();
    
    toast({
      title: "Nudge snoozed",
      description: "We'll remind you again in 1 hour."
    });
  };
  
  const handleReschedule = () => {
    if (onReschedule) onReschedule();
    
    toast({
      title: "Reschedule",
      description: "Opening scheduling dialog to reschedule this item."
    });
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleComplete} className="flex-1">
        <Check className="h-4 w-4 mr-1" />
        <span>Complete</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleSnooze} className="flex-1">
        <Clock3 className="h-4 w-4 mr-1" />
        <span>Snooze</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleReschedule} className="flex-1">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Reschedule</span>
      </Button>
      
      <Button variant="ghost" size="sm" onClick={handleDismiss} className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10">
        <Trash2 className="h-4 w-4 mr-1" />
        <span>Dismiss</span>
      </Button>
    </div>
  );
};

export default UserNudgeActions;
