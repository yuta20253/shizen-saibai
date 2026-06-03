'use client';

import { Box, Card, CardActionArea, Chip, Skeleton, Stack, Typography } from '@mui/material';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from 'next/link';
import { DiagnosisType } from '@/types/diagnosis';
import { PrimaryCta } from '@/components/PrimaryCta';
import { IllustrationFrame } from '@/components/IllustrationFrame';

type Props = {
  userName: string;
  recent: DiagnosisType[];
  loading: boolean;
  onDiagnose: () => void;
};

export const AppHomePresenter = ({
  userName,
  recent,
  loading,
  onDiagnose,
}: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 600, mx: 'auto', px: 2.5, py: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 700 }}>
      こんにちは{userName ? `、${userName}さん` : ''} 🌱
    </Typography>

    {/* 主役: 撮影CTA */}
    <Box
      sx={{
        mt: 2,
        p: 3,
        borderRadius: 4,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #eaf2e3 0%, #d8e8c8 100%)',
      }}
    >
      <CameraAltRoundedIcon sx={{ fontSize: '3rem', color: 'primary.dark' }} />
      <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
        今日の一枚を診断しよう
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        畑の雑草を撮ると、育てやすい野菜が分かります
      </Typography>
      <Box sx={{ maxWidth: 320, mx: 'auto' }}>
        <PrimaryCta onClick={onDiagnose} startIcon={<CameraAltRoundedIcon />}>
          雑草を撮って診断する
        </PrimaryCta>
      </Box>
    </Box>

    {/* 直近の診断 */}
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 1.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        さいきんの診断
      </Typography>
      {recent.length > 0 && (
        <Link href="/mypage/diagnoses" style={{ textDecoration: 'none', color: '#557a3e', fontWeight: 700 }}>
          すべて見る
        </Link>
      )}
    </Stack>

    {loading ? (
      <Stack spacing={1.5}>
        {[0, 1].map(i => (
          <Skeleton key={i} variant="rounded" height={88} sx={{ borderRadius: 4 }} />
        ))}
      </Stack>
    ) : recent.length === 0 ? (
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          color: 'text.secondary',
          bgcolor: 'background.paper',
          borderRadius: 4,
          border: '1px dashed rgba(43,43,39,0.15)',
        }}
      >
        <Typography variant="body2">まだ診断がありません。</Typography>
        <Typography variant="body2">最初の一枚を撮ってみましょう。</Typography>
      </Box>
    ) : (
      <Stack spacing={1.5}>
        {recent.map(d => (
          <RecentCard key={d.id} d={d} />
        ))}
      </Stack>
    )}
  </Box>
);

const RecentCard = ({ d }: { d: DiagnosisType }): React.JSX.Element => (
  <Card>
    <CardActionArea LinkComponent={Link} href={`/mypage/diagnoses/${d.id}`} sx={{ p: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ width: 64, flexShrink: 0 }}>
          <IllustrationFrame
            src={d.vegetable_image_url}
            alt={d.recommended_vegetable}
            ratio="1 / 1"
            fallback="🥕"
          />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }} noWrap>
            {d.recommended_vegetable}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {d.weed_name} ・ {new Date(d.diagnosed_at).toLocaleDateString('ja-JP')}
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip size="small" label={`むずかしさ：${d.vegetable_difficulty}`} />
          </Box>
        </Box>
        <ChevronRightRoundedIcon sx={{ color: 'text.secondary' }} />
      </Stack>
    </CardActionArea>
  </Card>
);
