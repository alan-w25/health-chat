"use client";
import React from 'react'; 
import {Box, Typography, AppBar, Toolbar, useTheme} from "@mui/material";

export default function AuthHeader() {
  return (
    <AppBar position="static" sx={{backgroundColor:"#FFFFFF", boxShadow:'none'}}>
            <Toolbar>
            <Typography variant="h3" component="div" sx={{
                fontWeight: '800',
            }}>
                HealthChat
            </Typography>
        </Toolbar>
    </AppBar>
  )
}
