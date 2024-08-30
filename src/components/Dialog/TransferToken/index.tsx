import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { transferNftToken } from '../../../apis/products.api';

type TokenTransferProps = {
  txHash: string;
};

const TrannsferTokenDialog: FC<TokenTransferProps> = ({ txHash }) => {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTransferToken = async (to: string) => {
    try {
      await transferNftToken(to, txHash as string);
      setOpen(false);
      navigate('/nfts');
    } catch (error) {
      console.log('🚀 ~ file: index.tsx ~ line 32 ~ handleTransferToken ~ error', error);
    }
  };
  return (
    <Box
      textAlign="center"
      sx={{
        marginTop: '0.9rem'
      }}
    >
      <Button variant="outlined" sx={{ alignSelf: 'center' }} onClick={handleClickOpen}>
        Transfer Token
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transfer Token to new address</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter adress of user to transfer token</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Wallet Address"
            type="text"
            fullWidth
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleTransferToken(address)}>Transfer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrannsferTokenDialog;
