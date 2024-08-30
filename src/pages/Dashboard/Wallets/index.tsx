// Dependencies
import { Box, Card, CardHeader, Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { CircleChart } from '../../../components/CircleChart';
// Types
import { CURRENCY } from '../../../shared/enums';
// Styles
import * as S from './styles';

// Constants
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

const width = 360;
const height = 360;
const defaultSize = 360;
const defaultStrokeWidth = 100;
const defaultLineWidth1 = 55;
const defaultLineWidth2 = 65;

// Create wallets
const Wallets: FC = () => {
  const [dimension, setDimension] = useState({
    width,
    height
  });

  const chartRef = useRef<SVGSVGElement>(null);

  const theme = useTheme();

  const ratio = useMemo(() => dimension.width / width, [dimension]);

  // Calc chart dimensions from ratio
  const size = useMemo(() => ratio * defaultSize, [ratio]);
  const strokeWidth = useMemo(() => ratio * defaultStrokeWidth, [ratio]);
  const lineWidth1 = useMemo(() => ratio * defaultLineWidth1, [ratio]);
  const lineWidth2 = useMemo(() => ratio * defaultLineWidth2, [ratio]);
  // Get wallets

  const initializeSize = () => {
    if (chartRef.current) {
      const parent = chartRef.current.parentElement;

      if (parent) {
        setDimension({
          width: parent.clientWidth,
          height: parent.clientHeight
        });
      }
    }
  };

  // On mounted
  useEffect(() => {
    initializeSize();

    window.onresize = () => {
      initializeSize();
    };

    return () => {
      window.onresize = null;
    };
  }, []);

  const coordinate = useMemo(
    () => ({
      x: dimension.width / 2,
      y: (height * ratio) / 2
    }),
    [dimension, ratio]
  );

  // Calc chart radius
  const outerRadius = size / 2;
  const innerRadius = 0;

  const wallets = data.map((item, index) => {
    let sum = 0;
    data.map((item) => (sum = item.value + sum));
    const percent = item.value / sum;
    console.log('percent:', percent);
    const alpha = 360 * percent * (Math.PI / 180);
    const startAlpha =
      index === 0
        ? 0
        : 359.95 *
          data
            .map(({ value }) => value / sum)
            .filter((_, i) => i < index)
            .reduce((t = 0, n) => t + n) *
          (Math.PI / 180);
    const endAlpha = alpha + startAlpha;
    const middleAlpha = alpha / 2 + startAlpha;

    const startCoordinate1 = {
      x: coordinate.x + outerRadius * Math.sin(startAlpha),
      y: coordinate.y - outerRadius * Math.cos(startAlpha)
    };

    const endCoordinate1 = {
      x: coordinate.x + outerRadius * Math.sin(endAlpha),
      y: coordinate.y - outerRadius * Math.cos(endAlpha)
    };

    const startCoordinate2 = {
      x: coordinate.x + innerRadius * Math.sin(startAlpha),
      y: coordinate.y - innerRadius * Math.cos(startAlpha)
    };

    const endCoordinate2 = {
      x: coordinate.x + innerRadius * Math.sin(endAlpha),
      y: coordinate.y - innerRadius * Math.cos(endAlpha)
    };

    const lineStartCoordinate = {
      x: coordinate.x + outerRadius * Math.sin(middleAlpha),
      y: coordinate.y - outerRadius * Math.cos(middleAlpha)
    };

    const lineMiddleCoordinate = {
      x: coordinate.x + (outerRadius + lineWidth1 * Math.abs(Math.cos(middleAlpha))) * Math.sin(middleAlpha),
      y: coordinate.y - (outerRadius + lineWidth1 * Math.abs(Math.cos(middleAlpha))) * Math.cos(middleAlpha)
    };

    const isRight = lineMiddleCoordinate.x > coordinate.x;

    const lineEndCoordinate = {
      x: lineMiddleCoordinate.x + (isRight ? 1 : -1) * lineWidth2,
      y: lineMiddleCoordinate.y
    };

    return {
      alpha,
      startCoordinate1,
      endCoordinate1,
      startCoordinate2,
      endCoordinate2,
      lineStartCoordinate,
      lineMiddleCoordinate,
      lineEndCoordinate,
      isRight,
      outerRadius,
      innerRadius,
      ...item
    };
  }, []);

  // Return wallets
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '2.5rem',
        boxShadow: '0px 7px 14px 2px rgb(100 100 100 / 24%) !important',
        paddingX: '2.5rem'
      }}
    >
      <Typography fontWeight="600" fontSize={26} paddingY={16}>
        Prepaid Crypto Wallets
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',

          [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
          }
        })}
      >
        <Grid container spacing={12}>
          {wallets.map(({ label, value, color, currency }, index) => (
            <Grid key={index} xs={12} item>
              <Box display="flex" alignItems="center" gap="0.5rem">
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
            </Grid>
          ))}
        </Grid>
        <Box sx={{ flex: 1 }}>
          <svg ref={chartRef} width={dimension.width} height={height * ratio}>
            {wallets.map(
              (
                {
                  color,
                  alpha,
                  startCoordinate1,
                  endCoordinate1,
                  startCoordinate2,
                  endCoordinate2,
                  outerRadius,
                  innerRadius
                },
                index
              ) => (
                <CircleChart
                  index={index}
                  color={color}
                  alpha={alpha}
                  startCoordinate1={startCoordinate1}
                  endCoordinate1={endCoordinate1}
                  startCoordinate2={startCoordinate2}
                  endCoordinate2={endCoordinate2}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                />
              )
            )}
          </svg>
        </Box>
      </Box>
    </Card>
  );
};

// Export wallets
export default Wallets;
