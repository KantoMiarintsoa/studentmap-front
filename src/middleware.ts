import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const cookiesStore = await cookies();

    const token = cookiesStore.get("auth")

    const { pathname } = request.nextUrl;

    // if(pathname.startsWith("/admin")){
    //     if(JSON.parse(token?.value??"").user.role!=="ADMIN"){
    //         return NextResponse.redirect(new URL("/login", request.url))
    //     }
    // }

    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }
    return NextResponse.next();
}