import { Box, TextField, styled } from '@mui/material';

export const ModalContainer = styled(Box)`
  padding: 1.5rem;
  width: 51.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1rem;
  position: absolute;
`;

export const ModalHeader = styled(Box)`
  border-bottom: 0.0675rem solid #e0e1e3;
  color: #02c58d;
  text-align: center;
  svg {
    width: 40px;
    height: 40px;
  }
  .MuiTypography-root {
    font-size: 1.75rem;
    line-height: 2.3rem;
    padding-top: 1.25rem;
    padding-bottom: 1.75rem;
  }
`;

export const ModalContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.0675rem solid #e0e1e3;
  form {
    width: 100%;
  }
  img {
    border-radius: 8px;
  }
  padding: 1.5rem 0;
`;

export const DescriptionField = styled(TextField)`
  .MuiInputBase-root {
    height: 100%;
  }
`;
