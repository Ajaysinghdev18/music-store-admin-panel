// Dependencies
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FC, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Apis
import { OrdersApi } from '../../../apis';

// Export monthly orders info
export const MonthlyOrdersInfo: FC = () => {
  // States
  const [orders, setOrders] = useState<ApexAxisChartSeries>([]);

  // Theme
  const theme = useTheme();

  // Fetch orders
  const fetchOrders = () => {
    OrdersApi.readAll({
      aggregate: JSON.stringify([
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: { $toDate: '$createdAt' } }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ])
    })
      .then((res) => {
        const data = res.orders.map(({ _id, count }) => ({
          x: _id,
          y: count,
          fillColor: theme.palette.primary.main
        }));
        setOrders([{ name: 'orders', data }]);
      })
      .catch((err) => console.log(err));
  };

  const chartData: ApexOptions = {
    chart: {
      height: 200,
      fontFamily: 'sans-serif'
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

  // On mounted
  useEffect(() => {
    fetchOrders();
  }, []);

  // Return monthly orders info
  return (
    <Card>
      <CardHeader title="Orders" />
      <CardContent>
        <ReactApexChart options={chartData} series={orders} type="bar" />
      </CardContent>
    </Card>
  );
};
