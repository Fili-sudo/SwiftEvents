import * as React from 'react';
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Tooltip from '@mui/material/Tooltip';
import { GetFilesForEventAnonymous } from 'services/uploadedFiles/getFilesForEventAnonymous';
import { GetGuestByIdAnonymus } from 'services/guests/getGuestByIdAnonymus';

export default function GuestImagesTab(){

    const [guestId] = useOutletContext();
    const [guest, setGuest] = useState({});
    const [files, setFiles] = useState([]);
    

    const fetchFiles = async(guestId) => {
        try{
          const result = await GetGuestByIdAnonymus(guestId);
          const eventId = result.data.eventId;
          const fileResult = await GetFilesForEventAnonymous(eventId);
          setFiles(fileResult.data);
        }catch(error){
          console.log(error);
        }
    }

    useEffect(() => {
        fetchFiles(guestId);
    },[]);

    useEffect(() => {
        console.log(files);
    },[files]);

    return(
      <Box sx={{margin: "5%"}}>
        <Masonry columns={4} spacing={2}>
         {files.length > 0?
            files.map((file) => (
              <Tooltip key={file.id} title={file.fileName} placement="top">
              <img  
                  src={file.absoluteUri}
                  alt={file.fileName}
                  loading="lazy"
              />
              </Tooltip>
            ))
            :<></>
         }
        </Masonry>
      </Box>
    );
}