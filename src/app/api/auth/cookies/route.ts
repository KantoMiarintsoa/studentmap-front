import axios from "axios"
import { getMaxAge } from "next/dist/server/image-optimizer";
import { NextResponse } from "next/server";
import path from "path";
import { getCookie, setCookie } from "cookies-next";
import { error } from "console";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { token, user } = await req.json()

    const res = NextResponse.json({ message: "Connection success" });

    res.cookies.set("auth", JSON.stringify({ token, user }), {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: true,
        path: "/"
    });

    // setCookie("auth-token", token, {
    // maxAge: 60 * 60 * 24 * 7,
    // httpOnly: true,
    // // secure: process.env.NODE_ENV === "production",
    // sameSite: true,
    // path: "/"
    // })

    // setCookie("user", user, {
    //     maxAge: 60 * 60 * 24 * 7,
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === "production",
    //     sameSite: true,
    //     path: "/",
    // })


    return res
}


export async function GET() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth");

    if (!token) {
        return NextResponse.json({ authentificated: false, error: "No token found" }, { status: 401 })
    }

    return NextResponse.json({ authentificated: true, session: JSON.parse(token.value) })
}


