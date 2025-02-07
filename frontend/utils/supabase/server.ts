import {createServerClient, type CookieOptions} from "@supabase/ssr"
import {cookies} from "next/headers"; 

export function createClient(){
    const cookieStore = cookies() 

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                }, 
                setAll(cookiesToSet){
                    try{
                        cookiesToSet.forEach(({name, value, options})=> cookieStore.set(name,value,options))
                    }catch(error){
                        console.error("Failed to set cookies", error)
                    }
                }
            }
        }
    )
}

export async function getUser(){
    const {auth} = createClient(); 

    const user = (await auth.getUser()).data.user;

    return user
}

export async function protectRoute() {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");
}