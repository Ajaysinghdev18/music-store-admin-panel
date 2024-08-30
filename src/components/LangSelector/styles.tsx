import { IconButton, ListItemIcon, ListItemText, Menu } from '@mui/material';
import styled from 'styled-components';

export const LanguageButton = styled(IconButton)`
  img {
    width: 1.5rem;
  }
`;

export const LanguageMenu = styled(Menu)``;

export const MenuIcon = styled(ListItemIcon)`
  && {
    min-width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.25rem;

    svg {
      width: 1.5rem;
    }

    img {
      height: fit-content;
      width: 1.5rem;
    }
  }
`;

export const MenuLabel = styled(ListItemText)`
  && {
    .MuiTypography-root {
      font-size: 1rem;
    }
  }
`;
