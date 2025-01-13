import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token');
    if(accessToken){
        return NextResponse.json({authenticated: true});
    }
    return NextResponse.json({authenticated: false});
    
}