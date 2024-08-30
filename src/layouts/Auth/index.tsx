// Dependencies
import { Box } from '@mui/material';
import { FC } from 'react';

// Export auth layout
export const AuthLayout: FC = ({ children }) => {
  // Return auth layout
  return (
    <Box minHeight="100vh" maxWidth="100%" display="flex">
      <Box p={3} flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="#0a1929">
        {children}
      </Box>
    </Box>
  );
};
