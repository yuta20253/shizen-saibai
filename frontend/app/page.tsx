'use client';

import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import SearchIcon from '@mui/icons-material/Search';
import { FeatureCarousel } from '../components/FeatureCarousel';

const Home = () => {
  return (
    <Box sx={{ padding: 2, maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h5" component="p" textAlign="center" sx={{ fontWeight: 'bold', mt: 4 }}>
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
        <Button
          size="large"
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            fontWeight: 'bold',
            borderColor: 'primary.main',
          }}
        >
          いますぐ解析する
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
        >
          使える機能
        </Typography>
        <Box mt={2} gap={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
              padding: 1,
              gap: 1,
              mb: 4,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GrassIcon sx={{ fontSize: '4rem' }} />
              <Typography variant="h6">雑草撮影×土壌診断</Typography>
            </Box>
            <Typography fontSize="small">雑草写真からAIが畑の土壌コンディションを解析</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
              padding: 1,
              gap: 1,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon sx={{ fontSize: '4rem' }} />
              <Typography variant="h6">最適野菜レコメンド</Typography>
            </Box>
            <Box fontSize="small">あなたの土壌に合う野菜品種を自動提案</Box>
          </Box>
        </Box>
      </Box>
      <Box my={4}>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
        >
          はじめての方へ
        </Typography>
        <FeatureCarousel />
      </Box>
    </Box>
  );
};

export default Home;
