import { Box, Divider } from '@mui/material';
import { useState } from 'react';

//icons
import { ActiveLandscape, ActivePortrait, LandscapeIcon, PortraitIcon } from '../../../../../assets/icons';
import AppearanceTools from '../../../Common/AppearanceTools';
import LengthBox from '../../../Common/SizeSettingBox';
//components
import Toggle from '../../../Common/Toggle';
import { ScapeBox, SectionTitle, TransformBox } from './style';

const FrameTools = () => {
  const [toggleNumber, setToggleNumber] = useState(1);

  const handleToggle = (newToggleNumber) => {
    setToggleNumber(newToggleNumber);
  };

  return (
    <>
      <SectionTitle>Transform</SectionTitle>
      <TransformBox>
        <LengthBox />
        <ScapeBox>
          <Box onClick={() => handleToggle(1)}>
            <Toggle
              active={toggleNumber === 1 ? 'active' : 'inactive'}
              icon={<PortraitIcon />}
              activeIcon={<ActivePortrait />}
            />
          </Box>
          <Box onClick={() => handleToggle(2)}>
            <Toggle
              active={toggleNumber === 2 ? 'active' : 'inactive'}
              icon={<LandscapeIcon />}
              activeIcon={<ActiveLandscape />}
            />
          </Box>
        </ScapeBox>
      </TransformBox>
      <Divider />
      <SectionTitle>Appearance</SectionTitle>
      <AppearanceTools colorBoxCnt={2} isBoarderSizeInput={false} />
    </>
  );
};

export default FrameTools;
