import axios from 'axios';

export const loginAuth = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string; user: { id: number; name: string; email: string } }> => {
  try {
    const url = 'http://localhost:5000/api/v1/login';
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const data = {
      email,
      password,
    };

    const response = await axios.post(url, data, { headers });

    const token = response.headers.authorization.split(' ')[1];

    if (!token) throw new Error('トークンがありません');

    return { token, user: response.data.user };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
