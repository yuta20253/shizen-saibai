'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';

export const PasswordResetConfirm = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [valid, setValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  useEffect(() => {
    const veryfyToken = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/password/verify';
        const headers = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token }),
        };
        const res = axios.post(url, headers);

        const data = res.json();

        if (!res.ok) {
          setErrorMessage(data.message || 'トークンが無効です');
          setValid(false);
        } else {
          setValid(true);
        }
      } catch {
        setErrorMessage('サーバーに接続できませんでした');
      } finally {
        setLoading(false);
      }
    };

    veryfyToken();
  }, [email, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/password/reset';
      const headers = {
        'Content-Type': 'application/json',
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: passwordConfirm,
        }),
      };

      const res = await axios.patch(url, headers);

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      router.push('/login');
    } catch (error) {
      setErrorMessage('サーバーに接続できませんでした');
    }
  };

  if (loading) return <Typography>読み込み中...</Typography>;

  if (!valid) {
    return <Alert severity="error">{errorMessage || '無効なリンクです'}</Alert>;
  }
};
