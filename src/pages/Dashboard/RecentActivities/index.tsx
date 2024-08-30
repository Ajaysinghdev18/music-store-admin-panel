// Dependencies
import { Box, Button, Card, CardHeader, Typography } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { HistoryApi } from '../../../apis';
import { RECENT_PAGE_LIMIT } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { IHistory } from '../../../shared/types/history.type';
// Styles
import * as S from './styles';

// Export recent activities
const RecentActivities: FC = () => {
  // State
  const [activities, setActivities] = useState<IHistory[]>([]);

  const fetchHistories = () => {
    HistoryApi.readAll()
      .then((res) => {
        setActivities(res.histories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getHistoryTime = (time) => {
    let sep = moment(time).format('a');
    if (sep == 'am') {
      sep = 'a.m.';
    } else {
      sep = 'p.m.';
    }
    return moment(time).format('HH:mm ') + sep;
  };

  const histories = useMemo(() => {
    return activities.map((activity) => {
      return {
        time: getHistoryTime(activity?.createdAt),
        color: activity?.content.defaultColor,
        content: (
          <>
            <S.Color color={activity.content.whoAction.color}>{activity.content.whoAction.value} </S.Color>
            {activity.content.whoActionSuffix && <span>{activity.content.whoActionSuffix.value}</span>}
            {activity.content.howAction.color ? (
              <S.Color color={activity.content.howAction.color}>{activity.content.howAction.value} </S.Color>
            ) : (
              <span>{activity.content.howAction.value} </span>
            )}
            {activity.content.howActionSuffix && <span>{activity.content.howActionSuffix.value}</span>}
            <S.Color color={activity.content.withWhat.color}>{activity.content.withWhat.value} </S.Color>
            {activity.content.withWhatSuffix && (
              <S.Color color={activity.content.withWhatSuffix.color}>{activity.content.withWhatSuffix.value}</S.Color>
            )}
          </>
        )
      };
    });
  }, [activities]);

  // On mounted
  useEffect(() => {
    fetchHistories();
  }, []);

  // Return recent Activities
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '2.5rem',
        boxShadow: '0px 7px 14px 2px rgb(100 100 100 / 24%) !important',
        paddingX: '2.5rem'
      }}
    >
      <CardHeader
        title={
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography color={COLORS.BLACK} fontWeight="600" fontSize={26} paddingY={16}>
              Recent Activities
            </Typography>
            <S.ViewButton>View all</S.ViewButton>
          </Box>
        }
        sx={{ mb: '1rem' }}
      />
      {histories.slice(0, RECENT_PAGE_LIMIT).map(({ time, color, content }, index) => (
        <S.Item key={index}>
          <S.Time variant="label">{time}</S.Time>
          <S.Separator>
            <S.Connector />
            <S.Dot color={color} />
            <S.Connector />
          </S.Separator>
          <S.Label>{content}</S.Label>
        </S.Item>
      ))}
    </Card>
  );
};

// Export recent items
export default RecentActivities;
