import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export default function AlertDialog({open, handleClose, removeTable}) {
  
  const handleClickYes = () => {
    removeTable();
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {"Remove table?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this table?
        </DialogContentText>
        <DialogContentText>
          All guest assigned to this table will be automatically unsigned.
        </DialogContentText>
        <DialogContentText>
          Do you wish to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClickYes}autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}