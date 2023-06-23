import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { authorizeMsGraphRequest, authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CreateEventForUser } from 'services/events/createEventForUser';
import dayjs from 'dayjs';

const steps = ['Event info', 'Date & time', 'Location & guests'];

export default function HorizontalLinearStepper({handleClose, events, setEvents}) {
  const [activeStep, setActiveStep] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [date, setDate] = useState(dayjs(new Date()));
  const [noOfGuestsValue, setNoOfGuestsValue] = useState(0);
  const [locationValue, setLocationValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { instance, inProgress, accounts } = useMsal();

  const handleChangechecked = (event) => {
    setChecked(event.target.checked);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nameChangeHandler = (event) => {

    setNameValue(event.target.value);
  }

  const descriptionChangeHandler = (event) => {

    setDescriptionValue(event.target.value);
  }

  const timeChangeHandler = (dateTime) => {

    let newDateTime = date.toDate();
    let newTime = dateTime.toDate().getTime();
    newDateTime.setTime(newTime);

    newDateTime = dayjs(newDateTime);
    setDate(newDateTime);
  }

  const dateChangeHandler = (dateTime) => {

    let newDateTime = date.toDate();
    newDateTime.setDate(dateTime.date());
    newDateTime.setMonth(dateTime.month());
    newDateTime.setFullYear(dateTime.year());

    newDateTime = dayjs(newDateTime);
    setDate(newDateTime);
  }

  const guestsChnageHandler = (event) => {

    setNoOfGuestsValue(event.target.value);
  }

  const locationChangeHandler = (event) => {

    setLocationValue(event.target.value);
  }

  const createEvent = async () => {
      let noOfGuests = noOfGuestsValue;
      let data = {
        name : nameValue? nameValue : "Event",
        description : descriptionValue,
        location : locationValue,
        date : date.toJSON(),
        userId : id
      };
      const apiAccessTokenRequest = {
        scopes: authorizeApiRequest.scopes,
        account: accounts[0],
      }
      setLoading(true);
      let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
      try{
        const apiResult = await CreateEventForUser(noOfGuests, checked, data, api_access_token);
        let newEvents = [...events];
        newEvents.push(apiResult.data);
        setEvents(newEvents);
        handleClose();
      }
      catch(error){
        console.log(error);
      }
      //console.log(noOfGuests);
      //console.log(data);
  }

  useEffect(()=>{
    //console.log(events);
    //console.log(descriptionValue);
    //console.log(date.toJSON());
    //console.log(noOfGuestsValue);
    //console.log(locationValue);
  });

  if(loading){
    return(
      <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: "175px", maxHeight: "360px"}}>
          <CircularProgress color="primary" size={50} sx={{margin : "auto"}}/>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
      {activeStep === 0 ? ( //step 1
        <>
          <Typography gutterBottom sx={{ mt: 2, mb: 1 }}>Step 1: Give a proper name and description to your event</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, minHeight: "175px", maxHeight: "360px"}}>
              <Box sx={{ flex: '1 1 auto' }}>
                <TextField
                  id="name-textfield"
                  label="Name"
                  value={nameValue}
                  onChange={nameChangeHandler}
                />
              </Box>
              <Box sx={{ flex: '3 1 auto' }}>
                <TextField
                fullWidth
                id="description-textfield"
                label="Description"
                multiline
                minRows={6}
                maxRows={10}
                value={descriptionValue}
                onChange={descriptionChangeHandler}
                />
              </Box>
            </Box>
        </>
      ) : (
        <>
          {activeStep === 1 ? ( //step 2
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step 2: Pick a date and a time for your event</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, minHeight: "175px", maxHeight: "360px"}}>
                <Box sx={{ flex: '1 1 auto' }}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={date}
                    onChange={(newDate) => {
                      dateChangeHandler(newDate);
                    }}
                    disablePast={true}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
                <Box sx={{ flex: '1 1 auto' }}>
                  <TimePicker
                    label="Time"
                    value={date}
                    onChange={(newTime) => {
                     timeChangeHandler(newTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
            </LocalizationProvider>
          </>
          ) : ( //step 3
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>Step 3: Pick a location and a number of guests you would want at your event</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, minHeight: "175px", maxHeight: "360px"}}>
                <Box sx={{ flex: '1 1 auto' }}>
                  <TextField
                    id="Guests-textfield"
                    label="Guests"
                    type="number"
                    value={noOfGuestsValue}
                    onChange={guestsChnageHandler}
                  />
                </Box>
                <Box sx={{ flex: '3 1 auto' }}>
                  <TextField
                  fullWidth
                  id="location-textfield"
                  label="Location"
                  multiline
                  minRows={6}
                  maxRows={10}
                  value={locationValue}
                  onChange={locationChangeHandler}
                  />
                </Box>
              </Box>
              <FormControlLabel 
                required control={<Checkbox 
                                    checked={checked} 
                                    onChange={handleChangechecked}
                                  />} 
                label="I want to receive an email with the event information" />
            </>
          )}
          
        </>
      )}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={activeStep === steps.length - 1 ? createEvent : handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </>
    </Box>
  );
}
