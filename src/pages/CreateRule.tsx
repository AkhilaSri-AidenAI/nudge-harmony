
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RuleWizard from '@/components/nudges/RuleWizard';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CreateRule: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Create Nudge Rule</h1>
          <p className="page-description">Set up a new automated nudge rule</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/rules')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Rules
        </Button>
      </div>
      
      <Card className="border border-border/40 shadow-lg">
        <CardContent className="p-0">
          <RuleWizard />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateRule;
