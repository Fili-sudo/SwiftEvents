import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { authorizeMsGraphRequest, authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import { DeleteEvent } from 'services/events/deleteEvent';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
      contrastText: '#ffffff'
    },
  },
});

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}
  
function stringAvatar(name) {
    var initials = `${name.split(' ')[0][0]}`;
    if(name.split(' ').length >= 2){
        initials = `${name.split(' ')[0][0]} ${name.split(' ')[1][0]}`;
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
}

const paperSX = {
    display: "flex",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "3px",
    paddingRight: "3px",
    "&:hover": {
      bgcolor: "#e8e8e8"
    },
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  

export function EventEntry({name, id, events, setEvents, eventPicker}){
  const [open, setOpen] = useState(false);
  const [openDetails, setopenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const { instance, inProgress, accounts } = useMsal();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDetails = () => {
    setopenDetails(true);
  };

  const handleCloseDetails = () => {
    setopenDetails(false);
  };

  const handleClickOnEvent = (id) => {
    eventPicker(id);
  }

  const deleteEvent = async () => {
    
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    setLoading(true);
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const apiResult = await DeleteEvent(id, api_access_token);
      let newEvents = [...events];
      const index = newEvents.findIndex(x => x.id == apiResult.data.id);
      if(index != -1)
        newEvents.splice(index, 1)
      setEvents(newEvents);
      eventPicker(newEvents[0].id);
      handleClose();
    }
    catch(error){
      console.log(error);
      eventPicker("");
    }
    
  }

  const getEvent = (id) => {
    return events.find(e => e.id == id);
  }
  const getDateTime = (id) => {
    let event = events.find(e => e.id == id);
    let dateTime = new Date(event.date);
    const localDateString = dateTime.toLocaleDateString(undefined, {  
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    });
  
    const localTimeString = dateTime.toLocaleTimeString(undefined, {
      hour:   '2-digit',
      minute: '2-digit',
    });
    return {
      date: localDateString,
      time: localTimeString
    }
  }

    return(
        <Paper sx={paperSX} elevation={0} onClick={() => handleClickOnEvent(id)}>
          <Box>
            <Avatar {...stringAvatar(name)}></Avatar>
            <Typography>{name}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 auto' }} /> 
          <Box>
            <IconButton onClick={handleClickOpenDetails} aria-label="delete" sx={{"&:hover": { backgroundColor: "rgba(0,0,0,0.1)" }, padding: 0}}>
              <InfoOutlinedIcon sx={{"&:hover": { color: "#004F98" /* US Air Force Academy blue */ }, padding: "8px"}}/>
            </IconButton>
            <IconButton onClick={handleClickOpen} aria-label="delete" sx={{"&:hover": { backgroundColor: "rgba(0,0,0,0.1)" }, padding: 0}}>
              <DeleteIcon sx={{"&:hover": { color: "#e34234" /* Vermilion Color */ }, padding: "8px"}}/>
            </IconButton>
          </Box>
          <ThemeProvider theme={customTheme}>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete this event?"}
              </DialogTitle>
              {!loading ? (
              <>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You are about to delete this event and all of its 
                    underlying components. Are you sure you want to 
                    proceed with the action?
                  </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteEvent}>Yes</Button>
                </DialogActions>
              </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: "175px", maxHeight: "360px"}}>
                    <CircularProgress color="primary" size={50} sx={{margin : "auto"}}/>
                  </Box>
                </>
              )}
            </Dialog>
          </ThemeProvider>
          <ThemeProvider theme={customTheme}>
            <BootstrapDialog
              fullWidth={true}
              open={openDetails}
              onClose={handleCloseDetails}
            >
              <BootstrapDialogTitle onClose={handleCloseDetails}>
                {"Event details"}
              </BootstrapDialogTitle>
              <DialogContent>
                <DialogContentText>
                <Typography variant='h6'>Event name</Typography>
                <Typography variant='body2'>{getEvent(id).name}</Typography>
                <Typography variant='h6'>Description</Typography>
                <Typography variant='body2'>{getEvent(id).description}</Typography>
                <Typography variant='h6'>Location</Typography>
                <Typography variant='body2'>{getEvent(id).location}</Typography>
                <Typography variant='h6'>Date</Typography>
                <Typography variant='body2'>{getDateTime(id).date} {getDateTime(id).time}</Typography>
                </DialogContentText>
              </DialogContent>
            </BootstrapDialog>
          </ThemeProvider>
        </Paper>
    );
};