import { Box } from '@mui/material';
import { FC } from 'react';

import { ColorizeIcon } from '../../../assets/icons';
import { CheckBox, SectionBody } from './styles';

export interface IColorBoxProps {
  title?: string;
}

const ColorBox: FC<IColorBoxProps> = ({ title }) => {
  return (
    <Box display="flex" width="100%" mt="1rem" justifyContent="space-between" alignItems="center" mb="0.25rem">
      <Box display="flex" alignItems="center">
        <CheckBox />
        <Box bgcolor="white" width="1.75rem" height="1rem" borderRadius="0.125rem" border="0.125rem solid gray" />
        <SectionBody ml="0.75rem">{title}</SectionBody>
      </Box>
      <Box display="flex" flexDirection="column" padding="0.25rem" justifyContent="center">
        <ColorizeIcon />
      </Box>
    </Box>
  );
};

export default ColorBox;
