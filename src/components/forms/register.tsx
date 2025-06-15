'use client';

import Image from 'next/image';
import { FaUserGraduate } from 'react-icons/fa';
import Button from '../ui/button';
import Input from '../ui/input';
import globeView from "@/assets/globeview.jpg";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from './schema/register.schema';
import { registerAdmin, register as registerApi } from '@/service/api';
import { motion } from 'framer-motion';

export default function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  async function onSubmit(data: RegisterFormData) {
    setApiError("");
    try {
      await registerAdmin(data);
      // router.push("/login");
      router.back();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Erreur inattendue";
      if (errorMessage.includes("email")) {
        setError("email", { message: "Email existe déjà" });
      } else {
        console.log(errorMessage)
        setApiError(errorMessage);
      }
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 via-blue-200 to-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-300 via-blue-100 to-white opacity-30">
        <div className="absolute top-10 left-10 h-[300px] w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
        <div className="absolute bottom-10 right-10 h-[300px] w-[300px] border-2 border-dashed border-gray-400 opacity-50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full max-w-5xl h-[90%] rounded-2xl shadow-lg shadow-blue-200 overflow-hidden z-10 bg-white"
      >
        <div className="w-1/2 p-16 flex flex-col justify-center backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-4 mt-[-20px]"
          >
            <FaUserGraduate className="text-black text-6xl opacity-50" />
          </motion.div>

          <h2 className="text-4xl font-semibold text-gray-800 text-center">Inscription</h2>
          <p className="text-gray-500 mt-2 text-center">Créez un compte administrateur</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {apiError}
              </div>
            )}

            <div>
              <label className="block text-gray-700">Email</label>
              <Input type="email" placeholder="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Votre nom</label>
              <Input type="text" placeholder="Nom" {...register("firstName")} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Prenom</label>
              <Input type="text" placeholder="Votre prénom" {...register("lastName")} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <Input type="password" {...register("password")} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Confirmation du mot de passe</label>
              <Input type="password" placeholder="Confirmez le mot de passe" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Contact</label>
              <Input type="text" placeholder="Contact" {...register("contact")} />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
            </div>
            <div>
            <label className="block text-gray-700 mb-1">Rôle</label>
            <select
              {...register("role")}
              className={`w-full px-3 py-2 border rounded ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>Choisissez un rôle</option>
              <option value="ADMIN">Administrateur</option>
              <option value="STUDENT">Étudiant</option>
              <option value="OWNER">Propriétaire</option>
              <option value="ORGANIZER">Organisateur</option>
            </select>

            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

            <Button className="cursor-pointer w-full" type="submit">S'inscrire</Button>

            <div className="mt-4 text-center">
              <p className="text-gray-500">
                Déjà un compte ?{' '}
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
            alt="Register Background"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white"
            >
              <div className='absolute inset-0 flex items-center justify-center bg-black opacity-50'>
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-md">
                  Student<span className="text-[#6d56d3]">Map</span>
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
