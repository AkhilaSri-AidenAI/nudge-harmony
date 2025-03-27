
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, MoreVertical, Edit, Trash2, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  createdAt: string;
  status: 'active' | 'inactive';
}

const mockUserGroups: UserGroup[] = [
  {
    id: '1',
    name: 'Development Team',
    description: 'All developers and engineering staff',
    members: 24,
    createdAt: '2023-06-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Marketing and brand management team',
    members: 12,
    createdAt: '2023-07-02',
    status: 'active',
  },
  {
    id: '3',
    name: 'Project Managers',
    description: 'Project and product managers',
    members: 8,
    createdAt: '2023-08-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'Executive Team',
    description: 'Company executives and directors',
    members: 5,
    createdAt: '2023-05-27',
    status: 'active',
  },
  {
    id: '5',
    name: 'Interns',
    description: 'Current interns and trainees',
    members: 6,
    createdAt: '2023-09-01',
    status: 'inactive',
  },
];

const UserGroups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userGroups, setUserGroups] = useState(mockUserGroups);
  
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  
  const filteredGroups = userGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const onSubmit = (data: any) => {
    const newGroup = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      members: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active' as const,
    };
    
    setUserGroups([...userGroups, newGroup]);
    setIsCreateDialogOpen(false);
    form.reset();
  };
  
  const toggleStatus = (id: string) => {
    setUserGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === id 
          ? { 
              ...group, 
              status: group.status === 'active' ? 'inactive' : 'active' 
            } 
          : group
      )
    );
  };
  
  const deleteGroup = (id: string) => {
    setUserGroups(prevGroups => prevGroups.filter(group => group.id !== id));
  };
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">User Groups</h1>
          <p className="page-description">Manage user groups for targeted nudges</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-accent hover:bg-accent/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>
      
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between">
          <div className="relative w-full max-w-sm">
            <Input 
              placeholder="Search user groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-2.5 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group) => (
                <TableRow key={group.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      {group.name}
                    </div>
                  </TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableCell>{group.members} users</TableCell>
                  <TableCell>{group.createdAt}</TableCell>
                  <TableCell>
                    <Badge variant={group.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                      {group.status}
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
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(group.id)}>
                          <Users className="h-4 w-4 mr-2" />
                          <span>{group.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteGroup(group.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredGroups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No user groups found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New User Group</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of this group" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Group</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default UserGroups;
