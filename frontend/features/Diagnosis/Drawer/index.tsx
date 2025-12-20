'use client';

import { Box, Button, Card, CardContent, Drawer, Typography } from '@mui/material';
import { DiagnosisType } from '@/types/diagnosis';

type Props = {
  open: boolean;
  onClose: () => void;
  diagnosis: DiagnosisType;
};

export const RecommendedVegetableDrawer = ({
  open,
  onClose,
  diagnosis,
}: Props): React.JSX.Element => {
  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              height: '50vh',
            },
          },
        }}
      >
        <Box>
          <Button>閉じる</Button>
          <Typography>提案理由</Typography>
          <Box>
            <Card>
              <CardContent>
                <Typography>
                  {diagnosis.recommended_vegetable}が育ちやすいのは
                  <br />
                  ph数{diagnosis.soil_type}×{diagnosis.soil_drainage}×{diagnosis.soil_fertility}
                  のため
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
