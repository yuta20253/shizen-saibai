'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { ReactNode } from 'react';
import { DiagnosisType } from '@/types/diagnosis';
import { IllustrationFrame } from '@/components/IllustrationFrame';
import { TermTooltip } from '@/components/TermTooltip';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  diagnosis: DiagnosisType;
  /** ランディングのサンプル表示。サンプルバッジ＋理由ロック＋登録CTA。 */
  demo?: boolean;
};

/**
 * 診断結果をストーリー式に見せる共有部品。
 * ①撮った雑草 → ②だからこんな土 → ③だからこの野菜 の順に読める。
 * 実画面・デモ・診断直後で共有する。
 */
export const DiagnosisStory = ({ diagnosis, demo = false }: Props): React.JSX.Element => (
  <Box>
    {demo && (
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Chip color="secondary" variant="filled" label="サンプル診断" sx={{ color: '#fff', bgcolor: 'secondary.dark' }} />
      </Box>
    )}

    {/* ① 撮った雑草 */}
    <StoryStep step={1} title="この雑草、見つけました">
      <IllustrationFrame
        src={diagnosis.image_url}
        alt={diagnosis.weed_name}
        ratio="4 / 3"
        fallback="🌿"
      />
      <Typography variant="h6" sx={{ fontWeight: 800, mt: 1.5 }}>
        {diagnosis.weed_name}
      </Typography>
      {diagnosis.weed_description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {diagnosis.weed_description}
        </Typography>
      )}
    </StoryStep>

    <StepArrow label="この雑草から、土のようすが分かります" />

    {/* ② だからこんな土 */}
    <StoryStep step={2} title="畑の土は、こんな状態です">
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
        <SoilChip
          label={
            <>
              <TermTooltip term="pH" description="土の酸性・アルカリ性の度合い。多くの野菜は中性〜弱酸性を好みます。" />
              ：{phLabel(diagnosis.soil_type)}
            </>
          }
        />
        <SoilChip
          label={
            <>
              <TermTooltip term="水はけ" description="雨や水が土にたまらず流れる度合い。良いほど根が腐りにくくなります。" />
              ：{diagnosis.soil_drainage ?? '不明'}
            </>
          }
        />
        <SoilChip
          label={
            <>
              <TermTooltip term="肥沃度" description="土に養分がどれくらい含まれているか。高いほど作物が育ちやすい傾向です。" />
              ：{diagnosis.soil_fertility}
            </>
          }
        />
      </Stack>
      {diagnosis.soil_description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {diagnosis.soil_description}
        </Typography>
      )}
    </StoryStep>

    <StepArrow label="だから、この野菜がおすすめ" />

    {/* ③ だからこの野菜 */}
    <StoryStep step={3} title="育てやすい野菜はこれ！" highlight>
      <IllustrationFrame
        src={diagnosis.vegetable_image_url}
        alt={diagnosis.recommended_vegetable}
        ratio="16 / 9"
        fallback="🥕"
      />
      <Typography variant="h4" sx={{ fontWeight: 900, mt: 1.5, color: 'primary.dark' }}>
        {diagnosis.recommended_vegetable}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
        {diagnosis.vegetable_difficulty && (
          <Chip size="small" label={`むずかしさ：${diagnosis.vegetable_difficulty}`} />
        )}
        {diagnosis.vegetable_season?.map((s, i) => (
          <Chip key={i} size="small" label={s} />
        ))}
      </Stack>
      {diagnosis.vegetable_description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
          {diagnosis.vegetable_description}
        </Typography>
      )}
    </StoryStep>

    {/* 提案理由 */}
    <Box sx={{ mt: 3, position: 'relative' }}>
      <Accordion defaultExpanded={!demo} disabled={demo}>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
          <Typography sx={{ fontWeight: 700 }}>なぜこの野菜がおすすめ？</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {diagnosis.result || '理由を準備中です。'}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {demo && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 4,
            backdropFilter: 'blur(5px)',
            bgcolor: 'rgba(252,251,247,0.55)',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            p: 2,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5 }}>
              登録すると、あなたの畑の「おすすめ理由」まで見られます
            </Typography>
            <PrimaryCta href="/signup" fullWidth={false}>
              無料ではじめる
            </PrimaryCta>
          </Box>
        </Box>
      )}
    </Box>

    {/* 信頼度の注記 */}
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0.5}
      sx={{ mt: 2, color: 'text.secondary' }}
    >
      <AutoAwesomeRoundedIcon sx={{ fontSize: '1rem' }} />
      <Typography variant="caption">この結果は AI による推定です</Typography>
    </Stack>
  </Box>
);

const StoryStep = ({
  step,
  title,
  children,
  highlight = false,
}: {
  step: number;
  title: string;
  children: ReactNode;
  highlight?: boolean;
}): React.JSX.Element => (
  <Box
    sx={{
      borderRadius: 4,
      p: 2.5,
      bgcolor: highlight ? 'primary.light' : 'background.paper',
      border: '1px solid',
      borderColor: highlight ? 'transparent' : 'rgba(43,43,39,0.08)',
      boxShadow: highlight ? '0 8px 24px rgba(106,153,78,0.18)' : '0 4px 14px rgba(43,43,39,0.05)',
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 800,
          fontSize: '0.9rem',
          flexShrink: 0,
        }}
      >
        {step}
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
    </Stack>
    {children}
  </Box>
);

const StepArrow = ({ label }: { label: string }): React.JSX.Element => (
  <Stack alignItems="center" spacing={0.5} sx={{ py: 1.5, color: 'text.secondary' }}>
    <ArrowDownwardRoundedIcon />
    <Typography variant="caption">{label}</Typography>
  </Stack>
);

const SoilChip = ({ label }: { label: ReactNode }): React.JSX.Element => (
  <Chip
    variant="filled"
    label={label}
    sx={{ height: 'auto', py: 0.75, '& .MuiChip-label': { display: 'block' } }}
  />
);

// 土壌pHの内部値(0-9, 10=不明)をやさしい日本語に
const phLabel = (v: number): string => {
  const map: Record<number, string> = {
    0: 'とても強い酸性',
    1: '強い酸性',
    2: '酸性',
    3: 'やや酸性',
    4: '弱い酸性',
    5: '中性',
    6: 'やや アルカリ性',
    7: 'アルカリ性',
    8: '強いアルカリ性',
    9: 'とても強いアルカリ性',
  };
  return map[v] ?? '不明';
};
