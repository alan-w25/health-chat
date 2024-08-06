"use client"
import React, {useState} from 'react'
import {Box, Typography, useTheme, TextField, Button, Divider, Link, Snackbar, Alert} from "@mui/material";
import { signIn } from '../../actions/users';
import {useRouter} from "next/navigation";

export default function SignInForm() {
    const theme = useTheme();
    const router = useRouter();
    const [form, setForm] = useState({
        email: "", 
        password: ""
    })

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbar = (type:string, message:string) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const handleSignIn = async () => {
        if (!form.email || !form.password) {
            handleSnackbar("Error", "Please fill in all fields");
            return;
        }
        try{
            setForm({email: "", password: ""});
            await signIn(form.email, form.password);
            handleSnackbar("Success", "User signed in successfully");
        } catch (error:any){
            console.log(error.message);
            handleSnackbar("Error", error.message);
        }
    }
    const handleGoogleSignIn = () => {

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
                Sign In
            </Typography>
            <TextField required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} label="Email Address" variant="outlined" sx={{
                marginX: 'auto',
                marginTop:"5%"
            }}/>
            <TextField required value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} label="Password" variant="outlined" type="password" sx={{
                marginX: 'auto', 
                marginTop: '5%',
            }}/>

            <Button onClick={handleSignIn}
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
            >Sign In</Button>
            <Link href="/auth/forgot-password" sx={{
                textDecoration:'none', 
            }}>
                <Typography variant="body1" sx={{
                    fontWeight:"light", 
                    marginTop:"5%",
                    marginLeft:"5%",
                    color: "#000000",
                    textDecoration: "underline"

                }}>
                    Forgot Password? 
                </Typography>
            </Link>
            

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
           
            <Typography gutterBottom sx={{
                marginTop: '1%',
                marginX:"auto",
                width:"full",
                fontWeight:'500',
            }}>
                or
            </Typography>
            <Button
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: "#000000",
                    width: '50%',
                    marginX:"auto",
                    '&:hover': {
                        backgroundColor:"#000000",
                        color:"#FFFFFF" // Use lighten function
                    },
                    marginBottom: '10%'
                }}
            >Sign In With Google</Button>
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
