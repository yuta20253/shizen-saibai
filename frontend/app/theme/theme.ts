'use client';

import { createTheme } from '@mui/material/styles';
import { bodyFont } from '../fonts';

// 雑草レンズ デザインシステム
// - 親しみやすい・やわらかい印象（家庭菜園/初心者向け）
// - スマホ最優先・大きめタップ領域・読みやすい本文
// - ブランド: green #6a994e / アクセント茶（文字用は暗め #a85a1e でコントラスト確保）
const GREEN = '#6a994e';
const GREEN_DARK = '#557a3e';
const GREEN_SOFT = '#eaf2e3';
const BROWN_TEXT = '#a85a1e';
const BROWN = '#bc6c25';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: GREEN,
      dark: GREEN_DARK,
      light: GREEN_SOFT,
      contrastText: '#ffffff',
    },
    secondary: {
      // アクセント。文字に使う場合は dark を使う想定（コントラスト確保）。
      main: BROWN,
      dark: BROWN_TEXT,
      contrastText: '#ffffff',
    },
    success: {
      main: GREEN,
      contrastText: '#ffffff',
    },
    warning: {
      main: '#e8a33d',
    },
    background: {
      default: '#fcfbf7', // 暖色オフホワイト
      paper: '#ffffff',
    },
    text: {
      primary: '#2b2b27',
      secondary: '#5f6258',
    },
    divider: 'rgba(43, 43, 39, 0.12)',
  },
  typography: {
    fontFamily: [bodyFont.style.fontFamily, '"Roboto"', 'sans-serif'].join(','),
    fontSize: 16,
    h1: { fontWeight: 800, lineHeight: 1.3 },
    h2: { fontWeight: 800, lineHeight: 1.3 },
    h3: { fontWeight: 800, lineHeight: 1.35 },
    h4: { fontWeight: 800, lineHeight: 1.35 },
    h5: { fontWeight: 700, lineHeight: 1.4 },
    h6: { fontWeight: 700, lineHeight: 1.4 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        'a:focus-visible, button:focus-visible, [role="button"]:focus-visible': {
          outline: `3px solid ${GREEN}`,
          outlineOffset: 2,
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 999,
          paddingInline: 24,
          fontSize: '1rem',
        },
        sizeLarge: { minHeight: 56, fontSize: '1.1rem' },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { minWidth: 44, minHeight: 44 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid rgba(43, 43, 39, 0.08)',
          boxShadow: '0 6px 20px rgba(43, 43, 39, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
        filled: {
          backgroundColor: GREEN_SOFT,
          color: GREEN_DARK,
        },
      },
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid rgba(43, 43, 39, 0.08)',
          borderRadius: 16,
          '&:before': { display: 'none' },
        },
      },
    },
  },
});

export default theme;
