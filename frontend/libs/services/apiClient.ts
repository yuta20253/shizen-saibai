import { Api } from '@/src/types/generated/Api';

export const apiClient = new Api({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
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
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    securityWorker: () => ({ headers: { Authorization: `Bearer ${token}` } }),
  });
