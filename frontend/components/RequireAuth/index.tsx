'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if (!loading && (!user || !storedToken)) {
      router.replace('/login');
    }
  }, [user, router, token, loading]);

  if (user === null || token === null || loading) return null;

  return <>{children}</>;
};
