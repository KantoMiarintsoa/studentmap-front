'use client';

import Image from 'next/image';
import { FaUserGraduate } from 'react-icons/fa';
import Button from '../ui/button';
import Input from '../ui/input';
import globeView from "@/assets/globeview.jpg";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/service/api';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateSession } = useAuth();

  async function handleSubmit(event:FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      await axios.post("/api/auth/cookies", {
        token: data.access_token,
        user: data.user,
      });
      updateSession(data);
      router.push('/admin/dashboard');
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 via-blue-200 to-white px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-300 via-blue-100 to-white opacity-30">
        <div className="absolute top-10 left-10 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
        <div className="absolute bottom-10 right-10 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
      </div>

      <motion.div
        className="flex flex-col-reverse sm:flex-row w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden z-10 bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full sm:w-1/2 p-6 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="flex justify-center mb-4">
            <FaUserGraduate className="text-black text-5xl sm:text-6xl opacity-50" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 text-center">Connexion</h2>
          <p className="text-gray-500 mt-2 text-center text-sm sm:text-base">Connectez-vous pour gérer les étudiants sur StudentMap</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Mot de passe</label>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-1 mb-4">{error}</p>
            )}

            <Button
              className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
              type='submit'
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>

            <div className="text-center mt-4">
              {/* <span className="text-gray-600">Pas encore de compte ? </span>
              <a href="/register" className="text-blue-500 hover:underline">S'inscrire</a> */}
              <div className="text-right mt-2">
                <a href="/password  " className="text-sm text-blue-500 hover:underline">Mot de passe oublié ?</a>
              </div>
            </div>
          </form>
        </div>

        <div className="relative w-full sm:w-1/2 h-64 sm:h-auto">
          <Image
            src={globeView}
            alt="Login Background"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />


          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-50">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-md">
              Student<span className="text-[#6d56d3]">Map</span>
            </h1>
          </div>
        </div>
      </motion.div>
    </div>
  );
}