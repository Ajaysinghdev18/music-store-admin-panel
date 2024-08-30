import { Divider, Grid } from '@mui/material';
import { useState } from 'react';

//icons
import {
  ActiveCircleIcon,
  ActiveLineArrowIcon,
  ActiveLineDashedIcon,
  ActiveLineDottedIcon,
  ActiveLineDualIcon,
  ActiveLineHalfIcon,
  ActiveLineNormalIcon,
  ActiveRectIcon,
  ActiveTriangleIcon,
  CircleIcon,
  LineArrowIcon,
  LineDashedIcon,
  LineDottedIcon,
  LineDualIcon,
  LineHalfIcon,
  LineNormalIcon,
  RectangleIcon,
  TriangleIcon
} from '../../../../../assets/icons';
import AppearanceTools from '../../../Common/AppearanceTools';
import TransformTools from '../../../Common/TransformTools';
import ToggleShape from './ToggleShape';
import { SectionTitle } from './style';

const lineStyles = [
  {
    icon: <LineNormalIcon />,
    activeIcon: <ActiveLineNormalIcon />
  },
  {
    icon: <LineDashedIcon />,
    activeIcon: <ActiveLineDashedIcon />
  },
  {
    icon: <LineDottedIcon />,
    activeIcon: <ActiveLineDottedIcon />
  },
  {
    icon: <LineArrowIcon />,
    activeIcon: <ActiveLineArrowIcon />
  },
  {
    icon: <LineDualIcon />,
    activeIcon: <ActiveLineDualIcon />
  },
  {
    icon: <LineHalfIcon />,
    activeIcon: <ActiveLineHalfIcon />
  }
];

const shapeStyles = [
  {
    icon: <RectangleIcon />,
    activeIcon: <ActiveRectIcon />
  },
  {
    icon: <CircleIcon />,
    activeIcon: <ActiveCircleIcon />
  },
  {
    icon: <TriangleIcon />,
    activeIcon: <ActiveTriangleIcon />
  }
];

const ElementsTools = () => {
  const [shapeNumber, setShapeNumber] = useState(-1);

  const onHandlerShapeNumber = (val: number) => {
    if (val === shapeNumber) val = -1;
    setShapeNumber(val);
  };

  return (
    <>
      <SectionTitle>Transform</SectionTitle>
      <TransformTools />
      <Divider />
      <SectionTitle>Appearance</SectionTitle>
      <AppearanceTools />
      <Divider />
      <SectionTitle>Lines</SectionTitle>
      <Grid container spacing={1} pt={'0.25rem'} pb={'8px'}>
        {lineStyles.map((icons, index) => (
          <Grid item xs={4} lg={4} key={index}>
            <ToggleShape
              value={index}
              active={shapeNumber === index ? 'active' : 'inactive'}
              onClick={onHandlerShapeNumber}
              {...icons}
            />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <SectionTitle>Shapes</SectionTitle>
      <Grid container spacing={1} pt={'0.25rem'}>
        {shapeStyles.map((icons, index) => (
          <Grid item xs={4} key={index}>
            <ToggleShape
              active={shapeNumber === index + 6 ? 'active' : 'inactive'}
              {...icons}
              value={index + 6}
              onClick={onHandlerShapeNumber}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ElementsTools;
