import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/MockAuthContext';
import Sidebar from '../components/Sidebar';
import ReportSection from '../components/ReportSection';
import QuerySection from '../components/QuerySection';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f9fa;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const HeaderTitle = styled.h1`
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
`;

const NotificationIcon = styled.div`
  background: #f1f3f4;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #e8eaed;
  }
`;

const SettingsIcon = styled(NotificationIcon)``;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

export type ActiveTab = 'report' | 'query';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('report');
  const { currentUser } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'report':
        return <ReportSection />;
      case 'query':
        return <QuerySection />;
      default:
        return <ReportSection />;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={currentUser}
      />
      
      <MainContent>
        <Header>
          <HeaderTitle>KHABRI Dashboard</HeaderTitle>
          <HeaderActions>
            <NotificationIcon>🔔</NotificationIcon>
            <SettingsIcon>⚙️</SettingsIcon>
          </HeaderActions>
        </Header>
        
        <ContentArea>
          {renderContent()}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
