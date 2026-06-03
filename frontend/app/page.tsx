'use client';

import { Box, CircularProgress } from '@mui/material';
import { useAuthState } from '@/context/AuthContext';
import { Landing } from '@features/Landing';
import { AppHome } from '@features/AppHome';

const Home = (): React.JSX.Element => {
  const { user, hydrated } = useAuthState();

  if (!hydrated) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? <AppHome /> : <Landing />;
};

export default Home;
