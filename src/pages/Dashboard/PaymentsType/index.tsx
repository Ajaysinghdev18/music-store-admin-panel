// Dependencies
import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { CircleChart } from '../../../components/CircleChart';

const width = 360;
const height = 360;
const defaultSize = 360;
const defaultStrokeWidth = 100;
const defaultLineWidth1 = 55;
const defaultLineWidth2 = 65;

interface PaymentsTypeProps {
  paymentsTypeData: any[];
}

// Create payments type
const PaymentsType: FC<PaymentsTypeProps> = ({ paymentsTypeData }) => {
  // States
  const [dimension, setDimension] = useState({
    width,
    height
  });

  // Refs
  const chartRef = useRef<SVGSVGElement>(null);

  // Theme
  const theme = useTheme();

  // Calc ratio from svg dimension
  const ratio = useMemo(() => dimension.width / width, [dimension]);

  // Calc chart dimensions from ratio
  const size = useMemo(() => ratio * defaultSize, [ratio]);
  const strokeWidth = useMemo(() => ratio * defaultStrokeWidth, [ratio]);
  const lineWidth1 = useMemo(() => ratio * defaultLineWidth1, [ratio]);
  const lineWidth2 = useMemo(() => ratio * defaultLineWidth2, [ratio]);

  // Calc coordinate from svg dimension
  const coordinate = useMemo(
    () => ({
      x: dimension.width / 2,
      y: (height * ratio) / 2
    }),
    [dimension, ratio]
  );

  // Calc chart radius
  const outerRadius = size / 2;
  const innerRadius = outerRadius - 10;

  const percentData = paymentsTypeData.map(({ percent, ...rest }, index) => {
    const alpha = 359.95 * percent * (Math.PI / 180);
    const startAlpha = 0;
    const endAlpha = alpha + startAlpha;
    const middleAlpha = alpha / 2 + startAlpha;

    const outerR = outerRadius - index * 15;
    const innerR = outerR - 10;

    const startCoordinate1 = {
      x: coordinate.x + outerR * Math.sin(startAlpha),
      y: coordinate.y - outerR * Math.cos(startAlpha)
    };

    const endCoordinate1 = {
      x: coordinate.x + outerR * Math.sin(endAlpha),
      y: coordinate.y - outerR * Math.cos(endAlpha)
    };

    const startCoordinate2 = {
      x: coordinate.x + innerR * Math.sin(startAlpha),
      y: coordinate.y - innerR * Math.cos(startAlpha)
    };

    const endCoordinate2 = {
      x: coordinate.x + innerR * Math.sin(endAlpha),
      y: coordinate.y - innerR * Math.cos(endAlpha)
    };

    const lineStartCoordinate = {
      x: coordinate.x + outerR * Math.sin(middleAlpha),
      y: coordinate.y - outerR * Math.cos(middleAlpha)
    };

    const lineMiddleCoordinate = {
      x: coordinate.x + (outerR + lineWidth1 * Math.abs(Math.cos(middleAlpha))) * Math.sin(middleAlpha),
      y: coordinate.y - (outerR + lineWidth1 * Math.abs(Math.cos(middleAlpha))) * Math.cos(middleAlpha)
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
      outerRadius: outerR,
      innerRadius: innerR,
      ...rest
    };
  });

  // Init chart dimension
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

  // Return payments type
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
        Payments Type
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
          {paymentsTypeData.map(({ label, percent, color }, index) => (
            <Grid key={index} item xs={12}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Box
                  sx={{
                    width: '50px',
                    height: '25px',
                    backgroundColor: `${color}.main`,
                    borderRadius: '6px'
                  }}
                />
                <Box>
                  <Stack key={index}>
                    <Box fontSize={16} fontWeight={500}>
                      {label}
                    </Box>
                    <Box fontWeight={600}>{percent?.toLocaleString()}%</Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ flex: 1 }}>
          <svg ref={chartRef} width={dimension.width} height={height * ratio}>
            {percentData.map(
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

// Export payments type
export default PaymentsType;
