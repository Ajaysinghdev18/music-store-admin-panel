import { AccountBox, AccountCircle, LogoutOutlined } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ACCESS_TOKEN_KEY } from '../../../constants';
import { StorageHelper } from '../../../helpers';
import { setAccount } from '../../../store/actions/auth.actions';

const Profile = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const showMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setAccount(null));
    StorageHelper.removeItem(ACCESS_TOKEN_KEY);
  };

  return (
    <React.Fragment>
      <IconButton onClick={showMenu}>
        <AccountBox color="warning" fontSize="large" />
      </IconButton>
      <Menu id="abstract-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Profile;
