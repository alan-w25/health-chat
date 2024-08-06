import {createServerClient} from "@supabase/ssr";
import {NextResponse, type NextRequest} from "next/server";

export async function updateSession(request: NextRequest){
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        }
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            cookies: {
                getAll(){
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet){
                    cookiesToSet.forEach(({name, value, options}) => request.cookies.set(name,value))
                    supabaseRespone = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({name,value,options}) => supabaseResponse.cookies.set(name,value,options))
                }
            }
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()
    
        console.log(user);
      if (
        !user &&
        !request.nextUrl.pathname.includes('/auth')
      ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone()
        url.pathname = '/auth/sign-in'
        return NextResponse.redirect(url)
      }
      if (user && request.nextUrl.pathname.includes('/auth')) {
        const url = request.nextUrl.clone(); 
        url.pathname="/"
        return NextResponse.redirect(url);
      }

      return supabaseResponse
    
}