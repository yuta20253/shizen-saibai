'use client';

import { loginAuth, signUpAuth, logOutAuth } from '@/libs/services/auth';
import { getMe, updateProfileApi, UpdateProfilePayload } from '@/libs/services/user';
import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  hydrated: boolean;
};

type AuthActions = {
  login: (p: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  signUp: (p: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
  }) => Promise<void>;
  updateProfile: (patch: UpdateProfilePayload) => Promise<void>;
  refresh: () => Promise<void>;
  getAuthHeaders: () => Record<string, string>;
};

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthActionsContext = createContext<AuthActions | undefined>(undefined);

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    const boot = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const cashed = localStorage.getItem(USER_KEY);
        if (cashed) {
          try {
            setUser(JSON.parse(cashed));
          } catch (error) {
            console.error('ユーザー情報の復元に失敗:', error);
          }
        }
        if (token) {
          const fresh = await getMe(token);
          if (fresh) {
            setUser(fresh);
            localStorage.setItem(USER_KEY, JSON.stringify(fresh));
          }
        }
      } catch (error) {
        console.error('auth boot failed', error);
        setUser(null);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
        setHydrated(true);
      }
    };
    boot();
  }, []);

  const login: AuthActions['login'] = async ({ email, password }) => {
    setLoading(true);
    try {
      const { token, user } = await loginAuth({ email, password });
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout: AuthActions['logout'] = async () => {
    try {
      await logOutAuth();
    } catch (error) {
      console.error('ログアウト API 呼び出しに失敗:', error);
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const signUp: AuthActions['signUp'] = async p => {
    setLoading(true);
    try {
      const { token, user } = await signUpAuth(p);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile: AuthActions['updateProfile'] = async (patch: UpdateProfilePayload) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error('認証失敗です');
    const updated = await updateProfileApi(patch, token);
    const next = { ...(user ?? ({} as User)), ...updated } as User;
    setUser(next);
    localStorage.setItem(USER_KEY, JSON.stringify(next));
  };

  const refresh: AuthActions['refresh'] = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    const fresh = await getMe(token);
    setUser(fresh);
    localStorage.setItem(USER_KEY, JSON.stringify(fresh));
  };

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const stateValue = useMemo<AuthState>(
    () => ({ user, loading, hydrated }),
    [user, loading, hydrated]
  );
  const actionsValue: AuthActions = {
    login,
    logout,
    signUp,
    updateProfile,
    refresh,
    getAuthHeaders,
  };

  return (
    <AuthActionsContext value={actionsValue}>
      <AuthStateContext value={stateValue}>{children}</AuthStateContext>
    </AuthActionsContext>
  );
};

export const useAuthState = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error('useAuthState must be used within an AuthProvider');
  return context;
};

export const useAuthActions = (): AuthActions => {
  const context = useContext(AuthActionsContext);
  if (!context) throw new Error('useAuthActions must be used within an AuthProvider');
  return context;
};
