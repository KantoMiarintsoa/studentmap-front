import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/",
        "/admin",
        "/admin/:path*",
        '/((?!api|login|register|_next/static|_next/image).*)'
    ]
}

export default async function middleware(request: NextRequest) {

    // const NO_AUTH = [
    //     "/login",
    //     "/register"
    // ]
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        return NextResponse.next()
    }


    // if (NO_AUTH.includes(pathname)) {
    //     return NextResponse.next()
    // }

    const cookiesStore = await cookies();

    const token = cookiesStore.get("auth")

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname.startsWith("/admin")) {
        if (JSON.parse(token?.value ?? "").user.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return NextResponse.next();
}