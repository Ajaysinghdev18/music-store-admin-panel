import { InputBase } from '@mui/material';
import styled from 'styled-components';

export const TextInput = styled(InputBase)<{ multiple?: boolean }>`
  width: 100%;
  height: ${(props) => !props.multiple && '2.5rem'};
  padding: ${(props) => props.theme.spacing(8, 12, 6, 20)};
  background-color: white;
  ${(props) => props.theme.typography.button};
  border-radius: 1.25rem;
  font-weight: 400;
  font-size: 0.875rem;
  box-shadow: 0 0.4375rem 0.875rem 0.125rem rgba(100, 100, 100, 0.3) !important;
`;
