// Dependencies
import { Box, Card, CardHeader, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '../../../assets/icons';
// Styles
import * as S from './styles';

// Interfaces
interface IDisplayProps {
  title: string;
  value: string;
  percent: number;
  progress?: ReactNode;
}

// Create display
const Display: FC<IDisplayProps> = ({ title, value, percent, progress }) => {
  // Return display
  return (
    <>
      <Box fontSize={16} marginBottom={12} fontWeight={500}>
        {title}
      </Box>
      <Card
        sx={{
          borderRadius: '2.5rem',
          boxShadow: '0px 7px 14px 2px rgb(100 100 100 / 24%) !important'
        }}
      >
        <Typography fontSize="5rem" fontWeight={500} paddingLeft={16} variant="display">
          {value.length === 1 ? `0${value}` : value}
        </Typography>
        <S.Footer>
          <S.Progress>{progress}</S.Progress>
          <Stack spacing={14} direction="row">
            <S.IconBox color="black">{percent > 50 ? <ArrowUpIcon /> : <ArrowDownIcon />}</S.IconBox>
            <Typography variant="subtitle" color="text.primary" fontWeight={500}>
              {(Math.abs(percent) * 100).toFixed(0)}%
            </Typography>
          </Stack>
        </S.Footer>
      </Card>
    </>
  );
};

// Export display
export default Display;
