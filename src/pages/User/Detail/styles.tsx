import { Box, Switch, styled } from '@mui/material';

export const DownloadKey = styled('div')`
  text-decoration: underline;
  cursor: pointer;
`;

export const TransactionsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BasicInfo = styled(Box)`
  border-radius: 20px;
  box-shadow: 0 7px 14px 2px rgba(100, 100, 100, 0.3) !important;
  background-color: white;
  padding: ${(props) => props.theme.spacing(32)};
  margin-bottom: 1rem;
`;

export const FeaturedButton = styled(Box)`
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: #1f3952;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: #1f3952;
    color: white;
    border-radius: 2rem;
    border: none;
`;

export const BasicInfoItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 2px solid lightgray;
  padding: 0.5rem;
  flex-grow: 1;
  font-size: 16px;
`;

export const StyledSwitch = styled(Switch)`
  width: 2.5rem;
  & .MuiSwitch-thumb {
    margin: 0;
  }
`;
