// Dependencies
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

// Style
import './assets/styles/font.css';
// App routes
import AppRoutes from './routes';
// Theme
import themes from './theme';

// Create app
const App = () => {
  // Return app
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={themes[0]}>
        <StyledProvider theme={themes[0]}>
          <CssBaseline />
          <SnackbarProvider maxSnack={5}>
            <AppRoutes />
          </SnackbarProvider>
        </StyledProvider>
      </ThemeProvider>
    </React.Suspense>
  );
};

// Export app
export default App;
