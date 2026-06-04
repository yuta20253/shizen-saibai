import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { AuthProvider } from '@/context/AuthContext';
import { bodyFont } from './fonts';

export const metadata = {
  title: '雑草レンズ - 育てやすい野菜がきっと見つかる',
  description: 'あなたの畑やお庭に生えている雑草から育てやすい野菜を診断、提案します',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" style={{ height: '100%', margin: 0 }}>
      <body className={bodyFont.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              sx={{ bgcolor: 'background.default' }}
            >
              <Header />
              {/* 下部タブバー分の余白を確保（pb） */}
              <Box
                component="main"
                sx={{ flexGrow: 1, pb: 'calc(72px + env(safe-area-inset-bottom))' }}
              >
                {children}
              </Box>
              <BottomNav />
            </Box>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
