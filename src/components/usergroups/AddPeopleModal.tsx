
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

interface AddPeopleModalProps {
  open: boolean;
  onClose: () => void;
  onAddUsers: (userIds: string[]) => void;
  groupName: string;
}

// Mock user data
const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering', avatar: '' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Marketing', avatar: '' },
  { id: '3', name: 'Alex Johnson', email: 'alex.johnson@example.com', department: 'Engineering', avatar: '' },
  { id: '4', name: 'Sarah Williams', email: 'sarah.williams@example.com', department: 'Sales', avatar: '' },
  { id: '5', name: 'Michael Brown', email: 'michael.brown@example.com', department: 'Product', avatar: '' },
  { id: '6', name: 'Lisa Davis', email: 'lisa.davis@example.com', department: 'HR', avatar: '' },
  { id: '7', name: 'Robert Wilson', email: 'robert.wilson@example.com', department: 'Finance', avatar: '' },
  { id: '8', name: 'Emily Taylor', email: 'emily.taylor@example.com', department: 'Customer Support', avatar: '' },
];

const AddPeopleModal: React.FC<AddPeopleModalProps> = ({ open, onClose, onAddUsers, groupName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleToggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };
  
  const handleSubmit = () => {
    onAddUsers(selectedUsers);
    toast({
      title: "Users added to group",
      description: `${selectedUsers.length} users added to ${groupName}`
    });
    setSelectedUsers([]);
    setSearchTerm('');
    onClose();
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add People to {groupName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or department"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 px-1">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="select-all" 
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all">Select All</Label>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedUsers.length} selected
            </div>
          </div>
          
          <div className="border rounded-md max-h-[300px] overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center space-x-3 py-3 px-4 border-b last:border-0 hover:bg-muted/50"
                >
                  <Checkbox 
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleToggleUser(user.id)}
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{user.department}</div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No users match your search
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedUsers.length === 0}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Selected Users
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPeopleModal;
