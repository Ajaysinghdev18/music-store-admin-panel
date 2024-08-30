// Dependencies
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Apis
import { ProductsApi } from '../../../apis';

export const MonthlyProductsInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ApexAxisChartSeries>([]);

  // Theme
  const theme = useTheme();

  const fetchProducts = () => {
    if (isLoading) {
      // Add your code
    }
    setIsLoading(true);
    ProductsApi.readAll({
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
      const data = res.products.map(({ _id, count }) => ({
        x: _id,
        y: count,
        fillColor: theme.palette.secondary.main
      }));
      setProducts([{ name: 'products', data }]);
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
    fetchProducts();
  }, []);

  return (
    <Card>
      <CardHeader title="Products" />
      <CardContent>
        <ReactApexChart options={chartData} series={products} type="bar" />
      </CardContent>
    </Card>
  );
};
