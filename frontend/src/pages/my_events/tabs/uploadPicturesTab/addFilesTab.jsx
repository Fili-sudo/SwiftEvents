import * as React from 'react';
import { useEffect, useState } from 'react';
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { useOutletContext } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import { GetFilesForEvent } from 'services/uploadedFiles/getFilesForEvent';
import { DeleteFile } from 'services/uploadedFiles/deleteFile';
import { UploadFiles } from 'services/uploadedFiles/uploadFiles';

const DragDropArea = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "3px #38798e dashed",
  borderRadius: "20px",
  padding: "20px",
  marginBottom: "10px"
})

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

export default function AddFilesTab() {

  const [eventId] = useOutletContext();
  const [files, setFiles] = useState([]);
  const [filesToBeUploaded, setFilesToBeUploaded] = useState([]);
  const [progress, setProgress] = useState(0);
  const { instance, inProgress, accounts } = useMsal();

  const onDrop = useCallback(async acceptedFiles => {
    const filesToUpload = filesToBeUploaded.length > 0 ?
      [...filesToBeUploaded] : [];
      const filePromises = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          filesToUpload.push({
            fileName: file.name,
            eventId: eventId,
            base64File: reader.result
          });
          resolve("Ok");
        };
      })
    })
    await Promise.all(filePromises);
    console.log(filesToUpload.length);
    setFilesToBeUploaded(filesToUpload);
  }, [filesToBeUploaded]);
  const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({onDrop, accept: {
    'image/*': []
  }});

  const fetchFiles = async(eventId) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const fileResult = await GetFilesForEvent(eventId, api_access_token);
      setFiles(fileResult.data);
    }catch(error){
      console.log(error);
    }
  }

  const deleteFiles = async(fileId) => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      await DeleteFile(fileId, api_access_token);
      const newFiles = [...files];
      const deleteIndex = newFiles.findIndex(file => file.id == fileId);
      newFiles.splice(deleteIndex, 1);
      setFiles(newFiles);
    }catch(error){
      console.log(error);
    }
  }

  const uploadFiles = async() => {
    const apiAccessTokenRequest = {
      scopes: authorizeApiRequest.scopes,
      account: accounts[0],
    }
    let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);
    try{
      const timer = calculateProgress();
      await UploadFiles(filesToBeUploaded, api_access_token);
      clearInterval(timer);
      setProgress(100);
      const fileResult = await GetFilesForEvent(eventId, api_access_token);
      setFiles(fileResult.data);
      setTimeout(() => {
        setProgress(0);
        setFilesToBeUploaded([]);
      },1000);
      
      
    }catch(error){
      console.log(error)
    }
  }

  const deleteFilesSetToBeUploaded = (index) => {
    const newFilesToBeUploaded = [...filesToBeUploaded];
    newFilesToBeUploaded.splice(index, 1);
    setFilesToBeUploaded(newFilesToBeUploaded);
  }

  const calculateProgress = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 80);
      });
    }, 500);

    if(progress >= 80){
      clearInterval(timer);
    }

    return timer;
  }

  useEffect(() => {
    if(eventId){
      fetchFiles(eventId);
      setFilesToBeUploaded([]);
    }
  },[eventId]);

  useEffect(() => {
    console.log(files);
  },[files]);

  useEffect(() => {
    console.log(filesToBeUploaded);
  },[filesToBeUploaded]);

  function formatDate(newDate) {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = newDate
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[d.getMonth()]
    const dayName = days[d.getDay()]
    const formatted = `${dayName}, ${date} ${monthName} ${year}`
    return formatted.toString()
  }

  return(
    <>
    <ThemeProvider theme={customTheme}>
    <Box sx={{display: "flex"}}>
      <Box sx={{flexGrow: 1, minWidth: "30%"}}>
        <DragDropArea {...getRootProps()}>
          <CloudUploadIcon sx={{ fontSize: 40 }}/>
          <Input {...getInputProps()} />
          {
            isDragActive ?
               !isDragReject? 
                <Typography>Drop the files here ...</Typography>
              : <Typography>Only image type files are accepted</Typography>
              :<>
                <Typography>Drag and drop here</Typography>
                <Typography>or</Typography>
                <Typography>click to select files</Typography>
              </>
              
          }
        </DragDropArea>
        <Box sx={{display: "flex", flexDirection: "row"}}>
          <Box sx={{flexGrow: 1}}/>
            <Stack direction="column" spacing={1} sx={{maxWidth: "40%"}}>
              <>
                <Button variant="contained" color='secondary' 
                  onClick={() => uploadFiles()}
                  disabled={filesToBeUploaded.length <= 0}>
                    Upload
                </Button>
                {filesToBeUploaded.length > 0 ? filesToBeUploaded.map((file, i) =>(
                  <Tooltip key={i} title={file.fileName} placement="right-start">
                    <Chip label={file.fileName} onDelete={() => deleteFilesSetToBeUploaded(i)}/>
                  </Tooltip>
                )): <></>}
              </>
            </Stack>
          <Box sx={{flexGrow: 1}}/>
        </Box>
      </Box>
      <Box sx={{flexGrow: 1}}/>
      <Box sx={{flexGrow: 3}}>
        <Stack spacing={0.5}>
        {files.length? files.map((row) => (
          <Paper key={row.id}>
            <Box sx={{display: "flex"}}>
                <ImageOutlinedIcon sx={{paddingRight: "2%"}}/>
                <Typography variant='subtitle2'>{row.fileName}</Typography>
                <Box sx={{flexGrow: 1}}/>
                <Typography variant='subtitle2' sx={{paddingRight: "2%"}}>
                  ({formatDate(new Date(row.dateCreated))})
                </Typography>
                <IconButton size="small" onClick={() => deleteFiles(row.id)}>
                  <ClearOutlinedIcon fontSize="inherit" />
                </IconButton>
            </Box>
          </Paper>
        ))
        :<></>
        }
        {filesToBeUploaded.length > 0 && progress > 0 ?
          <Box>
            <LinearProgress variant="determinate" value={progress} sx={{marginTop: "10px"}}/>
          </Box>
          : <></>
        }
        </Stack>
      </Box>
    </Box>
    </ThemeProvider>
    </>
  );
}