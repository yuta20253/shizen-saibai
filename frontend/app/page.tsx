'use client';

import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import SearchIcon from '@mui/icons-material/Search';
import FeatureCarousel from './FeatureCarousel/home';

export default function Home() {
  return (
    <Box>
      <Typography
        variant="h5"
        component="p"
        textAlign="center"
        sx={{ fontWeight: 'medium', mt: 4, mb: 2 }}
      >
        あなたの畑を味方に。
        <br />
        雑草解析で最適野菜を。
        <br />
        スマホひとつで発見！
      </Typography>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', mt: 4 }}
      >
        <Button color="inherit" variant="outlined">
          いますぐ解析する
        </Button>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Typography textAlign="center" sx={{ mb: 2 }}>
          使える機能
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: 1,
              gap: 1,
              mb: 4,
              width: '80%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GrassIcon />
              <Typography>雑草撮影×土壌診断</Typography>
            </Box>
            <Box>
              雑草写真からAIが
              <br />
              畑の土壌コンディションを解析
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: 1,
              gap: 1,
              mb: 4,
              width: '80%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon />
              <Typography>最適野菜レコメンド</Typography>
            </Box>
            <Box>
              あなたの土壌に合う
              <br />
              野菜品種を自動提案
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography textAlign="center">はじめての方へ</Typography>
        <FeatureCarousel />
      </Box>
    </Box>
  );
}
