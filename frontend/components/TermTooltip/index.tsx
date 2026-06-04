'use client';

import { Box, Tooltip, ClickAwayListener } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';

type Props = {
  /** 表示する用語（例: pH、肥沃度） */
  term: string;
  /** やさしい説明文 */
  description: string;
};

/**
 * 専門用語にやさしい説明のツールチップを付ける。
 * スマホでもタップで開けるよう ClickAwayListener で制御。
 */
export const TermTooltip = ({ term, description }: Props): React.JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25 }}>
        <Box component="span">{term}</Box>
        <Tooltip
          title={description}
          open={open}
          onClose={() => setOpen(false)}
          disableHoverListener
          arrow
          enterTouchDelay={0}
          slotProps={{ tooltip: { sx: { fontSize: '0.85rem', lineHeight: 1.5 } } }}
        >
          <Box
            component="span"
            role="button"
            tabIndex={0}
            aria-label={`${term}とは`}
            onClick={() => setOpen(o => !o)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o);
            }}
            sx={{
              display: 'inline-flex',
              cursor: 'pointer',
              color: 'text.secondary',
              lineHeight: 0,
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: '1.05rem' }} />
          </Box>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
};
