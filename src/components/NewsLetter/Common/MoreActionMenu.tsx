import { Delete } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { useMemo } from 'react';

import { MoreIcon, SettingsIcon } from '../../../assets/icons';
import { ActionMenu, MoreActionButton } from './styles';

export const TEMPLATE_TYPE = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
};

const MoreActionMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    props.onClick();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.onClick();
  };

  const onMenuClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <MoreActionButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event) => handleClick(event)}
      >
        <MoreIcon />
      </MoreActionButton>
      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {props.type === TEMPLATE_TYPE.DRAFT && <MenuItem
          onClick={(event) => {
            onMenuClick(event);
            props.onConfig();
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Publish</ListItemText>
        </MenuItem>}
        <MenuItem
          onClick={(event) => {
            onMenuClick(event);
            props.onDelete();
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </ActionMenu>
    </>
  );
};

export default MoreActionMenu;
