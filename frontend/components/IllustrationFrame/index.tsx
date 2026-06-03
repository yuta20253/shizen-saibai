'use client';

import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

type Props = {
  src?: string | null;
  alt: string;
  /** 例: '16 / 9' '1 / 1' '4 / 3' */
  ratio?: string;
  /** 画像が無いときに中央に出す代替（絵文字やアイコン） */
  fallback?: ReactNode;
  rounded?: number;
  sx?: SxProps<Theme>;
};

/**
 * 差し替え可能なイラスト/画像の枠。
 * - アスペクト比を固定し、画像未用意やロード失敗でもレイアウトが崩れない。
 * - src が無い/失敗時は淡い緑の枠＋fallback を表示。
 */
export const IllustrationFrame = ({
  src,
  alt,
  ratio = '4 / 3',
  fallback = '🌱',
  rounded = 16,
  sx,
}: Props): React.JSX.Element => {
  const [errored, setErrored] = useState(false);
  const showImage = !!src && !errored;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: `${rounded}px`,
        overflow: 'hidden',
        bgcolor: 'primary.light',
        display: 'grid',
        placeItems: 'center',
        ...sx,
      }}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          style={{ objectFit: 'cover' }}
          onError={() => setErrored(true)}
        />
      ) : (
        <Box aria-label={alt} role="img" sx={{ fontSize: '3rem', lineHeight: 1, opacity: 0.8 }}>
          {fallback}
        </Box>
      )}
    </Box>
  );
};
