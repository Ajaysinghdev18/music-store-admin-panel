import { Box, Divider, Typography } from '@mui/material';

import CustomSlider from '../../CustomSlider/CustomSlider';

const OpacitySlider = () => {
  return (
    <Box display="flex" bgcolor="#f2f6fc" width="100%" borderRadius="8px" padding="0.25rem">
      <Box width={'40px'} height={'40px'} textAlign={'center'}>
        <Typography padding={'8px'} fontSize={'1rem'}>
          0
        </Typography>
      </Box>
      <Box marginX={'0.25rem'}>
        <Divider orientation="vertical" />
      </Box>
      <CustomSlider width={168} />
    </Box>
  );
};

export default OpacitySlider;
