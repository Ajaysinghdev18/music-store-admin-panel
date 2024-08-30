import { Delete, Download } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Divider, InputBase, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import React from 'react';

import { MoreIcon } from '../../../../../assets/icons';
import { ActionMenu, InputForm, MoreImageActionButton } from '../../../Common/styles';

const ImageActionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MoreImageActionButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreIcon />
      </MoreImageActionButton>
      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <InputForm>
          <InputBase placeholder="Image.Name.JPG" />
        </InputForm>
        <Typography>Uploaded by John Doe 1 year ago</Typography>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </ActionMenu>
    </>
  );
};

export default ImageActionMenu;
