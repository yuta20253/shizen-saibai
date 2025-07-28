'use client';

import { Box, Button, Typography } from '@mui/material';
import { JSX, useState } from 'react';

const MyPage = (): JSX.Element => {
  const [response, setResponse] = useState<string>('');
  const handleChat = async () => {
    const token = localStorage.getItem('token');
    console.log('JWT token:', token);
    const res = await fetch('http://localhost:5000/api/v1/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt: '自然な会話をしてください。' }),
    });
    if (!res.ok) {
      const text = await res.text(); // JSONじゃない可能性も考慮
      console.error('エラー応答:', res.status, text);
      return;
    }
    const data = await res.json();
    setResponse(data.message);
  };
  return (
    <Box>
      <Button onClick={handleChat}>chatと会話</Button>
      {response && (
        <Box>
          <Typography>応答:</Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyPage;
