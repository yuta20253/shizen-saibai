'use client';

import { useDemoDiagnosis } from './hooks';
import { LandingPresenter } from './Presenter';

/** ランディングページ Container：サンプル診断の取得のみ担当し、表示は Presenter に委譲。 */
export const Landing = (): React.JSX.Element => {
  const { demo, loading, error } = useDemoDiagnosis();
  return <LandingPresenter demo={demo} loading={loading} error={error} />;
};
