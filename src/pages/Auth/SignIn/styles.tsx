import { styled } from '@mui/material';

export const SignInPage = styled('div')`
  width: 400px;
  padding: 24px;

  border-radius: 0.75rem;
  background-color: white;

  .form-area {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 0.75rem;
    }
  }

  .MuiInputAdornment-root {
    padding: 4px;
    margin-left: 0;
  }

  a {
    text-decoration: none;
  }
`;
