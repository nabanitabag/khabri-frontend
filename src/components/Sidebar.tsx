import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/MockAuthContext';
import type { User } from '../types';
import type { ActiveTab } from '../pages/Dashboard';

const SidebarContainer = styled.div`
  width: 300px;
  background: white;
  border-right: 1px solid #e1e5e9;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
`;

const ProfileSection = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const NavigationSection = styled.div`
  flex: 1;
  padding: 0 1rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  background: ${props => props.$active ? '#667eea' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;

  &:hover {
    background: ${props => props.$active ? '#5a6fd8' : '#f8f9fa'};
    color: ${props => props.$active ? 'white' : '#333'};
  }
`;

const TabIcon = styled.span`
  font-size: 1.2rem;
`;

const TabLabel = styled.span`
  flex: 1;
`;

const LogoutSection = styled.div`
  padding: 0 1rem;
  margin-top: auto;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  color: #e53e3e;
  border: 2px solid #e53e3e;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e53e3e;
    color: white;
  }
`;

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, user }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (name?: string): string => {
    if (!name) return '👤';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarContainer>
      <ProfileSection>
        <Avatar>
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          ) : (
            getInitials(user?.displayName)
          )}
        </Avatar>
        <UserName>{user?.displayName || 'User'}</UserName>
        <UserEmail>{user?.email}</UserEmail>
      </ProfileSection>

      <NavigationSection>
        <TabButton 
          $active={activeTab === 'report'} 
          onClick={() => onTabChange('report')}
        >
          <TabIcon>📝</TabIcon>
          <TabLabel>REPORT</TabLabel>
        </TabButton>

        <TabButton 
          $active={activeTab === 'query'} 
          onClick={() => onTabChange('query')}
        >
          <TabIcon>🔍</TabIcon>
          <TabLabel>QUERY</TabLabel>
        </TabButton>
      </NavigationSection>

      <LogoutSection>
        <LogoutButton onClick={handleLogout}>
          🚪 LOGOUT
        </LogoutButton>
      </LogoutSection>
    </SidebarContainer>
  );
};

export default Sidebar;
