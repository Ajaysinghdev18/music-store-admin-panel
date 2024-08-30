import { Box, Card, Stack } from '@mui/material';
import styled from 'styled-components';

export const Profile = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const ProfileValue = styled(Card)`
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryButtonBox = styled(Box)`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
`;

export const IconBox = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BasicInfo = styled(Box)`
  border-radius: 20px;
  box-shadow: 0 7px 14px 2px rgba(100, 100, 100, 0.3) !important;
  background-color: white;
  padding: ${(props) => props.theme.spacing(32)};
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
  gap: 1.5rem;
  border-bottom: 2px solid lightgray;
  padding: 0.5rem;
  flex-grow: 1;
  font-size: 16px;
`;
