import { Box } from '@mui/material';
import { FC } from 'react';

import ColorBox from './ColorBox';
import OpacitySlider from './OpacitySlider';
import { AppearanceBox, CustomPropsInput, SectionBody } from './styles';

export interface IAppearanceToolsProps {
  colorBoxCnt?: number;
  isBoarderSizeInput?: boolean;
}

const AppearanceTools: FC<IAppearanceToolsProps> = ({ colorBoxCnt = 2, isBoarderSizeInput = true }) => {
  return (
    <AppearanceBox>
      <OpacitySlider />
      <ColorBox title={'Fill'} />
      {colorBoxCnt > 1 && <ColorBox title={'Boarder'} />}
      {isBoarderSizeInput && (
        <Box sx={{ display: 'flex', mt: '1rem' }}>
          <SectionBody>Boarder Size</SectionBody>
          <Box sx={{ ml: '0.3125rem', width: '60px' }}>
            <CustomPropsInput title={'Boarder Size'} />
          </Box>
        </Box>
      )}
    </AppearanceBox>
  );
};

export default AppearanceTools;
