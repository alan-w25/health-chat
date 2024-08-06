"use client"
import React, {useState} from 'react'
import {Box, Typography, useTheme, TextField, Button, Divider, Link, Snackbar, Alert} from "@mui/material";
import { createUser } from '../../actions/users';
import { useRouter } from 'next/navigation';


export default function SignUpForm() {
    const theme = useTheme();
    const router = useRouter();
    const [form, setForm] = useState({
        email: "", 
        password: "", 
        password2: ""
    })
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbar = (type:string, message:string) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const handleSignUp = async () => {
        if (!form.email || !form.password || !form.password2) {
            handleSnackbar("Error", "Please fill in all fields");
            return;
        }
        if (form.password !== form.password2) {
            handleSnackbar("Error", "Passwords do not match");
            return;
        }
        try{
            await createUser(form.email, form.password);
            handleSnackbar("Success", "User created successfully");
            router.push("/auth/sign-in");
        } catch (error:any){
            handleSnackbar("Error", error.message);
        }
    }


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
                Sign Up
            </Typography>
            <TextField required value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} label="Email Address" variant="outlined" sx={{
                marginX: 'auto',
                marginTop:"5%"
            }}/>
            <TextField required value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} label="Password" variant="outlined" type="password" sx={{
                marginX: 'auto', 
                marginTop: '5%',
            }}/>
            <TextField required value={form.password2} onChange={(e) => setForm({...form, password2:e.target.value})} label="Confirm Password" variant="outlined" type="password" sx={{
                marginX: 'auto', 
                marginTop: '5%',
            }} />

            <Button onClick={handleSignUp}
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
            >Sign Up</Button>

            <Divider sx={{
                width: '75%',
                marginX: 'auto',
                marginTop:"5%"
            }}/>

            <Link href="/auth/sign-in" sx={{
                marginX: 'auto',
                textDecoration: 'none',
                color:"#000000",
                "&:hover":{
                    textDecoration: "underline",
                }
            }}>
                <Typography variant="body1" sx={{
                    marginTop: '5%',
                    fontWeight:'600',
                    marginX:"auto",
                }}>
                    Have an account already? Sign In
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
