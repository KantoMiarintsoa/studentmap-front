'use client';

import Image from 'next/image';
import { FaUserGraduate } from 'react-icons/fa';
import Button from '../ui/button';

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 via-blue-200 to-white">
      {/* L'arrière-plan avec des traces ou des éléments décoratifs */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-300 via-blue-100 to-white opacity-30">
        <div className="absolute top-10 left-10 h-[300px] w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
        <div className="absolute bottom-10 right-10 h-[300px] w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
      </div>

      <div className="flex w-full max-w-5xl h-[90%] rounded-lg shadow-2xl overflow-hidden z-10"> {/* Shadow added here */}

        <div className="w-1/2 bg-white p-16 flex flex-col justify-center">
          <div className="flex justify-center mb-4 mt-[-20px]">
            <FaUserGraduate className="text-black text-6xl opacity-50" />
          </div>
          <h2 className="text-4xl font-semibold text-gray-800 text-center">Connexion</h2>
          <p className="text-gray-500 mt-2 text-center">Connectez-vous pour gérer les étudiants sur StudentMap</p>
          
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input  type='email' placeholder="email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Mot de passe</label>
              <input type="password" placeholder="Password"/>
            </div>
            <Button>Se connecter</Button>
          </div>
        </div>

        <div className="w-1/2 relative">
          <Image 
            src="/globeview.jpg" 
            alt="Login Background" 
            layout="fill" 
            objectFit="cover"
            className="opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">Student<span className="text-blue-400">Map</span></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

