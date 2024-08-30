import { Box } from '@mui/material';
import { FC } from 'react';

//icons
import {
  ActiveElementsIcon,
  ActiveFrameIcon,
  ActiveImagesIcon,
  ActiveTextIcon,
  ActiveUploadIcon,
  ElementsIcon,
  FrameIcon,
  ImagesIcon,
  TextIcon,
  UploadIconBlack
} from '../../../../../assets/icons';
import { CoverBox, Row, StyledTag, YTag } from '../../../Common/styles';
import Tab from './Tab';

export interface ITabBarProps {
  field: number;
  onClicked: (number) => void;
}

const TabBarList = [
  {
    title: 'Frame',
    icon: <FrameIcon />,
    activeIcon: <ActiveFrameIcon />
  },
  {
    title: 'Text',
    icon: <TextIcon />,
    activeIcon: <ActiveTextIcon />
  },
  {
    title: 'Elements',
    icon: <ElementsIcon />,
    activeIcon: <ActiveElementsIcon />
  },
  {
    title: 'Images',
    icon: <ImagesIcon />,
    activeIcon: <ActiveImagesIcon />
  },
  {
    title: 'Upload',
    icon: <UploadIconBlack />,
    activeIcon: <ActiveUploadIcon />
  }
];

const TabBar: FC<ITabBarProps> = ({ onClicked, field }) => {
  return (
    <Box marginTop={'40px'}>
      {field !== -1 && (
        <Row zIndex={'35'}>
          <CoverBox field={field} pos="up" />
          <YTag field={field} coe={1} />
          <StyledTag field={field} />
          <YTag field={field} coe={0} />
          <CoverBox field={field} pos="down" />
        </Row>
      )}
      {TabBarList.map((item, index) => (
        <Box onClick={() => onClicked(index + 1)} zIndex={'10'} position={'relative'} key={index}>
          <Tab {...item} active={field === index + 1 ? 'active' : 'inactive'} />
        </Box>
      ))}
    </Box>
  );
};

export default TabBar;
