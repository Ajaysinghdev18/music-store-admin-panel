import { Box } from '@mui/material';
import { FC } from 'react';

import { STATUS } from '..';
import { RoundedButton } from '../../../../components';

interface KycHeaderProps {
  setTab: (status: string) => void;
  currentTab: string;
}

const Header: FC<KycHeaderProps> = ({ setTab, currentTab }) => {
  return (
    <Box display={'flex'} gap={'0.5rem'} paddingBottom={'1rem'}>
      <RoundedButton
        label={'New Requests'}
        outline={currentTab !== STATUS.UNDER_VERIFICATION}
        onClick={() => setTab(STATUS.UNDER_VERIFICATION)}
      />
      <RoundedButton
        label={'Approved'}
        outline={currentTab !== STATUS.VERIFIED}
        onClick={() => setTab(STATUS.VERIFIED)}
      />
      <RoundedButton
        label={'Refused'}
        outline={currentTab !== STATUS.REJECTED}
        onClick={() => setTab(STATUS.REJECTED)}
      />
    </Box>
  );
};

export default Header;
