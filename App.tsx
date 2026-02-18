
import React, { useState } from 'react';
import { TabType } from './types';
import Layout from './components/Layout';
import SurveyView from './views/SurveyView';
import DirectoryView from './views/DirectoryView';
import AcademyView from './views/AcademyView';
import DashboardView from './views/DashboardView';
import MatchingView from './views/MatchingView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD:
        return <DashboardView onNavigate={setActiveTab} />;
      case TabType.SURVEY:
        return <SurveyView />;
      case TabType.DIRECTORY:
        return <DirectoryView />;
      case TabType.MATCHING:
        return <MatchingView />;
      case TabType.ACADEMY:
        return <AcademyView />;
      default:
        return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mx-auto">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
