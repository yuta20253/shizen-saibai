import axios from 'axios';

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
  const url = 'http://localhost:5000/api/v1/login';

  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const data = {
      user: {
        email,
        password,
      },
    };

    const response = await axios.post(url, data, { headers });

    const token = response.headers.authorization.split(' ')[1];

    if (!token) throw new Error('トークンがありません');

    return { token, user: response.data.user };
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
  const url = 'http://localhost:5000/api/v1/user';
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = {
      user: {
        email,
        password,
        password_confirmation,
        name,
      },
    };

    const response = await axios.post(url, data, { headers });

    const token = response.headers.authorization.split(' ')[1];
    if (!token) throw new Error('トークンがありません');

    return { token, user: response.data.user };
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
