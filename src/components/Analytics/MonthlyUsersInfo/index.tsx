// Dependencies
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Apis
import { UsersApi } from '../../../apis';

export const MonthlyUsersInfo = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<ApexAxisChartSeries>([]);

  // Theme
  const theme = useTheme();

  // Fetch users
  const fetchUsers = () => {
    if (isLoading) {
      // Add your code
    }
    setIsLoading(true);
    UsersApi.readAll({
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
    }).then((res) => {
      setIsLoading(false);
      const data = res.users.map(({ _id, count }) => ({
        x: _id,
        y: count,
        fillColor: theme.palette.success.main
      }));
      setUsers([{ name: 'users', data }]);
    });
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card>
      <CardHeader title="Users" />
      <CardContent>
        <ReactApexChart options={chartData} series={users} type="bar" />
      </CardContent>
    </Card>
  );
};
