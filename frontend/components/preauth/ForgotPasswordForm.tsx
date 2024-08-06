"use client";
import React, {useState} from 'react'
import { Box, Typography, TextField, Button, Link, Divider, useTheme, Snackbar, Alert} from '@mui/material'
import {useRouter} from 'next/navigation';
import { LocaleRouteNormalizer } from 'next/dist/server/future/normalizers/locale-route-normalizer';


export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const router = useRouter();

  const handleSnackbar = (type:string, message:string) => {
    setSnackbarMessage(type + ' ' + message);
    setSnackbar(true);
  }

  const handleForgotPassword = async () => {
    if (!email) {
      handleSnackbar("Error", "Please fill in all fields");
      return;
    }
    try {
      console.log("forget password tyring")
      router.push("/auth/sign-in");

    } catch (error:any) {
      handleSnackbar("Error", error.message);
    }
  }

  const theme = useTheme();
  return (
    <Box sx={{
        width:"100%", 
        height:"100%", 
        display:'flex', 
        justifyContent:'center',
        alignItems:'center'
    }}>
        <Box sx={{
            display:'flex', 
            flexDirection:'column',
            backgroundColor: "#FFFFFF",
            width: '50vh',
            minHeight:"60vh",
            marginTop:"5%", 
            border:"4px solid",
            borderColor: theme.palette.primary.main,
            borderRadius:"2%"
        }}>
            <Typography variant="h4" gutterBottom sx={{
                marginTop: '5%',
                marginLeft: '5%',
                color: "#000000",
                fontWeight:'600'
            }}>
               Reset Password 
            </Typography>
            <TextField required value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" variant="outlined" sx={{
                marginX: 'auto',
                marginTop:"5%"
            }}/>
            <Button onClick={handleForgotPassword}
            sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "#000000",
                width: '50%',
                marginTop: "5%",
                marginX:'auto',
                '&:hover': {
                    backgroundColor:"#000000" ,
                    color:"#FFFFFF" // Use lighten function
                },
            }}
            >Send Password Reset Email</Button>

            <Divider sx={{
                width: '75%',
                marginX: 'auto',
                marginTop:"5%"
            }}/>
            <Link href="/auth/sign-up" sx={{
                textDecoration:'none', 
                color:"#000000",
                marginX:"auto",
                "&:hover":{
                    textDecoration:'underline',
                }

            }}>
                <Typography variant="body1" sx={{
                    marginTop: '5%',
                    fontWeight:'600',
                    marginX:"auto",
                }}>
                    Don't have an account? Sign Up
                </Typography>
            </Link>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => {setSnackbar(false)}}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={() => {setSnackbar(false)}} severity={snackbarMessage.startsWith('Error') ? "error" : "success"} sx={{width: '100%' }}>
                {snackbarMessage}
            </Alert>
            </Snackbar>
        </Box>
    </Box>
  )
}
