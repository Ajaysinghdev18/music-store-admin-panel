import { Box, IconButton } from '@mui/material';
import React, { FC } from 'react';

import { DollarIcon, MenuIcon, NightIcon, SearchIcon } from '../../../../assets/icons';
import * as S from './styles';

// Interfaces
interface IHeaderMobileProps {
  setCollapse: (isCollapsed: boolean) => void;
}

export const MobileHeader: FC<IHeaderMobileProps> = ({ setCollapse }) => {
  return (
    <S.MobileHeader>
      <IconButton onClick={() => setCollapse(true)} sx={{ mt: 5 }}>
        <MenuIcon />
      </IconButton>
      <Box>
        <IconButton>
          <NightIcon />
        </IconButton>
        <IconButton>
          <DollarIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </S.MobileHeader>
  );
};
