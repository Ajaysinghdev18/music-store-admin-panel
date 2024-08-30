// Dependencies
import { Card, CardHeader, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';

// Styles
import * as S from './styles';

// Constants
const data = [
  {
    label: 'Views',
    value: 10562
  },
  {
    label: 'Clicks',
    value: 56965
  },
  {
    label: 'Time',
    value: 8950
  },
  {
    label: 'Likes',
    value: 7650
  },
  {
    label: 'Shares',
    value: 3423
  },
  {
    label: 'Buys',
    value: 2258
  }
];

// Create interactions
const Interactions: FC = () => {
  // Mobile
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Get interactions
  const interactions = useMemo(() => {
    let max = 0;

    for (let i = 0; i < data.length; i++) {
      const value = data[i].value;
      if (value > max) {
        max = value;
      }
    }

    return data.map(({ label, value }) => ({
      label,
      value,
      percent: value / max
    }));
  }, []);

  // Return interactions
  return (
    <Card>
      <CardHeader
        title="Interactions"
        action={
          !isTablet && (
            <Select variant="filled" defaultValue="all" sx={{ minWidth: 380 }}>
              <MenuItem value="all">All items</MenuItem>
            </Select>
          )
        }
      />
      {isTablet && (
        <Select variant="filled" defaultValue="all" sx={{ mt: 16, minWidth: 420 }}>
          <MenuItem value="all">All items</MenuItem>
        </Select>
      )}
      <S.Chart>
        {interactions.map(({ value, label, percent }, index) => (
          <S.Item key={index}>
            <Typography variant="overline" color="success.main">
              {value}
            </Typography>
            <S.Bar width={isTablet ? '100%' : 96} percent={percent} />
            <Typography variant="label" color="text.disabled">
              {label}
            </Typography>
          </S.Item>
        ))}
      </S.Chart>
    </Card>
  );
};

// Export interactions
export default Interactions;
