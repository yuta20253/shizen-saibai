'use client';

import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import features from './features';

export default function FeatureCarousel() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, mx: 'auto', mt: 4 }}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
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
                padding: 3,
                minHeight: 200,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {feature.icon}
                <Typography variant="subtitle1" fontWeight="bold">
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" textAlign="center">
                {feature.description}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
