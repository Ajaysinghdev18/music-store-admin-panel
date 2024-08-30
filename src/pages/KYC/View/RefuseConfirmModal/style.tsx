import { Box, Dialog, Grid, InputBase, OutlinedInput, TextField, Typography, styled } from '@mui/material';

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
    width: 2.5rem;
    height: 2.5rem;
  }
  .MuiTypography-root {
    font-size: 2.5rem;
    line-height: 2.3rem;
    padding-top: 0.25rem;
    padding-bottom: 1.5rem;
  }
`;

export const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  p {
    color: red;
    font-size: 1rem;
  }
`;

export const Row = styled(Box)`
  display: flex;
`;

export const Col = styled(Row)`
  flex-direction: column;
`;

export const ModalFooter = styled(Col)``;

export const SearchInputBox = styled(Row)`
  position: relative;
  top: 0;
  width: 26.25rem;
`;

export const SubTitle = styled(Typography)`
  font-size: 0.75rem;
  margin-top: -0.05rem;
  color: #707070;
  background-color: white;
  width: fit-content;
  margin-left: 1.25rem;
`;

export const SearchInput = styled(InputBase)`
  && {
    border-radius: 0.5rem;
    height: 40.5rem;
    width: 100%;
    padding: ${(props) => props.theme.spacing(4, 12)};
    background-color: ${(props) => props.theme.palette.action.hover};
    ${(props) => props.theme.typography.button};

    .MuiInputAdornment-root {
      width: 2.5rem;
      height: 2.5rem;
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

export const SearchResult = styled(Box)`
  display: none;
  margin: ${(props) => props.theme.spacing(0, 4)};
  border-top: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
  background-color: ${(props) => props.theme.palette.common.white};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: ${(props) => props.theme.spacing(12, 8)};

  .MuiTypography-root {
    & + .MuiTypography-root {
      margin-top: ${(props) => props.theme.spacing(12)};
    }
  }
`;

export const StyledSearchInput = styled(Box)`
  width: 370.5rem;
`;

export const SearchContainer = styled(Row)`
  background-color: transparent;
  height: 40.5rem;
  margin-top: 1rem;
  justify-content: space-between;
`;

export const StyledGrid = styled(Grid)`
  display: grid;
  grid: auto / auto auto;
  grid-gap: 1rem;
  height: 15.625rem;
  overflow-y: auto;
  margin-top: 0.75rem;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const StyledEmailsBox = styled(Row)`
  height: 5rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  border: 0.0675rem solid gray;
`;

export const EmailTitle = styled(Typography)`
  font-size: 1.25rem;
  color: #707070;
`;

export const AdminName = styled(Typography)`
  font-size: 0.05rem;
  color: #707070;
`;

export const RECIEPIENBox = styled(Col)`
  //border-top: 0.0675rem solid gray;
  margin-top: 1.6rem;
  width: 200%;
`;

export const ModalGrid = styled(Grid)`
  display: grid;
  grid: auto / 7.6875rem 7.6875rem 7.6875rem 7.6875rem 7.6875rem 7.6875rem;
  grid-gap: 0.5rem;
  margin-top: 10.5rem;
`;

export const StyledOutlinedInput = styled(OutlinedInput)<{ active: boolean }>`
  color: ${(props) => (props.active ? '#02C58D' : '#707070')};
  input {
    cursor: pointer;
    text-align: left;
    font-size: 1.25rem;
    padding: 0.05rem 1rem 0.05rem !important;
  }
`;

export const RecipientsBox = styled(Box)`
  margin-top: 1.875rem;
  border-top: 0.0675rem solid #707070;
`;

export const MailContent = styled(Box)`
  display: flex;
`;

export const Recipient = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;
  width: 7.6875rem;
  height: 2rem;
  background-color: white;
  border: 0.0675rem solid #707070;
  border-radius: 1rem;
`;
