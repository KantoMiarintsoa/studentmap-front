'use client';

import Image from 'next/image';
import { FaUserGraduate } from 'react-icons/fa';
import Button from '../ui/button';
import Input from '../ui/input';
import globeView from "@/assets/globeview.jpg"  
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/service/api';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

export default function Login() {
    const [email,setemil]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState<string | null>(null);
    const router=useRouter()
    const {updateSession}=useAuth();

    async function handleSubmit(){
        const data=await login(email,password);
        console.log(data)
        // if(data.user.role==="OWNER")
        await axios.post("/api/auth/cookies", {token:data.access_token, user:data.user});
        updateSession(data);
        router.push('/admin/university');
    }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 via-blue-200 to-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-300 via-blue-100 to-white opacity-30">
        <div className="absolute top-10 left-10 h-[300px] w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
        <div className="absolute bottom-10 right-10 h-[300px] w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
      </div>

      <div className="flex w-full max-w-5xl h-[90%] rounded-lg shadow-2xl overflow-hidden z-10">

        <div className="w-1/2 bg-white p-16 flex flex-col justify-center">
          <div className="flex justify-center mb-4 mt-[-20px]">
            <FaUserGraduate className="text-black text-6xl opacity-50" />
          </div>
          <h2 className="text-4xl font-semibold text-gray-800 text-center">Connexion</h2>
          <p className="text-gray-500 mt-2 text-center">Connectez-vous pour gérer les étudiants sur StudentMap</p>
          
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Input type='email' placeholder='email'value={email} onChange={(e)=>setemil(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Mot de passe</label>
              <Input type='password' placeholder='Mot de passe' value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </div>
            
            <Button  className='cursor-pointer'  onClick={()=>handleSubmit()}>Se connecter</Button>
            <div className="text-center mt-4">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <a href="/register" className="text-blue-500 hover:underline">S'inscrire</a>
            <div className="text-right mb-4">
                  <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Mot de passe oublié ?</a>
            </div>

            </div>
          </div>
        </div>

        <div className="w-1/2 relative">
          <Image 
            src={globeView}
            alt="Login Background"
            layout="fill" 
            objectFit="cover"
            className="opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-50">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">Student<span className="text-[#6d56d3]">Map</span></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



