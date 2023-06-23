import * as React from 'react';
import { useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { NavLink, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



export default function Guest(){

    const { id } = useParams();
    const { pathname } = useLocation();

    const activeStyle = {
        textDecoration: "none",
        padding: "10px",
        margin: "5px",
        borderRadius: "52% 78% 94% 25% / 59% 34% 49% 83% ",
        backgroundColor: "#388e3c",
        color: "white"
      };
  
      const inactiveStyle = {
        textDecoration: "none",
        padding: "10px",
        margin: "5px",
        color: "white"
      } 
  
      const isIndexPath = () => {
        const paths = pathname.split("/").filter(entry => entry !== "");
        const lastPath = paths[paths.length - 1];
        if(lastPath !== id){
          return false;
        }
        return true;
      }

    return(
        <>
          <Box sx={{backgroundColor: "#8e3856", height: "70px", display: "flex", alignItems: "center"}}>
            <NavLink to="info"
              style={({ isActive }) =>
                isActive || isIndexPath() ? activeStyle : inactiveStyle
              }>
              <Typography variant='subtitle1'>
                Info
              </Typography>
            </NavLink>
            <NavLink to="image_list"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }>
              <Typography variant='subtitle1'>
                Images
              </Typography>
            </NavLink>
          </Box>

          <Box>
            <Outlet context={[id]} />
          </Box>
        </>
    );
}