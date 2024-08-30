// Dependencies
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { PlusIcon } from '../../../assets/icons';
import { ROUTES } from '../../../constants';
import { RoundedButton } from '../../Common';
// Styles
import * as S from './styles';

// Types
interface TableToolbarProps {
  title?: string;
  isLoading: boolean;
  onNew?: () => void;
  disableCreate?: boolean;
}

// Create table toolbar component
const TableToolbar: FC<TableToolbarProps> = ({ title, isLoading, onNew, disableCreate }) => {


  const MenuItems = [{
    name: 'Song',
    route: ROUTES.SONG.NEW,
  },
  {
    name: 'Event',
    route: ROUTES.EVENT.NEW,
  },
  {
    name: 'Object',
    route: ROUTES.OBJECT.NEW,
  },
  {
    name: 'Video',
    route: ROUTES.VIDEO.NEW,
  },
  {
    name: 'Image',
    route: ROUTES.IMAGE.NEW,
  }
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (title == 'NFT Tokens') {
      console.log('🚀 ~ file: index.tsx:43 ~ anchorEl:', event.currentTarget);
      if(event.currentTarget === null){
        
        setAnchorEl(null);
      }else{
      setAnchorEl(event.currentTarget);
    }
    } else {
      onNew && onNew();
    }
  };
  const handleClose = (name: string) => {
    const item = MenuItems.find((item) => item.name === name); // Use strict equality operator '==='
  if (item) {
    navigate(item.route);
    setAnchorEl(null);
  } else {
    setAnchorEl(null);
  }
  };

  // Return table toolbar component
  return (
    <S.TableToolbar>
      <Typography variant="title" color="black" sx={{ lineHeight: '2.625rem', fontWeight: '600' }}>
        {title}
      </Typography>
      {!disableCreate && (
        <>
          <S.AddButton disabled={isLoading} onClick={handleClick}
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Box display={'flex'} alignItems={'center'} gap={12}>
              <S.StackIcon>
                <PlusIcon />
              </S.StackIcon>
              <Box fontWeight={'500'} fontSize={'0.875rem'}>
                Create New
              </Box>
            </Box>
          </S.AddButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {MenuItems.map((item) => {
              return (
                <MenuItem onClick={() => handleClose(item.name)}>{item.name}</MenuItem>
              );
            })}
          </Menu>
        </>
      )}
    </S.TableToolbar>
  );
};

export default TableToolbar;
