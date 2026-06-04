import { Suspense } from 'react';
import { PasswordResetNew } from '@features/PasswordResetNew';

const PasswordResetNewPage = (): React.JSX.Element => (
  <Suspense>
    <PasswordResetNew />
  </Suspense>
);

export default PasswordResetNewPage;
