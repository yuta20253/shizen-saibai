'use client';

import { loginAuth, signUpAuth, logOutAuth } from '@/libs/services/auth';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  signUp: ({
    email,
    password,
    password_confirmation,
    name,
  }: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('ユーザー情報の復元に失敗:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { token, user } = await loginAuth({ email, password });

    // ローカルストレージに保存
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = async () => {
    try {
      await logOutAuth();
    } catch (error) {
      console.error('ログアウト API 呼び出しに失敗:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const signUp = async ({
    email,
    password,
    password_confirmation,
    name,
  }: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
  }) => {
    const { token, user } = await signUpAuth({ email, password, password_confirmation, name });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
