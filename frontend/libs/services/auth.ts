import axios from 'axios';
import { apiClient, clientWithToken } from './apiClient';

type ErrorResponseData = {
  message?: string;
};

export const loginAuth = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string; user: { id: number; name: string; email: string } }> => {
  try {
    const response = await apiClient.api.v1LoginCreate({
      email,
      password,
    });

    // const token = response.headers['authorization']?.split(' ')[1];
    const authHeader = response.headers.get?.('Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) throw new Error('トークンがありません');

    const user = response.data.user as { id: number; name: string; email: string };

    return { token, user: user };
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error) && error.response) {
      // const message = (error.response.data as any).message ?? 'ログインに失敗しました';
      // throw new Error(message);
      const data = error.response.data as unknown;
      if (typeof data === 'object' && data !== null && 'message' in data) {
        const { message } = data as ErrorResponseData;
        throw new Error(message ?? 'ログインに失敗しました');
      }
      throw new Error('ログインに失敗しました');
    }

    throw error;
  }
};

export const signUpAuth = async ({
  email,
  password,
  password_confirmation,
  name,
}: {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}): Promise<{ token: string; user: { id: number; name: string; email: string } }> => {
  try {
    const response = await apiClient.api.v1UserCreate({
      email,
      password,
      password_confirmation,
      name,
    });

    const authHeader = response.headers.get?.('Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) throw new Error('トークンがありません');

    const user = response.data.user as { id: number; name: string; email: string };
    return { token, user: user };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as unknown;
      if (typeof data === 'object' && data !== null && 'message' in data) {
        const { message } = data as ErrorResponseData;
        throw new Error(message ?? '新規作成に失敗しました');
      }
      throw new Error('新規作成に失敗しました');
    }
    throw error;
  }
};

export const logOutAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('トークンがありません');

  try {
    await clientWithToken(token).api.v1LogoutDelete({ secure: true });
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as unknown;
      if (typeof data === 'object' && data !== null && 'message' in data) {
        const { message } = data as ErrorResponseData;
        throw new Error(message ?? 'ログアウトに失敗しました');
      }
      throw new Error('ログアウトに失敗しました');
    }
    throw error;
  }
};
