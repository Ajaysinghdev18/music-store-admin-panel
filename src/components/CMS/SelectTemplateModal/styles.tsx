import { Box, Dialog, Grid, InputBase, TextField, Typography, styled } from '@mui/material';

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
  form {
    //width: 0;
    //flex-grow: 1;
    width: 23.625rem;
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
  margin-top: -0.8rem;
  color: #707070;
  background-color: white;
  width: fit-content;
  margin-left: 30px;
`;

export const SearchInput = styled(InputBase)`
  && {
    border-radius: 8px;
    height: 3rem;
    width: 100%;
    padding: ${(props) => props.theme.spacing(4, 12)};
    background-color: ${(props) => props.theme.palette.action.hover};
    ${(props) => props.theme.typography.button};

    .MuiInputAdornment-root {
      width: 40px;
      height: 40px;
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

export const SearchResult = styled(Box)`
  display: none;
  margin: ${(props) => props.theme.spacing(0, 4)};
  border-top: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
  background-color: ${(props) => props.theme.palette.common.white};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: ${(props) => props.theme.spacing(12, 8)};

  .MuiTypography-root {
    & + .MuiTypography-root {
      margin-top: ${(props) => props.theme.spacing(12)};
    }
  }
`;

export const StyledSearchInput = styled(Box)`
  width: 23.625rem;
`;

export const SearchContainer = styled(Row)`
  background-color: transparent;
  height: 3rem;
  margin-top: 1rem;
  justify-content: space-between;
`;

export const StyledGrid = styled(Grid)`
  display: grid;
  grid: auto / auto auto;
  grid-gap: 1rem;
  height: 249px;
  overflow-y: auto;
  margin-top: 0.75rem;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const StyledEmailsBox = styled(Row)`
  height: 80px;
  border-radius: 8px;
  justify-content: space-between;
  border: 0.0675rem solid gray;
`;

export const EmailTitle = styled(Typography)`
  font-size: 1.25rem;
  color: #707070;
`;

export const AdminName = styled(Typography)`
  font-size: 0.8rem;
  color: #707070;
`;
