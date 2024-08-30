// Dependencies
import { Box } from '@mui/material';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Components
import Header from './Header';
import Sidebar from './Sidebar';
import * as S from './styles';

// Export full layout
export const FullLayout: React.FC = ({ children }) => {
  // States
  const [isCollapsed, setCollapse] = React.useState(true);
  // Return full layout
  return (
    <S.FullLayout>
      <Sidebar isCollapsed={isCollapsed} setCollapse={setCollapse} />
      <Box
        sx={{
          flexGrow: 1,
          paddingX: '4rem',
          maxHeight: '100vh'
        }}
      >
        <Header isCollapsed={isCollapsed} setCollapse={setCollapse} />
        <Box
          p={{ xs: 2, sm: 8 }}
          component={PerfectScrollbar}
          sx={{
            height: 'calc(100vh - 100px)'
          }}
        >
          {children}
        </Box>
      </Box>
    </S.FullLayout>
  );
};
