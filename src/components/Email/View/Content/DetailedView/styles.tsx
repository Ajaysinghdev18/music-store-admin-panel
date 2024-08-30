import { Box, Button, Typography, styled } from '@mui/material';

export const Container = styled(Box)<{ isDetailedView: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isDetailedView ? '29.3125rem' : 0)}px;
  margin-left: ${(props) => (props.isDetailedView ? '0.5rem' : 0)};
  height: 100%;
  background-color: white;
  border-radius: 1rem;
  position: relative;
  transition: ease-in-out 0.1s;
`;

export const ToggleDetailedViewButton = styled(Button)<{ isDetailedView: boolean }>`
  position: absolute;
  min-width: 0px !important;
  border: none;
  height: 3.5rem;
  padding: 1rem;
  margin-top: 50rem;
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem rgb(30, 30, 30, 0.5);
  width: ${(props) => (!props.isDetailedView ? 66 : 56)}px;
  margin-left: ${(props) => (!props.isDetailedView ? -50 : 10)}px;
  border-radius: 1.75rem ${(props) => (props.isDetailedView ? 28 : 0)}px ${(props) => (props.isDetailedView ? 28 : 0)}px
    1.75rem;
  transition: ease-in-out 0.1s;
  svg {
    transition: ease-in-out 0.1s;
  }
  &:hover {
    border: none;
    background-color: white;
    transition: ease-in-out 0.1s;
    margin-left: ${(props) => (!props.isDetailedView ? -90 : 10)}px;
    width: ${(props) => (!props.isDetailedView ? 106 : 56)}px;
    box-shadow: 0px 0.25rem 8px rgb(30, 30, 30, 0.5);
    padding: 1rem;
    align-items: start;
    svg {
      margin-left: ${(props) => (props.isDetailedView ? 0 : -25)}px;
      transition: ease-in-out 0.1s;
    }
    //outline: none;
  }
`;

export const SectionTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1.5rem;
  color: #707070;
`;

export const SectionProps = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  justify-content: space-between;
`;

export const SectionSubTitle = styled(Typography)`
  margin-top: -0.875rem;
  margin-left: 1.25rem;
  font-size: 0.75rem;
  color: #707070;
  background-color: white;
  width: fit-content;
`;

export const SectionDescription = styled(Typography)`
  font-size: 1rem;
  padding: 1.5rem;
  border-bottom: 0.0675rem solid gray;
`;

export const SectionUserInfo = styled(Typography)`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  background-color: #f2f6fc;
  border-radius: 2.2rem;
  height: 70px;
  align-items: center;
  display: flex;
  padding: 0.75rem 1.5rem 0.875rem 1rem;
`;
