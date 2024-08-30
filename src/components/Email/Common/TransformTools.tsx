import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';

import {
  FlipXIcon,
  FlipXIconActive,
  FlipYIcon,
  FlipYIconActive,
  RotateLeftActiveIcon,
  RotateLeftIcon,
  RotateRightActiveIcon,
  RotateRightIcon
} from '../../../assets/icons';
import SizeSettingBox from './SizeSettingBox';
import Toggle from './Toggle';
import { Col, ToggleButtonGroup, TransformBox } from './styles';

const TransformTools = () => {
  const [isFlipX, setIsFlipX] = useState<boolean>(false);
  const [isFlipY, setIsFlipY] = useState<boolean>(false);
  const [isRotateLeft, setIsRotateLeft] = useState<boolean>(false);
  const [isRotateRight, setIsRotateRight] = useState<boolean>(false);
  return (
    <TransformBox>
      <SizeSettingBox />
      <Col justifyContent={'center'}>
        <ToggleButtonGroup width={'5.75rem'} padding={'0.25rem !important'} marginBottom={'8px'}>
          <Tooltip title="Flip Horizontal">
            <Box onClick={() => setIsFlipX(!isFlipX)}>
              <Toggle active={isFlipX ? 'active' : 'inactive'} icon={<FlipXIcon />} activeIcon={<FlipXIconActive />} />
            </Box>
          </Tooltip>
          <Tooltip title="Flip Vertical">
            <Box onClick={() => setIsFlipY(!isFlipY)}>
              <Toggle active={isFlipY ? 'active' : 'inactive'} icon={<FlipYIcon />} activeIcon={<FlipYIconActive />} />
            </Box>
          </Tooltip>
        </ToggleButtonGroup>
        <ToggleButtonGroup width={'5.75rem !important'} padding={'0.25rem !important'}>
          <Tooltip title="Rotate Left">
            <Box onClick={() => setIsRotateLeft(!isRotateLeft)}>
              <Toggle
                active={isRotateLeft ? 'active' : 'inactive'}
                icon={<RotateLeftIcon />}
                activeIcon={<RotateLeftActiveIcon />}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Rotate Right">
            <Box onClick={() => setIsRotateRight(!isRotateRight)}>
              <Toggle
                active={isRotateRight ? 'active' : 'inactive'}
                icon={<RotateRightIcon />}
                activeIcon={<RotateRightActiveIcon />}
              />
            </Box>
          </Tooltip>
        </ToggleButtonGroup>
      </Col>
    </TransformBox>
  );
};

export default TransformTools;
