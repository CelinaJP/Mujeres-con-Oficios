
import React, { useState } from 'react';
import { TabType } from './types';
import Layout from './components/Layout';
import SurveyView from './views/SurveyView';
import DirectoryView from './views/DirectoryView';
import AcademyView from './views/AcademyView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.SURVEY);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.SURVEY:
        return <SurveyView />;
      case TabType.DIRECTORY:
        return <DirectoryView />;
      case TabType.ACADEMY:
        return <AcademyView />;
      default:
        return <SurveyView />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="pb-24 max-w-2xl mx-auto min-h-screen">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
