// Dependencies
import { Card, CardContent, CardHeader } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

// Export monthly tokens info
export const MonthlyTokensInfo: FC = () => {
  // Fetch tokens
  // const fetchTokens = () => {};

  const chartData: ApexOptions = {
    series: [
      {
        name: '',
        data: [
          {
            x: 1,
            y: 2
          },
          {
            x: 2,
            y: 2
          },
          {
            x: 3,
            y: 2
          },
          {
            x: 4,
            y: 2
          }
        ]
      }
    ],
    chart: {
      height: 200
    },
    legend: {
      show: true,
      position: 'right',
      containerMargin: {
        top: 0
      },
      fontSize: '1rem'
    },
    xaxis: {
      tickAmount: 6
    }
  };

  // Return monthly tokens info
  return (
    <Card>
      <CardHeader title="NFT tokens" />
      <CardContent>
        <ReactApexChart options={chartData} series={chartData.series} type="bar" />
      </CardContent>
    </Card>
  );
};
