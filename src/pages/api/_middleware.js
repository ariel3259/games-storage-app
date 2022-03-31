import { verifyToken } from "./utils/tokens";
import { NextResponse } from "next/server";

export default async function middleware({headers, page}){



    if(page.name === "/api/users/auth" || page.name === "/api/users/register")
        return NextResponse.next();
   
    if(!headers.get('access_token') || !headers.get("access_token"))
        return new Response("You're not logged in", {status: 401});
    
    const token = headers.get('access_token');
    const subject = headers.get('subject');

    const isLoged = await verifyToken(token, subject);

    if(!isLoged)
        return new Response("You're not logged in",{ status: 401});

    NextResponse.next();
}