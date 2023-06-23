import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import { authorizeMsGraphRequest, authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import { getPaginatedGuests } from 'services/guests/getPaginatedGuests';
import { getPaginatedGuestsWithSearch } from 'services/guests/getPaginatedGuestsWithSearch';
import { updateGuestInfo } from 'services/guests/updateGuestInfo';
import { DeleteGuests } from 'services/guests/deleteGuests';
import { GetGuestById } from 'services/guests/getGuestById';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useOutletContext } from "react-router-dom";
import AlertDialog from './components/addGuestDialog';
import AssignDialog from './components/assignTableToGuest';
import ShowGuestIdDialog from './components/showGuestIdDialog';
import { useDebounce } from 'hooks/useDebounce';

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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createMockData(index, name, phone, table){
    return { index, name, phone, table };
}

const rows = [
  createMockData(1,'Cupcake', '+40 711 343 914', 1),
  createMockData(2, 'Donut', '+40 702 062 612', 2),
  createMockData(3,'Eclair', '+40 713 482 535', 3),
  createMockData(4,'Frozen yoghurt', '+40 791 772 628', 1),
  createMockData(5,'Gingerbread', '+40 702 030 342', 1),
  createMockData(6,'Honeycomb', '+40 711 518 410', 3),
  createMockData(7,'Ice cream sandwich', '+40 700 547 735', 2),
  createMockData(8,'Jelly Bean', '+40 712 906 977', 2),
  createMockData(9,'KitKat', '+40 702 065 276', 2),
  createMockData(10,'Lollipop', '+40 702 018 295', 2),
  createMockData(11,'Marshmallow', '+40 702 011 863', 1),
  createMockData(12,'Nougat', '+40 701 489 123', 1),
  createMockData(13,'Oreo', '+40 784 999 490', 1),
];

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [edit, setEdit] = React.useState(Array(5).fill(0));
  const nameItemsRef = React.useRef([]);
  const phoneItemsRef = React.useRef([]);
  const [guestData, setGuestData] = React.useState({});
  const [emptyRows, setEmptyRows] = React.useState(0);
  const { instance, inProgress, accounts } = useMsal();
  const [open, setOpen] = React.useState(false);
  const [openAssignDialog, setOpenAssignDialog] = React.useState(false);
  const [openShowIdDialog, setopenShowIdDialog] = React.useState(false);
  const [guest, setGuest] = React.useState({});
  const [fetchTables, setFetchTables] = React.useState(false);
  const [eventId] = useOutletContext();
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchQuery = useDebounce(searchTerm, 500);


  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAssignDialog = (guest) => {
    setGuest(guest);
    setFetchTables(!fetchTables);
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
  };

  const handleOpenShowGuestId = (guest) => {
    setGuest(guest);
    setopenShowIdDialog(true);
  };

  const handleCloseShowGuestId = () => {
    setopenShowIdDialog(false);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setEdit(Array(edit.length).fill(0));
    fetchEventGuests(newPage, rowsPerPage, searchTerm);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchEventGuests(0, parseInt(event.target.value, 10), searchTerm);
    setEdit(Array(parseInt(event.target.value, 10)).fill(0));
    nameItemsRef.current = nameItemsRef.current.slice(0, parseInt(event.target.value, 10));
    phoneItemsRef.current = phoneItemsRef.current.slice(0, parseInt(event.target.value, 10));
  };

  const handleChangeEditState = (index, value) => {
    let editState = [...edit];
    editState[index] = value;
    setEdit(editState);
  }

  function getValue(index) {
    alert(nameItemsRef.current[index].value);
  }

  const CheckButtonClicked = (index) => {
    handleChangeEditState((index), 0);

    let guests = [];
    let guestInfo = guestData.data[index];
    let guest = {
      id: guestInfo.id,
      name: nameItemsRef.current[index].value,
      phoneNumber: phoneItemsRef.current[index].value,
      eventId: guestInfo.eventId,
      tableId: guestInfo.tableId
    }
    guests.push(guest);
    console.log(guests);
    updateGuest(index, guests);
  }

  const fetchEventGuests = async (page, rowsPerPage, searchTerm) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const result = await getPaginatedGuestsWithSearch(eventId, page, rowsPerPage, searchTerm? searchTerm: '', api_access_token);
      setGuestData(result.data);
    }catch(error){
      let guestData = {
        data: [],
        pageNumber: page,
        pageSize: rowsPerPage,
        totalRows: (page + 1)*rowsPerPage
      }
      setGuestData(guestData);
    }
  }

  const updateGuest = async (index, body) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      let result = await updateGuestInfo(body, api_access_token);
      let updatedGuest = await GetGuestById(result.data[0].id, api_access_token);
      const deepClonedGuestData = JSON.parse(JSON.stringify(guestData));
      deepClonedGuestData.data[index] = updatedGuest.data;
      setGuestData(deepClonedGuestData);
    }catch(error){
      console.log(error);
    }
  }

  const deleteGuest = async (id, index) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      await DeleteGuests(id, api_access_token);
      await fetchEventGuests(page, rowsPerPage);
      handleChangeEditState((index), 0);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {

    if(eventId){
      fetchEventGuests(page, rowsPerPage);
      setPage(0);
      setEdit(Array(edit.length).fill(0));
    }
      
  },[eventId]);

  useEffect(() => {
    fetchEventGuests(page, rowsPerPage, searchTerm);
  },[page, searchQuery]);

  useEffect(() => {
    if (searchQuery || searchTerm.length < 0) console.log(searchQuery);
  },[page, searchQuery]);

  useEffect(() => {

    const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - guestData.data.length) : 0; 
    setEmptyRows(emptyRows);
    console.log(guestData);
  },[guestData]);


  return (
    <ThemeProvider theme={customTheme}>
    <AlertDialog 
      open={open} 
      handleClose={handleClose}
      eventId={eventId}
      page={page}
      rowsPerPage={rowsPerPage}
      fetchEventGuests={fetchEventGuests}
    />
    <AssignDialog
       open={openAssignDialog} 
       handleClose={handleCloseAssignDialog}
       guest={guest}
       fetch={fetchTables}
       page={page}
       rowsPerPage={rowsPerPage}
       fetchEventGuests={fetchEventGuests}
    />
    <ShowGuestIdDialog 
      open={openShowIdDialog} 
      handleClose={handleCloseShowGuestId}
      guest={guest}
    />
    <TableContainer component={Paper}>
      <Toolbar sx={{padding: "5px"}}>
      <Typography
          sx={{ flex: '1 1 60%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Guests
        </Typography>
        <Paper sx={{flex: '1 1 40%', marginRight: "5%", paddingLeft: "5px"}}>
          <Box sx={{display: "flex"}}>
            <InputBase 
            //variant="outlined" 
            //label="Search" 
            placeholder="Search"
            value={searchTerm} 
            onChange={handleChangeSearchTerm}
            sx={{ ml: 1, width: "90%", height: "40px"}}
            />
            {searchTerm &&
              (<IconButton size="small" onClick={() => { setSearchTerm(""); }}>
                <CloseIcon fontSize="inherit"/>
              </IconButton>)}
            <IconButton disabled>
              <SearchIcon />
            </IconButton>
          </Box>
        </Paper>
        <Tooltip title="Add Guests">
          <Fab color="secondary" size="small" onClick={handleClickOpen}>
            <AddIcon/>
          </Fab>
        </Tooltip>
      </Toolbar>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell align='left'>Nr</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Table</TableCell>
            <TableCell align="right">Guest Id</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        {(guestData && Object.keys(guestData).length === 0)? 
         <></>
         : <TableBody>
          {(guestData.data
          ).map((row, i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {page*rowsPerPage + (i + 1)}
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {edit[i]?
                  <TextField variant="filled" defaultValue={row.name} inputRef={el => nameItemsRef.current[i] = el}/>
                  : row.name
                }
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {edit[i]?
                  <TextField variant="filled" defaultValue={row.phoneNumber} inputRef={el => phoneItemsRef.current[i] = el}/>
                  : row.phoneNumber
                }
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  {row.table == null ? "N/A" : row.table.tableNumber}
                  <IconButton size='small' onClick={() => {handleOpenAssignDialog(row)}} sx={{marginLeft: "10px"}}>
                    <TableBarOutlinedIcon fontSize='small'/>
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                <IconButton onClick={() => {handleOpenShowGuestId(row)}}>
                  <VisibilityOutlinedIcon/>
                </IconButton>
              </TableCell>
              <TableCell style={{ width: "20%" }} align="right">
              {edit[i]? 
                <Box sx={{display: "flex", justifyContent: "space-around"}}>
                    <IconButton  onClick={ () => {CheckButtonClicked(i)}}>
                        <CheckCircleOutlineOutlinedIcon/>
                    </IconButton>
                    <IconButton  onClick={ () => {handleChangeEditState(i, 0)}}>
                        <CancelOutlinedIcon/>
                    </IconButton>
                    <IconButton  onClick={ () => {deleteGuest(row.id, i)}}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </Box> 
                : <IconButton onClick={ () => {handleChangeEditState(i, 1)}}>
                    <EditOutlinedIcon fontSize='small'/>
                  </IconButton>
              }
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={6}
              count={(guestData && Object.keys(guestData).length === 0)? rowsPerPage : guestData.totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </ThemeProvider>
    
  );
}