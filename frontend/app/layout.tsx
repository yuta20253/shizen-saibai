import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { inter } from './fonts';

export const metadata = {
  title: '雑草レンズ - 育てやすい野菜がきっと見つかる',
  description: 'あなたの畑やお庭に生えている雑草から育てやすい野菜を診断、提案します',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" style={{ height: '100%', margin: 0 }}>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Header />
              <Box p={2} maxWidth="960px" width="100%" margin="0 auto">
                {children}
              </Box>
              <Footer />
            </Box>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
