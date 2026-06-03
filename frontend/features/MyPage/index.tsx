'use client';

import { useRouter } from 'next/navigation';
import { RequireAuth } from '@/components/RequireAuth';
import { useAuthState, useAuthActions } from '@/context/AuthContext';
import { MyPagePresenter } from './Presenter';

/** マイページ Container：ユーザー情報・ログアウト処理を担い、表示は Presenter へ。 */
export const MyPageContent = (): React.JSX.Element => {
  const { user } = useAuthState();
  const { logout } = useAuthActions();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RequireAuth>
      <MyPagePresenter name={user?.name ?? ''} email={user?.email ?? ''} onLogout={handleLogout} />
    </RequireAuth>
  );
};
