import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentUser({
      uid: 'mock-uid',
      email,
      displayName: email.split('@')[0]
    });
    setLoading(false);
  };

  const signup = async (email: string, _password: string, name: string) => {
    setLoading(true);
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentUser({
      uid: 'mock-uid',
      email,
      displayName: name
    });
    setLoading(false);
  };

  const logout = async () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
