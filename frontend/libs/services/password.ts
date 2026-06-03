import axios from 'axios';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/** 再設定メールの送信をリクエスト（ユーザー有無に関わらず成功扱い）。 */
export const requestReset = async (email: string): Promise<void> => {
  await axios.post(`${BASE}/api/v1/password/reset/request`, { email });
};

/** メールのトークンが有効か検証する。 */
export const verifyResetToken = async (email: string, token: string): Promise<void> => {
  await axios.post(`${BASE}/api/v1/password/verify`, { email, token });
};

/** 新しいパスワードに更新する。 */
export const updatePassword = async (params: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}): Promise<void> => {
  await axios.patch(`${BASE}/api/v1/password/reset`, params);
};
