"use client"
import axios from "axios";
import {Session} from "@/types/user";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProps={
    session:Session|null,
    status:"loading"|"authenticated"|"unauthenticated",
    updateSession:(session:Session)=>Promise<void>

}

const AuthContext=createContext<AuthContextProps>({
    session:null,
    status:"loading",
    updateSession:async (session:Session)=>{}
})

const AuthProvider=({children}:{children:ReactNode})=>{
    const [session,setSession]=useState<Session | null>(null)
    const [status,setStatus]=useState<"loading"|"authenticated"|"unauthenticated">("loading")

    useEffect(()=>{
        const checkUser=async()=>{
            try{
                const response= await axios.get("/api/auth/cookies");

                if(response.status===200){
                    setSession(response.data.session)
                    setStatus("authenticated")
                }

            }
            catch(error:any){
                setStatus("unauthenticated")

            }
            
        }
        checkUser()
    }, []) //dependencies array

    const updateSession=async(session:Session)=>{
        setSession(session);
        setStatus("authenticated");   
    }


    return(
        <AuthContext.Provider value={{session, status, updateSession}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth(){
    return useContext(AuthContext)
}

export default AuthProvider
