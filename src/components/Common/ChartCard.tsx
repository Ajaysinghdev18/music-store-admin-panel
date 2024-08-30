import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const ChartCard = styled(Card)`
  min-height: 21.875rem;

  .main-info-value {
    margin: 0.75rem 0 0;
    font-size: 1.375rem;
    font-weight: 700;
  }

  .chart-wrapper {
    height: 12.5rem;
  }

  .more-info {
    margin-top: 1rem;

    &-title {
      font-weight: 500;
    }
  }
`;
