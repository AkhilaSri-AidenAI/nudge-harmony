
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Mail, 
  MessageSquare, 
  Bell, 
  Calendar, 
  Clock, 
  Users, 
  Activity,
  Eye 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface NudgeRule {
  id: string;
  name: string;
  trigger: {
    type: 'inactivity' | 'time-based' | 'event-based';
    details: string;
  };
  target: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'in-app';
  schedule: 'immediate' | 'recurring';
  status: 'active' | 'inactive';
}

const mockRules: NudgeRule[] = [
  {
    id: '1',
    name: 'Weekly Team Update Reminder',
    trigger: {
      type: 'time-based',
      details: 'Every Monday at 9:00 AM',
    },
    target: 'All Team Managers',
    channel: 'email',
    schedule: 'recurring',
    status: 'active',
  },
  {
    id: '2',
    name: 'Inactivity Prompt',
    trigger: {
      type: 'inactivity',
      details: 'After 3 days of no activity',
    },
    target: 'All Employees',
    channel: 'in-app',
    schedule: 'immediate',
    status: 'active',
  },
  {
    id: '3',
    name: 'Feedback Reminder',
    trigger: {
      type: 'event-based',
      details: 'After task completion',
    },
    target: 'Development Team',
    channel: 'sms',
    schedule: 'recurring',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Status Update Required',
    trigger: {
      type: 'time-based',
      details: 'Every Friday at 4:00 PM',
    },
    target: 'Project Managers',
    channel: 'whatsapp',
    schedule: 'recurring',
    status: 'inactive',
  }
];

const channelIcons = {
  'email': <Mail className="h-4 w-4" />,
  'sms': <MessageSquare className="h-4 w-4" />,
  'whatsapp': <MessageSquare className="h-4 w-4" />,
  'in-app': <Bell className="h-4 w-4" />,
};

const triggerIcons = {
  'inactivity': <Clock className="h-4 w-4" />,
  'time-based': <Calendar className="h-4 w-4" />,
  'event-based': <Activity className="h-4 w-4" />,
};

// Function to convert form data into the expected NudgeRule format
const normalizeRuleData = (rule: any): NudgeRule => {
  // Ensure we have a proper trigger object with type and details
  const trigger = {
    type: rule.triggerType || rule.trigger?.type || 'time-based',
    details: rule.triggerDetails || rule.trigger?.details || 'Not specified'
  };

  // Ensure we have all required fields with default values if needed
  return {
    id: rule.id || String(Date.now()),
    name: rule.name || 'Untitled Rule',
    trigger,
    target: rule.targetGroup || rule.target || 'All Users',
    channel: rule.channel || 'email',
    schedule: rule.schedule || 'immediate',
    status: rule.status || 'inactive'
  };
};

const getRulesFromStorage = (): any[] => {
  try {
    const storedRules = JSON.parse(localStorage.getItem('nudgeRules') || '[]');
    // Normalize each rule to ensure it has the correct structure
    return storedRules.map(normalizeRuleData);
  } catch (error) {
    console.error('Error retrieving rules:', error);
    return [];
  }
};

const NudgeRulesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rules, setRules] = useState<NudgeRule[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedRules = getRulesFromStorage();
    if (storedRules.length > 0) {
      setRules([...storedRules, ...mockRules]);
    } else {
      setRules(mockRules);
    }
  }, []);

  const filteredRules = rules.filter(rule => 
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.target.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleStatus = (id: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id 
          ? { 
              ...rule, 
              status: rule.status === 'active' ? 'inactive' : 'active' 
            } 
          : rule
      )
    );
    
    const rule = rules.find(r => r.id === id);
    const newStatus = rule?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Rule ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `"${rule?.name}" is now ${newStatus}.`
    });
  };
  
  const handleEditRule = (id: string) => {
    navigate(`/rules/edit/${id}`);
    toast({
      title: "Edit Rule",
      description: "Opening rule editor...",
    });
  };
  
  const handleViewRule = (id: string) => {
    navigate(`/rules/view/${id}`);
    toast({
      title: "View Rule",
      description: "Opening rule details...",
    });
  };
  
  const handleDeleteRule = (id: string) => {
    const ruleToDelete = rules.find(rule => rule.id === id);
    
    // Update the rules state
    setRules(rules.filter(rule => rule.id !== id));
    
    // Also update localStorage
    try {
      const storedRules = JSON.parse(localStorage.getItem('nudgeRules') || '[]');
      const updatedRules = storedRules.filter((rule: any) => rule.id !== id);
      localStorage.setItem('nudgeRules', JSON.stringify(updatedRules));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
    
    toast({
      title: "Rule Deleted",
      description: `"${ruleToDelete?.name}" has been deleted.`
    });
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between">
        <div className="relative w-full max-w-sm">
          <Input 
            placeholder="Search nudge rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nudge Rule</TableHead>
              <TableHead>Trigger</TableHead>
              <TableHead>Target Group</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.length > 0 ? (
              filteredRules.map((rule) => (
                <TableRow key={rule.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">
                        {triggerIcons[rule.trigger.type] || <Calendar className="h-4 w-4" />}
                      </span>
                      <span className="text-xs">{rule.trigger.details}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{rule.target}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1.5 whitespace-nowrap">
                      {channelIcons[rule.channel] || <Mail className="h-4 w-4" />}
                      <span>{rule.channel.charAt(0).toUpperCase() + rule.channel.slice(1)}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{rule.schedule}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      rule.status === 'active' ? 'default' : 'secondary'
                    } className="capitalize">
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleStatus(rule.id)}>
                          {rule.status === 'active' ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              <span>Activate</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewRule(rule.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditRule(rule.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteRule(rule.id)} 
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  No nudge rules found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NudgeRulesList;
