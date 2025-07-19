'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const mockUser = {
  id: 1,
  name: 'テストユーザー',
  email: 'test.sample@example.com',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // setUser(mockUser);
  }, []);

  const login = () => setUser(mockUser);
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
