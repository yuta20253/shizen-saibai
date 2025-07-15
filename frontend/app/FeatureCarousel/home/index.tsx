'use client';

import GrassIcon from '@mui/icons-material/Grass';
import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const features = [
  {
    icon: <CameraAltIcon fontSize="small" />,
    title: '雑草の撮影・選択',
    description: (
      <>
        スマホで雑草を撮影、
        <br />
        または画像を選択
      </>
    ),
  },
  {
    icon: <GrassIcon fontSize="small" />,
    title: '雑草×土壌診断',
    description: (
      <>
        雑草写真からAIが
        <br />
        土壌を解析
      </>
    ),
  },
  {
    icon: <SearchIcon fontSize="small" />,
    title: '野菜レコメンド',
    description: (
      <>
        土壌に合う
        <br />
        野菜を提案
      </>
    ),
  },
];

export default function FeatureCarousel() {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box sx={{ width: '100%', maxWidth: 320, mx: 'auto', mt: 3, pb: 6 }}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={12}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 2,
                minHeight: 160,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                {feature.icon}
                <Typography variant="subtitle2" fontWeight="bold">
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="caption" textAlign="center" lineHeight={1.4}>
                {feature.description}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
