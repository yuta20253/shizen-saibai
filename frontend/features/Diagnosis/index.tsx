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
  vegetable_image_url: string;
  result: string;
};

export const Diagnosis = (): React.JSX.Element => {
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
      <Box sx={{ px: 2, pb: 14 }}>
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 2,
            mb: 4,
            background:
              'linear-gradient(135deg, rgba(106,153,78,0.16) 0%, rgba(33,150,83,0.10) 100%)',
          }}
        >
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ letterSpacing: 1, color: 'text.secondary' }}>
              この土壌で育てやすい野菜
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.5, lineHeight: 1.2 }}>
              {diagnosis?.recommended_vegetable ?? '—'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
              {diagnosis
                ? new Date(diagnosis.diagnosed_at).toLocaleDateString('ja-JP')
                : '— — / — — / — —'}
            </Typography>
          </Box>
        </Box>

        <Card
          sx={{
            maxWidth: 680,
            mx: 'auto',
            borderRadius: 3,
            boxShadow: 3,
            mb: 5,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'grey.100',
              }}
            >
              {diagnosis?.vegetable_image_url ? (
                <Image
                  src={diagnosis.vegetable_image_url}
                  alt={diagnosis.recommended_vegetable}
                  fill
                  sizes="(max-width: 680px) 100vw, 680px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Box sx={{ width: '100%', height: '100%' }} />
              )}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {diagnosis?.vegetable_difficulty && (
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    bgcolor: 'grey.100',
                    borderRadius: '9999px',
                    fontSize: 13,
                  }}
                >
                  難易度: {diagnosis.vegetable_difficulty}
                </Box>
              )}
              {Array.isArray(diagnosis?.vegetable_season) &&
                diagnosis!.vegetable_season.map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 1.25,
                      py: 0.5,
                      bgcolor: 'grey.100',
                      borderRadius: '9999px',
                      fontSize: 13,
                    }}
                  >
                    {s}
                  </Box>
                ))}
            </Box>

            {diagnosis?.vegetable_description && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                {diagnosis.vegetable_description}
              </Typography>
            )}
          </CardContent>
        </Card>

        <Box sx={{ maxWidth: 680, mx: 'auto', my: 4, height: 1, bgcolor: 'grey.200' }} />

        <Box sx={{ maxWidth: 680, mx: 'auto', mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
            土壌環境の推定
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
            <Box
              sx={{ px: 1.25, py: 0.5, bgcolor: 'grey.100', borderRadius: '9999px', fontSize: 13 }}
            >
              pH: {diagnosis?.soil_type ?? '—'}
            </Box>
            <Box
              sx={{ px: 1.25, py: 0.5, bgcolor: 'grey.100', borderRadius: '9999px', fontSize: 13 }}
            >
              排水性: {diagnosis?.soil_drainage ?? '—'}
            </Box>
            <Box
              sx={{ px: 1.25, py: 0.5, bgcolor: 'grey.100', borderRadius: '9999px', fontSize: 13 }}
            >
              肥沃度: {diagnosis?.soil_fertility ?? '—'}
            </Box>
          </Box>

          {diagnosis?.soil_description && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
              {diagnosis.soil_description}
            </Typography>
          )}
        </Box>

        <Card
          sx={{
            maxWidth: 680,
            mx: 'auto',
            borderRadius: 3,
            boxShadow: 3,
            mb: 6,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography variant="overline" sx={{ letterSpacing: 1, color: 'text.secondary' }}>
              判定された雑草
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
              今回の診断では
              <Box component="span" sx={{ fontWeight: 700 }}>
                {` ${diagnosis?.weed_name ?? '—'} `}
              </Box>
              と判定しました。
            </Typography>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'grey.100',
              }}
            >
              {diagnosis?.image_url ? (
                <Image
                  src={diagnosis.image_url}
                  alt={diagnosis.weed_name}
                  fill
                  sizes="(max-width: 680px) 100vw, 680px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Box sx={{ width: '100%', height: '100%' }} />
              )}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 800, mt: 2 }}>
              {diagnosis?.weed_name ?? '—'}
            </Typography>
            {diagnosis?.weed_description && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {diagnosis.weed_description}
              </Typography>
            )}
          </CardContent>
        </Card>

        <Box sx={{ maxWidth: 680, mx: 'auto', textAlign: 'center', mb: 6 }}>
          <Link href="" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                height: 46,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                bgcolor: 'background.paper',
                boxShadow: 1,
                ':hover': { boxShadow: 2, bgcolor: 'grey.50' },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                提案理由をみる
              </Typography>
            </Box>
          </Link>
        </Box>

        <Link
          href={`/mypage/diagnoses`}
          style={{
            textDecoration: 'none',
            width: 'min(680px, 92vw)',
          }}
        >
          <Box
            sx={{
              height: 52,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 2,
              bgcolor: '#6a994e',
              color: '#ffffff',
              fontWeight: 800,
              boxShadow: 6,
            }}
          >
            <Typography variant="h6">診断結果一覧へ</Typography>
          </Box>
        </Link>
      </Box>
    </RequireAuth>
  );
};
