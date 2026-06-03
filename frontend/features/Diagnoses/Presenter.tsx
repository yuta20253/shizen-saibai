'use client';

import { Box, Card, CardActionArea, Chip, Skeleton, Stack, Typography } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from 'next/link';
import { DiagnosisType } from '@/types/diagnosis';
import { IllustrationFrame } from '@/components/IllustrationFrame';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  diagnoses: DiagnosisType[];
  loading: boolean;
};

export const DiagnosesPresenter = ({ diagnoses, loading }: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 600, mx: 'auto', px: 2.5, py: 3 }}>
    <Typography variant="h6" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
      診断のりれき
    </Typography>

    {loading ? (
      <Stack spacing={1.5}>
        {[0, 1, 2].map(i => (
          <Skeleton key={i} variant="rounded" height={96} sx={{ borderRadius: 4 }} />
        ))}
      </Stack>
    ) : diagnoses.length === 0 ? (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          px: 2,
          bgcolor: 'background.paper',
          borderRadius: 4,
          border: '1px dashed rgba(43,43,39,0.15)',
        }}
      >
        <Typography sx={{ fontSize: '3rem' }}>🌱</Typography>
        <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
          まだ診断がありません
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
          雑草を撮って、最初の診断をしてみましょう。
        </Typography>
        <Box sx={{ maxWidth: 280, mx: 'auto' }}>
          <PrimaryCta href="/">最初の診断をしてみる</PrimaryCta>
        </Box>
      </Box>
    ) : (
      <Stack spacing={1.5}>
        {diagnoses.map(d => (
          <DiagnosisCard key={d.id} d={d} />
        ))}
      </Stack>
    )}
  </Box>
);

const DiagnosisCard = ({ d }: { d: DiagnosisType }): React.JSX.Element => (
  <Card>
    <CardActionArea LinkComponent={Link} href={`/mypage/diagnoses/${d.id}`} sx={{ p: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ width: 80, flexShrink: 0 }}>
          <IllustrationFrame
            src={d.vegetable_image_url}
            alt={d.recommended_vegetable}
            ratio="1 / 1"
            fallback="🥕"
          />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }} noWrap>
              {d.recommended_vegetable}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', flexShrink: 0 }}>
              {new Date(d.diagnosed_at).toLocaleDateString('ja-JP')}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap component="div">
            雑草：{d.weed_name}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 0.5 }}>
            <Chip size="small" label={`むずかしさ：${d.vegetable_difficulty}`} />
            {d.vegetable_season?.map((s, i) => (
              <Chip key={i} size="small" label={s} />
            ))}
          </Stack>
        </Box>
        <ChevronRightRoundedIcon sx={{ color: 'text.secondary', flexShrink: 0 }} />
      </Stack>
    </CardActionArea>
  </Card>
);
