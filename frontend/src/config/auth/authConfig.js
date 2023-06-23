import env from "config/environment/environment.json";

export const msalConfig = {
    auth: {
      clientId: "8ff186f1-b02e-4278-94ea-b694ff04d1af",
      authority: "https://login.microsoftonline.com/common", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: env.REACT_APP_AZURE_URI,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      //storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: [""]
  };

  export const authorizeApiRequest = {
    scopes: ["api://824123e7-603e-4053-97d0-53ebb96576b2/App.Use"]
  }

  export const authorizeMsGraphRequest = {
    scopes: ["User.Read"]
  }
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
  };