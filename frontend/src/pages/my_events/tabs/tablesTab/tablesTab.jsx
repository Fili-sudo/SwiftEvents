import * as React from 'react';
import { useOutletContext } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Chip from '@mui/material/Chip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { getSparsedTablesForEvent } from 'services/tables/getSparsedTablesForEvent';
import { getTablesForEvent } from 'services/tables/getTablesForEvent';
import { AddSingleTable } from 'services/tables/addSingleTable';
import { AddRecommendedRangeOfTables } from 'services/tables/addRecommendedRangeOfTables';
import { UnsignGuestFromTable } from 'services/guests/unsignGuestFromTable';
import { GetPercentageOfFullness } from 'services/tables/getPercentageOfFullness';
import { DeleteTableById } from 'services/tables/deleteTableById';
import { authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import AlertDialog from './components/deleteTableDialog';


const customTheme = createTheme({
    palette: {
      primary: {
        main: '#38798e',
        contrastText: '#ffffff'
      }
    },
  });

const greenCustomTheme = createTheme({
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 100,
    },
  });


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const [nrOfSeats, setNrOfSeats] = useState(0);
    const { instance, inProgress, accounts } = useMsal();

    const nrOfSeatsChangeHandler = (event) =>{
        setNrOfSeats(event.target.value);
      }

    const createRange = () => {
        console.log("range");
        addRecommendedRangeOfTables();
    };
    const createCustom = () => {
        console.log("custom");
        addSingleTable();  
    };

    const addSingleTable = async () => {
      const apiAccessTokenRequest = {
        scopes: authorizeApiRequest.scopes,
        account: accounts[0],
      }
      let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
      const requestBody = {
        tableNumber: other.tableNumber[0],
        noOfSeats: nrOfSeats,
        eventId: other.event
      };
      try{
        await AddSingleTable(requestBody, api_access_token);
        other.refetchTables();
      }catch(error){
        console.log(error);
      }
      console.log(requestBody);
    };

    const addRecommendedRangeOfTables = async () => {
      const apiAccessTokenRequest = {
        scopes: authorizeApiRequest.scopes,
        account: accounts[0],
      }
      let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
      const requestBody = {
        eventId: other.event,
        request: {
          noOfSeats: nrOfSeats,
          sparsedTables: other.tableNumber
        }
      };
      try{
        await AddRecommendedRangeOfTables(requestBody, api_access_token);
        other.refetchTables();
      }catch(error){
        console.log(error);
      }
      console.log(requestBody);
    }

    const createButtonClicked = (index) => {
        switch(index){
            case 0:{
                createRange();
                break;
            }
            case 1:{
                createCustom();
                break;
            }
        }
    }

  
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-start", 
                width: "20%",
                paddingRight: "5%"
            }}>
              <TextField
                margin="normal"
                type='number'
                size='small'
                value={nrOfSeats}
                onChange={nrOfSeatsChangeHandler}
              />
              <Button variant='outlined' size='small' onClick={() => createButtonClicked(index)}>Create</Button>
            </Box>
            <Typography sx={{width: "20%"}}>{children}</Typography>
          </Box>
        )}
      </Box>
      
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


  function createMockGuest(name){
    return { name };
  }
  const rows = [
    {tableNumber: 1, numberOfseats : 12, guests: [createMockGuest("Adrian Ionescu Miroslav Cristian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 2, numberOfseats : 10, guests: [createMockGuest("Adrian Ionescu Miroslav Cristian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 3, numberOfseats : 10, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 4, numberOfseats : 11, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 5, numberOfseats : 9, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 6, numberOfseats : 6, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 7, numberOfseats : 10, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 8, numberOfseats : 12, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 9, numberOfseats : 10, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
    {tableNumber: 10, numberOfseats : 5, guests: [createMockGuest("Adrian"),createMockGuest("Ovidiu"), createMockGuest("Ionescu"), createMockGuest("Filip")]},
  ]

  const TableIcon = styled(Box)({
    width: "100px", 
    height: "100px", 
    borderRadius: "100%", 
    backgroundColor: "#29AB87", 
    display: "flex",
    justifyContent: "center", 
    alignItems: "center"
  });


  const tableAvailabilityColors = {
    available: '#29AB87',
    occupied: '#cc4e5c',
  }

export default function TableTabs() {

  const [value, setValue] = useState(0);
  const [eventId] = useOutletContext();
  const [expanded, setExpanded] = useState(Array(10).fill(false));
  const [tables, setTables] = useState([]);
  const [sparsedTables, setSparsedTables] = useState([]);
  const { instance, inProgress, accounts } = useMsal();
  const [refetch, setRefetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteTableId, setDeleteTableId] = useState("");
  const [totalGuests, setTotalGuests] = useState(0);
  const [seatedGuests, setSeatedGuests] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleOpen = (tableId) => {
    setDeleteTableId(tableId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleExpandClick = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !(newExpanded[index]);
    setExpanded(newExpanded);
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeRefetch = () => {
    setRefetch(!refetch);
  };

  const fetchTablesAndSparsedTables = async (eventId) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const tablesResult = await getTablesForEvent(eventId, api_access_token);
      const sparsedTablesResult = await getSparsedTablesForEvent(eventId, api_access_token);
      setTables(tablesResult.data);
      setSparsedTables(sparsedTablesResult.data.tableNumbers);
      setExpanded(Array(tablesResult.data.length).fill(false));
    }catch(error){
      console.log(error);
    }
  }

  const removeGuest = async (tableId, guestId) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      await UnsignGuestFromTable(guestId, api_access_token);
      const deepClonedtables = JSON.parse(JSON.stringify(tables));
      const tableIndex = deepClonedtables.findIndex(table => table.id == tableId);
      const newGuests = deepClonedtables[tableIndex].guests.filter(guest => guest.id != guestId);
      deepClonedtables[tableIndex].guests = newGuests;
      setTables(deepClonedtables);
      setSeatedGuests(seatedGuests - 1);
    }catch(error){
      console.log(error);
    }
  }

  const removeTable = async () => {
    console.log(deleteTableId);
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      await DeleteTableById(deleteTableId, api_access_token);
      setRefetch(!refetch);
      
    }catch(error){
      console.log(error);
    }
  }

  const getOccupationPercentage = async (eventId) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const result = await GetPercentageOfFullness(eventId, api_access_token);
      setTotalGuests(result.data.outOfY);
      setSeatedGuests(result.data.x);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(eventId){
      fetchTablesAndSparsedTables(eventId);
      getOccupationPercentage(eventId);
    }
  },[eventId, refetch]);

  useEffect(() => {
    console.log(tables);
    console.log(sparsedTables);
  },[tables,sparsedTables]);

  return (
    <>
    <ThemeProvider theme={customTheme}>
      <Box sx={{display: "flex", justifyContent: "center", marginBottom: "10%"}}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{display: "flex", justifyContent: "flex-start"}}>
            <Typography variant='h4'>{seatedGuests}/{totalGuests}</Typography>
            <Typography variant='body1' sx={{marginLeft: "10px"}}>Seated guests info</Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center"}}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Create Range" />
              <Tab label="Create Custom"/>
            </Tabs>
          </Box>
          <TabPanel value={value} 
            index={0} 
            event={eventId} 
            tableNumber={sparsedTables.length? sparsedTables : [0]}
            refetchTables={changeRefetch}>
            Creation of tables will be done by considering the
            number of seats prompted and the remaining guests
            without a seat assigned.
          </TabPanel>
          <TabPanel value={value} 
            index={1} 
            event={eventId} 
            tableNumber={sparsedTables.length? sparsedTables : [0]}
            refetchTables={changeRefetch}>
            Creation of tables will be done one by one,
            considering the number of seats prompted.
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>

    <ThemeProvider theme={greenCustomTheme}>
      <AlertDialog
          open={open}
          handleClose={handleClose}
          removeTable={removeTable}
      />
    </ThemeProvider>

    <Grid2 container spacing={4}>
      {tables.length ? tables.map((row, i) => (
        <Grid2 xs={3} key={i} sx={{paddingBottom: "20px"}}>
          <Card sx={{ maxWidth: 350}}>
            <CardHeader 
            action={
              <IconButton size='small' onClick={() => {handleOpen(row.id)}}>
                <Tooltip title='remove table' placement='top-start'>
                <ClearIcon fontSize='inherit'/>
                </Tooltip>
              </IconButton>
            }/>
            <CardContent>
              <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px"}}>
                <TableIcon sx={{
                  backgroundColor: tableAvailabilityColors['available'],
                  height: !matches? "50px" : "100px",
                  width: !matches? "50px" : "100px",
                  ...(row.noOfSeats - row.guests.length === 0 && {
                    backgroundColor: tableAvailabilityColors['occupied'],
                  })
                }}>
                  <Typography variant={matches? "h2" : "h4"} color="common.white">{row.tableNumber}</Typography>
                </TableIcon>
              </Box>
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography variant='body2'>{row.guests.length}/{row.noOfSeats}</Typography>
              </Box>
            </CardContent>
            
            <CardActions disableSpacing>
              {row.guests.length > 0 ?
                <ExpandMore
                  expand={expanded[i]}
                  onClick={() => {handleExpandClick(i)}}
                  aria-expanded={expanded}
                >
                  <Tooltip title={!expanded[i]? "Show guests" : "Hide guests"} placement="top">
                  <ExpandMoreIcon/>
                  </Tooltip>
                </ExpandMore>
                :<></>}
            </CardActions>
            <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
              <CardContent>
              <Grid2 container spacing={1}>
                  {(row.guests).map((guest, j) => (
                      <Grid2 key={i * row.noOfSeats + j} lg={12} md={12} xs={12}>
                        <Tooltip title={guest.name} placement={j % 2 == 0 ? "left" : "right"}>
                          <Chip label={guest.name} onDelete={() => {removeGuest(row.id, guest.id, i)}} />
                        </Tooltip>
                      </Grid2>
                  ))}
                </Grid2>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
      )): <></>}
    </Grid2>

    </>
  );
}