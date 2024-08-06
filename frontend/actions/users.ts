"use server";
import {revalidatePath} from "next/cache"
import {redirect} from 'next/navigation'

import { createClient, protectRoute } from '@/utils/supabase/server';

export async function signIn(email: string, password: string){
    const supabase = createClient(); 

    const {error} = await supabase.auth.signInWithPassword(
        {
            email,
            password
        }
    );
    redirect("/")
    if (error){
        throw error; 
    }
}

export async function createUser(email: string, password: string){
    const supabase = createClient()

    const {error} = await supabase.auth.signUp({
        email,
        password
    });

    if (error){
        throw error;
    }
    logout();
}

export async function logout(){
    try{
        await protectRoute(); 

        const {auth} = createClient()

        const {error} = await auth.signOut();

        if (error) throw error; 

    } catch (error){
        throw error;
    }
    
}