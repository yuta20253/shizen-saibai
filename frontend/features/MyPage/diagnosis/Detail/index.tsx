'use client';

import { RequireAuth } from '@/components/RequireAuth';
import { Box, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Diagnosis = {
  id: number;
  diagnosed_at: string;
  image_url: string;
  weed_name: string;
  weed_description: string;
  soil_type: number;
  soil_drainage: string;
  soil_fertility: string;
  soil_description: string;
  recommended_vegetable: string;
  vegetable_difficulty: string;
  vegetable_season: string[];
  vegetable_description: string;
  result: string;
};

export const DiagnosisDetail = (): React.JSX.Element => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const resDiagnosis = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `http://localhost:5000/api/v1/histories/${id}`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });

        setDiagnosis(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    resDiagnosis();
  }, [id]);

  return (
    <RequireAuth>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Card sx={{ width: '80%', textAlign: 'center', my: 4, textDecoration: 'none' }}>
          <CardContent>
            <Box
              sx={{
                flex: '0 0 120px', // 固定幅
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              {diagnosis?.image_url ? (
                <Image
                  src={diagnosis?.image_url}
                  alt={diagnosis?.weed_name}
                  width={150}
                  height={150}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundColor: '#ccc',
                    borderRadius: '8px',
                  }}
                />
              )}
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', my: 2 }}>
                {diagnosis?.weed_name}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', my: 2, textAlign: 'left' }}
          >
            土壌環境の推定
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Typography
              component="p"
              sx={{ backgroundColor: '#f0f0f0', p: 1, borderRadius: '8px' }}
            >
              pH: {diagnosis?.soil_type}
            </Typography>
            <Typography
              component="p"
              sx={{ backgroundColor: '#f0f0f0', p: 1, borderRadius: '8px' }}
            >
              排水性: {diagnosis?.soil_drainage}
            </Typography>
            <Typography
              component="p"
              sx={{ backgroundColor: '#f0f0f0', p: 1, borderRadius: '8px' }}
            >
              肥沃度: {diagnosis?.soil_fertility}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', my: 2, textAlign: 'left' }}
          >
            おすすめの野菜
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {diagnosis?.recommended_vegetable}
            </Typography>
          </Box>
          <Link href="">
            <Box sx={{ my: 4 }}>
              <Typography variant="h5">提案理由をみる</Typography>
            </Box>
          </Link>
        </Box>
        <Link
          href={`/mypage/diagnoses`}
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
            <Typography variant="h6">診断結果一覧へ</Typography>
          </Box>
        </Link>
      </Box>
    </RequireAuth>
  );
};
