// Dependencies
import { Box, Card, CardHeader, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React, { FC } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { getDashboardPeriod } from '../../../store/selectors';

interface TrafficProps {
  trafficData: ApexOptions['series'] | undefined;
}

// Create traffic
const Traffic: FC<TrafficProps> = ({ trafficData }) => {
  // Theme
  const theme = useTheme();
  const period = useSelector(getDashboardPeriod);
  console.log(period);

  const chartData: ApexOptions = {
    chart: {
      height: '100px',
      fontFamily: 'sans-serif',
      toolbar: {
        show: true
      }
    },
    stroke: {
      width: 1,
      fill: {
        opacity: 0.1,
        colors: [theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main]
      }
    },
    colors: [theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      position: 'bottom',
      containerMargin: {
        top: 32
      },
      itemMargin: {
        horizontal: 32
      },
      markers: {
        width: 10,
        height: 10,
        offsetX: -12
      },
      fontSize: '16px',
      fontWeight: 500,
      height: 23
    },
    xaxis: {
      tickAmount: 24,
      labels: {
        rotateAlways: period === '30d' || period === '24h',
        style: {
          fontSize: '16px',
          fontWeight: 500,
          colors: theme.palette.text.primary
        }
      }
    },
    yaxis: {
      tickAmount: 6,
      labels: {
        style: {
          fontSize: '16px',
          fontWeight: 500,
          colors: theme.palette.text.primary
        }
      }
    }
  };
  // Return traffic
  return (
    <Card
      sx={{
        borderRadius: '2.5rem',
        boxShadow: '0px 7px 14px 2px rgb(100 100 100 / 24%) !important',
        paddingX: '2rem'
      }}
    >
      <Box fontWeight="600" fontSize={26} padding={16}>
        Traffic
      </Box>
      <ReactApexChart height={400} options={chartData} series={trafficData} type="area" />
    </Card>
  );
};

// Export traffic
export default Traffic;
