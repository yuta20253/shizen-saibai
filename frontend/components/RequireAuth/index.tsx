'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!loading && (!user || !storedToken)) {
      router.replace('/login');
    }
  }, [user, router, loading]);

  if (user === null || loading) return null;

  return <>{children}</>;
};
