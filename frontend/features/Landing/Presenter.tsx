'use client';

import { Box, Skeleton, Stack, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import EmojiNatureRoundedIcon from '@mui/icons-material/EmojiNatureRounded';
import PaymentsRoundedIcon from '@mui/icons-material/Payments';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { DiagnosisType } from '@/types/diagnosis';
import { PrimaryCta } from '@/components/PrimaryCta';
import { IllustrationFrame } from '@/components/IllustrationFrame';
import { DiagnosisStory } from '@/components/DiagnosisStory';
import { Section } from './components/Section';
import { InfoCard } from './components/InfoCard';

type Props = {
  demo: DiagnosisType | null;
  loading: boolean;
  error: boolean;
};

export const LandingPresenter = ({ demo, loading, error }: Props): React.JSX.Element => (
  <Box>
    {/* ① ファーストビュー＝ライブデモ・ヒーロー */}
    <Box
      sx={{
        background: 'linear-gradient(180deg, #eaf2e3 0%, #fcfbf7 100%)',
        pt: { xs: 4, sm: 6 },
        pb: { xs: 5, sm: 6 },
        px: 2.5,
      }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 900, lineHeight: 1.4 }}>
          畑の雑草が、
          <br />
          育てやすい野菜を教えてくれる。
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1.5 }}>
          写真1枚・無料・登録30秒
        </Typography>

        <Box sx={{ mt: 3 }}>
          <DemoCard demo={demo} loading={loading} error={error} />
        </Box>

        <Box sx={{ mt: 3, maxWidth: 360, mx: 'auto' }}>
          <PrimaryCta href="/signup">無料ではじめる</PrimaryCta>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 1 }}>
            クレジットカードは不要です
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* ② デモの続き＝ストーリー式の結果プレビュー */}
    {demo && (
      <Section title="こんなふうに、結果が届きます" maxWidth="sm">
        <DiagnosisStory diagnosis={demo} demo />
      </Section>
    )}

    {/* ③ 3ステップのしくみ */}
    <Section title="使い方は、3ステップ" tinted>
      <Stack spacing={2}>
        <StepCard
          n={1}
          icon={<PhotoCameraRoundedIcon fontSize="inherit" />}
          title="雑草をスマホで撮る"
          body="畑やお庭に生えている雑草を1枚撮るだけ。"
        />
        <StepCard
          n={2}
          icon={<SpaRoundedIcon fontSize="inherit" />}
          title="AIが土を読む"
          body="雑草の種類から、土の性質（酸性度・水はけ・肥沃度）を推定します。"
        />
        <StepCard
          n={3}
          icon={<EmojiNatureRoundedIcon fontSize="inherit" />}
          title="おすすめ野菜が届く"
          body="あなたの土で育てやすい野菜を、理由つきで提案します。"
        />
      </Stack>
    </Section>

    {/* ④ あなたにできること */}
    <Section title="雑草レンズでできること">
      <Stack spacing={2}>
        <InfoCard icon={<PaymentsRoundedIcon fontSize="inherit" />} title="無料で何度でも" horizontal>
          気になる雑草を見つけるたびに、何回でも診断できます。
        </InfoCard>
        <InfoCard icon={<PhotoCameraRoundedIcon fontSize="inherit" />} title="写真1枚でOK" horizontal>
          むずかしい知識や道具はいりません。スマホひとつで完結します。
        </InfoCard>
        <InfoCard icon={<EmojiNatureRoundedIcon fontSize="inherit" />} title="失敗しにくい野菜選び" horizontal>
          土に合う野菜が分かるから、初めてでも育てやすい品種を選べます。
        </InfoCard>
      </Stack>
    </Section>

    {/* ⑤ 安心・信頼 */}
    <Section tinted maxWidth="sm">
      <Stack spacing={1.5} alignItems="center" textAlign="center">
        <VerifiedRoundedIcon sx={{ fontSize: '2.5rem', color: 'primary.dark' }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          安心して使えます
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          180種類以上の雑草に対応。AIが土の酸性度・水はけ・肥沃度を推定します。
          登録は無料、クレジットカードは必要ありません。
        </Typography>
      </Stack>
    </Section>

    {/* ⑥ FAQ */}
    <Section title="よくある質問">
      <Stack spacing={1.5}>
        <Faq q="本当に無料ですか？" a="はい。診断は無料で、何度でもご利用いただけます。クレジットカードの登録も不要です。" />
        <Faq q="どんな雑草でもいいですか？" a="畑やお庭でよく見かける雑草に対応しています。1種類が画面いっぱいに写るように撮ると、より正確に判定できます。" />
        <Faq q="診断は当たりますか？" a="雑草は土の状態を示す手がかりです。AIがそれをもとに推定するため、目安としてお使いください。" />
        <Faq q="かんたんにやめられますか？" a="はい。マイページからいつでも退会できます。" />
      </Stack>
    </Section>

    {/* ⑦ 最終CTA */}
    <Box sx={{ textAlign: 'center', px: 2.5, py: { xs: 6, sm: 8 }, bgcolor: 'primary.light' }}>
      <Box sx={{ maxWidth: 360, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
          さっそく、畑を診断してみましょう
        </Typography>
        <PrimaryCta href="/signup">無料ではじめる</PrimaryCta>
        <Box sx={{ mt: 1.5 }}>
          <PrimaryCta href="/login" variant="outlined">
            ログインはこちら
          </PrimaryCta>
        </Box>
      </Box>
    </Box>
  </Box>
);

const DemoCard = ({ demo, loading, error }: Props): React.JSX.Element => {
  if (loading) {
    return <Skeleton variant="rounded" height={160} sx={{ borderRadius: 4 }} />;
  }
  // 取得失敗時はイラストの静的プレビューでフォールバック（LPは壊さない）
  if (error || !demo) {
    return (
      <Box
        sx={{
          borderRadius: 4,
          p: 2.5,
          bgcolor: 'background.paper',
          boxShadow: '0 6px 20px rgba(43,43,39,0.08)',
        }}
      >
        <IllustrationFrame src={null} alt="雑草から野菜を提案するイメージ" ratio="16 / 9" fallback="🌿→🥕" />
        <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 700 }}>
          雑草を撮ると、育てやすい野菜が分かります
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 6px 20px rgba(43,43,39,0.08)',
        textAlign: 'left',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ width: 72, flexShrink: 0 }}>
          <IllustrationFrame src={demo.image_url} alt={demo.weed_name} ratio="1 / 1" fallback="🌿" />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            この雑草（{demo.weed_name}）の畑には
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.dark', lineHeight: 1.3 }}>
            {demo.recommended_vegetable} がおすすめ
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

const StepCard = ({
  n,
  icon,
  title,
  body,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  body: string;
}): React.JSX.Element => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      bgcolor: 'background.paper',
      borderRadius: 4,
      p: 2,
      boxShadow: '0 4px 14px rgba(43,43,39,0.05)',
    }}
  >
    <Box sx={{ position: 'relative', color: 'primary.dark', fontSize: '2.5rem', flexShrink: 0 }}>
      {icon}
      <Box
        sx={{
          position: 'absolute',
          top: -6,
          left: -6,
          width: 22,
          height: 22,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 800,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {n}
      </Box>
    </Box>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {body}
      </Typography>
    </Box>
  </Box>
);

const Faq = ({ q, a }: { q: string; a: string }): React.JSX.Element => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
      <Typography sx={{ fontWeight: 700 }}>{q}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {a}
      </Typography>
    </AccordionDetails>
  </Accordion>
);
