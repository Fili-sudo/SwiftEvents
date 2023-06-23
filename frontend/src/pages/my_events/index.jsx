import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getEventsForUser } from 'services/events/getEventsForUser';
import { EventEntry } from './eventEntry';
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import getToken from 'config/auth/getToken';
import { authorizeApiRequest } from 'config/auth/authConfig';
import CustomizedDialogs from 'pages/my_events/dialog';
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const CenteredContentBox = styled(Box)({
  display:"flex", 
  justifyContent: "center", 
  marginBottom: "10px", 
  marginTop:"10px"
});

const customButtontheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
      contrastText: '#ffffff'
    },
  },
});

function RightSideBar(props){
  const StyledBox = styled(Box)({
    height: "100vh", 
    overflowY: "auto",
    marginLeft: "2%",
    marginRight: "2%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  });
  const StyledPaper = styled(Paper)({
    float:"right", 
    width:"20%"
  })
  return (
    <StyledPaper elevation={4}>
      <StyledBox>
        {props.children}
      </StyledBox>
    </StyledPaper>
  );
}

export default function MyEvents(){
    const { id } = useParams();
    const { pathname } = useLocation();
    const [ events, setEvents ] = useState([]);
    const { instance, inProgress, accounts } = useMsal();
    const [open, setOpen] = useState(false);
    const [event, setEvent] = useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const eventsSetter = (newEvents) => {
      setEvents(newEvents);
    }

    const eventPicker = (newEvent) => {
      setEvent(newEvent);
    }

    useEffect(()=>{
        const fetchEvents = async () =>{
            if (events.length == 0 && inProgress === InteractionStatus.None) {
              const accessTokenRequest = {
                scopes: authorizeApiRequest.scopes,
                account: accounts[0],
              };
              try{
                let access_token = await getToken(instance, accessTokenRequest, inProgress);
                const result = await getEventsForUser(id, access_token);
                setEvents(result.data);
                setEvent(result.data[0].id);
              }catch(error){
                console.log(error);
              }
              
            }
        }

        fetchEvents();
    },[id, inProgress, instance, accounts]);
    
    useEffect(() => {
      //console.log(event);
    },[event]);

    const activeStyle = {
      textDecoration: "none",
      padding: "10px",
      margin: "5px",
      borderRadius: "52% 78% 94% 25% / 59% 34% 49% 83% ",
      backgroundColor: "#388e3c",
      color: "white"
    };

    const inactiveStyle = {
      textDecoration: "none",
      padding: "10px",
      margin: "5px",
      color: "white"
    } 

    const isIndexPath = () => {
      const paths = pathname.split("/").filter(entry => entry !== "");
      const lastPath = paths[paths.length - 1];
      if(lastPath !== id){
        return false;
      }
      return true;
    }
    
    return (
      <>
        <Box sx={{backgroundColor: "#8e3856", height: "70px", display: "flex", alignItems: "center"}}>
            <NavLink to="guests"
              style={({ isActive }) =>
                isActive || isIndexPath() ? activeStyle : inactiveStyle
              }>
              <Typography variant='subtitle1'>
                Guests
              </Typography>
            </NavLink>
            <NavLink to="tables"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }>
              <Typography variant='subtitle1'>
                Tables
              </Typography>
            </NavLink>
            <NavLink to="upload_pictures"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }>
              <Typography variant='subtitle1'>
                Upload Pictures
              </Typography>
            </NavLink>
            <NavLink to="image_list"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }>
              <Typography variant='subtitle1'>
                Images
              </Typography>
            </NavLink>
        </Box>

        <Box sx={{display: "flex", flexFlow: "wrap"}}>
          <Box sx={{float: "left", width: "76%", margin: "2%"}}>
            {event ?
            <Outlet context={[event]} />
            : <Typography>There are no events</Typography>
            }
          </Box>
          
          <RightSideBar>
            <CenteredContentBox>
              <Typography variant='h5'>
                Your Events
              </Typography>
            </CenteredContentBox>
            <CenteredContentBox>
              <ThemeProvider theme={customButtontheme}>
                <Button variant='contained' size='small' onClick={handleClickOpen}>
                  Create Event
                </Button>
              </ThemeProvider>
            </CenteredContentBox>
            {(events && Object.keys(events).length === 0) ?
            <></>
            :<Stack spacing={1}>
              {events.map(x => <EventEntry 
                key={x.id} 
                name={x.name} 
                id={x.id} 
                events={events} 
                setEvents={eventsSetter}
                eventPicker={eventPicker}/>)}
            </Stack>}
          </RightSideBar>
        </Box>
        <CustomizedDialogs open={open} handleClose={handleClose} events={events} setEvents={eventsSetter}></CustomizedDialogs>
      </>
    );
    
}