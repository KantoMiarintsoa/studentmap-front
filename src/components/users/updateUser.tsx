'use client'

import { User } from '@/types/user'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserUpdateFormData, userUpdateSchema } from '../forms/schema/updateUser.shema'
import { editUser } from '@/service/api'
import { FaUserEdit, FaArrowLeft } from 'react-icons/fa'
import Button from '../ui/button'
import { useAuth } from '../providers/AuthProvider'
import { useRouter } from 'next/navigation'

function UpdateUser() {
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { session, updateSession } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema)
  })

  useEffect(() => {
    if (session?.user) {
      reset({
        ...session.user
      })
    }
  }, [session, setValue])

  async function onSubmit(data: UserUpdateFormData) {
    if (!session?.user) return

    try {
      const userUpdated = await editUser(session.user.id, data)
      updateSession({ ...session, user: userUpdated })
      setSuccessMessage("Utilisateur mis à jour avec succès")
      setTimeout(() => {
        setSuccessMessage("")
        router.back()
      }, 2000)
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error)
      setErrorMessage("Une erreur s'est produite lors de la mise à jour. Veuillez réessayer.")
      setTimeout(() => setErrorMessage(""), 5000)
    }
  }

  return (
    <div className="min-h-screen dark:bg-card-modal flex items-center justify-center">
      <div className="dark:bg-[#3A3A3C] shadow-2xl rounded-2xl p-10 w-full max-w-lg animate__animated animate__fadeIn relative">
        
        <button
          onClick={() => router.back()}
          aria-label="Retour"
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-700 transition"
          type="button"
        >
          <FaArrowLeft className="text-white text-xl" />
        </button>

        <h2 className="text-lg font-bold text-black dark:text-white mb-7 text-center flex items-center justify-center gap-2 animate__animated animate__fadeIn">
          <FaUserEdit className="text-blue-600" /> Mise à jour de l'utilisateur
        </h2>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <input id="email" {...register("email")} type="email" placeholder="Email" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" disabled />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-white">Prénom</label>
            <input id="firstName" {...register("firstName")} type="text" placeholder="Prénom" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-white">Nom</label>
            <input id="lastName" {...register("lastName")} type="text" placeholder="Nom" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          {/* <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-white">Contact</label>
            <input id="contact" {...register("contact")} type="text" placeholder="Contact" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div> */}

          {/* <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-white">Photo de profil</label>
            <input id="profilePicture" {...register("profilePicture")} type="text" placeholder="URL de la photo" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}
            {watch("profilePicture") && (
              <div className="mt-2">
                <img src={watch("profilePicture")} alt="Aperçu" className="h-24 w-24 rounded-full object-cover" />
              </div>
            )}
          </div> */}

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-white">Rôle</label>
            <select
              id="role"
              {...register("role")}
              className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none "
            >
              <option disabled value="" className='dark:bg-card-modal'>Choisir un rôle</option>
              <option value="STUDENT" className='dark:bg-card-modal'>Étudiant</option>
              <option value="ADMIN" className='dark:bg-card-modal'>Admin</option>
              <option value="PROPRIETAIRE" className='dark:bg-card-modal'>Propriétaire</option>
              <option value="ORGANISATEUR" className='dark:bg-card-modal'>Organisateur</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Ancien mot de passe (optionnel)</label>
            <input id="oldPassword" {...register("oldPassword")} type="password" placeholder="Ancien mot de passe" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Nouveau mot de passe (optionnel)</label>
            <input id="newPassword" {...register("newPassword")} type="password" placeholder="Nouveau mot de passe" className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" onClick={() => window.history.back()} className="bg-gray-500 hover:bg-gray-400 cursor-pointer">
              Annuler
            </Button>
            <Button type="submit" className="cursor-pointer">
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser

