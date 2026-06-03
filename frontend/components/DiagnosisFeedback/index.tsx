'use client';

import { Box, Rating, TextField, Typography, Alert } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from 'react';
import { submitFeedback } from '@/libs/services/feedback';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  diagnosisId: number;
};

/** 診断結果への評価・感想を送るフォーム。送信後はお礼を表示。 */
export const DiagnosisFeedback = ({ diagnosisId }: Props): React.JSX.Element => {
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rating) {
      setError('星の数を選んでください。');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('ログインが必要です。');
      await submitFeedback(
        { diagnosis_id: diagnosisId, rating, feedback_text: text || '（コメントなし）' },
        token
      );
      setDone(true);
    } catch (e) {
      console.error('フィードバック送信に失敗', e);
      setError('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Box sx={{ textAlign: 'center', py: 3, color: 'primary.dark' }}>
        <FavoriteRoundedIcon sx={{ fontSize: '2.5rem' }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mt: 1 }}>
          ありがとうございます！
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          いただいた声は、診断の改善に役立てます。
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 4,
        p: 2.5,
        border: '1px solid rgba(43,43,39,0.08)',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 800, textAlign: 'center' }}>
        この診断は役に立ちましたか？
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 1.5 }}>
        <Rating
          value={rating}
          size="large"
          onChange={(_, v) => setRating(v)}
          aria-label="評価"
        />
      </Box>
      <TextField
        fullWidth
        multiline
        minRows={2}
        placeholder="感想やご要望があればお書きください（任意）"
        value={text}
        onChange={e => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <PrimaryCta onClick={handleSubmit} disabled={submitting}>
        送信する
      </PrimaryCta>
    </Box>
  );
};
