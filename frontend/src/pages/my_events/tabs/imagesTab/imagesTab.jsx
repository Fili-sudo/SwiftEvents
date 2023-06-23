import * as React from 'react';
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from 'react';
import { authorizeApiRequest } from 'config/auth/authConfig';
import Masonry from '@mui/lab/Masonry';
import Tooltip from '@mui/material/Tooltip';
import getToken from 'config/auth/getToken';
import { useMsal } from "@azure/msal-react";
import { GetFilesForEvent } from 'services/uploadedFiles/getFilesForEvent';

export default function ImagesTab(){

    const [eventId] = useOutletContext();
    const [files, setFiles] = useState([]);
    const { instance, inProgress, accounts } = useMsal();
    


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
    
    useEffect(() => {
        if(eventId){
          fetchFiles(eventId);
        }
    },[eventId]);

    useEffect(() => {
        console.log(files);
    },[files]);

    return(
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
    );
}