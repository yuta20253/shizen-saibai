'use client';

import { RequireAuth } from '@/components/RequireAuth';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
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
  soil_fertility: string;
  soil_description: string;
  recommended_vegetable: string;
  vegetable_difficulty: string;
  vegetable_season: string[];
  vegetable_description: string;
  result: string;
};

export const Diagnoses = (): React.JSX.Element | null => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const resDiagnoses = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem('token');
        const url = 'http://localhost:5000/api/v1/histories';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });

        setDiagnoses(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    resDiagnoses();
  }, []);

  return (
    <RequireAuth>
      <Box>
        {!isLoading ? (
          <>
            <Typography
              variant="h4"
              component="p"
              sx={{ fontWeight: 'bold', my: 4, textAlign: 'center' }}
            >
              診断履歴一覧
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              {diagnoses?.length === 0 ? (
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
                </Box>
              ) : (
                diagnoses?.map(diagnosis => (
                  <Card
                    key={diagnosis.id}
                    component={Link}
                    href={`/mypage/diagnoses/${diagnosis.id}`}
                    sx={{
                      width: 'min(720px, 90vw)',
                      textDecoration: 'none',
                      borderRadius: 3,
                      boxShadow: 2,
                      overflow: 'hidden',
                      ':hover': { boxShadow: 4 },
                    }}
                  >
                    <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2 }}>
                      <Box
                        sx={{
                          width: 96,
                          height: 96,
                          borderRadius: 2,
                          overflow: 'hidden',
                          bgcolor: 'grey.100',
                          flexShrink: 0,
                        }}
                      >
                        {diagnosis.image_url ? (
                          <Image
                            src={diagnosis.image_url}
                            alt={diagnosis.weed_name}
                            width={96}
                            height={96}
                            sizes="96px"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        ) : (
                          <Box sx={{ width: '100%', height: '100%', bgcolor: 'grey.200' }} />
                        )}
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              lineHeight: 1.2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {diagnosis.weed_name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {(() => {
                              const dt = new Date(diagnosis.diagnosed_at);
                              return dt.toLocaleDateString('ja-JP');
                            })()}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                          <Box
                            sx={{
                              px: 1,
                              py: 0.25,
                              bgcolor: 'grey.100',
                              borderRadius: '9999px',
                              fontSize: 12,
                            }}
                          >
                            pH {diagnosis.soil_type}
                          </Box>
                          <Box
                            sx={{
                              px: 1,
                              py: 0.25,
                              bgcolor: 'grey.100',
                              borderRadius: '9999px',
                              fontSize: 12,
                            }}
                          >
                            {diagnosis.soil_fertility}
                          </Box>
                          {Array.isArray(diagnosis.vegetable_season) &&
                            diagnosis.vegetable_season.map((season, i) => (
                              <Box
                                key={i}
                                sx={{
                                  px: 1,
                                  py: 0.25,
                                  bgcolor: 'grey.100',
                                  borderRadius: '9999px',
                                  fontSize: 12,
                                }}
                              >
                                {season}
                              </Box>
                            ))}
                        </Box>

                        <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'baseline' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {diagnosis.recommended_vegetable}
                          </Typography>
                          {diagnosis.vegetable_difficulty && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {diagnosis.vegetable_difficulty}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
            <Link
              href={`/mypage`}
              style={{
                textDecoration: 'none',
                width: '80%',
                display: 'block',
                margin: '24px auto 100px',
              }}
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
          </>
        ) : (
          <Box sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center' }}>
            <CircularProgress size="4rem" />
          </Box>
        )}
      </Box>
    </RequireAuth>
  );
};
