import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DoneIcon from '@mui/icons-material/Done';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShowGuestIdDialog({open, handleClose, guest}){

  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  useEffect(() => {
    setCopySuccess('');
  },[open]);

    return(
      <Dialog
      open={open}
      onClose={handleClose}
      >
        <DialogTitle>
          {guest.name}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{display: "flex"}}>
            <DialogContentText sx={{paddingBottom: "10px"}}>
              {guest.id}
            </DialogContentText>
            <Tooltip title={copySuccess != 'Copied!'? "copy to clipboard" : "copied to clipboard"} placement='right'>
              {copySuccess == 'Copied!'?
                <IconButton sx={{marginLeft: "5px"}}>
                   <DoneIcon/>
                 </IconButton>
                :<IconButton sx={{marginLeft: "5px"}} onClick={() => copyToClipBoard(guest.id)}>
                   <ContentCopyOutlinedIcon/>
                 </IconButton>
              }
              
            </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>
    );
}