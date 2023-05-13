import React from "react";
import Weather from "../Header/weatherPart/Weather.jsx"
import TodoTitle from "../Header/TodoTitle/TodoTitle.jsx"

import Grid from '@mui/material/Grid';

const Header = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{padding:".5rem", marginBottom:"1rem"}}>
        <Grid item xs={12} md={2} sx={{border:"2px solid red"}}>
          <Weather/>
        </Grid>
        <Grid item xs={12} md={10}>
           <TodoTitle/> 
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
