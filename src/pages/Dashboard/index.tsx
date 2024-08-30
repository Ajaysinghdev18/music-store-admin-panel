// Dependencies
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DashboardApi } from '../../apis';
import { CURRENCY } from '../../shared/enums';
import { setSearchExp } from '../../store/actions/header.actions';
import { getDashboardPeriod } from '../../store/selectors';
import Display from './Display';
import PaymentsType from './PaymentsType';
import RecentActivities from './RecentActivities';
// Widgets
import RecentItems from './RecentItems';
import Traffic from './Traffic';
import TrafficMap from './TrafficMap';
import Wallets from './Wallets';

// Constants
const data = [
  {
    label: 'Credit Card',
    percent: 0.7,
    color: 'black',
    currency: CURRENCY.DOLLAR,
    dataIndex: 'credit'
  },
  {
    label: 'Direct Crypto',
    percent: 0.5,
    color: 'bluegray',
    currency: CURRENCY.DOLLAR,
    dataIndex: 'cryptoCurrency'
  },
  {
    label: 'Paypal',
    percent: 0.9,
    color: 'blue',
    currency: CURRENCY.DOLLAR,
    dataIndex: 'paypal'
  },
  {
    label: 'Prepaid Crypto',
    percent: 0.2,
    color: 'darkblue',
    currency: CURRENCY.DOLLAR,
    dataIndex: 'prepayCrypto'
  }
];
// Export dashboard page
export const DashboardPage: FC = () => {
  // peroid
  const period = useSelector(getDashboardPeriod);
  // states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalTraffic, setTotalTraffic] = useState<number>(0);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalAccount, setTotalAccount] = useState<number>(0);
  const [totalArtist, setTotalArtist] = useState<number>(0);
  const [ratingTraffic, setRatingTraffic] = useState<number>(1);
  const [ratingArtist, setRatingArtist] = useState<number>(1);
  const [ratingOrder, setRatingOrder] = useState<number>(1);
  const [ratingAccount, setRatingAccount] = useState<number>(1);
  const [paymentsTypeData, setPaymentsTypeData] = useState<any[]>(data);

  const [trafficData, setTrafficData] = useState<any>([
    {
      name: 'Songs',
      data: []
    },
    {
      name: 'Events',
      data: []
    },
    {
      name: 'Orders',
      data: []
    },
    {
      name: 'Images',
      data: []
    },
    {
      name: 'Videos',
      data: []
    },
    {
      name: 'Products',
      data: []
    }
  ]);

  const handleMakeTrafficData = (res) => {
    const item = [
      {
        name: 'Songs',
        data: []
      },
      {
        name: 'Events',
        data: []
      },
      {
        name: 'Orders',
        data: []
      },
      {
        name: 'Images',
        data: []
      },
      {
        name: 'Videos',
        data: []
      },
      {
        name: 'Products',
        data: []
      }
    ];

    item[0].data = res.songs.map((item) => {
      return {
        x: item._id,
        y: item.count
      };
    });
    item[1].data = res.events.map((item) => {
      return {
        x: item._id,
        y: item.count
      };
    });
    item[2].data = res.orders.map((item) => {
      return {
        x: item._id,
        y: item.count
      };
    });
    item[3].data = res.images.map((item) => {
      return {
        x: item._id,
        y: item.count
      };
    });
    item[4].data = res.videos.map((item) => {
      return {
        x: item._id,
        y: item.count
      };
    });
    item[5].data = res.products.map((item) => {
      return {
        x: item._id,
        y: item.count
      };
    });

    setTrafficData(item);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  // Fetch data
  const fetchData = () => {
    setIsLoading(true);
    if (isLoading) {
      // fix me
    }
    DashboardApi.getDashboardData({
      period
    })
      .then((res) => {
        setTotalTraffic(res.totalTraffic);
        setTotalOrder(res.totalOrders);
        setTotalAccount(res.totalAccount);
        setTotalArtist(res.totalArtist);
        setRatingTraffic(res.ratingTraffic);
        setRatingOrder(res.ratingOrder);
        setRatingArtist(res.ratingArtist);
        setRatingAccount(res.ratingAccount);

        handleMakeTrafficData(res);

        const { ratingPayments = {} } = res;

        setPaymentsTypeData(
          data.map((item) => ({
            ...item,
            percent: ratingPayments[item.dataIndex]
          }))
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    fetchData();
  }, [period]);
  // Return dashboard page
  return (
    <Grid container rowSpacing={48} columnSpacing={32} paddingX={16} paddingY={32}>
      <Grid item xs={12} md={12}>
        <Traffic trafficData={trafficData} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Display title="New Artists" value={totalArtist.toLocaleString()} percent={ratingAccount} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Display title="New Accounts" value={totalAccount.toLocaleString()} percent={ratingAccount} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Display title="New Products" value={totalTraffic.toLocaleString()} percent={ratingTraffic} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Display title="New Orders" value={totalOrder.toLocaleString()} percent={ratingTraffic} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Wallets />
      </Grid>
      <Grid item xs={12} md={6}>
        <PaymentsType paymentsTypeData={paymentsTypeData} />
      </Grid>
      <Grid item xs={12}>
        <TrafficMap />
      </Grid>
      <Grid item xs={12} md={6}>
        <RecentActivities />
      </Grid>
      <Grid item xs={12} md={6}>
        <RecentItems />
      </Grid>
    </Grid>
  );
};
