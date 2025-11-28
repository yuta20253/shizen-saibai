import { apiClient, clientWithToken } from './apiClient';

type ErrorWithMessage = {
  message: string;
};

type NestedErrorWithMessage = {
  error: ErrorWithMessage;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function isNestedErrorWithMessage(error: unknown): error is NestedErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    isErrorWithMessage((error as Record<string, unknown>).error)
  );
}

export const extractApiErrorMessage = (error: unknown, fallback: string): string => {
  if (isNestedErrorWithMessage(error)) {
    return (error as NestedErrorWithMessage).error.message;
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  return fallback;
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
      user: {
        email,
        password,
      },
    });

    const authHeader = response.headers.get?.('Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) throw new Error('トークンがありません');

    const user = response.data.user as { id: number; name: string; email: string };

    return { token, user: user };
  } catch (error) {
    console.error(error);
    throw new Error(extractApiErrorMessage(error, 'ログインに失敗しました'));
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
      user: {
        email,
        password,
        password_confirmation,
        name,
      },
    });

    const authHeader = response.headers.get?.('Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) throw new Error('トークンがありません');

    const user = response.data.user as { id: number; name: string; email: string };
    return { token, user: user };
  } catch (error) {
    console.error(error);
    throw new Error(extractApiErrorMessage(error, '新規作成に失敗しました'));
  }
};

export const logOutAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('トークンがありません');

  try {
    await clientWithToken(token).api.v1LogoutDelete({ secure: true });
  } catch (error) {
    console.error(error);
    throw new Error(extractApiErrorMessage(error, 'ログアウトに失敗しました'));
  }
};
