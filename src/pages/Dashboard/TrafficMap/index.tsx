// Dependencies
import { Box, Card, Stack, Typography } from '@mui/material';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import React, { FC } from 'react';

import { COLORS } from '../../../constants/colors';
import { CURRENCY } from '../../../shared/enums';
// Styles
import * as S from './styles';

// Create traffic map
const TrafficMap: FC = () => {
  const data = [
    {
      label: 'Deposits',
      value: 56.987097,
      color: 'blue',
      currency: CURRENCY.DOLLAR
    },
    {
      label: 'Withdraws',
      value: 8.234542,
      color: 'black',
      currency: CURRENCY.DOLLAR
    },
    {
      label: 'Expenses',
      value: 1.726732,
      color: 'bluegray',
      currency: CURRENCY.DOLLAR
    }
  ];

  const series = [
    {
      values: { DE: 1000 },
      traffic: 'high'
    },
    {
      //@ts-ignore
      values: { BR: 1000 },
      traffic: 'lowest'
    },
    {
      //@ts-ignore
      values: { AU: 1000 },
      traffic: 'low'
    },
    {
      //@ts-ignore
      values: { IN: 1000 },
      traffic: 'highest'
    },
    {
      //@ts-ignore
      values: { US: 1000 },
      //@ts-ignore
      traffic: 'lowest'
    },
    {
      //@ts-ignore
      values: { BR: 1000 },
      traffic: 'low'
    },
    {
      //@ts-ignore
      values: { RU: 1000 },
      traffic: 'high'
    },
    {
      //@ts-ignore
      values: { CA: 1000 },
      traffic: 'lowest'
    },
    {
      //@ts-ignore
      values: { GB: 1000 },
      traffic: 'highest'
    },
    {
      //@ts-ignore
      values: { GE: 1000 },
      traffic: 'highest'
    }
  ];
  const getScale = (value) => {
    if (value === 'highest') {
      return [COLORS.BLUEDARK];
    } else if (value === 'high') {
      return [COLORS.BLUEWHITE];
    } else if (value === 'low') {
      return [COLORS.DARKGRAY];
    } else if (value === 'lowest') {
      return [COLORS.BLUELIGHT];
    }
  };
  // Return traffic map
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '2.5rem',
        boxShadow: '0px 7px 14px 2px rgb(100 100 100 / 24%) !important',
        paddingX: '2.5rem',
        position: 'relative'
      }}
    >
      <Typography fontWeight="600" fontSize={26} paddingY={16}>
        Traffic Map
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        {data.map(({ label, value, color, currency }, index) => (
          <Box key={index} display={'flex'} gap={'0.5rem'} alignItems={'center'} paddingBottom={'1rem'}>
            <S.ColorBox color={color} />
            <Box>
              <Stack key={index}>
                <Box fontSize={16} fontWeight={500}>
                  {label}
                </Box>
                <Box fontWeight={600}>
                  {currency}
                  {value?.toLocaleString()}
                </Box>
              </Stack>
            </Box>
          </Box>
        ))}
      </Box>
      <VectorMap
        containerClassName="vector-map"
        className="vector-map"
        style={{
          height: '600px',
          paddingLeft: '8rem'
        }}
        map={worldMill}
        zoomOnScroll={false}
        backgroundColor="transparent"
        regionStyle={{
          initial: {
            fill: '#e9ecef',
            // @ts-ignore
            'fill-opacity': 0.8,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 1
          },
          hover: {
            fill: '#dee2e6',
            // @ts-ignore
            'fill-opacity': 0.8,
            cursor: 'pointer'
          },
          selected: {
            fill: 'yellow'
          }
        }}
        series={{
          //@ts-ignore
          regions: series.map((item) => {
            const scale = getScale(item.traffic);
            return {
              values: item.values,
              //@ts-ignore
              scale: scale,
              normalizeFunction: 'polynomial',
              attribute: 'fill'
            };
          })
        }}
      />
    </Card>
  );
};

// Export traffic map
export default TrafficMap;
