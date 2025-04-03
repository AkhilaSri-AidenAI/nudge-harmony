
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TemplateEditor from '@/components/templates/TemplateEditor';

const CreateTemplate: React.FC = () => {
  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">Create Template</h1>
        <p className="page-description">Create a new message template for your nudges</p>
      </div>
      
      <TemplateEditor />
    </PageContainer>
  );
};

export default CreateTemplate;
