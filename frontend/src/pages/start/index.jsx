import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useMsal } from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { loginRequest } from 'config/auth/authConfig';
import { useNavigate } from 'react-router-dom';
import { authorizeMsGraphRequest, authorizeApiRequest } from 'config/auth/authConfig';
import getToken from 'config/auth/getToken';
import { getMsGraphUserData } from 'services/msGraph/getMsGraphUserData';
import { getUserById } from 'services/users/getUserById';
import { createUser } from 'services/users/createUser';
import { createUserWithoutGuid } from 'services/users/createUserWithoutGuid';
import { getUserByMail } from 'services/users/getUserByMail';

const LeftSideBox = styled(Box)({
  padding: "30px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const FormLayoutBox = styled(Box)({
  paddingBottom: "30px", 
  display: "flex", 
  justifyContent: "center"
});
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#388e3c',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#388e3c',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#388e3c',
    },
    '&:hover fieldset': {
      borderColor: '#388e3c',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#388e3c',
    },
  },
});
const customButtontheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
      contrastText: '#ffffff'
    },
  },
});

function MicrosoftIcon() {

  return(<svg xmlns="http://www.w3.org/2000/svg"  
            viewBox="0 0 48 48" width="35px" height="35px">
            <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"/>
            <path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"/>
            <path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"/>
            <path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"/>
          </svg>
  );
}

export default function StartPage() {
    const { instance, inProgress, accounts } = useMsal();
    let navigate = useNavigate();
    const [ trigger, setTrigger ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ code, setCode] = useState("");
    const [ codeError, setCodeError ] = useState("");

    useEffect(() => {
      const msGraph = async () => {

        const login = async () => {
            try{
              await instance.loginRedirect(loginRequest);
            }catch(error){
              console.log(error);
            }
        };
        //if the user is not logged in a login attempt is performed
        if(!accounts[0] && trigger){
          login();
        }
        //if the user is logged, then deal with the redirect
        if(accounts[0]){
          setLoading(true);
          await handleRedirect();
          setLoading(false);
  
        }
      }


      msGraph();
    }, [trigger, accounts, loading]);

    const codeChange = (event) =>{
      setCode(event.target.value);
    }

    const oldHandleLogin = (loginType) => {
      if (loginType === "redirect") {
          instance.loginRedirect(loginRequest).catch(e => {
              console.log(e);
          });
      }
      if(inProgress === InteractionStatus.None){
        navigate('/my_events/C7C90081-FB15-4B07-81DD-0D55A83B6575');
      }
    }

    //login trigger by login button
    const handleLogin = () => {
      setTrigger(true);
    }

    //function that transforms a variable length string to a valid guid(old)
    const stringToGuid = (string) => {
      let nrOfpaddingZeroes = 32 - string.length;
      
      let digitsOnlyGuid = string;
      if(nrOfpaddingZeroes > 0){
        let paddingZeroes = new Array(nrOfpaddingZeroes + 1).join( 0 );
        digitsOnlyGuid = paddingZeroes.concat(string);
      }
      
      let rxGetGuidGroups = /(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/;
      let Guid = digitsOnlyGuid.replace(rxGetGuidGroups, '$1-$2-$3-$4-$5');

      return Guid;
    }

    /*here we deal with the redirect:
      1. we aquire an access token for Microsoft Graph endpoint
      2. we aquire an access token for my protected api
      3. we get user info from the Microsoft Graph endpoint
      4. we call the api with the user info
        a) the user has already been created previously redirecting you to
           the user's events page
        b) the user doesn't exist in database so a call to createUser is
           performed with the user info and an user is created. Afterwards,
           you are being redirected to the user's events page. (*Note: this 
           operation is only performed once at the very first login into 
           the app.)
    */
    const handleRedirect = async () => {
      //scopes for Microsoft Graph call (User.Read)
      const msGraphAccessTokenRequest = {
        scopes: authorizeMsGraphRequest.scopes,
        account: accounts[0],
      };
      //scopes for my protected api
      const apiAccessTokenRequest = {
        scopes: authorizeApiRequest.scopes,
        account: accounts[0],
      }

      //1 & 2 acquireing access tokends for both Microsoft Graph and my protected api
      let msGraph_access_token = await getToken(instance, msGraphAccessTokenRequest, inProgress);
      let api_access_token = await getToken(instance, apiAccessTokenRequest, inProgress);

      //3 calling Microsoft Graph
      const msGraphResult = await getMsGraphUserData(msGraph_access_token);
      const msGraphResultData = msGraphResult.data;
      let user = {
        //id: msGraphResultData.id, //old
        mail: msGraphResultData.userPrincipalName,
      }
      //old
      //performing required id transformation
      //user.id = stringToGuid(user.id);
    
      //4 getting/creating resource for the logged in user
      try{
        // 4.a) trying to get the User to see if it has already been created
        //const apiResult = await getUserById(user.id, api_access_token); //old
        const apiResult = await getUserByMail(user.mail, api_access_token); //new
        const userId = apiResult.data.id;
        navigate(`/my_events/${userId}`);
        console.log(apiResult);
      }catch(error){ //4.b) if not, perform an one time user resource creation
        console.log(error.response.status);
        if(error.response.status == 404){
          try{
            //const apiResult = await createUser(user, api_access_token); //old
            const apiResult = await createUserWithoutGuid(user, api_access_token); 
            const userId = apiResult.data.id;
            navigate(`/my_events/${userId}`);
            console.log(apiResult);
          }
          catch(error){
            console.log(error);
          }
        }
      }
    }

    const handleEnter = (code) => {
      if (isValidGuid(code)){
        navigate(`guest/${code}`)
      }
        setCodeError("Invalid code");
        setTimeout(() => setCodeError(""), 2000);
    }

    function isValidGuid(guid) {
      const guidRegex = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
      return guidRegex.test(guid);
    }
    

    if(loading){
      return(
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <ThemeProvider theme={customButtontheme}>
            <CircularProgress color="primary" size={100}/>
          </ThemeProvider>
        </Box>
      );
    }
    
    return (
      <Box>
        <Grid2 container spacing={2}>
          <Grid2 xs={8}>
            { codeError != "" && (
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {codeError}
                </Alert>
              </Box>
            )}
            <LeftSideBox> 
              <Box component="form">
                <FormLayoutBox>
                  <Typography>Login using your microsoft account</Typography>
                </FormLayoutBox>
                <FormLayoutBox>
                  <ThemeProvider theme={customButtontheme}>
                    <Button color="primary" 
                      variant="outlined" 
                      endIcon={<MicrosoftIcon/>}
                      onClick={() => handleLogin()}>Login
                    </Button>
                  </ThemeProvider>
                </FormLayoutBox>
                <FormLayoutBox>
                  <Typography>Or type in your code to pick your seat</Typography>
                </FormLayoutBox>
                <FormLayoutBox>
                  <CssTextField label="Your Code" variant="outlined" multiline 
                    sx={{minWidth: "37%"}}
                    onChange={codeChange}/>
                </FormLayoutBox>
                <FormLayoutBox>
                  <ThemeProvider theme={customButtontheme}>
                      <Button color="primary" 
                        variant="outlined" 
                        onClick={() => handleEnter(code)}>Enter
                      </Button>
                  </ThemeProvider>
                </FormLayoutBox>
              </Box>
            </LeftSideBox>
          </Grid2>
          <Grid2 xs={4} sx={{backgroundColor: "#388e3c"}}>
          </Grid2>
        </Grid2>
      </Box>
    );
}