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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from './schema/register.schema';
import {register as registerApi} from "@/service/api";


export default function RegisterForm() {
    const router=useRouter()

    const{
      register,
      handleSubmit,
      formState:{errors},
      setError
    }=useForm<RegisterFormData> ({
      resolver:zodResolver(registerSchema)
    });

    async function onSumbit(data:RegisterFormData){
      console.log("fome sumbitted",data)
      try{
        await registerApi(data)
        router.push("/login")
      }
      catch(error:any){
        const errorMessage  = error.response.data.message as string;
        if(errorMessage.includes("email")){
          setError("email", {message:"Email existe deja"});
        }
      }

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

          <form onSubmit={handleSubmit(onSumbit)} className='mt-6'>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Input type='email' placeholder='email' {...register("email")}/>
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Votre nom</label>
              <Input type='text' placeholder='Nom' {...register("firstName")} />
              {errors.firstName && <p className='text-red-500 text-sm'>{errors.email?.message}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700">Prenom</label>
              <Input type='text' placeholder='Votre prenom' {...register("lastName")}/>
              {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Mot de passe</label>
              <Input type='password' {...register("password")}/>
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Confirmer votre mot de passe</label>
              <Input type='password-confirm' placeholder='Confirmation de mot de passe' {...register("confirmPassword")}/>
              {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Contact</label>
              <Input type='text' placeholder='Contact' {...register("contact")}/>
              {errors.contact && <p>{errors.contact.message}</p>}
            </div>


            <Button  className='cursor-pointer' type='submit'>S inscrire</Button>

            <div className="mt-4 text-center">
              <p className="text-gray-500">
                Déjà un compte?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Se connecter
                </a>
              </p>
            </div>
          </form>
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
