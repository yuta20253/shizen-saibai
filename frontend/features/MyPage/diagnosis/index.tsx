'use client';

import { RequireAuth } from '@/components/RequireAuth';
import { Box, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Diagnoses = {
  id: number;
  diagnosed_at: string;
  image_url: string;
  weed_name: string;
  weed_description: string;
  soil_type: number;
  soil_fertility: string;
  soil_description: string;
  recommended_vegetable: string;
  vegetable_difficulty: string;
  vegetable_season: string[];
  vegetable_description: string;
  result: string;
};

export const DiagnosesContent = (): React.JSX.Element | null => {
  const [diagnoses, setDiagnoses] = useState<Diagnoses[] | null>(null);

  useEffect(() => {
    const resDiagnoses = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5000/api/v1/histories';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });

        setDiagnoses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    resDiagnoses();
  }, []);

  if (diagnoses?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          診断結果がありません。
        </Typography>
        <Link
          href={`/mypage`}
          style={{ textDecoration: 'none', width: '80%', margin: '0 auto', display: 'block' }}
        >
          <Box
            sx={{
              position: 'relative',
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: '#6a994e',
              color: '#ffffff',
            }}
          >
            <Typography variant="h6">マイページへ</Typography>
          </Box>
        </Link>
      </Box>
    );
  }

  return (
    <RequireAuth>
      <Box>
        <Typography
          variant="h4"
          component="p"
          sx={{ fontWeight: 'bold', my: 4, textAlign: 'center' }}
        >
          診断履歴一覧
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          {diagnoses?.map((diagnosis, i) => (
            <Card
              key={i}
              component={Link}
              href={`/diagnoses/${diagnosis.id}`}
              sx={{ width: '80%', textAlign: 'center', mb: 2, textDecoration: 'none' }}
            >
              <CardContent sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    flex: '0 0 120px', // 固定幅
                    height: '100px',
                    backgroundColor: '#f0f0f0', // デバッグ用背景色
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  {diagnosis.image_url ? (
                    <Image
                      src={diagnosis.image_url}
                      alt={diagnosis.weed_name}
                      width={120}
                      height={120}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: '#ccc',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ width: '80%', textAlign: 'left' }}>
                  <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {diagnosis.weed_name}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    pH {diagnosis.soil_type},{diagnosis.soil_fertility}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>{diagnosis.recommended_vegetable}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Link
          href={`/mypage`}
          style={{ textDecoration: 'none', width: '80%', margin: '0 auto', display: 'block' }}
        >
          <Box
            sx={{
              position: 'relative',
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: '#6a994e',
              color: '#ffffff',
            }}
          >
            <Typography variant="h6">マイページへ</Typography>
          </Box>
        </Link>
      </Box>
    </RequireAuth>
  );
};
