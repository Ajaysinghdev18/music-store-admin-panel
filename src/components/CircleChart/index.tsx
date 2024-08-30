import { useTheme } from '@mui/material';
import React, { FC } from 'react';

interface ICoordinate {
  x: number;
  y: number;
}

export interface ICircleChartProps {
  index: number;
  color: string;
  alpha: number;
  startCoordinate1: ICoordinate;
  endCoordinate1: ICoordinate;
  startCoordinate2: ICoordinate;
  endCoordinate2: ICoordinate;
  outerRadius: number;
  innerRadius: number;
}

export const CircleChart: FC<ICircleChartProps> = ({
  index,
  color,
  alpha,
  startCoordinate1,
  endCoordinate1,
  startCoordinate2,
  endCoordinate2,
  outerRadius,
  innerRadius
}) => {
  const theme = useTheme();

  return (
    <path
      key={index}
      d={`M ${startCoordinate1?.x} ${startCoordinate1?.y} A ${outerRadius} ${outerRadius} 0, ${
        alpha > Math.PI ? 1 : 0
      }, 1, ${endCoordinate1?.x} ${endCoordinate1?.y} L ${endCoordinate2?.x} ${
        endCoordinate2?.y
      } A ${innerRadius} ${innerRadius} 0, ${alpha > Math.PI ? 1 : 0}, 0, ${startCoordinate2.x} ${
        startCoordinate2?.y
      } L 50% 50% Z`}
      strokeWidth={0}
      fill={theme.palette[color].main}
    />
  );
};
