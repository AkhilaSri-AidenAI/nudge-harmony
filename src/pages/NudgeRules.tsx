
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import NudgeRulesList from '@/components/nudges/NudgeRulesList';
import CreateRuleButton from '@/components/nudges/CreateRuleButton';

const NudgeRules: React.FC = () => {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div className="page-header mb-0">
          <h1 className="page-title">Nudge Rules</h1>
          <p className="page-description">Manage your automated nudge rules</p>
        </div>
        <CreateRuleButton />
      </div>
      
      <NudgeRulesList />
    </PageContainer>
  );
};

export default NudgeRules;
