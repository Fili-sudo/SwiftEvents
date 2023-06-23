import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { addGuests } from 'services/guests/addGuests';
import { authorizeMsGraphRequest, authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";

export default function AlertDialog({open, handleClose, eventId, page, rowsPerPage, fetchEventGuests}) {

  const [noOfGuestsValue, setNoOfGuestsValue] = useState(0);
  const { instance, inProgress, accounts } = useMsal();

  const guestsChnageHandler = (event) => {

    setNoOfGuestsValue(event.target.value);
  }

  const handleDone = async () => {
    const guests = new Array(parseInt(noOfGuestsValue, 10)).fill().map(() => ({
        name: "",
        phoneNumber: "",
        tableId: null
      }));
    const apiAccessTokenRequest = {
        scopes: authorizeApiRequest.scopes,
        account: accounts[0],
      }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
        await addGuests(eventId, guests, api_access_token);
        await fetchEventGuests(page, rowsPerPage);
        handleClose();
    }catch(error){
        console.log(error);
    }
  }
  
  return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Add guests"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: "2%"}}>
            Choose how many guests you want to add.
          </DialogContentText>
          <TextField
            id="Guests-textfield"
            type="number"
            value={noOfGuestsValue}
            onChange={guestsChnageHandler}
          />
        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleDone()}} autoFocus>Done</Button>
        </DialogActions>
      </Dialog>
  );
}
