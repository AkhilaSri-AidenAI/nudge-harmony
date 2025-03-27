
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TemplatesList from '@/components/templates/TemplatesList';

const Templates: React.FC = () => {
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Message Templates</h1>
        <p className="page-description">Create and manage templates for your nudges</p>
      </div>
      
      <TemplatesList />
    </PageContainer>
  );
};

export default Templates;
