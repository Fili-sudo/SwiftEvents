import * as React from 'react';
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { GetGuestByIdAnonymus } from 'services/guests/getGuestByIdAnonymus';
import AssignDialog from './components/assignTableToCurrentGuest';
import CircularProgress from '@mui/material/CircularProgress';
import { PatchGuestAnonymous } from 'services/guests/patchGuestAnonymous';


const TableIcon = styled(Box)({
    width: "250px", 
    height: "250px", 
    borderRadius: "100%", 
    backgroundColor: "#29AB87", 
    display: "flex",
    justifyContent: "center", 
    alignItems: "center"
  });


const tableAvailabilityColors = {
    available: '#29AB87',
    occupied: '#cc4e5c',
    notChosen: `#808080`,
}

const customTheme = createTheme({
    palette: {
      primary: {
        main: '#388e3c',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#38798e'
      }
    },
});

export default function GuestInfoTab(){

    const [guestId] = useOutletContext();
    const [guest, setGuest] = useState({});
    const [loading, setLoading ] = useState(true);
    const [openAssignDialog, setOpenAssignDialog] = useState(false);
    const [fetchTables, setFetchTables] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [editButton, setEditButton] = useState(false);
    

    const handleCloseAssignDialog = () => {
        setOpenAssignDialog(false);
    };

    const handleOpenAssignDialog = () => {
        setFetchTables(!fetchTables);
        setOpenAssignDialog(true);
      };

    const nameChangeHandler = (event) => {
      setName(event.target.value);
    }

    const phoneChangeHandler = (event) => {
      setPhone(event.target.value);
    }

    const editButtonClicked = () => {
      setEditButton(true);
    }

    const saveButtonClicked = () => {
      const guestToUpdate = {
        guestId: guest.id,
        name: name,
        phoneNumber: phone
      }
      
      patchGuest(guestToUpdate);
      setEditButton(false);
    }

    const patchGuest = async (body) => {
      try{
        await PatchGuestAnonymous(body);
        await fetchGuest(guest.id);
        
      }catch(error){
        console.log(error);
      }
    }

    const fetchGuest = async (guestId) => {
        try{
            let result = await GetGuestByIdAnonymus(guestId);
            setGuest(result.data);
            setName(result.data.name);
            setPhone(result.data.phoneNumber);
            setLoading(false);
          }catch(error){
            console.log(error);
          }
    }

    useEffect(() => {
        fetchGuest(guestId);
    },[])

    useEffect(() => {
        console.log(guest);
    },[guest])

    const checkEqualName = (name1, name2) => {
        return name1 == name2;
    }

    if(loading){
      return(
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <ThemeProvider theme={customTheme}>
            <CircularProgress color="primary" size={100}/>
          </ThemeProvider>
        </Box>
      );
    }

    return(
        <ThemeProvider theme={customTheme}>
          <AssignDialog
            open={openAssignDialog} 
            handleClose={handleCloseAssignDialog}
            guest={guest}
            fetch={fetchTables}
            fetchGuest={fetchGuest}
          />
          <Box sx={{display: "flex", alignItems: "center", flexDirection:"column", paddingTop: "10px", width: "100%"}}>
            <Typography>{`hei there ${guest.name}`}</Typography>


            <Box sx={{paddingBottom: "20px", display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column"}}>
              {guest.table != null?
                <>
                  <Typography>You have been asigned to this table</Typography>
                  <Typography>Check the other guests or change the table you are asigned to</Typography>
                </> : 
                  <>
                    <Typography>You aren't asigned to a table</Typography>
                    <Typography>Pick a table you think it's suitable for you</Typography>
                  </>
              }
            </Box>


            <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap", width:"100%"}}>
              <Box sx={{flex: 1}}/>

              <Box sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column", flex: 1}}>
                <TextField label="Name" variant="outlined" sx={{marginBottom: "30px"}} value={name} onChange={nameChangeHandler} disabled={!editButton}/>
                <TextField label="Phone" variant="outlined" sx={{marginBottom: "30px"}} value={phone} onChange={phoneChangeHandler} disabled={!editButton}/>
                <Box sx={{display: "flex", justifyContent: "space-around"}}>
                  <Button variant="contained" color='secondary' disabled={editButton} onClick={() => editButtonClicked()}>Edit</Button>
                  <Button variant="contained" color='secondary' disabled={!editButton} onClick={() => saveButtonClicked()}>Save</Button>
                </Box>
              </Box>

              <Box sx={{flex: 1}}/>

              <Box sx={{display: "flex", flex: 3}}>
                {guest.table != null?
                <>
                  <Box  sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column"}}>
                    <TableIcon sx={{backgroundColor: tableAvailabilityColors['available'], marginBottom:"20px"}}>
                       <Typography variant='h1' color="common.white">{guest.table.tableNumber}</Typography>
                    </TableIcon>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                      <Button variant="contained" color='secondary' onClick={() => handleOpenAssignDialog()}>change table</Button>
                    </Box>
                  </Box>
                  <List sx={{bgcolor: 'background.paper' }}>
          	        {guest.table.guests.length > 0 ? guest.table.guests.map((other, index) => 
                      (<ListItem key={index}>
                         <ListItemAvatar>
                           <Avatar>
                             <PersonIcon />
                           </Avatar>
                         </ListItemAvatar>
                         <ListItemText primary={checkEqualName(other.name, guest.name)? "You" : other.name} secondary={other.phoneNumber} />
                       </ListItem>)) : <></>}
                  </List>
                  </> : 
                    <>
                      <Box  sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column"}}>
                        <TableIcon sx={{backgroundColor: tableAvailabilityColors['notChosen'], marginBottom:"20px"}}>
                           <Typography variant='h1' color="common.white">?</Typography>
                        </TableIcon>
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                          <Button variant="contained" color='secondary' onClick={() => handleOpenAssignDialog()}>Choose table</Button>
                        </Box>
                      </Box>
                      {/*<Box sx={{display: "flex", justifyContent: "center"}}>
                        <Button variant="contained" color='secondary' onClick={() => handleOpenAssignDialog()}>Choose table</Button>
                      </Box>*/}
                    </>}
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
    );
}