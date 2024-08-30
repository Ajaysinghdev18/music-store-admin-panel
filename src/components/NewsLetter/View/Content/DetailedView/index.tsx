import { Avatar, Box, Divider, Typography } from '@mui/material';
import { FC } from 'react';

import { HideIcon, ShowIcon } from '../../../../../assets/icons';
import { COLORS } from '../../../../../constants/colors';
import {
  Container,
  SectionDescription,
  SectionProps,
  SectionSubTitle,
  SectionTitle,
  SectionUserInfo,
  ToggleDetailedViewButton
} from './styles';

export interface IDetailedViewProps {
  isDetailedView: boolean;
  setDetailedView: (boolean) => void;
}

const DetailedView: FC<IDetailedViewProps> = ({ isDetailedView, setDetailedView }) => {
  if (!isDetailedView) {
    return (
      <Container isDetailedView={isDetailedView}>
        <ToggleDetailedViewButton isDetailedView={isDetailedView} onClick={() => setDetailedView(!isDetailedView)}>
          <HideIcon />
        </ToggleDetailedViewButton>
      </Container>
    );
  }

  return (
    <Container isDetailedView={isDetailedView}>
      <SectionTitle>Details</SectionTitle>
      <Divider />
      <SectionProps>
        <Typography fontSize=" 1.5rem" color={COLORS.BLUELIGHT}>
          Email Template Name
        </Typography>
        <Typography fontSize="1.125rem" mt=" 1.5rem">
          02 May 2023
        </Typography>
        <Typography fontSize="1.125rem" mt=" 1.5rem">
          1024 * 768px
        </Typography>
      </SectionProps>
      <Divider />
      <SectionSubTitle>Description</SectionSubTitle>
      <SectionDescription>
        This is a description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </SectionDescription>
      <Divider />
      <SectionSubTitle>CREATOR</SectionSubTitle>
      <SectionUserInfo>
        <Avatar sx={{ width: '40px', height: '40px' }} />
        <Box ml="1rem">
          <Typography fontSize="1.25rem">John Doe</Typography>
          <Typography fontSize="0.8rem">Owner</Typography>
        </Box>
      </SectionUserInfo>
      <ToggleDetailedViewButton isDetailedView={isDetailedView} onClick={() => setDetailedView(!isDetailedView)}>
        {/*{isDetailedView && <HideIcon />}*/}
        {/*{!isDetailedView && <ShowIcon />}*/}
        <ShowIcon />
      </ToggleDetailedViewButton>
    </Container>
  );
};

export default DetailedView;
