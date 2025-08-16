import { Api } from '@/src/types/generated/Api';

export const apiClient = new Api({
  baseUrl: 'http://localhost:5000',
  securityWorker: token =>
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {},
});

export const clientWithToken = (token: string) =>
  new Api({
    baseUrl: 'http://localhost:5000',
    securityWorker: () => ({ headers: { Authorization: `Bearer ${token}` } }),
  });
