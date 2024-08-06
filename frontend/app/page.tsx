"use client"; 
import { logout } from '@/actions/users';
import React, {useState} from 'react';
import {Box, Button, Snackbar, Alert}  from '@mui/material';
import {useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbar = (type:string, message:string) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/auth/sign-in");
      handleSnackbar("Success", "User signed out successfully");
    } catch (error:any) {
      handleSnackbar("Error", error.message);
    }
  }

  return (
    <main>
      <Box sx ={{
        display:'flex',
        width:"100vh",
        height:"100vh", 
        justifyContent:'center', 
        alignItems:'center',
        textAlign: 'center'

      }}>
        <Button sx={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#D3D3D3",
            color: "#000000"
          }

        }}onClick={handleSignOut}>Sign Out</Button>
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => {setSnackbar(false)}}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={() => {setSnackbar(false)}} severity={snackbarMessage.startsWith('Error') ? "error" : "success"} sx={{width: '100%' }}>
                {snackbarMessage}
            </Alert>
            </Snackbar>
      </Box>
      
    </main>
  );
}
