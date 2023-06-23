import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react';
import { authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import { styled } from '@mui/material/styles';
import { getTablesForEvent } from 'services/tables/getTablesForEvent';
import { updateGuestInfo } from 'services/guests/updateGuestInfo';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const tableAvailabilityColors = {
    available: '#29AB87',
    occupied: '#cc4e5c',
  }

const TableIcon = styled(Box)({
    width: "5rem", 
    height: "5rem", 
    borderRadius: "100%", 
    backgroundColor: "#29AB87", 
    display: "flex",
    justifyContent: "center", 
    alignItems: "center"
});

export default function AssignDialog({open, handleClose, guest, fetch, page, rowsPerPage, fetchEventGuests}) {
  
  const { instance, inProgress, accounts } = useMsal();
  const [tables, setTables] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClickYes = () => {
    console.log(guest);
    handleClose();
  }

  const SelectButtonClicked = (guest, tableId) => {

    let guests = [];
    let guestToUpdate = {
      id: guest.id,
      name: guest.name,
      phoneNumber: guest.phoneNumber,
      eventId: guest.eventId,
      tableId: tableId
    }
    guests.push(guestToUpdate);
    updateGuest(guests);
    
  }

  const updateGuest = async (body) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      await updateGuestInfo(body, api_access_token);
      await fetchEventGuests(page, rowsPerPage);
      handleClose();
    }catch(error){
      console.log(error);
    }
  }

  const fetchTables = async (eventId) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const tablesResult = await getTablesForEvent(eventId, api_access_token);
      setTables(tablesResult.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(guest.eventId){
      fetchTables(guest.eventId);
    }
  },[fetch]);

  useEffect(() => {
    console.log(tables);
  },[tables]);

  const tooltipTitle = (table) => {
    return table.guests.reduce((acc, curr) => acc + curr.name + "\n", "");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Assign table for {guest.name}
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
        <DialogContentText sx={{paddingBottom: "10px"}}>
          Choose one available tables for {guest.name}
        </DialogContentText>
        <Grid2 container spacing={4}>
          {tables.length ? tables.map((row, i) => (
            <Grid2 md={3} xs={4} key={i}>
              <Card>
              <CardContent>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px"}}>
                  <Tooltip title={ row.guests.length > 0 ?
                    <Box style={{ whiteSpace: 'pre-line' }}>{tooltipTitle(row)}</Box> : ""}
                    placement="right"
                  >
                  <TableIcon sx={{
                    backgroundColor: tableAvailabilityColors['available'],
                    height: !matches? "3rem" : "5rem",
                    width: !matches? "3rem" : "5rem",
                    ...(row.noOfSeats - row.guests.length === 0 && {
                      backgroundColor: tableAvailabilityColors['occupied'],
                    })
                  }}>
                    <Typography variant={matches? "h2" : "h4"} color="common.white">{row.tableNumber}</Typography>
                  </TableIcon>
                  </Tooltip>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <Typography variant='body2'>{row.guests.length}/{row.noOfSeats}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{display: "flex", justifyContent: "center"}}>
                <Button 
                size="small" 
                disabled={
                  row.noOfSeats - row.guests.length > 0 &&
                  row.id != guest.tableId? false : true
                }
                onClick={() => {SelectButtonClicked(guest, row.id)}}
                  >Select
                </Button>
              </CardActions>
              </Card>
            </Grid2>
          )):<></>}
        </Grid2>
      </DialogContent>
    </Dialog>
  );
}