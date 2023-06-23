import { loginRequest } from "./authConfig";
import {
    InteractionRequiredAuthError,
    InteractionStatus,
  } from "@azure/msal-browser";

export default async function getToken(instance, accessTokenRequest, inProgress){
    try {
      // Acquire token silent success
      const token = await instance.acquireTokenSilent(accessTokenRequest);
      return token.accessToken;
    }catch (error) {
        try{
          // Acquire token interactive success
          let result =  await instance.acquireTokenRedirect(accessTokenRequest);
          if(inProgress === InteractionStatus.None){
            return result;
          }
          }catch (error) {
            // Acquire token interactive failure
            console.log(error);
          }
        }
};

