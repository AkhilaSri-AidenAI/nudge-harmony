
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateRuleButtonProps {
  className?: string;
}

const CreateRuleButton: React.FC<CreateRuleButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Navigating to create rule page');
    navigate('/rules/new');
  };
  
  return (
    <Button 
      className={className}
      onClick={handleClick}
      variant="default"
    >
      <PlusCircle className="mr-2 h-4 w-4" /> Create Nudge Rule
    </Button>
  );
};

export default CreateRuleButton;
