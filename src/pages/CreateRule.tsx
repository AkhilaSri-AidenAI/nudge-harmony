
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RuleWizard from '@/components/nudges/RuleWizard';

const CreateRule: React.FC = () => {
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Create Nudge Rule</h1>
        <p className="page-description">Set up a new automated nudge rule</p>
      </div>
      
      <RuleWizard />
    </PageContainer>
  );
};

export default CreateRule;
