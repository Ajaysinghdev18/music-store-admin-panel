// Dependencies
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FC, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Apis
import { CategoriesApi } from '../../../apis';

// Export monthly categories info
export const MonthlyCategoriesInfo: FC = () => {
  // States
  const [categories, setCategories] = useState<ApexAxisChartSeries>([]);

  // Theme
  const theme = useTheme();

  // Fetch categories
  const fetchCategories = () => {
    CategoriesApi.readAll({
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
        const data = res.categories.map(({ _id, count }) => ({
          x: _id,
          y: count,
          fillColor: theme.palette.warning.main
        }));
        setCategories([{ name: 'categories', data }]);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader title="Categories" />
      <CardContent>
        <ReactApexChart options={chartData} series={categories} type="bar" />
      </CardContent>
    </Card>
  );
};
